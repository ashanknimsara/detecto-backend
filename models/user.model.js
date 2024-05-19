const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password:{type:String,required:true},
        phone:{type:String,required:true},
        role:{
            type: String,
			default: 'USER'
        },
        access:{
            type:String,
            default:'false'
        }
      

    }
);
const UserModel = model('User', userSchema);
module.exports = UserModel;