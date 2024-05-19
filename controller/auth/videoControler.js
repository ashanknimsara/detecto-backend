const Video = require('../../models/video.model');

exports.createVideo = async (req, res) => {
    const { videoUrl } = req.body;

    if (!videoUrl) {
        res.status(400).json({ success: false, error: "videoUrl field is required" });
        return;
    }

    try {
        const video = await Video.create({ videoUrl });
        res.status(201).json({ success: true, video });
    } catch (error) {
        console.log(error);
        res.status(400).json({ success: false, error: "Failed to create video" });
    }
};
