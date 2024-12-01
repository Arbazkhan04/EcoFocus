const mongoose = require('mongoose');

const agencySchema = new mongoose.Schema({
    name: { type: String, required: true },
    registrationNumber: { type: String, required: true, unique: true },
    contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    companies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Company' }],
    users: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        role: { type: String, enum: ['admin', 'user'] },
        assignCompanyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' } // we can easily determine the company of the user
      }
    ],
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Agency', agencySchema);
  