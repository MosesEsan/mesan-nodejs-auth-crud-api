const faker = require('faker'); //For testing purpose only
const moment = require('moment');

const User = require('../models/user');
const Event = require('../models/event');
const {uploader} = require('../utils/index');

const limit_ = 5;

// @route GET api/event
// @desc Returns all events with pagination
// @access Public
exports.index = async function (req, res) {
    let aggregate_options = [];

    //PAGINATION
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || limit_;

    //set the options for pagination
    const options = {
        page, limit,
        collation: {locale: 'en'},
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'events'
        }
    };

    //FILTERING AND PARTIAL TEXT SEARCH -- FIRST STAGE
    let match = {};
    if (req.query.q) match.name = {$regex: req.query.q, $options: 'i'}; //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
    if (req.query.date) match.start_date = {$eq: new Date(req.query.date)}; //filter by date
    aggregate_options.push({$match: match});


    //GROUPING -- SECOND STAGE
    if (req.query.group !== 'false' && parseInt(req.query.group) !== 0) {
        let group = {
            _id: {$dateToString: {format: "%Y-%m-%d", date: "$start_date"}}, // Group By Expression
            data: {
                $push: {
                    userId: '$userId',
                    name: '$name',
                    location: '$location',
                    address: '$address',
                    start_date: '$start_date',
                    end_date: '$end_date',
                    end_time: '$end_time',
                    description: '$description',
                    image: '$image',
                    _id: '$_id'
                }
            }
        };
        aggregate_options.push({$group: group});
    }

    //SORTING -- THIRD STAGE
    let sortOrder = req.query.sort_order && req.query.sort_order === 'desc' ? -1 : 1;
    aggregate_options.push({$sort: {"start_date": sortOrder}});

    //LOOKUP/JOIN -- FOURTH STAGE
    // aggregate_options.push({$lookup: {from: 'interested', localField: "_id", foreignField: "eventId", as: "interested"}});

    // Set up the aggregation
    const myAggregate = Event.aggregate(aggregate_options);
    const result = await Event.aggregatePaginate(myAggregate, options);
    res.status(200).json(result);
};


// @route POST api/event
// @desc Add a new event
// @access Public
exports.store = async (req, res) => {
    try {
        const userId = req.user._id;
        const newEvent = new Event({...req.body, userId});

        const event = await newEvent.save();

        //if there is no image, return success message
        if (!req.file) return res.status(200).json({event, message: 'Event added successfully'});

        //Attempt to upload to cloudinary
        const result = await uploader(req);
        const event_ = await Event.findByIdAndUpdate(event._id, {$set: {image: result.url}}, {new: true});

        res.status(200).json({event: event_, message: 'Event added successfully'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route GET api/event/{id}
// @desc Returns a specific event
// @access Public
exports.show = async function (req, res) {
    try {
        const id = req.params.id;

        const event = await Event.findById(id);

        if (!event) return res.status(401).json({message: 'Event does not exist'});

        res.status(200).json({event});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

// @route PUT api/event/{id}
// @desc Update event details
// @access Public
exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.params.id;
        const userId = req.user._id;

        const event = await Event.findOneAndUpdate({_id: id, userId}, {$set: update}, {new: true});

        if (!event) return res.status(401).json({message: 'Event does not exist'});

        //if there is no image, return success message
        if (!req.file) return res.status(200).json({event, message: 'Event has been updated'});

        //Attempt to upload to cloudinary
        const result = await uploader(req);
        const event_ = await Event.findOneAndUpdate({_id: id, userId}, {$set: {image: result.url}}, {new: true});

        res.status(200).json({event: event_, message: 'Event has been updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// @route DESTROY api/event/{id}
// @desc Delete Event
// @access Public
exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const userId = req.user._id;

        await Event.findOneAndDelete({_id: id, userId});

        res.status(200).json({message: 'Event has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};


/**
 * Seed the database -  //For testing purpose only
 */
exports.seed = async function (req, res) {

    try {
        let ids = [];
        let events = [];

        for (let i = 0; i < 5; i++) {
            const password = '_' + Math.random().toString(36).substr(2, 9); //generate a random password
            let newUser = new User({
                email: faker.internet.email(),
                password,
                firstName: faker.name.firstName(),
                lastName: `${faker.name.lastName()}`,
                isVerified: true
            });

            const user = await newUser.save();
            ids.push(user._id)
        }


        for (let i = 0; i < ids.length; i++) {
            //Create 5 events for each user
            for (let j = 0; j < 5; j++) {
                let start_date_time = faker.date.future();
                let start_date = moment.utc(start_date_time).format("YYYY-MM-DD");

                const newEvent = new Event({
                    name: faker.lorem.word(),
                    location: faker.address.streetName(),
                    address: `${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
                    start_date,
                    end_date: faker.date.future(),
                    description: faker.lorem.text(),
                    image: faker.image.nightlife(),
                    userId: ids[i]
                });

                let event = await newEvent.save();
                events.push(event);
            }
        }

        res.status(200).json({ids, events, message: 'Database seeded!'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }

};