import { app } from './app.js';
import connectDB from './db/index.js';
import { PORT } from './config/index.js';

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`App is listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error('DB connection error', error);
    process.exit(1);
  });
