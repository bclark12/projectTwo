const mongoose = require('./connection.js');

const SchoolSchema = mongoose.Schema(
    {   name: String,
        students: Number,
        mascot: String,
        teams: Number,
        stateId: String,
    }
);

const SchoolCollection = mongoose.model('School', SchoolSchema);

const getSchools = () => {
    return SchoolCollection.find()
}

const getSchool = (id) => {
    return SchoolCollection.findById(id)
}
///////
const getSchoolsByState = (state) => {
    return SchoolCollection.find({state: state})
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
    return SchoolCollection.deleteMany({ name: '' })
}

module.exports = {
    getSchools,
    getSchool,
    getSchoolsByState,
    addSchool,
    updateSchool,
    deleteSchool,
    deleteNoNameSchools
}