const mongoose = require('mongoose');

const UserScheme = new mongoose.Schema({
    Rfrnc:        { type: Number },
    Usrnm:        { type: String },
    Psswrd:       { type: String },
    Rfrnc_Prsn:   { type: Number },
    UsrTyp_Rfrnc: { type: Number },
    Cndtn:        { type: Number },
    Rmvd:         { type: Number },
    Lckd:         { type: Number },
    DtAdmssn:     { type: String },
    ChckTm:       { type: String }
}, {
    timestamps: true,
    versionKey: false
});

module.exports = mongoose.model('0_Usrs', UserScheme);