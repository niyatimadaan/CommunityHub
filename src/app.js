import express from 'express';
import authRoutes from './routes/authRoutes.js';
import communityRoutes from './routes/communityRoutes.js';
import roleRoutes from './routes/roleRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import swaggerJSDoc from 'swagger-jsdoc';
import { setup } from 'swagger-ui-express';
import { serve } from 'swagger-ui-express';
import bodyParser from 'body-parser';
import swaggerDocs from './utils/swagger.js';
// import {swaggerDocument} from '../swagger.json' 

// const swaggerUi = require('swagger-ui-express');

const app = express();

app.use(bodyParser.json());
// app.use('/docs', serve, setup(swaggerDocs));
/**
   * @openapi
   * /v1/auth:
   *  get:
   *     tags:
   *     - Healthcheck
   *     description: Responds if the app is up and running
   *     responses:
   *       200:
   *         description: App is up and running
   */
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


// const swaggerDocument = require('./swagger.json');
// const customCss = fs.readFileSync((process.cwd()+"/swagger.css"), 'utf8');
// let express to use this
// app.use(bodyParser.json());
// app.use('/api-docs', serve, setup());
  // swaggerDocument, {customCss}));