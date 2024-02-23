import express from 'express';
import authRoutes from './routes/authRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import bodyParser from 'body-parser';
import swaggerDocs from './utils/swagger.js';

const app = express();

app.use(bodyParser.json());

app.use('/v1/auth', authRoutes);
app.use('/v1/community', communityRoutes);
app.use('/v1/role', roleRoutes);
app.use('/v1/member', memberRoutes);

// Start the server
const PORT = process.env.PORT ||  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  swaggerDocs(app);
});
