const Company = require('../modals/companyManagementModal');
const User = require('../modals/userManagementModal');


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

const getCompanies = async (req, res) => {
   try {
    const { userId } = req.query;
    console.log(userId);
    const user = await User.findById(userId);

    if(!user) return res.status(200).json({
        message: 'User not found',
        data: false
    });

    const companies = await Company.find({ createdBy: userId });
    
    // only return client name and and year.
    const companyData = companies.map(company => {
        return {
            name: company.name,
            setBaseYear: company.setBaseYear
        }
    });
    res.status(200).json({
        message: 'Companies fetched successfully',
        data: companyData,
    });
   }catch(err){
    res.status(200).json({
        error: err.message,
        data: false,
        message: "companies not fetched"

    });
   }
}


const getCompanyData = async (req, res) => {
    try {
        const { userId, clientName, baseYear } = req.query;
        const user = await User.findById(userId);
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        const company = await Company.findOne({ createdBy: userId, name: clientName });
        if (!company) return res.status(200).json({
            message: 'Company not found',
            data: false
        });

        // check the user is admin or not
        const isAdmin = company.users.some(user => user.userId.toString() === userId && user.role === 'admin');

        // destructuring the company object
        const newCompany = {
            _id: company._id,
            name: company.name,
            registrationNumber: company.registrationNumber,
            setBaseYear: company.setBaseYear,
            contactEmail: company.contactEmail,
            address: company.address,
            postalCode: company.postalCode,
            postalName: company.postalName,
            contactPerson: company.contactPerson === userId, // if contact Person is same as user then this is supper admin
            isCompanyAdmin: isAdmin, // if user is in admin list then this is admin
            user: isAdmin, // if user is in user list then this is user
            isAgency: company.isAgency,
            agencyId: company.agencyId,
        };


        res.status(200).json({
            message: 'Company data fetched successfully',
            data: newCompany,
        });

    }
    catch (err) {
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

        // Filter out users who have removeAcess set to true
        const users = company.users
            .filter(user => !user.removeAcess)
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