import {RequestHandler} from "express";
import  User from '../models/user';

export const createUser: RequestHandler = async (req, res, next) => {
    try {
        const user = req.body

        const userExist = await User.findOne({ where: { username: user.username } });

        if (userExist) {
            return res.status(400).json({
                msg: `User '${user.username}' already exists!`
            });
        }

        await User.create(user);
        return res.status(200).json({ msg: "User created successfully.", data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to create user." });
    }
}

export const deleteUser: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const userExist = await User.findOne({ where: { id } });

        if (!userExist) {
            return res.status(404).json({
                msg: `User with id '${id}' not found!`
            });
        }

        const user: User | null = await User.findByPk(id);
        await User.destroy({ where: { id } });

        return res.status(200).json({ msg: "User deleted successfully.", data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to delete user." });
    }
};

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try {
        const allUsers: User[] = await User.findAll();
        return res.status(200).json({ msg: "Get all user successfully.", data: allUsers });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to fetch all users." });
    }
};

export const getUserById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user: User | null = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({
                msg: `User with id '${id}' not found!`
            });
        }

        return res.status(200).json({ msg: "User get successfully.", data: user });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to fetch user." });
    }
};

export const updateUser: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user: User | null = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({
                msg: `User with id '${id}' not found!`
            });
        }
        const updatedUser = await User.update({...req.body}, {where: {id}});
        return res.status(200).json({ msg: "User updated successfully.", data: updatedUser });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ msg: "Failed to update user." });
    }
};
