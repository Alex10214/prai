import {RequestHandler} from "express";
import  Role from '../models/role';

export const createRole: RequestHandler = async (req, res, next) => {
    try {
        const role = req.body
        const roleExist = await Role.findOne({ where: { name: role.name } });

        if (roleExist) {
            return res.status(404).json({
                msg: `Role '${role.name}' already exists!`
            });
        }

        const createdRole = await Role.create({ ...req.body });
        return res.status(200).json({ msg: "Role created successfully.", data: createdRole });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Failed to create role."});
    }
}

export const deleteRole: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const neededRoel: Role | null = await Role.findByPk(id);

        if (!neededRoel) {
            return res.status(404).json({
                msg: `Role with id '${id}' not found!`
            });
        }
        await Role.destroy({ where: { id } });

        return res.status(200).json({ msg: "Role deleted successfully.", data: neededRoel });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Failed to delete role."});
    }
};

export const getAllRoles: RequestHandler = async (req, res, next) => {

    try {
        const allRoles: Role[] = await Role.findAll();
        return res.status(200).json({ msg: "Roles get successfully.", data: allRoles });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Failed get all role."});
    }
};

export const getRoleById: RequestHandler = async (req, res, next) => {

    try {
        const { id } = req.params;
        const neededRoel: Role | null = await Role.findByPk(id);

        if (!neededRoel) {
            return res.status(404).json({
                msg: `Role with id '${id}' not found!`
            });
        }
        return res.status(200).json({ msg: "Role get successfully.", data: neededRoel });
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Failed get role by id."});
    }
};

export const updateRole: RequestHandler = async (req, res, next) => {
    try {
        const {id} = req.params;
        const neededRole: Role | null = await Role.findByPk(id);

        if (!neededRole) {
            return res.status(404).json({
                msg: `Role with id '${id}' not found!`
            });
        }
        const updatedRole = await Role.update({...req.body}, {where: {id}});
        return res.status(200).json({msg: "Role updated successfully.", data: updatedRole});
    } catch (error) {
        console.log(error);
        return res.status(400).json({msg: "Failed updated role"});
    }
};
