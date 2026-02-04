import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = process.env.PORT || 3000;

// CRITICAL: Override Express MIME type mappings BEFORE serving files
const mime = express.static.mime;
if (mime && mime.types) {
  mime.types['js'] = 'application/javascript';
  mime.types['mjs'] = 'application/javascript';
}

// Serve static files from .next directory with correct MIME types
app.use(express.static(path.join(__dirname, '.next'), {
  setHeaders: (res, filePath, stat) => {
    const ext = path.extname(filePath).toLowerCase();
    
    // Force correct MIME type for JavaScript modules
    if (ext === '.js' || ext === '.mjs') {
      res.setHeader('Content-Type', 'application/javascript; charset=utf-8');
      res.removeHeader('Content-Disposition');
    } else if (ext === '.css') {
      res.setHeader('Content-Type', 'text/css; charset=utf-8');
    }
  }
}));

// Handle React Router - return index.html for all routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '.next', 'index.html'));
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`Serving files from: ${path.join(__dirname, '.next')}`);
});

