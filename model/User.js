const { model, Schema } = require('mongoose')


const UserSchema=new Schema({
    name: {
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        validate: {
            validator: function (v) {
              return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
            },
            message: '{VALUE} is not a valid email!'
          }
    },
    password:{
        type:String,
        required:true
    },
    token:{
        type:String
    }
})

const User=model('User',UserSchema)

module.exports= User;