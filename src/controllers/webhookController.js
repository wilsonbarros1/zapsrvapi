// src/controllers/webhookController.js

const supabaseService = require('../services/supabaseService');

async function handleWebhook(req, res) {
  try {
    // Extrai o JSON da solicitação
    const jsonData = req.body;
    // console.log('Dados recebidos:', jsonData);

    // Salva o JSON no Supabase
    await supabaseService.saveToSupabase(jsonData);

    // Responde ao webhook indicando sucesso
    res.status(200).json({ success: true });
  } catch (error) {
    console.error('Erro ao salvar no supabase:', error);
    res.status(500).json({ error: 'Erro interno no servidor' });
  }
}

module.exports = {
  handleWebhook,
};


