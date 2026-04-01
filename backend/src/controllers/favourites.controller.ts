import { Request, Response } from 'express';
import { supabase } from '../config/supabase';

export const listFavourites = async (_req: Request, res: Response) => {
  const user = res.locals.user;

  const { data, error } = await supabase
    .from('favourites')
    .select(`
      id,
      route_id,
      created_at,
      routes (
        id,
        titulo,
        descricao,
        cidade, 
        duracao,
        dificuldade,
        image_url
      )
    `)
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    return res.status(500).json({
      message: 'Failed to fetch favourites',
      error: error.message,
    });
  }

  return res.status(200).json({
    favourites: data,
  });
};

export const addFavourite = async (req: Request, res: Response) => {
  const { route_id } = req.body;
  const user = res.locals.user;

  if (!route_id) {
    return res.status(400).json({
      message: 'route_id is required',
    });
  }

  const { data: route, error: routeError } = await supabase
    .from('routes')
    .select('id')
    .eq('id', route_id)
    .single();

  if (routeError || !route) {
    return res.status(404).json({
      message: 'Route not found',
    });
  }

  const { data: existingFavourite, error: existingFavouriteError } = await supabase
    .from('favourites')
    .select('id')
    .eq('user_id', user.id)
    .eq('route_id', route_id)
    .maybeSingle();

  if (existingFavouriteError) {
    return res.status(500).json({
      message: 'Failed to validate favourite',
      error: existingFavouriteError.message,
    });
  }

  if (existingFavourite) {
    return res.status(400).json({
      message: 'Route is already in favourites',
    });
  }

  const { data, error } = await supabase
    .from('favourites')
    .insert({
      user_id: user.id,
      route_id,
    })
    .select()
    .single();

  if (error) {
    return res.status(500).json({
      message: 'Failed to add favourite',
      error: error.message,
    });
  }

  return res.status(201).json({
    message: 'Favourite added successfully',
    favourite: data,
  });
};

export const removeFavourite = async (req: Request, res: Response) => {
  const { routeId } = req.params;
  const user = res.locals.user;

  const { data: favourite, error: favouriteError } = await supabase
    .from('favourites')
    .select('id')
    .eq('user_id', user.id)
    .eq('route_id', routeId)
    .maybeSingle();

  if (favouriteError) {
    return res.status(500).json({
      message: 'Failed to validate favourite',
      error: favouriteError.message,
    });
  }

  if (!favourite) {
    return res.status(404).json({
      message: 'Favourite not found',
    });
  }

  const { error } = await supabase
    .from('favourites')
    .delete()
    .eq('user_id', user.id)
    .eq('route_id', routeId);

  if (error) {
    return res.status(500).json({
      message: 'Failed to remove favourite',
      error: error.message,
    });
  }

  return res.status(200).json({
    message: 'Favourite removed successfully',
  });
};