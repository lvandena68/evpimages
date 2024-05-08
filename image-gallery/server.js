const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static('public'));

// Multer setup for storing uploaded files
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        // cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
        cb(null,file.originalname)
    }
});

const upload = multer({ storage: storage });

// Routes
app.post('/upload', upload.single('image'), (req, res) => {
    res.send('Image uploaded successfully!');
});

app.get('/images/:filename', (req, res) => {
    const filename = req.params.filename;
    res.sendFile(path.join(__dirname, 'uploads', filename));
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

const fs = require('fs');

app.get('/images', (req, res) => {
    fs.readdir('uploads', (err, files) => {
        if (err) {
            return res.sendStatus(500);
        }
        res.json(files);
    });
});

