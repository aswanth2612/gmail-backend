import express from 'express';
import bcrypt from 'bcrypt';
import {
    User
} from '../model/User.js';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';


const landingPageRoutes = express.Router();

/**
 * Landig page End-points
 */
landingPageRoutes.post('/signup', async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    })
    if (user) {
        return res.json({
            message: "user already existed"
        })
    }

    const hashpassword = await bcrypt.hash(password, 10)
    const newUser = new User({
        username,
        email,
        password: hashpassword,
    })

    await newUser.save()
    return res.json({
        status: true,
        message: "record registed"
    })

})

landingPageRoutes.post('/login', async (req, res) => {
    const {
        email,
        password
    } = req.body;
    const user = await User.findOne({
        email
    });
    if (!user) {
        return res.json({
            message: "user not found"
        })
    }
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
        return res.json({
            message: "password is incorrect!!"
        })
    }
    const token = jwt.sign({
        username: user.username
    }, process.env.KEY, {
        expiresIn: '1h'
    })
    res.cookie('token', token, {
        httpOnly: true,
        maxAge: 360000
    })
    return res.json({
        status: true,
        message: "login successfully",
        username: user.username,
        email: user.email,
        token: token
    })
})

landingPageRoutes.get('/forgot-password', async (req, res) => {
    const {
        email
    } = req.query;
    try {
        const user = await User.findOne({
            email
        })
        if (!user) {
            return res.json({
                message: "user not registered"
            })
        }
        const token = jwt.sign({
            id: user._id
        }, process.env.KEY, {
            expiresIn: '5m'
        })
         return res.json({
            status: true,
            message: "email sent",
            token: token
        })
    } catch (err) {}
})

landingPageRoutes.post('/reset-password', async (req, res) => {
    const {
        token
    } = req.query;
    const {
        password
    } = req.body;
    try {
        const decoded = await jwt.verify(token, process.env.KEY);
        const id = decoded.id;
        const hashpassword = await bcrypt.hash(password, 10)
        await User.findByIdAndUpdate({
            _id: id
        }, {
            password: hashpassword
        })
        return res.json({
            status: true,
            message: "updated password"
        })
    } catch (err) {
        return res.json("invalid token")
    }
})

const verifyUser = async (req, res, next) => {
    try {
        const token = req.query.token;
        if (!token) {
            return res.json({
                status: false,
                message: "no token"
            })
        }
        const decoded = await jwt.verify(token, process.env.KEY)
        next()
    } catch (err) {
        return res.json(err)
    }
}

landingPageRoutes.get('/verify', verifyUser, (req, res) => {
  return res.json({
      status: true,
      message: "authorized"
  })

})

landingPageRoutes.get('/logout', (req, res) => {
    res.clearCookie('token')
    return res.json({
        status: true,
        message: "Loggedout successfully."
    })
})

export default landingPageRoutes;