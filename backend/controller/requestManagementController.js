const Request = require('../modals/requestManagementModal');

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


module.exports = {
    getAllRequestForUserByCompany,
    getAllRequestForCompanyByUser
}