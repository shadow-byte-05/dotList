import mongoose, {Schema} from "mongoose"
import bcrypt from 'bcrypt'
import { app } from "../app.js"
import jwt from "jsonwebtoken"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
        },
        password: {
            type:String,
            required: [true, 'password is required'],
        },
        refreshToken: {
            type: String
        }
        
    },
    {
        timestamps: true
    }
)

userSchema.pre('save',async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
})

userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.createAccessTokenAndRefreshToken = async function (){
    const accessToken = jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email:this.email, 
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn : '1d'}

    )
    const refreshToken = jwt.sign(
      {
        username: this.username,
        email: this.email,
      },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '10d' }
    )
    this.refreshToken = refreshToken
    await this.save({validateBeforeSave: false})
    return {accessToken, refreshToken}

}



export const User = mongoose.model("User", userSchema)