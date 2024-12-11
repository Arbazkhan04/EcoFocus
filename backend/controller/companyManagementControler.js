const Company = require('../modals/companyManagementModal');
const User = require('../modals/userManagementModal');
const Agency = require('../modals/agencyManagementModal');
const mongoose = require('mongoose');


const createCompany = async (req, res) => {
    try {
        const { name, address, postalCode, postalName, contactEmail, setBaseYear, source, apiKey, registrationNumber, username, password, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        // Validate the source type
        const validSources = ['Tripletex(pågående aktiv)', 'PowerOffice Go', '24SevenOffice(pågående aktiv)', 'SAF-T-fil'];
        if (!validSources.includes(source)) {
            return res.status(200).json({ message: 'Invalid import source', data: false });
        }

        // Validate required fields based on source
        if ((source === 'Tripletex(pågående aktiv)' || source === 'PowerOffice Go') && !apiKey) {
            return res.status(200).json({ message: 'API key is required', data: false });
        }
        if (source === '24SevenOffice(pågående aktiv)' && (!username || !password)) {
            return res.status(200).json({ message: 'Username and password are required', data: false });
        }

        const company = new Company({
            name,
            registrationNumber,
            address,
            postalCode,
            postalName,
            contactEmail,
            setBaseYear, // this is array of numbers
            createdBy: user._id,
            contactPerson: user._id,
            users: [{ userId: user._id, role: 'admin' }]
        });

        company.importSource = {
            source,
            apiKey: source === 'Tripletex(pågående aktiv)' || source === 'PowerOffice Go' ? apiKey : null,
            username: source === '24SevenOffice(pågående aktiv)' ? username : null,
            password: source === '24SevenOffice(pågående aktiv)' ? password : null
        };

        await company.save();

        res.status(200).json({
            message: 'Company created successfully',
            data: true,
        });
    } catch (err) {
        res.status(200).json({
            error: err.message,
            data: false,
            message: "company not created"

        });
    }
}

// get companies or agencies created by the user or have access to the company or agency
// if the company become agency check in agency does this user has access to the agency and what kind of access he has user or admin or contact peron


// const getCompanies = async (req, res) => {
//     try {
//       const { userId } = req.query;

//       console.log(userId);

//       // Fetch user
//       const user = await User.findById(userId);
//       if (!user) {
//         return res.status(200).json({
//           message: 'User not found',
//           data: false,
//         });
//       }

//       // Fetch companies created by the user also 
//       const companies = await Company.find({ createdBy: userId });

//       // Map over companies to extract required data asynchronously
//       const companyData = await Promise.all(
//         companies.map(async (company) => {
//           const contactPerson = await User.findById(company.contactPerson);
//           return {
//             name: company.name,
//             setBaseYear: company.setBaseYear,
//             registrationNumber: company.registrationNumber,
//             contactPerson: contactPerson ? contactPerson.userName : 'Unknown',
//             id: company._id,
//           };
//         })
//       );

//       // Send response
//       res.status(200).json({
//         message: 'Companies fetched successfully',
//         data: companyData,
//       });
//     } catch (err) {
//       res.status(200).json({
//         error: err.message,
//         data: false,
//         message: 'Failed to fetch companies',
//       });
//     }
//   };



const getCompanies = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(200).json({ data: false, message: 'Invalid userId' });
        }

        let companies = [];

        // Step 1: Find companies where the user is in the users array or the creator
        const userCompanies = await Company.find({
            $or: [
                { users: { $elemMatch: { userId: userId } } },
                { createdBy: userId }
            ]
        }).populate('contactPerson', 'userName'); // Populating contactPerson for direct companies

        // Add userCompanies to the results
        userCompanies.forEach(company => {
            companies.push({
                name: company.name,
                setBaseYear: company.setBaseYear,
                registrationNumber: company.registrationNumber,
                contactPerson: company.contactPerson ? company.contactPerson.userName : 'Unknown',
                id: company._id
            });
        });

        // push the agency as well if the user is in the agency(means compnay in which user is associated is agency)
        const userAgency = await Agency.findOne({
            "users.userId": userId
        }).populate('registrationNumber');

        if (userAgency) {
            // find the company
            const company = await Company.findOne({ registrationNumber: userAgency.registrationNumber });
            const contactPerson = await User.findById(company.contactPerson);

            if (company) {
                companies.push({
                    name: company.name,
                    setBaseYear: company.setBaseYear,
                    registrationNumber: company.registrationNumber,
                    contactPerson: contactPerson ? contactPerson.userName : 'Unknown',
                    id: company._id
                });
            }
        }


        // Step 2: Find agencies where the user is in the users array
        const userAgencies = await Agency.find({
            "users.userId": userId
        }).populate({
            path: 'users.assignCompanies',
            populate: { path: 'contactPerson', select: 'userName' }
        });

        // Process user agencies
        for (const agency of userAgencies) {
            // Find the specific user in the agency's users array
            const agencyUser = agency.users.find(user => user.userId.toString() === userId);
            if (agencyUser && agencyUser.assignCompanies.length > 0) {
                // If the user has assigned companies, add them
                agencyUser.assignCompanies.forEach(company => {
                    companies.push({
                        name: company.name,
                        setBaseYear: company.setBaseYear,
                        registrationNumber: company.registrationNumber,
                        contactPerson: company.contactPerson ? company.contactPerson.userName : 'Unknown',
                        id: company._id
                    });
                });
            }
        }

        // Remove duplicates (if any) by checking unique `id`
        const uniqueCompanies = companies.reduce((acc, current) => {
            if (!acc.find(company => company.id.toString() === current.id.toString())) {
                acc.push(current);
            }
            return acc;
        }, []);

        return res.status(200).json({
            message: 'Associated companies fetched successfully',
            data: uniqueCompanies,
        });
    } catch (error) {
        console.error('Error fetching associated companies:', error);
        return res.status(200).json({
            data: false,
            error: error.message,
            message: 'Internal Server Error'
        });
    }
};




const getCompanyData = async (req, res) => {
    try {
        const { userId, clientName, baseYear } = req.query;
        const user = await User.findById(userId);
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        const company = await Company.findOne({ name: clientName });
        if (!company) return res.status(200).json({
            message: 'Company not found',
            data: false
        });

        let isAdmin = company.users.some(user => user.userId.toString() === userId && user.role === 'admin');
        let isCompanyUser = company.users.some(user => user.userId.toString() === userId && user.role === 'user');

        let agencyAdmin = false;
        let agencyUser = false;
        let contactPersonOfAgency = false;

        const userExistInAgency = await Agency.findOne({
            $or: [
                { users: { $elemMatch: { userId: userId } } },
                { contactPerson: userId }
            ]
        });

        if (userExistInAgency) {
            contactPersonOfAgency = userExistInAgency.contactPerson.toString() === userId ? true : false;
            agencyAdmin = userExistInAgency.users.some(user => user.userId.toString() === userId && user.role === 'admin');
            if (agencyAdmin) {
                isAdmin = true;
            } else {
                agencyUser = true;
            }
        }

        const newCompany = {
            _id: company._id,
            name: company.name,
            registrationNumber: company.registrationNumber,
            setBaseYear: company.setBaseYear,
            contactEmail: company.contactEmail,
            address: company.address,
            postalCode: company.postalCode,
            postalName: company.postalName,
            contactPerson: company.contactPerson.toString() === userId,
            isCompanyAdmin: isAdmin,
            user: isCompanyUser,
            isAgency: company.isAgency,
            agencyId: company.agencyId,
            agencyAdmin: agencyAdmin,
            agencyUser: agencyUser,
            contactPersonOfAgency: contactPersonOfAgency,
        };

        res.status(200).json({
            message: 'Company data fetched successfully',
            data: newCompany,
        });
    } catch (err) {
        res.status(200).json({
            error: err.message,
            data: false,
            message: "company data not fetched"
        });
    }
}


const getCompanyUsers = async (req, res) => {
    try {
        const { companyId } = req.query;

        // Find the company and populate the users array with user details
        const company = await Company.findById(companyId).populate({
            path: 'users.userId',
            select: 'userName email phone', // Select only the required fields
        });

        if (!company) {
            return res.status(200).json({
                message: 'Company not found',
                data: false,
            });
        }
        console.log(company)
        const contactPersonId = company.contactPerson ? company.contactPerson.toString() : null;
        // Filter out users who have removeAcess set to true
        const users = company.users
            .filter(user =>
                user.removeAcess &&
                user.userId &&
                user.userId._id &&
                user.userId._id.toString() !== contactPersonId
            )

            .map(user => ({
                userName: user.userId.userName,
                userId: user.userId._id,
                email: user.userId.email,
                phone: user.userId.phone,
                role: user.role,
            }));

        res.status(200).json({
            message: 'Company users fetched successfully',
            data: users,
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            data: false,
            message: 'Company users not fetched',
        });
    }
};

const removeClient = async (req, res) => {
    try {
        const { companyId, userId } = req.body;

        const company = await Company.findById(companyId)
        if (!company) return res.status(200).json({
            message: 'Company not found',
            data: false
        });

        const user = await User.findById(userId);
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        const userIndex = company.users.findIndex(user => user.userId.toString() === userId);
        if (userIndex === -1) {
            // find company in agency users array in the assignCompanies array and remove him from there
            // find from all the agency
            const agencies = await Agency.find({});
            for (const agency of agencies) {
                const userIndex = agency.users.findIndex(user => user.userId.toString() === userId);
                if (userIndex !== -1) {
                    const assignCompanyIndex = agency.users[userIndex].assignCompanies.findIndex(company => company.companyId.toString() === companyId);
                    if (assignCompanyIndex !== -1) {
                        agency.users[userIndex].assignCompanies.splice(assignCompanyIndex, 1);
                        await agency.save();
                        return res.status(200).json({
                            message: 'Client removed successfully',
                            data: true
                        });
                    }
                }
            }
            
            
        } 
        else{
            company.users.splice(userIndex, 1);
            await company.save();
            return res.status(200).json({
                message: 'Client removed successfully',
                data: true
            });
        }
    } catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "client not removed"
        });
    }
};


// these are the client who have assoiated with you indirectly(not created by you but you have access to them)
const getAllClientAssociateWithYou = async (req, res) => {
    try {
        const { userId } = req.query;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(200).json({ data: false, message: 'Invalid userId' });
        }

        let companies = [];

        // Step 1: Find companies where the user is in the users array or the creator
        const userCompanies = await Company.find({
            $or: [
                { users: { $elemMatch: { userId: userId } } },
                { createdBy: userId }
            ]
        }).populate('contactPerson', 'userName'); // Populate contactPerson for direct companies

        // Filter out companies where the user is the contactPerson
        const filteredUserCompanies = userCompanies.filter(company => {
            return company.contactPerson && company.contactPerson._id.toString() !== userId;
        });

        // Add filtered userCompanies to results
        filteredUserCompanies.forEach(company => {
            companies.push({
                name: company.name,
                setBaseYear: company.setBaseYear,
                registrationNumber: company.registrationNumber,
                contactPerson: company.contactPerson ? company.contactPerson.userName : 'Unknown',
                id: company._id
            });
        });

        // Step 2: Check if user is part of an agency (directly), and try to add that agency's company
        const userAgency = await Agency.findOne({
            "users.userId": userId
        }).populate('registrationNumber'); // This might need adjustment if registrationNumber isn't a ref

        if (userAgency && userAgency.registrationNumber) {
            // find the company by registrationNumber
            const company = await Company.findOne({ registrationNumber: userAgency.registrationNumber });

            if (company) {
                // Check if the user is the contact person of this company
                const contactPersonUser = await User.findById(company.contactPerson);
                if (company.contactPerson.toString() !== userId) {
                    companies.push({
                        name: company.name,
                        setBaseYear: company.setBaseYear,
                        registrationNumber: company.registrationNumber,
                        contactPerson: contactPersonUser ? contactPersonUser.userName : 'Unknown',
                        id: company._id
                    });
                }
            }
        }

        // Step 3: Find agencies where the user is in the users array and look at assigned companies
        const userAgencies = await Agency.find({
            "users.userId": userId
        }).populate({
            path: 'users.assignCompanies.companyId',
            populate: { path: 'contactPerson', select: 'userName' }
        });

        // Process user agencies' assigned companies
        for (const agency of userAgencies) {
            // Find the specific user in the agency's users array
            const agencyUser = agency.users.find(user => user.userId.toString() === userId);
            if (agencyUser && agencyUser.assignCompanies && agencyUser.assignCompanies.length > 0) {
                // If the user has assigned companies, filter out those where the user is contact person
                for (const assignedCompanyObj of agencyUser.assignCompanies) {
                    const assignedCompany = assignedCompanyObj.companyId;
                    if (!assignedCompany) continue; // In case of missing company

                    // assignedCompany.contactPerson might be a populated doc or null
                    if (assignedCompany.contactPerson && assignedCompany.contactPerson._id.toString() !== userId) {
                        companies.push({
                            name: assignedCompany.name,
                            setBaseYear: assignedCompany.setBaseYear,
                            registrationNumber: assignedCompany.registrationNumber,
                            contactPerson: assignedCompany.contactPerson ? assignedCompany.contactPerson.userName : 'Unknown',
                            id: assignedCompany._id
                        });
                    }
                }
            }
        }

        // Remove duplicates (if any) by checking unique `id`
        const uniqueCompanies = companies.reduce((acc, current) => {
            if (!acc.find(company => company.id.toString() === current.id.toString())) {
                acc.push(current);
            }
            return acc;
        }, []);

        return res.status(200).json({
            message: 'Associated companies fetched successfully',
            data: uniqueCompanies,
        });
    } catch (error) {
        console.error('Error fetching associated companies:', error);
        return res.status(200).json({
            data: false,
            error: error.message,
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    createCompany,
    getCompanies,
    getCompanyData,
    getCompanyUsers,
    getAllClientAssociateWithYou,
    removeClient
};