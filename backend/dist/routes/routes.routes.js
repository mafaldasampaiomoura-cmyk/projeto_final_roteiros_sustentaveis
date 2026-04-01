"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const supabase_1 = require("../config/supabase");
const router = (0, express_1.Router)();
router.get('/', auth_middleware_1.authMiddleware, async (_req, res) => {
    const userId = res.locals.user.id;
    const { data, error } = await supabase_1.supabase
        .from('routes')
        .select('*')
        .or(`is_public.eq.true,user_id.eq.${userId}`)
        .order('id', { ascending: false });
    if (error) {
        return res.status(500).json({
            message: 'Erro ao buscar roteiros',
            error: error.message,
        });
    }
    return res.json(data);
});
router.get('/:id', auth_middleware_1.authMiddleware, async (req, res) => {
    const { id } = req.params;
    const userId = res.locals.user.id;
    const { data: route, error } = await supabase_1.supabase
        .from('routes')
        .select('*')
        .eq('id', id)
        .single();
    if (error || !route) {
        return res.status(404).json({
            message: 'Roteiro não encontrado',
        });
    }
    if (!route.is_public && route.user_id !== userId) {
        return res.status(403).json({
            message: 'Sem permissão para ver este roteiro',
        });
    }
    const { data: points, error: pointsError } = await supabase_1.supabase
        .from('route_points')
        .select('*')
        .eq('route_id', id)
        .order('ordem', { ascending: true });
    if (pointsError) {
        return res.status(500).json({
            message: 'Erro ao buscar pontos',
            error: pointsError.message,
        });
    }
    return res.json({
        ...route,
        points: points || [],
    });
});
router.post('/', auth_middleware_1.authMiddleware, async (req, res) => {
    const { titulo, descricao, duracao, dificuldade, cidade, categoria, image_url, } = req.body;
    if (!titulo?.trim() || !cidade?.trim()) {
        return res.status(400).json({
            message: 'titulo e cidade são obrigatórios',
        });
    }
    const user = res.locals.user;
    const isAdmin = user.email === process.env.ADMIN_EMAIL;
    const { data: route, error } = await supabase_1.supabase
        .from('routes')
        .insert([
        {
            titulo: titulo.trim(),
            descricao: descricao?.trim() || '',
            duracao: duracao?.trim() || '',
            dificuldade: dificuldade?.trim() || '',
            cidade: cidade.trim(),
            categoria: categoria?.trim() || '',
            image_url: image_url?.trim() || '',
            user_id: user.id,
            is_public: isAdmin,
        },
    ])
        .select()
        .single();
    if (error) {
        return res.status(400).json({
            message: 'Erro ao criar roteiro',
            error: error.message,
        });
    }
    return res.status(201).json(route);
});
router.put('/:id', auth_middleware_1.authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { titulo, descricao, duracao, dificuldade, cidade, categoria, image_url, } = req.body;
    console.log('BODY RECEBIDO NO PUT', req.body);
    if (!titulo?.trim() || !cidade?.trim()) {
        return res.status(400).json({
            message: 'titulo e cidade são obrigatórios',
        });
    }
    const { data: existingRoute, error: existingError } = await supabase_1.supabase
        .from('routes')
        .select('*')
        .eq('id', id)
        .single();
    if (existingError || !existingRoute) {
        return res.status(404).json({
            message: 'Roteiro não encontrado',
        });
    }
    if (existingRoute.user_id !== res.locals.user.id) {
        return res.status(403).json({
            message: 'Não tens permissão para editar este roteiro',
        });
    }
    const { data: updatedRoute, error } = await supabase_1.supabase
        .from('routes')
        .update({
        titulo: titulo.trim(),
        descricao: descricao?.trim() || '',
        duracao: duracao?.trim() || '',
        dificuldade: dificuldade?.trim() || '',
        cidade: cidade.trim(),
        categoria: categoria?.trim() || '',
        image_url: image_url?.trim() || '',
    })
        .eq('id', id)
        .select()
        .single();
    if (error) {
        return res.status(400).json({
            message: 'Erro ao atualizar roteiro',
            error: error.message,
        });
    }
    return res.json({
        message: 'Roteiro atualizado com sucesso',
        route: updatedRoute,
    });
});
router.delete('/:id', auth_middleware_1.authMiddleware, async (req, res) => {
    const { id } = req.params;
    const { data: existingRoute, error: existingError } = await supabase_1.supabase
        .from('routes')
        .select('*')
        .eq('id', id)
        .single();
    if (existingError || !existingRoute) {
        return res.status(404).json({
            message: 'Roteiro não encontrado',
        });
    }
    if (existingRoute.user_id !== res.locals.user.id) {
        return res.status(403).json({
            message: 'Não tens permissão para eliminar este roteiro',
        });
    }
    const { error: pointsError } = await supabase_1.supabase
        .from('route_points')
        .delete()
        .eq('route_id', id);
    if (pointsError) {
        return res.status(400).json({
            message: 'Erro ao eliminar os pontos do roteiro',
            error: pointsError.message,
        });
    }
    const { error } = await supabase_1.supabase.from('routes').delete().eq('id', id);
    if (error) {
        return res.status(400).json({
            message: 'Erro ao eliminar roteiro',
            error: error.message,
        });
    }
    return res.json({
        message: 'Roteiro eliminado com sucesso',
    });
});
exports.default = router;
