import express from 'express'
import {controllers} from './controllers/controllers.js';
import { logmiddleware } from './middlewares/log_middlewares.js';

const app = express();

// Middleware para decodificar JSON del body
app.use(express.json());
app.use(logmiddleware);

controllers(app);

const PORT = 3000;
app.listen(
    PORT,
    ()=>{
        console.log(`servidor corriendo en http://localhost:${PORT}`);
    }
);

