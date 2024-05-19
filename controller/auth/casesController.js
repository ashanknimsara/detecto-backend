const Cases = require('../../models/cases.model');

//display
exports.getAllCases= async (req, res) => {
    try {
        const user = await Cases.find();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//add cases
exports.addCase = async (req, res) => {
    try {
        const { vehicalNum, evidence, image, location, date } = req.body;

        const newCase = new Cases({
        
            vehicalNum,
            evidence,
            image,
            location
        });

        await newCase.save(); // Wait for the new case to be saved to the database

        res.json("New Case Added"); // Sending response
    } catch (err) {
        console.log(err);
    next(err);
    }
};


//moreingformstiona

exports.getCaseInformation = async (req, res, next) => {
    try {
        const caseId = req.params.id; 
        const foundCase = await Cases.findById(caseId);

        if (!foundCase) {
            // If case not found, return 404 Not Found
            return res.status(404).json({ error: 'Case not found' });
        }

        // Case found, include image data in the response
        const imageData = foundCase.image; // Assuming image data is stored directly in the database
        const caseInfoWithImage = { ...foundCase.toObject(), imageData };

        // Send the case information including image data in the response
        res.status(200).json(caseInfoWithImage);
    } catch (err) {
        console.error(err);
        next(err); // Forward error to the error handling middleware
    }
};
