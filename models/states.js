const mongoose = require('./connection.js')

const StateSchema = mongoose.Schema(
    {
        states: String,
        capital: String,
        population: Number,
        higherEducationRank: Number
    }
);

const StateCollection = mongoose.model('State', StateSchema);

const getStates = ()=> {
    return StateCollection.find()
}
const getState = (id) => {
    return StateCollection.findById(id)
}
const addState = (newState) => { 
    return StateCollection.insertMany([ newState ])
}
const updateState = (stateId, state) => {
    return StateCollection.updateOne({_id: stateId}, state)
}
const deleteState = (id) => {
    return StateCollection.findByIdAndDelete(id)
}
const deleteNoNameStates = () => {
    return StateCollection.deleteMany({ name: ''})
}

module.exports = {
    getStates,
    getState,
    addState,
    updateState,
    deleteState,
    deleteNoNameStates
}