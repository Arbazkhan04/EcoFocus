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



module.exports = {
    promoteToAgency,
}