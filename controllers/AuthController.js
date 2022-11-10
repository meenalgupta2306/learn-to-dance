const User= require('../model/User');

const express= require('express')

const bcrypt=require('bcryptjs')
const jwt=require('jsonwebtoken')
const cookieParser = require('cookie-parser');
const app = express();
app.use(cookieParser());

const signup = async (req,res)=>{
    const oldUser = await User.findOne({ email:'swasti@test.com' });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }
    const salt = await bcrypt.genSalt(10);
    hashedPassword = await bcrypt.hash(req.body.password, salt);
    let user= new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
    })  
    const token = jwt.sign(
      { user_id: user._id, email:req.body.email },
      process.env.TOKEN,
      {
        expiresIn: "60 days",
      }
    );
    user.token=token;
    user.save()
    .then(user=>{
      res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
        res.status(200).json({
            user,
            message: 'User added succesfully'
        })
    })
    .catch(error=>{
        res.status(500).json({
            message: error
        })
    })
}
const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
};

const login= async(req,res)=>{
    const body = req.body;
    if(!validateEmail(body.email)){
      res.status(400).json({ error: "Enter a valid email" });
      return;
    }
    const user = await User.findOne({ 'email': body.email });
    if (user) {
      // check user password with hashed password stored in the database
      let token= jwt.sign({user_id:user._id}, process.env.TOKEN,{expiresIn:'60 days'})
      const validPassword = await bcrypt.compare(body.password, user.password);
      user.token=token;
      user.save();
      if (validPassword) {
        res.status(200).json({ message: "Login successful" ,user});
      } else {
        res.status(400).json({ error: "Invalid Password" });
      }
    } else {
      res.status(401).json({ error: "Not a registered user. Please signup first" });
    }
}
const logout=async (req,res) =>{
  res.clearCookie('nToken');
  const id=req.params.id
  const deleteduser= await User.updateOne({ _id: id }, { $unset: { token: '' } })
  if(deleteduser)
    res.send({message:'logout'})
    
}

module.exports={
    signup,
    login,
    logout
}