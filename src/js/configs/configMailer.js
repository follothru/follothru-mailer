import nodemailer from 'nodemailer';
import { emailAccountUsername, emailAccountPassword } from "./config";

const host = 'smtp.gmail.com';
const port = 587;
const secure = false;

export default function () {
  return nodemailer.createTransport({
    host,
    port,
    secure,
    auth: {
      user: emailAccountUsername,
      pass: emailAccountPassword
    }
  })
};
