  const mongoose
  = require('mongoose');

  const companySchema = new mongoose.Schema({
      name: { type: String, required: true },
      registrationNumber: { type: String, required: true, unique: true },
      address: { type: String, required: true },
      postalCode: { type: String, required: true },
      postalName: { type: String, required: true },
      contactEmail: { type: String, required: true },
      setBaseYear: [{ type: Number, required: true }],
      createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      contactPerson: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      admins: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
      isAgency: { type: Boolean, default: false },
      agencyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Agency' },
      importSource: {
        source: {
          type: String,
          enum: ['Tripletex(pågående aktiv)', 'PowerOffice Go', '24SevenOffice(pågående aktiv)', 'SAF-T-fil'],
          required: true,
        },
        apiKey: { type: String, default: null },
        username: { type: String, default: null },
        password: { type: String, default: null }
      },
      createdAt: { type: Date, default: Date.now },
      updatedAt: { type: Date, default: Date.now }
    });
    
    module.exports = mongoose.model('Company', companySchema);
    