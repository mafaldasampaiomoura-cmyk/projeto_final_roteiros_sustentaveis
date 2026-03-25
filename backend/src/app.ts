// import express from 'express';
// import routes from './routes/index';

// const app = express();

// app.use(express.json());

// app.get('/', (_req, res) => {
//   res.status(200).json({ message: 'Root works' });
// });

// app.use('/api', routes);

// export default app;

import express from 'express';
import routes from './routes/index';

const app = express();

app.use(express.json());
app.use('/api', routes);

export default app;