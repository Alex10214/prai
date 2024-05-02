import {RequestHandler} from "express";
import  Role from '../models/role';
import  User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import {validationResult} from "express-validator";
import {config} from "../config";

const generateAccessToken = (id: number, role: number) => {
    const payload = {
        id, role
    }

    return jwt.sign(payload, config.secretKey, {expiresIn: '1d'});
}

export const logIn: RequestHandler = async (req, res, next) => {
    try {

        const {username, password} = req.body;
        const user = await User.findOne({ where: { username } });

        if (!user) {
            return res.status(400).json({
                msg: 'User not found!'
            });
        }

        const validPassword = bcrypt.compareSync(password, user.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Login Error!'
            });
        }

        const token = generateAccessToken(user.id, user.roleId);

        return res.status(200).json({ message: "Login successfully!", token});
    } catch (error) {
        console.log(error)
        return res.status(400).json({
            msg: 'Login Error!'
        });
    }

};

export const register: RequestHandler = async (req, res, next) => {
    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({
                msg: 'Register Error!', errors
            });
        }

        const {username, password, roleId} = req.body;
        const user = await User.findOne({ where: { username } });

        if (user) {
            return res.status(400).json({
                msg: 'User already exist!'
            });
        }

        const roleExist = await Role.findOne({ where: { name: roleId.toLowerCase() }});
        if (!roleExist) {
            return res.status(400).json({
                msg: `Role doesn\'t exist`
            });
        }

        const hashedPassword = await bcrypt.hash(password, 5);
        await User.create({username: username, password: hashedPassword, roleId: roleExist.id});
        return res.status(200).json({ msg: "User registration successfully.", userName: username });
    } catch (error) {
        console.log(error)
        return res.status(400).json({ msg: "Failed registration user."});
    }
};
