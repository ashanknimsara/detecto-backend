const { Schema, model } = require('mongoose');
const { type } = require('os');
const { stringify } = require('querystring');

const currentDate = new Date();
const formattedDate = currentDate.toISOString().split('T')[0];
const casesSchema = new Schema (
    {
     
       vehicalNum : {
          type : String,
          required: true
       },
       evidence:{
           type : String,
           required: true
       },
       image:{
        type:String,
       
       },
       location:{
        type:String,
        default: 'Colombo 01'
       },
       date:{
        type:Date,
        default:Date.now 
       }
    }
    
);

const CasesModel = model('Cases', casesSchema);
module.exports = CasesModel;