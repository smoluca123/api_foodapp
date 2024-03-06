import express from 'express';
import cors from 'cors';
import rootRouter from './routes/rootRoute.js';
import config from './config/config.js';

const app = express();

app.use(cors());

app.use(express.json());

app.use(rootRouter);

app.listen(config.port || 3000, () => {
  console.log('Server running on port ' + (config.port || 3000));
});
