const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProfesionSchema = new Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
});

module.exports = ProfessionStatus = mongoose.model('professionalStatus', ProfesionSchema);
