// src/index.ts
import express, { json, urlencoded } from 'express';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { addReceipt } from './infrastructure/express/addreceipt';
import fileUpload from 'express-fileupload';
import cors from 'cors';

const client = new SuiClient({ url: getFullnodeUrl('devnet') });
const port = 3000;

const app = express();
// app.use(urlencoded());
app.use(json({limit: '100mb'}));
app.use(cors());
app.use(fileUpload({
    limits: {
        fileSize: 1024 * 1024 * 100
    }
}));

app.post('/addreceipt', addReceipt(client));

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
