import { Router } from 'express';
import { authMiddleware } from '../middlewares/auth.middleware';
import { supabase } from '../config/supabase';
const router = Router();

// CRIAR ROTEIRO COM PONTOS (O que estavas a falhar)
router.post('/', authMiddleware, async (req, res) => {
  const { titulo, duracao, dificuldade, pontos, user_id } = req.body;

  // 1. Guarda o roteiro principal
  const { data: roteiro, error: errRot } = await supabase
    .from('roteiros')
    .insert([{ titulo, duracao, dificuldade, user_id }])
    .select().single();

  if (errRot) return res.status(400).json(errRot);

  // 2. Guarda os pontos associados a esse roteiro [Requisito: 87]
  if (pontos && pontos.length > 0) {
    const pontosFormatados = pontos.map((p: string) => ({
      nome: p, 
      roteiro_id: roteiro.id 
    }));
    await supabase.from('pontos_interesse').insert(pontosFormatados);
  }

  res.status(201).json(roteiro);
});

// ADICIONAR AOS FAVORITOS [Requisito: 90]
router.post('/favoritos', authMiddleware, async (req, res) => {
  const { user_id, roteiro_id } = req.body;
  const { error } = await supabase
    .from('favoritos')
    .insert([{ user_id, roteiro_id }]);

  if (error) return res.status(400).json(error);
  res.json({ mensagem: "Guardado nos favoritos!" });
});

export default router;