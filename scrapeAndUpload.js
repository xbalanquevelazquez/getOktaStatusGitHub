const fs = require('fs');
const path = require('path');

const express = require('express');
const axios = require('axios');
// Importa la lógica de scraping que ya tienes.
// Asegúrate de que la ruta al archivo sea correcta.
const { scrapeOktaStatusLogic } = require('./scrapeOktaStatusLogic'); // <-- CAMBIA ESTO SI TU ARCHIVO SE LLAMA DIFERENTE

const app = express();
// Render te asignará un puerto, o usaremos el 3000 para pruebas locales.
const PORT = process.env.PORT || 3000;

(async () => {
  try {
    const data = await scrapeOktaStatusLogic();

    const jsonData = {
      updatedAt: new Date().toISOString(),
      data
    };

    const outputPath = path.join(__dirname, 'docs', 'oktaStatus.json');
    fs.mkdirSync(path.dirname(outputPath), { recursive: true });
    fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2));

    console.log('✅ JSON generado y guardado en docs/oktaStatus.json');
  } catch (err) {
    console.error('❌ Error en scraping:', err);
    process.exit(1);
  }
})();
