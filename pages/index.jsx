import dynamic from "next/dynamic";
import Layout from "../components/layout";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Console from "../components/Console";

let socket;

const Editor = dynamic(() => import("../components/Editor"), { ssr: false });

export default function Page() {
  const [isConnected, setIsConnected] = useState(false);
  const [code, setCode] = useState("console.log('Hello World')");
  const [output, setOutput] = useState({ stdout: "Hello World" });
  const [language, setLanguage] = useState("javascript");

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

  const onRun = async () => {
    let body = {
      name: "main",
      content: code,
      language: "javascript",
    };

    let res = await fetch("/api/code/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    let data = await res.json();
    console.log(data);
    setOutput(data);
  };

  useEffect(() => {
    initializeSocket();
  }, []);

  return (
    <Layout>
      <h1>BB Collab (NextAuth.js x Socket.io)</h1>
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
      <div className="d-flex justify-content-between align-items-center my-1">
        <select
          name="language"
          id="language"
          className="form-control w-auto"
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="javascript">JS</option>
          <option value="typescript">TS</option>
          <option value="csharp">C#</option>
          <option value="java">Java</option>
          <option value="python">Python</option>
        </select>
        <span>{language.toUpperCase()}</span>
        <div className="btn-group">
          <button
            className="btn btn-secondary"
            onClick={() => {
              setCode("console.log('Hello World')");
              setOutput("Hello World");
            }}
          >
            Reset
          </button>
          <button className="btn btn-success" onClick={onRun}>
            Run
          </button>
        </div>
      </div>
      <Editor
        value={code}
        language={language}
        onChange={onChange}
        style={{ width: "100%", minHeight: "300px" }}
      />
      <Console value={output.stderr || output.stdout} />
    </Layout>
  );
}
