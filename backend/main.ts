import express from 'express';
import { Service } from './service';
import cors from 'cors';
import { connectDb } from '../db/connection';

const PORT = Number(process.env.PORT) || 8000;

const app = express();
app.use(cors());

const service = new Service();

app.get('/user', (req, res) => {
    return res.json({
        hello: 'world!'
    });
});

app.get('/test-db', async (req, res) => {
    console.log('got req')
    // const db = await connectDb();
    // console.log('got req')

    return res.json({});
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);

});

