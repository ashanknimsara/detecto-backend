const User = require('../../models/user.model');


//display

exports.getAllUsers= async (req, res) => {
    try {
        const user = await User.find();
        res.json(user);
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

//update

exports.updateUser = async (req, res) => {
    const userId = req.params.id;
    const { username, email, phone,role } = req.body;

    const updateUser = {
        username,
        email,
        phone,
        role
    };

    try {
        const update = await User.findByIdAndUpdate(userId, updateUser);
        if (!update) {
            return res.status(404).json({ status: "User not found" });
        }
        res.status(200).json({ status: "User updated" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data" });
    }
};

//delete
exports.deleteUser = async (req, res) => {
    console.log({message:'delete method start'});
    const userId = req.params.id;
    
    try {
        const deletedUser = await User.findByIdAndDelete(userId);
        if (!deletedUser) {
            return res.status(404).json({ status: "User not found" });
        }
        res.status(200).json({ status: "User deleted" });
    } catch (err) {
        console.log(err.message);
        res.status(500).json({ status: "Error with deleting user", error: err.message });
    }
};

//access 
exports.access= async(req,res)=>{
    const userId =req.params.id;
    const{ access} =req.body;

    const updateaccess ={
        access
    };
    try {
        const update = await User.findByIdAndUpdate(userId, updateaccess);
        if (!update) {
            return res.status(404).json({ status: "Access not found" });
        }
        res.status(200).json({ status: "Access updated" });
    } catch (error) {
        console.log(err);
        res.status(500).json({ status: "Error with updating data" });
    }
}