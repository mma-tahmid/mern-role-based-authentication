
var jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt")
const userModels = require("../models/userModel")

exports.Registration = async (req, res) => {

    try {
        const { email, password, role } = req.body

        const hashedPassword = await bcrypt.hash(password, 10)

        const createNewUser = await new userModels({
            email,
            password: hashedPassword,
            role
        }).save()

        res.status(200).send({
            success: true,
            message: "user Register Successfully",
            output: createNewUser
        })

    }

    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Registration",
            error
        })
    }
}

exports.Login = async (req, res) => {

    try {

        const { email, password } = req.body

        const validUser = await userModels.findOne({ email })

        if (!validUser) {
            return res.status(400).send({
                success: false,
                message: "Email is not Registered"
            })
        }

        const isPasswordMatch = await bcrypt.compare(password, validUser.password)

        if (!isPasswordMatch) {
            return res.status(400).send({
                success: false,
                message: "Wrong Credentials"
            })
        }

        const createToken = jwt.sign(
            { userId: validUser._id, role: validUser.role },
            process.env.JWT_SECRET_KEY,
            { expiresIn: '1d' }
        )

        res.status(200).send({ createToken })

    }

    catch (error) {
        res.status(500).send({
            success: false,
            message: "Error in Login",
            error
        })
    }

}