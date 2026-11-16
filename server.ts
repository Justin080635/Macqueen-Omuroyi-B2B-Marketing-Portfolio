import express from 'express';
import path from 'path';
import fs from 'fs';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';

const app = express();
const PORT = 3000;

// Support larger payload for uploaded image data URLs
app.use(express.json({ limit: '20mb' }));
app.use(express.urlencoded({ extended: true, limit: '20mb' }));

const DATA_DIR = path.join(process.cwd(), 'data');
const CONTENT_FILE = path.join(DATA_DIR, 'site_content.json');

// Ensure data directory exists
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

// SHA-256 hash of the default expected passcode (passcode is never stored in plaintext)
const HASH_TARGET = '0a1ed8d5320f5d1748bce0013d4091e10222f2dd34d15d79d24743bdce433f11';

// API: Verify Admin Passcode
app.post('/api/admin/verify', (req, res) => {
  try {
    const { passcode } = req.body;
    if (!passcode || typeof passcode !== 'string') {
      return res.status(400).json({ valid: false, error: 'Passcode is required' });
    }

    // Check against custom env override or SHA-256 hash
    const envPasscode = process.env.ADMIN_PASSCODE;
    if (envPasscode && passcode.trim() === envPasscode.trim()) {
      return res.json({ valid: true, authenticated: true });
    }

    const calculatedHash = crypto.createHash('sha256').update(passcode.trim()).digest('hex');
    const isValid = calculatedHash === HASH_TARGET;

    return res.json({ valid: isValid, authenticated: isValid });
  } catch (err) {
    console.error('Error in /api/admin/verify:', err);
    return res.status(500).json({ valid: false, error: 'Internal server error' });
  }
});

// API: Get current site content
app.get('/api/content', (req, res) => {
  try {
    if (fs.existsSync(CONTENT_FILE)) {
      const raw = fs.readFileSync(CONTENT_FILE, 'utf-8');
      const data = JSON.parse(raw);
      return res.json(data);
    }
    return res.json({ status: 'default', message: 'Using default content' });
  } catch (err) {
    console.error('Error reading site content:', err);
    return res.status(500).json({ error: 'Failed to read content' });
  }
});

// API: Save site content
app.post('/api/content', (req, res) => {
  try {
    const content = req.body;
    if (!content || !content.testimonials) {
      return res.status(400).json({ error: 'Invalid content format' });
    }

    // Ensure maximum 5 visible testimonials constraint
    const visibleCount = content.testimonials.filter((t: { isVisible?: boolean }) => t.isVisible !== false).length;
    if (visibleCount > 5) {
      let count = 0;
      content.testimonials = content.testimonials.map((t: { isVisible?: boolean }) => {
        if (t.isVisible !== false) {
          count++;
          return { ...t, isVisible: count <= 5 };
        }
        return { ...t, isVisible: false };
      });
    }

    content.lastUpdated = new Date().toISOString();
    fs.writeFileSync(CONTENT_FILE, JSON.stringify(content, null, 2), 'utf-8');

    return res.json({ success: true, message: 'Content persisted globally', timestamp: content.lastUpdated });
  } catch (err) {
    console.error('Error saving site content:', err);
    return res.status(500).json({ error: 'Failed to save content' });
  }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

async function startServer() {
  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
