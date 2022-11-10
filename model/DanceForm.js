const { model, Schema } = require('mongoose')

const DanceFormSchema=new Schema({
    form: {
        type: String,
        required: true
    },
    details:{
        type: String,
        required: true
    },
    filename:{
        type: String,
        required: true
    },
})
const ContactSchema=new Schema({
    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    phone:{
        type: Number,
        required: true
    },
    danceform:{
        type: String,
        required: true
    },
})

const DanceForm=model('DanceForm',DanceFormSchema);
const Contact=model('Contact',ContactSchema);

module.exports={
    DanceForm,
    Contact
}