const express = require('express');
const bodyParser = require('body-parser');
const imageUploadRoutes = require('./router');
const cors = require('cors');
const path = require('path');


const app = express();
app.use(bodyParser.json());
app.use(cors());


app.use('/api/v1', imageUploadRoutes);
app.use('/', (req, res) => res.send('hello world!'))

// const appPath = path.join(__dirname, '..', 'build');
// app.use(express.static(appPath));


const PORT = process.env.PORT || 3001;

app.listen(PORT , function() {
    console.log('App is running!');
});
