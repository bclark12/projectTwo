const mongoose = require('./connection.js');

const BillSchema = mongoose.Schema(
    {
        name: String,
        amount: Number,
        paid: Boolean,
    }
);

const BillCollection = mongoose.model('Bill', BillSchema);

const getBills = () => {
    return BillCollection.find()
}

module.exports = {
    getBills,
}