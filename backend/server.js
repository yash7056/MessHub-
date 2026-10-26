import app from './app.js';
import { connectDB } from '../database/db.js';

const PORT = process.env.PORT || 5001;

// Standalone Server Startup (for local dev)
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Server failed to start due to database error:', err);
  });
