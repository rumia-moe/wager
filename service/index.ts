/*

  wager-service
  Copyright (C) 2026  rumia-moe

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published
  by the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU Affero General Public License for more details.

  You should have received a copy of the GNU Affero General Public License
  along with this program.  If not, see <https://www.gnu.org/licenses/>.

*/

import { Server } from "socket.io";
import { Server as Engine } from "@socket.io/bun-engine";
import { Hono } from "hono";

const io = new Server();
const engine = new Engine();

io.bind(engine);

io.on("connection", (socket) => {
  // ...
});

const app = new Hono();

const { websocket } = engine.handler();

export default {
  port: 3000,
  idleTimeout: 30, // must be greater than the "pingInterval" option of the engine, which defaults to 25 seconds

  fetch(req: Request, server: Bun.Server<unknown>) {
    const url = new URL(req.url);

    if (url.pathname === "/socket.io/") {
      return engine.handleRequest(req, server);
    } else {
      return app.fetch(req, server);
    }
  },

  websocket,
};
