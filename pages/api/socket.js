import { Server } from "socket.io";

const SocketHandler = (req, res) => {
  if (res.socket.server.io) {
    console.log("Socket is already running");
  } else {
    console.log("Socket is initializing");
    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.on("connection", (socket) => {
      console.log("socket established " + new Date().toString());

      socket.on("join-room", (data) => {
        console.log("USER JOINED", data);
        const { roomId, language, user } = data;

        socket.join(roomId);

        if (!res.rooms) {
          res.rooms = {};
          res.rooms[roomId] = {};
        }

        if (!res.rooms[roomId].language) res.rooms[roomId].language = language;

        console.log(res.rooms);

        socket.to(roomId).emit("new-user-connect", data);

        socket.on("disconnect", () => {
          socket.to(roomId).emit("user-disconnected", user);
        });

        socket.on("code-change", (code) => {
          res.rooms[roomId].code = code;
          socket.to(roomId).emit("update-code", code);
        });
      });
    });
  }
  res.end();
};

export default SocketHandler;
