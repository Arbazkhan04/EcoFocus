const Company = require('../modals/companyManagementModal');
const Agency = require('../modals/agencyManagementModal');
const User = require('../modals/userManagementModal');
const mongoose = require('mongoose');

const promoteToAgency = async (req, res) => {
  try {
    const { companyId } = req.body;

    const company = await Company.findById(companyId);
    if (!company) return res.status(200).json({
      message: 'Company not found',
      data: false
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
      agencyId: agency._id,
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

const getAgencyName = async (req, res) => {
  try {
    const { registrationNumber, agencyName } = req.body;
    console.log(registrationNumber);
    const agency = await Agency.findOne({ registrationNumber });
    if (!agency) return res.status(200).json({
      message: 'Agency not found',
      data: false
    });

    res.status(200).json({
      message: 'Agency name fetched successfully',
      name: agency.name,
      data: true
    });
  } catch (err) {
    res.status(200).json({
      error: err.message,
      data: false,
      message: "Agency name not fetched"
    });
  }
}


const getAllClientAssociatedWithAgency = async (req, res) => {
  try {
    const { agencyId } = req.query;

    const agency = await Agency.findById(agencyId);
    if (!agency) return res.status(200).json({
      message: 'Agency not found',
      data: false
    });

    let companies = [];
    for (let i = 0; i < agency.companies.length; i++) {
      const company = await Company.findById(agency.companies[i]);
      const contactPerson = await User.findById(company.contactPerson);

      const companyData = {
        name: company.name,
        registrationNumber: company.registrationNumber,
        contactPerson: contactPerson.userName,
        companyId: company._id
      }
      companies.push(companyData);
    }

    res.status(200).json({
      message: 'Client fetched successfully',
      data: companies
    });

  } catch (err) {
    res.status(200).json({
      error: err.message,
      data: false,
      message: "Client not fetched"
    });
  }
}

const getAllUser = async (req, res) => {
  try {
    const { agencyId, companyId } = req.query;

    const agency = await Agency.findById(agencyId)
      .populate('users.userId', 'userName email phone _id');

    if (!agency) {
      return res.status(200).json({
        message: 'Agency not found',
        data: false,
      });
    }

    const updateUsers = agency.users.map((agencyUser) => {
      const user = agencyUser.userId;

      // Find the specific assignment for the given companyId
      const assignedCompany = agencyUser.assignCompanies?.find(
        entry => entry.companyId.toString() === companyId.toString()
      );

      // Determine the role based on the assignedCompany
      const role = assignedCompany ? assignedCompany.assignedRole : "Not Assigned";

      return {
        userName: user.userName,
        email: user.email,
        phone: user.phone,
        id: user._id,
        role,
      };
    });

    res.status(200).json({
      message: 'User fetched successfully',
      data: updateUsers,
    });
  } catch (err) {
    console.error(err.message);
    res.status(200).json({
      error: err.message,
      data: false,
      message: "User not fetched",
    });
  }
};

const getAllUsersWhoAreOnlyAssociatedWithAgency = async (req, res) => {
  try {
    const { agencyId } = req.query;

    const agency = await Agency.findById(agencyId)
      .populate('users.userId', 'userName email phone _id');

    if (!agency) {
      return res.status(200).json({
        message: 'Agency not found',
        data: false,
      });
    }
    let users = [];
    const updateUsers = agency.users.map((agencyUser) => {
       const user = {
        userName: agencyUser.userId.userName,
        email: agencyUser.userId.email,
        phone: agencyUser.userId.phone,
        id: agencyUser.userId._id,
        role: agencyUser.role
        }
        users.push(user);
      });

    res.status(200).json({
      message: 'User fetched successfully',
      data: users,
    });
    } catch (err) {
    console.error(err.message);
    res.status(200).json({
      error: err.message,
      data: false,
      message: "User not fetched",
    });
  }
}

const makeUserOrAdminOfTheCompanyUndetAgency = async (req, res) => {
  try {
    const { agencyId, companyId, userId, role } = req.body;

    const agency = await Agency.findById(agencyId);
    if (!agency) {
      return res.status(200).json({
        message: 'Agency not found',
        data: false,
      });
    }

    const company = agency.companies.find((c) => c.toString() === companyId);
    if (!company) {
      return res.status(200).json({
        message: 'Company is not associated with the agency',
        data: false,
      });
    }

    const user = agency.users.find((u) => u.userId.toString() === userId);
    if (!user) {
      return res.status(200).json({
        message: 'User not found',
        data: false,
      });
    }

    // Find the company document
    const foundCompany = await Company.findById(companyId);
    if (!foundCompany) {
      return res.status(200).json({
        message: 'Company not found in database',
        data: false,
      });
    }

    // Check if the user is already in the company
    const isUserInCompany = foundCompany.users.some(
      (entry) => entry.userId.toString() === userId
    );
    if (isUserInCompany) {
      return res.status(200).json({
        message: 'User is already in the company. You cannot assign this user to the company again.',
        data: false,
      });
    }

    // Check if the user is already assigned to the company within the agency
    const isAssigned = agency.users.some(
      (entry) =>
        entry.userId.toString() === userId &&
        entry.assignCompanies.some(
          (companyEntry) => companyEntry.companyId.toString() === companyId
        )
    );

    const userIndex = agency.users.findIndex(
      (entry) => entry.userId.toString() === userId
    );

    if (isAssigned) {
      // Update the assigned role for the existing company assignment
      const companyAssignment = agency.users[userIndex].assignCompanies.find(
        (companyEntry) => companyEntry.companyId.toString() === companyId
      );
      companyAssignment.assignedRole = role; // Update the role
    } else {
      // Add a new assignment
      agency.users[userIndex].assignCompanies.push({
        companyId: companyId,
        assignedRole: role,
      });
    }

    await agency.save();

    res.status(200).json({
      message: 'User assigned to the company successfully',
      data: true,
    });
  } catch (error) {
    console.log(error.message);
    res.status(200).json({
      error: error.message,
      data: false,
      message: 'User not assigned to the company',
    });
  }
};


const removeAccessOfUsers = async (req, res) => {
  try {
    const { agencyId, companyId, userId } = req.body;

    const agency = await Agency.findById(agencyId);
    if (!agency) return res.status(200).json({
      message: 'Agency not found',
      data: false
    });

    const company = agency.companies.find(
      (company) => company.toString() === companyId
    );

    if (!company) return res.status(200).json({
      message: 'Company not found',
      data: false
    });

    const user = agency.users.find(
      (user) => user.userId.toString() === userId
    );

    if (!user) return res.status(200).json({
      message: 'User not found',
      data: false
    });


    // check user has access to the company
    const isAssigned = agency.users.some(
      (entry) => entry.userId.toString() === userId && entry.assignCompanies.some(
        (company) => company.companyId.toString() === companyId
      )
    );

    if (!isAssigned) return res.status(200).json({
      message: 'User not assigned to the company',
      data: false
    });

    // delete the assignCompay from the user assicompnay array
    const userIndex = agency.users.findIndex(
      (entry) => entry.userId.toString() === userId
    );

    const assignCompanyIndex = agency.users[userIndex].assignCompanies.findIndex(
      (entry) => entry.companyId.toString() === companyId
    );

    agency.users[userIndex].assignCompanies.splice(assignCompanyIndex, 1);

    await agency.save();

    res.status(200).json({
      message: 'User access removed successfully',
      data: true
    });
  } catch (error) {
    res.status(200).json({
      error: error.message,
      data: false,
      message: "User access not removed"
    });
  }
}


const removeUserFromAgency = async (req,res) => {
  try {
    const { agencyId, userId } = req.body;

    const agency = await Agency.findById(agencyId);

    if(!agency) {
      return res.status(200).json({
        message: 'Agency not found',
        data: false
      });
    }

    const user = agency.users.find(
      (user) => user.userId.toString() === userId
    );

    if(!user) {
      return res.status(200).json({
        message: 'User not found',
        data: false
      });
    }

    const userIndex = agency.users.findIndex(
      (entry) => entry.userId.toString() === userId
    );

    // remove this idex
    agency.users.splice(userIndex, 1);

    await agency.save();

    res.status(200).json({
      message: 'User removed from the agency successfully',
      data: true
    });

  } catch (error) {
    res.status(200).json({
      error: error.message,
      data: false,
      message: "User not removed from the agency"
    });
  }
}



module.exports = {
  promoteToAgency,
  getAgencyName,
  getAllClientAssociatedWithAgency,
  getAllUser,
  makeUserOrAdminOfTheCompanyUndetAgency,
  removeAccessOfUsers,
  getAllUsersWhoAreOnlyAssociatedWithAgency,
  removeUserFromAgency
}