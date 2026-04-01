"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listRoutePoints = exports.deleteRoutePoint = exports.createRoutePoint = void 0;
const supabase_1 = require("../config/supabase");
const createRoutePoint = async (req, res) => {
    const { route_id, name, descricao, morada, ordem } = req.body;
    const user = res.locals.user;
    if (!route_id || !name?.trim() || !ordem) {
        return res.status(400).json({
            message: 'route_id, name e ordem são obrigatórios',
        });
    }
    const { data: route, error: routeError } = await supabase_1.supabase
        .from('routes')
        .select('*')
        .eq('id', route_id)
        .single();
    if (routeError || !route) {
        return res.status(404).json({
            message: 'Route not found',
        });
    }
    if (route.user_id !== user.id) {
        return res.status(403).json({
            message: 'You can only add points to your own routes',
        });
    }
    const { data: existingPoint, error: existingPointError } = await supabase_1.supabase
        .from('route_points')
        .select('id')
        .eq('route_id', route_id)
        .eq('ordem', ordem)
        .maybeSingle();
    if (existingPointError) {
        return res.status(500).json({
            message: 'Failed to validate point order',
            error: existingPointError.message,
        });
    }
    if (existingPoint) {
        return res.status(400).json({
            message: 'Já existe um ponto com essa ordem neste roteiro',
        });
    }
    const { data, error } = await supabase_1.supabase
        .from('route_points')
        .insert({
        route_id,
        nome: name.trim(),
        descricao: descricao?.trim() || '',
        morada: morada?.trim() || '',
        ordem,
    })
        .select()
        .single();
    if (error) {
        return res.status(500).json({
            message: 'Failed to create route point',
            error: error.message,
        });
    }
    return res.status(201).json({
        message: 'Route point created successfully',
        routePoint: data,
    });
};
exports.createRoutePoint = createRoutePoint;
const deleteRoutePoint = async (req, res) => {
    const { id } = req.params;
    const user = res.locals.user;
    const { data: point, error: pointError } = await supabase_1.supabase
        .from('route_points')
        .select('*')
        .eq('id', id)
        .single();
    if (pointError || !point) {
        return res.status(404).json({
            message: 'Route point not found',
        });
    }
    const { data: route, error: routeError } = await supabase_1.supabase
        .from('routes')
        .select('*')
        .eq('id', point.route_id)
        .single();
    if (routeError || !route) {
        return res.status(404).json({
            message: 'Route not found',
        });
    }
    if (route.user_id !== user.id) {
        return res.status(403).json({
            message: 'You can only delete points from your own routes',
        });
    }
    const { error } = await supabase_1.supabase
        .from('route_points')
        .delete()
        .eq('id', id);
    if (error) {
        return res.status(500).json({
            message: 'Failed to delete route point',
            error: error.message,
        });
    }
    return res.status(200).json({
        message: 'Route point deleted successfully',
    });
};
exports.deleteRoutePoint = deleteRoutePoint;
const listRoutePoints = async (req, res) => {
    const { data, error } = await supabase_1.supabase
        .from('route_points')
        .select('*')
        .order('id', { ascending: true });
    if (error) {
        return res.status(500).json({
            message: 'Failed to fetch route points',
            error: error.message,
        });
    }
    return res.status(200).json(data);
};
exports.listRoutePoints = listRoutePoints;
