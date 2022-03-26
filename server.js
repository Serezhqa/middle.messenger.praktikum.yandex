const express = require('express');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('*', (request, response) => {
  return response.sendFile(path.resolve(`${__dirname}/dist/index.html`));
});

app.listen(port, () => {
});
