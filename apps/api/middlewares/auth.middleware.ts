import type { NextFunction, Request, Response } from "express";
import { verifyToken } from '@clerk/backend';

const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization'];
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
    const token = authHeader.substring(7);

    try {
        const payload = await verifyToken(token, {
            secretKey: process.env.CLERK_SECRET_KEY
        });
        
        console.log(payload);
        if (!payload.sub) {
            res.status(401).json({ error: 'Unauthorized' });
            return;
        }

        req.userId = payload.sub;
        
        next()
    } catch (error) {
        console.error('Auth error:', error);
        res.status(401).json({ error: 'Unauthorized' });
        return;
    }
};  

export default authMiddleware;