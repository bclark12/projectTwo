const mongoose = require('./connection.js');

const SchoolSchema = mongoose.Schema(
    {
        name: String,
        students: Number,
        mascot: String,
        athleticsRank: Number,
    }
);

const SchoolCollection = mongoose.model('School', SchoolSchema);

const getSchools = () => {
    return SchoolCollection.find()
}

const getSchool = (id) => {
    return SchoolCollection.findById(id)
}

const addSchool = (newSchool) => {
    return SchoolCollection.insertMany( [newSchool] )
}

const updateSchool = (schoolId, school) => {
    return SchoolCollection.updateOne({_id: schoolId}, school)
}

const deleteSchool = (id) => {
    return SchoolCollection.findByIdAndDelete(id)
}

const deleteNoNameSchools = () => {
    return SchoolCollection.deleteMany({name: ''})
}

module.exports = {
    getSchools,
    getSchool,
    addSchool,
    updateSchool,
    deleteSchool,
    deleteNoNameSchools
}