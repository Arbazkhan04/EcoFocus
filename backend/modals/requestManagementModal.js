const moongese = require('mongoose');

const requestSchema = new mongoose.Schema({
    type: { type: String, enum: ['user_to_company', 'user_to_agency', 'company_to_agency'], required: true },
    from: { type: mongoose.Schema.Types.ObjectId, required: true },
    to: { type: mongoose.Schema.Types.ObjectId, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Request', requestSchema);
  