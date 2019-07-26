const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const port = process.env.PORT || 8080;
const upload = multer({dest: 'uploads/'});

app.get('/', (req, res) => {
  res.send("Hello world")
});

app.post('/images', upload.single('image'), (req, res) => {
  console.log(req.file)
  res.send('200')
})

app.get('/images/:id', (req, res) => {

  const id = req.params.id;
  const path = path.join(__dirname, `uploads/${id}`);

  res.sendFile(path)
});

app.listen(port, function() {
  console.log(`App running on port ${8080}`)
});
