import jwt, {JwtPayload} from 'jsonwebtoken'
import {NextFunction, Response} from 'express';
import {config} from "../config";
import Role from "../models/role";

export const roleMiddleware  = (role: string) => {
     return async function (req: any, res: Response, next: NextFunction) {

        if (req.method === "OPTIONS") {
            next();
        }

        try {

            const token = req.headers.authorization.split(' ')[1]
            if (!token) {
                return res.status(403).json({msg: `Unauthorized!`});
            }
            const user: JwtPayload | string = jwt.verify(token, config.secretKey);
            const userObj = JSON.parse(JSON.stringify(user))
            const allRoles: Role[] = await Role.findAll();

            const userRole = allRoles.find(roleObj => roleObj.id === userObj.role);
            const hasRole = userRole !== undefined && userRole.name === role;

            if (!hasRole) {
                return res.status(403).json({
                    msg: `Access denied!`
                });
            }

            next();
        } catch (error) {
            console.log(error)
            return res.status(403).json({
                msg: `Failed by role!`
            });
        }
    }
}


