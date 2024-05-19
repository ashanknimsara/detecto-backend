const User = require('../../models/user.model');
const bcrypt = require('bcryptjs');
const createError = require('../../utils/appError');
const jwt = require('jsonwebtoken');

//REGISTER USER
// exports.signup = async (req, res, next) => {
//   try {
//     const user = await User.findOne({ email: req.body.email });
//     console.log("tft",user)

//     if (user) {
//       return next(new createError('User already exists!', 400));
//     }
//     const hashedPassword = await bcrypt.hash(req.body.password, 12);
//     const newUser = await User.create({
//      ...req.body,
//       password: hashedPassword,
//     });
//     //Assign JWT (json web token) to User
//     const token = jwt.sign({ _id: newUser._id },'secretkey123456', {
//       expiresIn: '6h',
//     });
//     res.status(201).json({
//       status: 'success',
//       message: 'User registered successfully',
//       token,
//       user:{
//         _id:newUser._id,
//         name:newUser.name,
//         email:newUser.email,
//         phone:newUser.phone,
//         role: newUser.role,
//       }
//     });
//   } catch (error) {
//     next(error);
//     res.status(500).json({ message: 'Internal server error' });
//   }
// };


//---------------------------------------


exports.signup = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    console.log("tft", user);

    if (user) {
      return next(new createError('User already exists!', 400));
    }
    const hashedPassword = await bcrypt.hash(req.body.password, 12);
    const newUser = await User.create({
     ...req.body,
      password: hashedPassword,
    });
    // Assign JWT (json web token) to User
    const token = jwt.sign({ _id: newUser._id }, 'secretkey123456', {
      expiresIn: '6h',
    });
    res.status(201).json({
      status: 'success',
      message: 'User registered successfully',
      token,
      user:{
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        phone: newUser.phone,
        role: newUser.role,
        access: user.access
        
      }
    });
  } catch (error) {
    next(error); // Pass the error to the error handling middleware
  }
};


//LOGIN
exports.login = async (req, res, next) => {
  try {
    const {email,password} = req.body
    const user = await User.findOne({email});
    if (!user) return next(new createError('User not found!',404));
    const isPasswordValid = await bcrypt.compare(password,user.password);

    if(!isPasswordValid){
      return next(new createError('Invalid email or password',401))
    }
        //Assign JWT (json web token) to User
        const token = jwt.sign({ _id: user._id }, 'secretkey123456', {
          expiresIn: '6h',
        });
        res.status(200).json({
          status: 'success',
          message: 'Logged in successfully',
          token,
          user:{
            _id:user._id,
            name:user.name,
            email:user.email,
            role: user.role,
            phone:user.phone,
            access: user.access
          }
        })
  } catch (error) {
    next(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};