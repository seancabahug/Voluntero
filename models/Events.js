const Mongoose = require('mongoose');

// mm/dd/yyyy
// `${mm},${dd},${yyyy}`
var eventSchema = new Mongoose.Schema({
    /**
     *     startingDate: {
            type: Date,
            required: true
        },
        endingDate: {
            type: Date,
            required: true
        },
     */
    name: {
        type: String,
        required: true
    },
    owner: {
        type: String,
        required: true
    },
    managers: [{ // Should be an array of user IDs
        type: String,
        required: true
    }],
    description: {
        type: String,
        required: true
    },
    location: [{ // ['city', 'state', 'country']
        type: String,
        required: true
    }],
    participants: [{ // Should be an array of user IDs
        type: String,
        required: true
    }]
})

module.exports = new Mongoose.model('Events', eventSchema);