const mongoose = require('mongoose');

const PreferenceSchema = new mongoose.Schema({
    dmTone: { type: String },
    dmRulesAdherence: { type: String },
    adventureType: { type: String },
});

const Preference = mongoose.model('Preference', PreferenceSchema);

module.exports = Preference;
