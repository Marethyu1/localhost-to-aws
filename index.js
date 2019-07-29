const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const app = express();
const port = process.env.PORT || 8080;
const upload = multer({dest: 'uploads/'});

const images_folder = path.join(__dirname, `/uploads`);


app.get('/', (req, res) => {
  console.log("I have received a request");
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
  fs.createReadStream(file_path)
    .pipe(res)
});

app.get('/images/:id/resize', (req, res) => {
  const id = req.params.id
  const roundedCorners = Buffer.from(
    '<svg><rect x="0" y="0" width="200" height="200" rx="50" ry="50"/></svg>'
  );

  const roundedCornerResizer = sharp()
      .resize(200, 200)
      .composite([{
        input: roundedCorners,
        blend: 'dest-in'
      }])
      .png();

  fs.createReadStream(path.join(images_folder, id))
    .pipe(roundedCornerResizer)
    .pipe(res)
});


app.listen(port, function() {
  console.log(`App running on port ${port}`)
});
