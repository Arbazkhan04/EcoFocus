  const mongoose
  = require('mongoose');

  const companySchema = new mongoose.Schema({
      name: { type: String, required: true },
      registrationNumber: { type: String, required: true, unique: true },
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      isAgency: { type: Boolean, default: false },
      agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    
    module.exports = mongoose.model('Company', companySchema);
    