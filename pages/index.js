import Layout from "../components/layout";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import ReactAce from "react-ace-editor";

let socket;
let ace;

export default function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [code, setCode] = useState("console.log('Hello World')");

  const onChange = (updatedCode) => {
    setCode(updatedCode);
    socket.emit("update-code", updatedCode);
  };

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("STATUS: connected");
      setIsConnected(true);
    });

    socket.on("update-code", (value) => setCode(value));
  };

  useEffect(() => {
    initializeSocket();
  }, []);

  return (
    <Layout>
      <h1>BB Terms (NextAuth.js x Socket.io)</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication
        and <a href="https://socket.io">Socket.io</a> for real-time
        communication.
      </p>
      <p>
        Socket Status:{" "}
        <sup
          style={{
            display: "inline-block",
            backgroundColor: isConnected ? "green" : "red",
            width: "10px",
            height: "10px",
            borderRadius: "9999px",
          }}
        ></sup>
      </p>
      <ReactAce
        mode="javascript"
        theme="eclipse"
        setReadOnly={false}
        onChange={onChange}
        style={{ width: "100%", minHeight: "300px" }}
        ref={(instance) => {
          ace = instance;
        }}
      />
    </Layout>
  );
}
