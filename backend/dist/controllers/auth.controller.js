"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.me = exports.login = exports.register = void 0;
const supabase_1 = require("../config/supabase");
const register = async (req, res) => {
    const { email, password, name } = req.body;
    if (!email || !password || !name) {
        return res.status(400).json({
            message: "Email, password and name are required",
        });
    }
    const { data, error } = await supabase_1.supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            nome: name,
        },
    });
    if (error) {
        return res.status(400).json({
            message: "Registration failed",
            error: error.message,
        });
    }
    return res.status(201).json({
        message: "User registered successfully",
        user: data.user,
    });
};
exports.register = register;
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({
            message: "Email and password are required",
        });
    }
    const { data, error } = await supabase_1.supabase.auth.signInWithPassword({
        email,
        password,
    });
    if (error) {
        return res.status(401).json({
            message: "Login failed",
            error: error.message,
        });
    }
    return res.status(200).json({
        message: "Login successful",
        session: data.session,
        user: data.user,
    });
};
exports.login = login;
const me = async (_req, res) => {
    return res.status(200).json({
        message: 'Authenticated user',
        user: res.locals.user,
    });
};
exports.me = me;
