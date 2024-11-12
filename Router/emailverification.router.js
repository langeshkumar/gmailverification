import express from "express";
import { emailverifyGet, emailverifyPost } from "../Controller/emailverification.controller.js";

const emailRouter = express.Router();

emailRouter.get('/', emailverifyGet);

emailRouter.post('/', emailverifyPost);

export default emailRouter