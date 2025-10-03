import mongoose from "mongoose";

const connectDB = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGOBD_URI}/Data`)
        console.log(`Database Connected Successfully: ${connectionInstance.connection.host}`);
    }
    catch(error){
        console.log("Error while connecting to database", error);
        process.exit(1);
    }
}

export default connectDB;