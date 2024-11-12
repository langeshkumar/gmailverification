import nodemailer from "nodemailer";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
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

export const emailverifyGet = (req, res) => {
    const { token } = req.params;

    res.send({
        token: token
    });
};

export const emailverifyPost = async (req, res) => {
    const { username, useremail, userpassword } = req.body;
    try {

        if (username == '' || useremail == '' || userpassword == '') {
            res.send(401).json({
                message: "Some inputs are empty..!"
            });
        }

        const bcryptPass = bcrypt.hash(userpassword, 10);
        const tokenGen = jwt.sign({ useremail }, process.env.JWT_SECRET);

        const userDetail = new emailverifymodel({
            username,
            useremail,
            userpassword: bcryptPass,
            verificationtuken: tokenGen
        });

        await userDetail.save();

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