import { WebSocketServer } from "ws";
import { client } from "@repo/db/client";

const server = new WebSocketServer({ port: 3001 });

server.on("connection", (socket) => {
  console.log("New client connected");

  // Save user to DB
  client.user
    .create({
      data: {
        username: Math.random().toString(),
        password: Math.random().toString(),
      },
    })
    .then(() => console.log("User created"))
    .catch((err) => console.error("DB Error:", err));

  socket.send("Connected to 3001");

  socket.on("message", (message) => {
    console.log("Received:", message.toString());
  });

  socket.on("close", () => {
    console.log("Client disconnected");
  });
});

console.log("WebSocket server running on ws://localhost:3001");
