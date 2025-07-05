const express = require('express');
const axios = require('axios');
// Importa la lógica de scraping que ya tienes.
// Asegúrate de que la ruta al archivo sea correcta.
const { scrapeOktaStatusLogic } = require('./scrapeOktaStatusLogic'); // <-- CAMBIA ESTO SI TU ARCHIVO SE LLAMA DIFERENTE

const app = express();
// Render te asignará un puerto, o usaremos el 3000 para pruebas locales.
const PORT = process.env.PORT || 3000;

async function uploadToJSONBin(data) {
  const BIN_ID = process.env.JSONBIN_BIN_ID;
  const API_KEY = process.env.JSONBIN_API_KEY;

  const url = `https://api.jsonbin.io/v3/b/${BIN_ID}`;
  try {
    const res = await axios.put(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'X-Master-Key': API_KEY,
        'X-Bin-Private': false
      }
    });

    console.log(`✅ Datos subidos exitosamente. Status: ${res.status}`);
  } catch (err) {
    console.error('❌ Error al subir a JSONBin:', err.response?.data || err.message);
  }
}

(async () => {
  try {
    const data = await scrapeOktaStatusLogic();
    console.log('Scraping successful.');
    await uploadToJSONBin({ updatedAt: new Date().toISOString(), data });
  } catch (error) {
    console.error('❌ Error en scraping:', error);
    process.exit(1);
  }
})();

