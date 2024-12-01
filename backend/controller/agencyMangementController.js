const Company = require('../modals/companyManagementModal');
const Agency = require('../modals/agencyManagementModal');

const promoteToAgency = async (req, res) => {
    try {
        const { companyId } = req.body;
    
        const company = await Company.findById(companyId);
        if (!company) return res.status(200).json({ 
            message: 'Company not found',
            data:false
         });
    
        if (company.isAgency) return res.status(200).json({ 
            message: 'Company is already an agency',
            data: false
         });

        const agency = new Agency({
          name: company.name,
          registrationNumber: company.registrationNumber,
          contactPerson: company.contactPerson
        });
        await agency.save();
    
        company.isAgency = true;
        company.agencyId = agency._id;
        await company.save();
    
        res.status(200).json({ 
            message: 'Company promoted to agency successfully',
            data: true
            });
      } catch (err) {
        res.status(200).json({ 
            error: err.message,
            data: false,
            message: "Company not promoted to agency"
         });
      }
}




// const addClientIntotheCompany = async (req, res) => {
//     try {
//         const { agencyId, name, registrationNumber, contactPersonId } = req.body;

//         // Validate the agency
//         const agency = await Agency.findById(agencyId);
//         if (!agency) {
//             return res.status(200).json({ message: 'Agency not found', data: false });
//         }

//         // Validate the contact person
//         const contactPerson = await User.findById(contactPersonId);
//         if (!contactPerson) {
//             return res.status(200).json({ message: 'Contact person not found', data: false });
//         }

//         // Create the new client (company)
//         const newCompany = new Company({
//             name,
//             registrationNumber,
//             createdBy: contactPerson._id,
//             contactPerson: contactPerson._id,
//             admins: [contactPerson._id],
//             // agencyId: agency._id // Link the company to the agency
//         });

//         await newCompany.save();

//         // Add the new company to the agency's companies list
//         agency.companies.push(newCompany._id);
//         await agency.save();

//         res.status(200).json({
//             message: 'Client created successfully under the agency',
//             data: {
//                 companyId: newCompany._id,
//                 companyName: newCompany.name,
//                 registrationNumber: newCompany.registrationNumber
//             }
//         });
//     } catch (error) {
//         res.status(200).json({
//             message: 'Failed to create client',
//             error: error.message,
//             data: false
//         });
//     }
// };




module.exports = {
    promoteToAgency,
}