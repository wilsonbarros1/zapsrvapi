// src/services/supabaseService.js

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://cmwwoobhmdyvzyzcfacu.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNtd3dvb2JobWR5dnp5emNmYWN1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY1Mzc1OTksImV4cCI6MjAyMjExMzU5OX0.hfd77-IgYoLr84Tcj8Jca6kR3EwjRAgLlZmUd7mw_EY';
const supabase = createClient(supabaseUrl, supabaseKey);

// Função para mapear o tipo de mensagem e obter a mensagem relevante
function mapMessageType(data) {
  let messageType, mensagem;

  if (data.audio) {
    messageType = 'is_audio';
    mensagem = data.audio.audioUrl;
  } else if (data.image) {
    messageType = 'is_imagem';
    mensagem = data.image.imageUrl;
  } else if (data.document) {
    messageType = 'is_documento';
    mensagem = data.document.documentUrl;
  } else if (data.video) {
    messageType = 'is_video';
    mensagem = data.video.videoUrl;
  } else if (data.text) {
    messageType = 'is_texto';
    mensagem = data.text.message;
  } else if (data.sticker) {
    messageType = 'is_figurinha';
    mensagem = data.sticker.stickerUrl;
  }

  return { messageType, mensagem };
}

// Função principal para salvar no Supabase
async function saveToSupabase(data) {
  try {
    // Mapear o tipo de mensagem e obter a mensagem relevante
    const { messageType, mensagem } = mapMessageType(data);

    if (data.type !== 'DeliveryCallback') {
      const { data: insertedData, error } = await supabase
        .from('mensagem_new')
        .insert([
          {
            mensagem,
            [messageType]: true,
            is_audio: data.audio != null,
            is_imagem: data.image != null,
            is_documento: data.document != null,
            is_video: data.video != null,
            is_texto: data.text != null,
            is_figurinha: data.sticker != null,
            isStatusReply: data.isStatusReply,
            chatLid: data.chatLid,
            connectedPhone: data.connectedPhone,
            waitingMessage: data.waitingMessage,
            isEdit: data.isEdit,
            isGroup: data.isGroup,
            instanceId: data.instanceId,
            isNewsletter: data.isNewsletter,
            messageId: data.messageId,
            phone: data.phone,
            momment: data.momment,
            status: data.status,
            chatName: data.chatName,
            senderPhoto: data.senderPhoto,
            senderName: data.senderName,
            photo: data.photo,
            broadcast: data.broadcast,
            participantLid: data.participantLid,
            forwarded: data.forwarded,
            type: data.type,
            fromApi: data.fromApi,
            os_who_sent_id: '3'
          }
        ]);

      if (error) {
        console.error('Erro do Supabase:', error.message);
      } else {
        console.log('Return Supabase: Save!');
      }

      return insertedData;
    }
  } catch (error) {
    console.error('Erro ao salvar no Supabase:', error.message);
    throw error;
  }
}

module.exports = { saveToSupabase };