import mongoose from "mongoose";

// export the mongo db connection
export default mongoose.connect("mongodb://localhost/ganiexperment",{useNewUrlParse: true}, err =>
{
  if(err){
    throw err;
  }
  console.log("MongoDB Connected Successfully.");

});
