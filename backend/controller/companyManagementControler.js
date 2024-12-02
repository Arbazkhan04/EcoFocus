const Company = require('../modals/companyManagementModal');
const User = require('../modals/userManagementModal');


const createCompany = async (req, res) => {
    try {
        const { name, source, apiKey, registrationNumber, username, password, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        // Validate the source type
        const validSources = ['Tripletex', 'PowerOfficeGo', '24SevenOffice', 'SAF-T'];
        if (!validSources.includes(source)) {
            return res.status(200).json({ message: 'Invalid import source', data: false });
        }

        // Validate required fields based on source
        if ((source === 'Tripletex' || source === 'PowerOfficeGo') && !apiKey) {
            return res.status(200).json({ message: 'API key is required', data: false });
        }
        if (source === '24SevenOffice' && (!username || !password)) {
            return res.status(200).json({ message: 'Username and password are required', data: false });
        }

        const company = new Company({
            name,
            registrationNumber,
            createdBy: user._id,
            contactPerson: user._id,
            admins: [user._id]
        });

        company.importSource = {
            source,
            apiKey: source === 'Tripletex' || source === 'PowerOfficeGo' ? apiKey : null,
            username: source === '24SevenOffice' ? username : null,
            password: source === '24SevenOffice' ? password : null
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





module.exports = {
    createCompany,
};