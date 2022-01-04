const catchCallback = e => res.status(404).json({success: false});

module.exports = {
    catchCallback
};