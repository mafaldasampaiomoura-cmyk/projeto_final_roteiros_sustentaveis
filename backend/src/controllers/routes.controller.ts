import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const listRoutes = async (req: Request, res: Response) => {
  
  const { duration } = req.query;

  let query = supabase.from('routes').select('*');

  if (duration) {
    query = query.eq('duracao', String(duration).trim());
  }

  const { data, error } = await query.order('id', { ascending: false });

  if (error) {
    return res.status(500).json({
      message: 'Failed to fetch routes',
      error: error.message,
    });
  }

  return res.status(200).json({
    message: 'Routes fetched successfully',
    data,
  });
};

export const getRouteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  const { data: route, error: routeError } = await supabase
    .from('routes')
    .select('*')
    .eq('id', id)
    .single();

  if (routeError || !route) {
    return res.status(404).json({
      message: 'Route not found',
    });
  }

  const { data: points, error: pointsError } = await supabase
    .from('route_points')
    .select('*')
    .eq('route_id', id)
    .order('ordem', { ascending: true });

  if (pointsError) {
    return res.status(500).json({
      message: 'Failed to fetch route points',
      error: pointsError.message,
    });
  }

  return res.status(200).json({
    ...route,
    points,
  });
};

export const createRoute = async (req: Request, res: Response) => {
  const { titulo, descricao, duracao, dificuldade, cidade, categoria } = req.body;
  const user = res.locals.user;

  if (!titulo?.trim() || !cidade?.trim()) {
    return res.status(400).json({
      message: 'titulo e cidade são obrigatórios',
    });
  }

  const { data, error } = await supabase
    .from('routes')
    .insert({
      titulo: titulo.trim(),
      descricao: descricao?.trim() || '',
      duracao: duracao?.trim() || '',
      dificuldade: dificuldade?.trim() || '',
      cidade: cidade.trim(),
      categoria: categoria?.trim() || '',
      user_id: user.id,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: 'Failed to create route',
      error: error.message,
    });
  }

  return res.status(201).json({
    message: 'Route created successfully',
    route: data,
  });
};

export const updateRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { titulo, descricao, duracao, dificuldade, cidade, categoria } = req.body;
  const user = res.locals.user;

  const { data: existingRoute, error: existingError } = await supabase
    .from('routes')
    .select('*')
    .eq('id', id)
    .single();

  if (existingError || !existingRoute) {
    return res.status(404).json({
      message: 'Route not found',
    });
  }

  if (existingRoute.user_id !== user.id) {
    return res.status(403).json({
      message: 'You can only update your own routes',
    });
  }

  if (
    !titulo?.trim() ||
    !descricao?.trim() ||
    !duracao?.trim() ||
    !dificuldade?.trim() ||
    !cidade?.trim() ||
    !categoria?.trim()
  ) {
    return res.status(400).json({
      message: 'titulo, descricao, duracao, dificuldade, cidade e categoria são obrigatórios',
    });
  }

  const { data, error } = await supabase
    .from('routes')
    .update({
      titulo: titulo.trim(),
      descricao: descricao.trim(),
      duracao: duracao.trim(),
      dificuldade: dificuldade.trim(),
      cidade: cidade.trim(),
      categoria: categoria.trim(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: 'Failed to update route',
      error: error.message,
    });
  }

  return res.status(200).json({
    message: 'Route updated successfully',
    route: data,
  });
};

export const deleteRoute = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user;

  const { data: existingRoute, error: existingError } = await supabase
    .from('routes')
    .select('*')
    .eq('id', id)
    .single();

  if (existingError || !existingRoute) {
    return res.status(404).json({
      message: 'Route not found',
    });
  }

  if (existingRoute.user_id !== user.id) {
    return res.status(403).json({
      message: 'You can only delete your own routes',
    });
  }

  const { error } = await supabase
    .from('routes')
    .delete()
    .eq('id', id);

  if (error) {
    return res.status(500).json({
      message: 'Failed to delete route',
      error: error.message,
    });
  }

  return res.status(200).json({
    message: 'Route deleted successfully',
  });
};