import jwt from 'jsonwebtoken'
import {NextFunction, Response} from 'express';
import {config} from "../config";

export const authMiddleware  = (req: any, res: Response, next: NextFunction) => {

    if (req.method === "OPTIONS") {
        next();
    }

    try {

        const token = req.headers.authorization.split(' ')[1]

        if (!token) {
            return res.status(403).json({
                msg: `Unauthorized!`
            });
        }

        req.user = jwt.verify(token, config.secretKey);

        next();

    } catch (error) {
        console.log(error)
        return res.status(403).json({
            msg: `Failed by authentication!`
        });
    }
}
