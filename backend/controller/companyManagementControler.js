const Company = require('../modals/companyManagementModal');
const User = require('../modals/userManagementModal');
const Request = require('../modals/requestManagementModal');
const mongoose = require('mongoose');


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


const companyRequestToUser = async (req, res) => {
    try {
        const { companyId, userEmail, userPhone, role } = req.body;
        // check if the company exists
        const company = await Company.findById(companyId);
        if (!company) return res.status(200).json({
            message: 'Company not found',
            data: false
        });

        // check if the user exists
        const user = await User.findOne({ $or: [{ email: userEmail }, { phone: userPhone }] });
        if(!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        //check if the user is already requested and pending and accepted
        const userAlreadyInTheRequest = await Request.findOne({ from: company._id, to: user._id, status: { $in: ['pending', 'accepted'] } });
        if(userAlreadyInTheRequest) return res.status(200).json({
            message: 'Request already sent to the user',
            data: false
        });
        

        // check if the user is already in the company
        const userInCompany = company.users.find(user => user.userId === user._id);
        if(userInCompany) return res.status(200).json({
            message: 'User already in the company',
            data: false
        });

        // send request to the user 
        const request = new Request({
            type: 'company_to_user',
            from: company._id,
            to: user._id,
            role,
            status: 'pending'
        });

        await request.save();


        res.status(200).json({
            message: 'Request sent to the user successfully',
            data: true
        });



    } catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "Request not sent"
        });
    }
}


const userRequestToCompany = async (req, res) => {
    try {
        const { userId, registrationNumber, name } = req.body;
        // check if the company exists
        const company = await Company.findOne({ registrationNumber });
        if (!company) return res.status(200).json({
            message: 'Company not found',
            data: false
        });

        // check if the user exists
        const user = await User.findById(userId);
        if(!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        // check if the user is already in the company
        const userInCompany = company.users.find(user => user.userId === user._id);
        if(userInCompany) return res.status(200).json({
            message: 'You are already in the company',
            data: false
        });


        // check if the user is already requested and pending or accepted
        const userAlreadyInTheRequest = await Request.findOne({ from: user._id, to: company._id, status: { $in: ['pending', 'accepted'] } });
        if(userAlreadyInTheRequest) return res.status(200).json({
            message: 'Request already sent to the company',
            data: false
        });

        // send request to the company
        const request = new Request({
            type: 'user_to_company',
            from: user._id,
            to: company._id,
            status: 'pending'
        });

        await request.save();

        res.status(200).json({
            message: 'Request sent to the company successfully',
            data: true
        });
    }catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "Request not sent"
        });
    }
}

const acceptRequestOrDeclineRequest = async (req, res) => {
    try {
        const { requestId, status } = req.body;

        // Find the request
        const request = await Request.findById(requestId);
        if (!request) {
            return res.status(200).json({ message: 'Request not found', data: false });
        }

        // Update request status
        request.status = status;
        await request.save();

        if (status === 'accepted') {
            if (request.type === 'company_to_user') {
                // Add user to the company
                const company = await Company.findById(request.from);
                const user = await User.findById(request.to);

                if (!company.users.includes(user._id)) {
                    company.users.push(user._id);
                }

                if (request.role === 'company_admin' && !company.admins.includes(user._id)) {
                    company.admins.push(user._id);
                }

                await company.save();
            }

            if (request.type === 'user_to_company') {
                // Add user to the company
                const company = await Company.findById(request.to);
                const user = await User.findById(request.from);

                if (!company.users.includes(user._id)) {
                    company.users.push(user._id);
                }

                await company.save();
            }
        }

        res.status(200).json({
            message: 'Request updated successfully',
            data: true
        });
    } catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "Request not updated"
        });
    }
};


module.exports = {
    createCompany,
    companyRequestToUser,
    userRequestToCompany,
    acceptRequestOrDeclineRequest
};