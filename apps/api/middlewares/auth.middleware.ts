import type { Response, Request, NextFunction } from "express";


const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeaders = req.headers['authorization'];

    
    req.userId = "1";
    next();
}

export default authMiddleware;