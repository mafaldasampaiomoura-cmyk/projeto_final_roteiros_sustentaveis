"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authMiddleware = void 0;
const supabase_1 = require("../config/supabase");
const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            message: 'Authorization token is missing or invalid',
        });
    }
    const token = authHeader.split(' ')[1];
    const { data, error } = await supabase_1.supabase.auth.getUser(token);
    if (error || !data.user) {
        return res.status(401).json({
            message: 'Invalid or expired token',
        });
    }
    res.locals.user = data.user;
    next();
};
exports.authMiddleware = authMiddleware;
