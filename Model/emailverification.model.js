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
        required: true,
        validate: [
            {
                validate: function (userpassword) {
                    return userpassword > 8;
                },
                message: props => `( ${props, value} ) password atleast more than 8`
            },
            {
                validator: function (userpassword) {
                    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(userpassword);
                },
                message: props => `( ${props.value} ) this password is invalid..!`
            }
        ]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    verificationtuken: {
        type: String
    }
});

const emailverifymodel = new mongoose.model("mailverification", emailverifyschema);

export default emailverifymodel