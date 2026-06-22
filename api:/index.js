import express from 'express';
const app = express();
const PORT = process.env.PORT || 3000;

// API Route Example
app.get('/api/hello', (req, res) => {
  res.json({ message: 'Hello from Express backend!' });
});

// For local testing
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app; // 👈 Required for ES Modules on Vercel