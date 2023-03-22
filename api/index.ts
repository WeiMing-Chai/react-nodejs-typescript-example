import * as http from "http";
import App from "./app";
import { Logger } from "./logger/logger";

// import * as dotenv from 'dotenv';
// const result = dotenv.config({ path: __dirname+'/./.env', debug: true });
// if (result.error) {
//     throw result.error;
// }

const port = 3080;

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

const logger = new Logger();

server.on("listening", function(): void {
    const addr = server.address();
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    logger.info(`Listening on ${bind}`);
 });

module.exports = App;