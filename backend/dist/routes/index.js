"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_routes_1 = __importDefault(require("./auth.routes"));
const routes_routes_1 = __importDefault(require("./routes.routes"));
const routePoints_routes_1 = __importDefault(require("./routePoints.routes"));
const favourites_routes_1 = __importDefault(require("./favourites.routes"));
const router = (0, express_1.Router)();
router.use('/auth', auth_routes_1.default);
router.use('/routes', routes_routes_1.default);
router.use('/route-points', routePoints_routes_1.default);
router.use('/favourites', favourites_routes_1.default);
router.get('/health', (_req, res) => {
    res.status(200).json({ message: 'API is running' });
});
exports.default = router;
