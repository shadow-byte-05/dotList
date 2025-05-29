import mongoose from 'mongoose'
import { mongoDB_name } from '../constants.js';

const connectDb = async () => {
  try {
    const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${mongoDB_name}`)
    console.log("Database connected successfully:", connectionInstance.connection.port);
    
    
  } catch (error) {
    console.log('Database Connection Error: ', error)
  }
}

export { connectDb }
