const eventModel = require('../models/Events');
const bcrypt = require('bcrypt');

exports.create = (req, res, next) => {
    eventModel.findOne({name: req.body.name}, (err, event) => {
        if (err) console.log(err);
        console.log(event)
        if (event) {
            return res.status(403).send({
                error: 'event name taken'
            })
        } else {
            var eventObject = new eventModel({
                name: req.body.name,
                owner: req.userData.accountId,
                managers: req.body.managers,
                description: req.body.description,
                email: req.body.email,
                location: req.body.location
            });
            eventObject.save().then(eventObj => { 
                // Add event to database
                res.status(201).send({
                    message: "Event successfully created",
                    event: eventObj
                });
            }).catch(errrrrrr => {
                res.status(500).send({
                    error: errrrrrr
                });
            })
        }
    });
}

// /events/:eventId - viewing event
// /events/:eventId/register (authenticated)
// /events/:eventId/unregister (authenticated)
// DELETE /events/:eventId - delete event (authenticated)

exports.findEventById = (req, res, next) => {
    eventModel.findById(req.params.eventId, (err, found) => {
        if (err) console.log(err);
        if (event) {
            return res.status(200).send({
                message: 'Event found!',
                data: found
            })
        } else {
            return res.status(403).send({
                error: 'Event not found!'
            })
        }
    })
}