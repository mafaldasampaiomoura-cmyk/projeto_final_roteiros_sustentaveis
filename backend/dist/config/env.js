"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
require("dotenv/config");
exports.env = {
    port: Number(process.env.PORT) || 3000,
    supabaseUrl: process.env.SUPABASE_URL || '',
    supabaseServiceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || '',
};
if (!exports.env.supabaseUrl || !exports.env.supabaseServiceRoleKey) {
    throw new Error('Missing Supabase environment variables.');
}
