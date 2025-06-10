const express = require('express');
const multer = require('multer');
const path = require('path');
const app = express();
const PORT = 5000;

const uploadFolder = path.join(__dirname, 'uploads');
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadFolder),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use((req, res) => {
  res.status(404).sendFile(path.join(__dirname, 'public', '404.html'));
});

app.post('/upload', upload.single('file'), (req, res) => {
  console.log('File uploaded:', req.file.filename);
  res.send('File uploaded successfully');
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running at http://localhost:${PORT}`);
});

