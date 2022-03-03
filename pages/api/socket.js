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
        console.log("User is joining...", data);
        const { roomId, user } = data;

        socket.join(roomId);

        socket.to(roomId).emit("new-user-connect", data);

        socket.on("disconnect", () => {
          socket.to(roomId).emit("user-disconnected", user);
        });

        socket.on("code-change", (code) => {
          socket.to(roomId).emit("update-code", code);
        });

        socket.on("run-code", (data) => {
          socket.to(roomId).emit("code-run", data);
        });

        socket.on("reset-code", () => {
          socket.to(roomId).emit("code-reset");
        });
      });
    });
  }

  res.end();
};

export default SocketHandler;
