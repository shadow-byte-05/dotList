import { mongoose } from "mongoose";
import { app } from "./app.js"
import 'dotenv/config'
import { connectDb } from "./db/index.js";


connectDb().then(
  app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is listening on ${process.env.PORT || 8000}`)
  })
)
// .catch(
//     throw new Error("Database connection failed!!!");
    
// )

