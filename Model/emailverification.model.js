import mongoose from "mongoose";

const emailverifyschema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: {
            validator: function (useremail) {
                return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(useremail);
            },
            message: props => `( ${props.value} ) this email is invalid..!`
        }
    },
    userpassword: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationToken: {
        type: String
    }
});

const emailverifymodel = mongoose.model("mailverification", emailverifyschema);

export default emailverifymodel