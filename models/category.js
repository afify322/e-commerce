const mongoose = require('mongoose');

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        unique:[true,'Category name is already exists'],
        required: [true,'Category name is required'],
    },
    icon: {
        type: String,
        required: [true,'Category icon name is required']
    },
    color: { 
        type: String,
        required: [true,'Category Color name is required']
    }
})


categorySchema.virtual('id').get(function () {
    return this._id.toHexString();
});

categorySchema.set('toJSON', {
    virtuals: true,
});

exports.Category = mongoose.model('Category', categorySchema);
