const {Router} = require('express');
const {DanceForm,Contact} = require ('../../model/DanceForm.js');

const router=Router()

router.get('/', async(req,res)=>{
    try{
        const danceDetails= await DanceForm.find()
        if(!danceDetails) throw new Error('Not available at the moment.')

        res.status(200).json(danceDetails)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

router.post('/', async(req,res)=>{
    const newdance=new DanceForm(req.body)
    try{
        const dance=await newdance.save();
        if(!dance) throw new Error('Something went wrong')

        res.status(200).json(dance)
    }catch(error){
        res.status(500).json({message:error.message})
    }
})
router.post('/contact',async(req,res)=>{
    const newcontact= new Contact(req.body)
    try{
        const contact= await newcontact.save();
        if(!contact) throw new Error('Something went wrong')
        res.status(200).json(contact);
    }catch(error){
        res.status(500).json({message:error.message})
    }
})

module.exports=router;