import type { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { JWT_PUBLIC_KEY } from "../config";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers['authorization'];
    if (!token) {
        return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, JWT_PUBLIC_KEY);
        console.log(decoded);
        if (!decoded || !decoded.sub) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        req.userId = decoded.sub as string;
        
        next()
    } catch (error) {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};  

export default authMiddleware;