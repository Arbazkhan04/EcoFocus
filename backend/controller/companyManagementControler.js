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





module.exports = {
    createCompany,
    getCompanies,
    getCompanyData,
    getCompanyUsers
};