const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const newregisterschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        requied: true
    },
    password: {
        type: String,
        required: true
    },
    confirmpassword: {
        type: String,
        required: true
    },
    tokens: [{
        token: {
            type: String,
            required:true
        }
    }]
});
//////                generate a token 
newregisterschema.methods.generateAuthToken = async function ()
{
    try {
        console.log(this._id);
        const token = jwt.sign({ _id: this._id.toString() },process.env.secretKey);
        this.tokens = this.tokens.concat({ token: token });
        // console.log(token);
        await this.save();
        return token;
    } catch (error) {
        res.send(`the post hss ${error}`);
        console.log(`the post hss ${error}`);

    }
};
///// bcrypting the registeration page :
newregisterschema.pre("save", async function (next)
{
    if (this.isModified("password")) {
       // const hash = await bcrypt.hash(password, 10);
        this.password = await bcrypt.hash(this.password, 10);
        this.confirmpassword = await bcrypt.hash(this.password,10);

    }
    next(); 
      
});
    /////////////   bcrypting a login page /////



const Register = mongoose.model("newregister", newregisterschema);
module.exports = Register;