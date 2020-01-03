const Event = require('../models/event');
const {uploader} = require('../utils/index');

const limit = 5;

// @route GET api/event
// @desc Returns all events with pagination
// @access Public
exports.index = async function (req, res) {
    let page = parseInt(req.query.page) || 1;

    const options = {
        page, limit,
        collation: {locale: 'en'},
        customLabels: {
            totalDocs: 'totalResults',
            docs: 'events',
            limit: 'pageSize',
            page: 'currentPage'
        }
    };

    const result = await Event.paginate({}, options);

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

        res.status(200).json({event:event_, message: 'Event added successfully'});
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

        const event = await Event.findOneAndUpdate({ _id: id, userId}, {$set: update}, {new: true});

        //if there is no image, return success message
        if (!req.file) return res.status(200).json({event, message: 'Event has been updated'});

        //Attemt to upload to cloudinary
        const result = await uploader(req);
        const event_ = await Event.findOneAndUpdate({ _id: id, userId}, {$set: {image: result.url}}, {new: true});

        res.status(200).json({event:event_, message: 'Event has been updated'});
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

        await Event.findOneAndDelete({ _id: id, userId});

        res.status(200).json({message: 'Event has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};