import 'reflect-metadata';
import cors from 'cors';
import './controllers/user.controller';
import { Container } from "inversify";
import { TOKENS } from "./tokens";
import { IDbService, DbService } from "./services/db.service";
import { InversifyExpressServer } from 'inversify-express-utils';

const IOC = new Container();
IOC.bind<IDbService>(TOKENS.DbService).to(DbService).inSingletonScope();

const PORT = Number(process.env.PORT) || 8000;

const server = new InversifyExpressServer(IOC);
server.setConfig((app) => {
    app.use(cors());
});

const app = server.build();
app.listen(PORT, '0.0.0.0', () => {
    console.log(`⚡️[server]: Server is running at http://0.0.0.0:${PORT}`);
});
