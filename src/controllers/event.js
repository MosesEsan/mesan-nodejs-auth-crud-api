const faker = require('faker'); //For testing purpose only

const Event = require('../models/event');
const {uploader} = require('../utils/index');

const limit_ = 5;

// @route GET api/event
// @desc Returns all events with pagination
// @access Public
exports.index = async function (req, res) {
    //pagination
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || limit_;

    //sorting
    let sortOrder = req.query.sort_order && req.query.sort_order === 'desc' ? -1 : 1;

    //Filtering and Partial text search
    let match = {};
    if (req.query.name) match.name = {$regex: req.query.name, $options: 'i'}; //filter by name - use $regex in mongodb - add the 'i' flag if you want the search to be case insensitive.
    if (req.query.date) match.start_date = {$eq: new Date(req.query.date)}; //filter by date
    // { $gte: new ISODate("2014-01-01"), $lt: new ISODate("2015-01-01") }

    //set the options for pagination
    const options = {
        page, limit,
        collation: {locale: 'en'},
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'events'
        }
    };

    //Set up the grouping and sorting
    const myAggregate = Event.aggregate([
        // First Stage
        {$match: match},
        // Second Stage
        {
            $group: {
                _id: {$dateToString: {format: "%Y-%m-%d", date: "$start_date"}}, // Group By Expression

                data: {
                    $push: {
                        userId: '$userId',
                        name: '$name',
                        location: '$location',
                        address: '$address',
                        start_date: '$start_date',
                        start_time: '$start_time',
                        end_date: '$end_date',
                        end_time: '$end_time',
                        description: '$description',
                        image: '$image',
                        _id: '$_id'
                    }
                }
            }
        },
        // Third Stage
        {
            $sort: {"data.start_date": sortOrder}
        },
        // Fourth Stage
        // {
        //     $lookup: {
        //         from: 'comments',
        //         localField: "_id",
        //         foreignField: "eventId",
        //         as: "comments"
        //     }
        // },
    ]);

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
    const userId = req.user._id;

    for (let i = 0; i < 20; i++) {
        let event = {
            name: faker.lorem.word(),
            location: faker.address.streetName(),
            address: `${faker.address.streetAddress()} ${faker.address.secondaryAddress()}`,
            start_date: faker.date.future(),
            start_time: faker.date.future(),
            end_date: faker.date.future(),
            description: faker.lorem.text(),
            image: faker.image.nightlife(),
            userId:userId
        };

        const newEvent = new Event(event);
        newEvent.save();
    }

    // seeded!
    res.send('Database seeded!');
};