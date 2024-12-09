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
        const userInCompany = company.users.find(user => user.userId == user._id);
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
        const company = await Company.findById(companyId);
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
            role: isAdmin ? 'agency_admin' : 'user'
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

        if (request.status !== 'pending') {
            return res.status(200).json({
                message: 'Request already accepted or declined',
                data: false
            });
        }

        // Update request status
        request.status = status;
        await request.save();

        if (status === 'accepted') {
            //give priority to agency
            if (request.type === 'agency_to_user') {
                
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
            else if (request.type === 'company_to_user') {
                // Add user to the company
                const company = await Company.findById(request.from);
                const user = await User.findById(request.to);

                // if (!company.users.includes(user._id)) {
                //     company.users.push({ userId: user._id, role: request.role });
                // }

                // if (request.role === 'company_admin' && !company.admins.includes(user._id)) {
                //     company.admins.push(user._id);
                // }

                if(!company.users.includes(user._id)) {
                    company.users.push({ userId: user._id, role: request.role === 'company_admin' ? 'admin' : 'user' });
                }

                await company.save();
            }

            else if (request.type === 'user_to_company') {
                // Add user to the company
                const company = await Company.findById(request.to);
                const user = await User.findById(request.from);

                if (!company.users.includes(user._id)) {
                    company.users.push({ userId: user._id, role: 'user' });
                }

                await company.save();
            }

            else if (request.type === 'company_to_agency') {
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
            //user to agency
            else if (request.type === 'user_to_agency') {
                const agency = await Agency.findById(request.to);
                const user = await User.findById(request.from);

                const userInAgency = agency.users.find(user => user.userId === user._id);
                if (userInAgency) {
                    return res.status(200).json({
                        message: 'User already in the agency',
                        data: false
                    });
                }

                agency.users.push({
                    userId: user._id,
                    role: 'user',
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



const getAllRequestForUserByCompanyOrAgency = async (req, res) => {
    try {
        const { userId } = req.query;

        // Fetch all pending requests for the user
        let requests = await Request.find({
            to: userId,
            type: { $in: ['company_to_user', 'agency_to_user'] }, // Match company or agency
            status: 'pending'
        })
        .lean(); // Convert mongoose documents to plain objects for easier manipulation

        // Separate requests by type
        const companyRequests = requests.filter(req => req.type === 'company_to_user');
        const agencyRequests = requests.filter(req => req.type === 'agency_to_user');

        // Fetch company details and filter out companies that are agencies
        const companyIds = companyRequests.map(req => req.from);
        const companies = await Company.find({
            _id: { $in: companyIds },
            isAgency: false // Exclude companies that are now agencies
        }).select('_id name registrationNumber').lean();

        const validCompanyRequests = companyRequests.filter(req =>
            companies.some(company => company._id.toString() === req.from.toString())
        );

        // Fetch agency details
        const agencyIds = agencyRequests.map(req => req.from);
        const agencies = await Agency.find({
            _id: { $in: agencyIds }
        }).select('_id name registrationNumber').lean();

        // Prepare response data
        const data = [
            ...validCompanyRequests.map(req => {
                const company = companies.find(c => c._id.toString() === req.from.toString());
                return {
                    type: 'company',
                    Id: company._id.toString(),
                    role: req.role,
                    name: company.name,
                    requestId: req._id.toString()
                };
            }),
            ...agencyRequests.map(req => {
                const agency = agencies.find(a => a._id.toString() === req.from.toString());
                return {
                    type: 'agency',
                    id: agency._id.toString(),
                    role: req.role,
                    name: agency.name,
                    requestId: req._id.toString()
                };
            })
        ];

        res.status(200).json({
            message: 'Pending requests fetched successfully',
            data
        });
    } catch (error) {
        res.status(200).json({
            error: error.message,
            data: false,
            message: "Requests not fetched"
        });
    }
};


// return the requests for the company invited by the user
const getAllRequestForCompanyByUser = async (req, res) => {
    try {
        const { companyId } = req.query;
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
            userName: request.from.userName,
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


const getAllRequestForAgencyByCompanyOrUser = async (req, res) => {
    try {
        const { agencyId } = req.query;
        const requests = await Request.find({
            to: agencyId,
            type: { $in: ['user_to_agency', 'company_to_agency'] }, // Match company or agency
            status: 'pending'
        })
        .lean();

        // Separate requests by type
        const userRequests = requests.filter(req => req.type === 'user_to_agency');
        const companyRequests = requests.filter(req => req.type === 'company_to_agency');

        // Fetch user details
        const userIds = userRequests.map(req => req.from);
        const users = await User.find({
            _id: { $in: userIds }
        }).select('_id userName email phone').lean();

        // Fetch company details
        const companyIds = companyRequests.map(req => req.from);
        const companies = await Company.find({
            _id: { $in: companyIds }
        }).select('_id name registrationNumber').lean();

        // Prepare response data
        const data = [
            ...userRequests.map(req => {
                const user = users.find(u => u._id.toString() === req.from.toString());
                return {
                    type: 'user',
                    id: user._id.toString(),
                    name: user.userName,
                    // email: user.email,
                    // phone: user.phone,
                    requestId: req._id.toString()
                };
            }),
            ...companyRequests.map(req => {
                const company = companies.find(c => c._id.toString() === req.from.toString());
                return {
                    type: 'company',
                    id: company._id.toString(),
                    name: company.name,
                    // registrationNumber: company.registrationNumber,
                    requestId: req._id.toString()
                };
            })
        ];

        res.status(200).json({
            message: 'Pending requests fetched successfully',
            data
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
    getAllRequestForUserByCompanyOrAgency,
    getAllRequestForCompanyByUser,
    getAllRequestForAgencyByCompanyOrUser,
    userRequestToAgency,
    companyRequestToUser,
    userRequestToCompany,
    companyRequestConnectionWithAgency,
    agencyRequestConnectionWithUser,
    acceptRequestOrDeclineRequest
}