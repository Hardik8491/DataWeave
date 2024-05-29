import express from 'express';
import http from 'http';
import cors from 'cors';
import 'dotenv/config';

import { record, workflow, storage } from './routes';
import { BrowserPool } from "./browser-management/classes/BrowserPool";
import logger from './logger'
import { SERVER_PORT } from "./constants/config";
import {Server} from "socket.io";

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

/**
 * Globally exported singleton instance of socket.io for socket communication with the client.
 * @type {Server}
 */
export const io = new Server(server);

/**
 * {@link BrowserPool} globally exported singleton instance for managing browsers.
 */
export const browserPool = new BrowserPool();

app.get('/', function (req, res) {
    return res.send('Welcome to the BR recorder server :-)');
});

server.listen(SERVER_PORT, () => logger.log('info',`Server listening on port ${SERVER_PORT}`));
