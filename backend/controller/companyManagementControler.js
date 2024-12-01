const Company = require('../modals/companyManagementModal');
const User = require('../modals/userManagementModal');


const createCompany = async (req, res) => {
    try {
        const { name, registrationNumber, userId } = req.body;

        const user = await User.findById(userId);
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        const company = new Company({
            name,
            registrationNumber,
            createdBy: user._id,
            contactPerson: user._id,
            admins: [user._id]
        });
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