const mongoose = require('./connection.js')

const TeamSchema = mongoose.Schema(
    {
        sport: String,
        players: Number,
        nationalRank: Number,
        coach: String,
        schoolId: String
    }
);
 
const TeamCollection = mongoose.model('Team', TeamSchema);

const getTeams = ()=> {
    return TeamCollection.find()
}
const getTeam = (id) => {
    return TeamCollection.findById(id)
}
const addTeam = (newTeam) => { 
    return TeamCollection.insertMany([ newTeam ])
}
const updateTeam = (teamId, team) => {
    return TeamCollection.updateOne({_id: teamId}, team)
}
const deleteTeam = (id) => {
    return TeamCollection.findByIdAndDelete(id)
}
const deleteNoNameTeams = () => {
    return TeamCollection.deleteMany({ sport: '' })
}

module.exports = {
    getTeams,
    getTeam,
    addTeam,
    updateTeam,
    deleteTeam,
    deleteNoNameTeams,
}
