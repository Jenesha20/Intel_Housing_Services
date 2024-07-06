const { connectdb } = require('./connect');
const controller = require('./controller');
const cors = require('cors');
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads')); 
// Connect to database
console.log("Server started")
connectdb()
    .then(() => { console.log('db connected') })
    .catch((err) => { console.log(err) });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory where files will be stored temporarily
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });
    
// Routes
app.post('/api/user', controller.insertUser); 
app.post('/api/worker',controller.insertAdmin);

app.get('/api/user/:mobno', controller.getUser); 
app.get('/api/user', controller.getAllUsers);

app.get('/api/worker/:mobno', controller.getAdmin); 
app.get('/api/worker', controller.getallAdmin);

app.get('api/user/:city',controller.getLoc);


app.put('/api/worker/:mobno', upload.single('image'), controller.updateAdmin);


// Server
const port = 3000;
app.listen(port, () => {
    console.log(`Listening at port ${port}`)
});
