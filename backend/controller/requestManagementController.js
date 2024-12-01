const Request = require('../modals/requestManagementModal');
const Agency = require('../modals/agencyManagementModal');
const Company = require('../modals/companyManagementModal');
const User = require('../modals/userManagementModal');

// user request to agency for connection
const userRequestToAgency = async (req, res) => {
    try {
        const { userId, registrationNumber, name } = req.body;

        // Find the agency
        const agency = await Agency.findOne({ registrationNumber });
        if (!agency) {
            return res.status(200).json({ message: 'Agency not found', data: false });
        }

        // Find the user
        const user = await User.findById(userId);
        if (!user) {
            return res.status(200).json({ message: 'User not found', data: false });
        }

        // Check if the user is already in the agency
        const userInAgency = agency.users.find(user => user.userId === user._id);
        if (userInAgency) {
            return res.status(200).json({ message: 'User already in the agency', data: false });
        }

        // Check if the request already exists
        const request = await Request.findOne({
            from: userId,
            to: agency._id,
            type: 'user_to_agency',
            status: 'pending'
        });
        if (request) {
            return res.status(200).json({ message: 'Request already sent to this agency', data: false });
        }

        const newRequest = new Request({
            from: userId,
            to: agency._id,
            type: 'user_to_agency',
            status: 'pending'
        });

        await newRequest.save();
        res.status(200).json({ message: 'Request sent successfully', data: true });
    } catch (error) {
        res.status(200).json({ error: error.message, message: 'Failed to send request', data: false });
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
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        //check if the user is already requested and pending and accepted
        const userAlreadyInTheRequest = await Request.findOne({ from: company._id, to: user._id, status: { $in: ['pending', 'accepted'] } });
        if (userAlreadyInTheRequest) return res.status(200).json({
            message: 'Request already sent to the user',
            data: false
        });


        // check if the user is already in the company
        const userInCompany = company.users.find(user => user.userId === user._id);
        if (userInCompany) return res.status(200).json({
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
        if (!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        // check if the user is already in the company
        const userInCompany = company.users.find(user => user.userId === user._id);
        if (userInCompany) return res.status(200).json({
            message: 'You are already in the company',
            data: false
        });


        // check if the user is already requested and pending or accepted
        const userAlreadyInTheRequest = await Request.findOne({ from: user._id, to: company._id, status: { $in: ['pending', 'accepted'] } });
        if (userAlreadyInTheRequest) return res.status(200).json({
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
    } catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "Request not sent"
        });
    }
}

const companyRequestConnectionWithAgency = async (req, res) => {
    try {
        const { registrationNumber, name, companyId } = req.body;
        //find the company deos it exist
        const company = await company.findById(companyId);
        if (!company) return res.status(200).json({ 
            message: 'Company not found',
            data: false
        });

        //find the agency
        const agency = await Agency.findOne({ registrationNumber, name });
        if (!agency) return res.status(200).json({ 
            message: 'Agency not found',
            data: false
        });

        // check this request does not exist in the request collection and status is not pending
        const request = await Request.findOne({
            from: companyId,
            // to: agency._id,
            type: 'company_to_agency',
            status: 'pending'
        });

        if (request) return res.status(200).json({
            message: 'Request already sent',
            data: false
        });

        const newRequest = new Request({
            from: companyId,
            to: agency._id,
            type: 'company_to_agency',
            status: 'pending'
        });

        await newRequest.save();
        res.status(200).json({
            message: 'Request sent successfully',
            data: true
        });
        
    } catch (error) {
        res.status(200).json({
            message: 'Failed to send request',
            error: error.message,
            data: false
        });
    }
}

// send request to user to join the agancy
const agencyRequestConnectionWithUser = async (req, res) => {
    try {
        const { phone, email, agencyId, isAdmin } = req.body;
        // find the agency
        const agency = await Agency.findById(agencyId);
        if(!agency) return res.status(200).json({
            message: 'Agency not found',
            data: false
        });

        // find the user
        const user = await User.findOne({ phone, email });
        if(!user) return res.status(200).json({
            message: 'User not found',
            data: false
        });

        // check if the user is already in the agency
        const userInAgency = agency.users.find(user => user.userId === user._id);
        if(userInAgency) return res.status(200).json({
            message: 'User already in the agency',
            data: false
        });

        // check if the request already exists
        const request = await Request.findOne({
            from: agencyId,
            to: user._id,
            type: 'agency_to_user',
            status: 'pending'
        });

        if(request) return res.status(200).json({
            message: 'Request already sent to this user',
            data: false
        });

        const newRequest = new Request({
            from: agencyId,
            to: user._id,
            type: 'agency_to_user',
            status: 'pending',
            role: isAdmin ? 'admin' : 'user'
        });

        await newRequest.save();

        res.status(200).json({
            message: 'Request sent successfully',
            data: true
        });

    } catch (error) {
        res.status(200).json({
            message: 'Failed to send request',
            error: error.message,
            data: false
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

            if (request.type === 'company_to_agency') {
                // Add company to the agency
                const company = await Company.findById(request.from);
                const agency = await Agency.findById(request.to);
                
                // if the company is not already is promoted To agency
                if (company.isAgency) {
                    return res.status(200).json({
                        message: 'company is already an agency',
                        data: false
                    });
                }

                if (!agency.companies.includes(company._id)) {
                    agency.companies.push(company._id);
                }

                await agency.save();
            }

            if (request.type === 'agency_to_user') {
                // Add user to the agency
                const agency = await Agency.findById(request.from);
                const user = await User.findById(request.to);

                const userInAgency = agency.users.find(user => user.userId === user._id);
                if (userInAgency) {
                    return res.status(200).json({
                        message: 'User already in the agency',
                        data: false
                    });
                }

                agency.users.push({
                    userId: user._id,
                    role: request.role,
                    assignCompanyId: request.from
                });

                await agency.save();

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



// Return the requests for the user invited by the company with a pending status
const getAllRequestForUserByCompany = async (req, res) => {
    try {
        const { userId } = req.body;

        // Find all pending requests where a company invited the user
        const requests = await Request.find({
            to: userId,
            type: 'company_to_user',
            status: 'pending'
        })
        .populate({
            path: 'from', // Populate the 'from' field
            model: 'Company', // Reference the Company model
            select: 'name registrationNumber' // Fetch only name and registrationNumber
        })
        .select('_id from'); // Select only necessary fields

        // Map the result to include company details
        const data = requests.map(request => ({
            companyId: request.from._id.toString(),
            companyName: request.from.name,
            registrationNumber: request.from.registrationNumber,
            requestId: request._id.toString()
        }));

        res.status(200).json({
            message: 'Pending requests fetched successfully',
            data
        });
    } catch (error) {
        res.status(500).json({
            error: error.message,
            data: false,
            message: "Requests not fetched"
        });
    }
};


// return the requests for the company invited by the user
const getAllRequestForCompanyByUser = async (req, res) => {
    try {
        const { companyId } = req.body;
        const requests = await Request.find({
             to: companyId,
             type: 'user_to_company',
             status: 'pending'
             })
             .populate({
                path: 'from',
                model: 'User',
                select: 'userName email phone',
             })
             .select('_id from');


        const data = requests.map(request => ({
            userId: request.from._id.toString(),
            name: request.from.name,
            email: request.from.email,
            phone: request.from.phone,
            requestId: request._id.toString()
        }));

        res.status(200).json({
            message: 'Requests fetched successfully',
            data: data
        });
    } catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "Requests not fetched"
        });
    }
}


const getAllRequestForAgencyByCompany = async (req, res) => {
    try {
        const { agencyId } = req.body;
        const requests = await Request.find({
            to: agencyId,
            type: 'company_to_agency',
            status: 'pending'
        })
        .populate({   
             path: 'from',
             model: 'Company',
             select: 'name registrationNumber'
        })
        .select('_id from');

        const data = requests.map(request => ({
            companyId: request.from._id.toString(),
            companyName: request.from.name,
            registrationNumber: request.from.registrationNumber,
            requestId: request._id.toString()
        }));

        res.status(200).json({
            message: 'Requests fetched successfully',
            data: data
        });

    }
    catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "Requests not fetched"
        });
    }
}

module.exports = {
    getAllRequestForUserByCompany,
    getAllRequestForCompanyByUser,
    getAllRequestForAgencyByCompany,
    userRequestToAgency,
    companyRequestToUser,
    userRequestToCompany,
    companyRequestConnectionWithAgency,
    agencyRequestConnectionWithUser,
    acceptRequestOrDeclineRequest
}