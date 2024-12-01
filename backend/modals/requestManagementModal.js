  
const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    type: { 
      type: String, 
      enum: ['user_to_company', 'company_to_user', 'user_to_agency', 'company_to_agency'], 
      required: true 
    },
    role: { type: String, enum: ['user', 'company_admin', 'agency_admin'], default: 'user' },
    from: { type: mongoose.Schema.Types.ObjectId, required: true }, // User or Company ID
    to: { type: mongoose.Schema.Types.ObjectId, required: true },   // User or Company ID
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
  });
  
  module.exports = mongoose.model('Request', requestSchema);
  