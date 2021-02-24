require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const path = require("path");
const hbs = require("hbs");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");
require("./conn.js");


const Register = require("./models.js");
const partialspath = path.join(__dirname, "../newregister/tempelates/partials");
const tempelatepath = path.join(__dirname, "../newregister/tempelates/views");

app.use(express.json());
app.set("view engine", "hbs");
app.set("views", tempelatepath);
app.use(express.urlencoded({extended:false}));


console.log(process.env.secretKey);
app.get("/", (req, res) =>
{
    res.render("index")
});
app.get("/register", (req, res) =>
{
    res.render("register")
});
app.get("/login", (req, res) =>
{
    res.render("login")
})


app.post("/register", async (req, res) =>
{
    try {
        const password = req.body.password;
        const cpassword = req.body.cpassword;
        if (password === cpassword) {
            const mynewregister = new Register({
                name: req.body.name,
                email: req.body.email,
                password, //password: req.body.password,
                confirmpassword: req.body.cpassword,
            });
            console.log(mynewregister);
            const token = await mynewregister.generateAuthToken();
            console.log("the token part " + token);
            
            const registered = await mynewregister.save();
            res.status(201).render("index");
            console.log(registered);
        } else {
            res.send("password are not matching")
            console.log(" password are not matching")
        }
    } catch (err) {
        res.status(400).send(err);
    }
});
                              //  login form
app.post("/login",async (req, res) =>
{
    try {
        const email = req.body.email;
        const password = req.body.password;
        const useremail = await Register.findOne({ email: email });

        const isMatch = bcrypt.compare(password, useremail.password);



        const token = await useremail.generateAuthToken();
        console.log("the token part " + token);
    

        if (isMatch) { // useremail.password === password
            res.status(201).render("index");
        } else {
            res.send("Invalid email and password");       
        }

    } catch (err) {
        res.status(400).send("Invalid input")
    }
}) 
/////////////////////// bcrypt the js 
/* const bcrypt = require("bcrypt");
const securePassword = async (password) =>
{
    const hash = await bcrypt.hash(password, 10); 
    console.log(hash);
    const compare = await bcrypt.compare(password, hash); 
    console.log(compare);

}
securePassword("holasoymas123")
 */
/* const createToken = async () =>
{
    const token = await jwt.sign({ _id: "6030d5f0abe5752470c954cb" }, "helloiamtheoneandthethmeofthetomeistotherastoftheerlfsdjflkdfj;ldk", {
        expiresIn:"2 minutes"
    })
    console.log(token);
    const uservar=await jwt.verify(token,"helloiamtheoneandthethmeofthetomeistotherastoftheerlfsdjflkdfj;ldk")
    console.log(uservar);
}
createToken(); */





app.listen(port, (req, res) =>
{
    console.log(`i am listening at ${port}`)
})