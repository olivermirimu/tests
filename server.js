const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer();
const port = 3000;

app.post('/upload', upload.any(), (req, res) => {
  console.group(req.files);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.end('Done');
});

app.get('/', (req, res) => res.send('Hey dummy'));
app.listen(port, () => {
  console.log('App listening on port 3000');
})