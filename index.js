const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const app = express();
const port = process.env.PORT || 8080;
const upload = multer({dest: 'uploads/'});

const images_folder = path.join(__dirname, `/uploads`);


app.get('/', (req, res) => {
  res.send("Hello world")
});

app.post('/images', upload.single('image'), (req, res) => {
  res.send(req.file)
});

app.get('/images', (req, res) => {
  fs.readdir(images_folder, (err, file_names) => {
    res.send({
      "images": file_names
    })
  });
});

app.get('/images/:id', (req, res) => {
  const id = req.params.id;
  const file_path = path.join(images_folder, `${id}`);
  res.sendFile(file_path)
});

app.listen(port, function() {
  console.log(`App running on port ${8080}`)
});
