import { secret } from "../config/env.js";
import { sendOtpEmail } from "../config/mail.js";
import { User } from "../models/user_model.js";
import { signUpSchema } from "../schemas/user_schema.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const otpGenerator = (length = 6) => {
    let otp = "";
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10)
    }
    return otp;
};

export const signUp = async (req, res) => {
    try {
        const { error, value } = signUpSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ error })
        }

        const { password, email, role } = value;

        // finds if the user already exist by using the email
        const findUser = await User.findOne({ email: value.email });
        console.log(findUser, "found")

        // if user found just say user exsit if not hash the password and continue to save it.
        if (findUser) {
            return res.status(200).json({ message: `User already exist` });
        } else {
            const hashPassword = await bcrypt.hash(password, 12);
            console.log("hashPassword", hashPassword)
            // const otp = otpGenerator(4)
            // const hashotp = await bcrypt.hash(otp, 12);
            // console.log("hashotp", hashotp)

            // generate an otp of 4 numbers for the user
            // const otp = hashotp;
            // show otp in console.log
            // console.log("otp", otp);

            // save the new user details in the database using the format below.
            // const saveUserData = await User.create({
            //     firstName,
            //     lastName,
            //     email,
            //     password: hashPassword,
            //     role: role,
            //     otp: hashotp,
            //     otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000)
            // });

            const saveUserData = await User.create({
                ...value,
                password: hashPassword,
                // otp: hashotp,
                // otpExpiresAt: new Date(Date.now() + 5 * 60 * 1000)
            });

            // show the saved user details in the console
            console.log("savedata", saveUserData)

            // send otp to email
            await sendOtpEmail(email, role, password)
            console.log("otp sent to email", email)

            // secrete key with jwt
            console.log(`Secret key: ${secret}`)

            // generate a token with user id and role, and the secret key is embedded in it after the signup....this will last for 1 hour
            const token = jwt.sign(
                { id: saveUserData.id, role: saveUserData.role },
                secret,
                { expiresIn: "1h" }
            )
            console.log("token", token);
            return res.status(201).json({ user: saveUserData, token: token });

        };
    } catch (error) {
        return res.status(500).json({ message: error.message })
    }

};


export const loginUser = async (req, res) => {
    try {
        // validates if the email from the user exist in the database
        const user = await User.findOne({ email: req.body.email }).populate('user', '-password -otp');
        if (!user)
            return res.status(401).json({ message: 'Invalid credentials' });

        // compares the password from the user to the one in the database
        const isValidPassword = await bcrypt.compare(req.body.password, user.password);
        if (!isValidPassword)
            return res.status(401).json({ message: 'Invalid credentials' });

        // if both password and email are valid, generate a JWT token to be use for authentication. here the user's id and role, secret key with an expiring period of 1hr is embedded in the token.
        const token = jwt.sign({ id: user.id, role: user.role }, secret, { expiresIn: '1h' });
        return res.status(200).json({ user, token });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error logging in user' });
    }
};

export const allUser = async (req, res) =>{
    try {
        const allUsers = await User.find().populate('user','-otp -password');
        return res.status(200).json({message: 'These are All Users',allUsers});
    } catch (error) {
        return res.status(500).json({message: 'Error getting Users'});
    }
}

export const aUser = async(req, res) => {
    try {
        const userID = req.params.id
        const aUser = await User.findById(userID).populate('user','-otp -password')

        // check if both id matches, the one in the db and the one in the body (/:id)
        if(aUser.id.toString() !== userID.toString()){
            return res.status(400).json({message:'User Does not Exist'})
        }
        return res.status(200).json({message:'User Found',aUser})
    } catch (error) {
        return res.satus(500).json({message:'Error getting User'})
        
    }
}