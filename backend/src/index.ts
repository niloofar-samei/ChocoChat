import express from "express";
import cors from "cors";
import http from "http";
import {Server} from "socket.io";

interface ChatMessage {
  username: string;
  text: string;
  timestamp: string;
}

const app = express();
const server = http.createServer(app);
const PORT = 4000;
const io = new Server(server, {
  cors: {origin: "http://localhost:5173"},
});

app.use(cors());
app.use(express.json());

io.on("connection", (socket) => {
  console.log("User connected:", socket.id);

  socket.on("chat message", (msg: Omit<ChatMessage, "timestamp">) => {
    const messageWithTime: ChatMessage = {
      ...msg,
      timestamp: new Date().toLocaleTimeString(),
    };
    
    io.emit("chat message", messageWithTime);
  });

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});


server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
