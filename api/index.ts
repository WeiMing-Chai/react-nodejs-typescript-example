import * as http from "http";
import App from "./app";
import logger from "./logger/logger";


const port = 4200;

App.set("port", port);
const server = http.createServer(App);
server.listen(port);

server.on("listening", function(): void {
    const addr = server.address();
    if (addr == null) {
        return
    }
    const bind = (typeof addr === "string") ? `pipe ${addr}` : `port ${addr.port}`;
    // logger.info(`Listening on ${bind}`);
 });

module.exports = App;