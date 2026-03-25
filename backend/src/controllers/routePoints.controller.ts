import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const createRoutePoint = async (req: Request, res: Response) => {
  const { route_id, name, descricao, morada, ordem } = req.body;
  const user = res.locals.user;

  if (!route_id || !name?.trim() || !ordem) {
    return res.status(400).json({
      message: 'route_id, name e ordem são obrigatórios',
    });
  }

  const { data: route, error: routeError } = await supabase
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

  const { data, error } = await supabase
    .from('route_points')
    .insert({
      route_id,
      nome: name.trim(),
      descricao: descricao?.trim() || null,
      morada: morada?.trim() || null,
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

export const deleteRoutePoint = async (req: Request, res: Response) => {
  const { id } = req.params;
  const user = res.locals.user;

  const { data: point, error: pointError } = await supabase
    .from('route_points')
    .select('*')
    .eq('id', id)
    .single();

  if (pointError || !point) {
    return res.status(404).json({
      message: 'Route point not found',
    });
  }

  const { data: route, error: routeError } = await supabase
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

  const { error } = await supabase
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

export const listRoutePoints = async (req: Request, res: Response) => {
  const { data, error } = await supabase
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