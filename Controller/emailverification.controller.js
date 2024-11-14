import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import emailverifymodel from "../Model/emailverification.model.js";
import dotenv from "dotenv";
dotenv.config()

const mailTransfer = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

export const emailverifyGet = async (req, res) => {
    try {
        const { token } = req.params;
        const decode = jwt.verify(token, process.env.JWT_SECRET);

        const getDetails = await emailverifymodel.findOne({ useremail: decode.useremail, verificationToken: token });
        if (!getDetails) {
            res.send(400).json({
                message: "Token is invalid"
            });
        }
        getDetails.isVerified = true;
        getDetails.verificationToken = null;
        await getDetails.save();

        res.json({ message: 'Email verified successfully' });

    } catch (error) {
        console.error(error.message);
    }
};

export const emailverifyPost = async (req, res) => {
    try {
        const { username, useremail, userpassword } = req.body;

        if (username == '' || useremail == '' || userpassword == '') {
            res.send(400).json({
                message: "Some inputs are empty..!"
            });
        }

        const isComplexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userpassword);
        if (userpassword.length > 8) {
            res.status(400).json({
                message: `( ${userpassword} ) this password does not meet the complexity requirements.`
            });
        }

        const bcryptPass = await bcrypt.hash(userpassword, 10);
        const tokenGen = jwt.sign({ useremail }, process.env.JWT_SECRET);

        const userDetail = new emailverifymodel({
            username: username,
            useremail: useremail,
            userpassword: bcryptPass,
            verificationToken: tokenGen
        });

        const successmsg = await userDetail.save();

        const url = `http://localhost:3001/emailverify/${tokenGen}`;

        await mailTransfer.sendMail({
            to: useremail,
            subject: 'Verify Your Email',
            html: `<h3>Click the link to verify your email: <a href="${url}">Verify Email</a></h3>`,
        });

        res.status(200).json({
            message: "Check your email and veriy your account..!"
        });
    } catch (error) {
        res.status(500).json({
            message: "Somethink went wrong..!",
            error: error.message
        });
    }
};