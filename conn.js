const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/register", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true,
    useFindAndModify: false
}).then(() =>
{
    console.log("db connected .....")
}).catch((err) =>
{
    console.log("failed.......")
})