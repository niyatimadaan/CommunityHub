import express from 'express';
import authRoutes from './routes/authRoutes';
import communityRoutes from './routes/communityRoutes';
import roleRoutes from './routes/roleRoutes';
import memberRoutes from './routes/memberRoutes';

const app = express();
app.use('/v1/auth', authRoutes);
app.use('/v1/community', communityRoutes);
app.use('/v1/role', roleRoutes);
app.use('/v1/member', memberRoutes);

// Start the server
const PORT = process.env.PORT ||  3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
