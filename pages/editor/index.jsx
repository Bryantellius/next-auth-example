import dynamic from "next/dynamic";
import Layout from "../../components/layout";
import { useState, useEffect } from "react";
import io from "socket.io-client";
import Console from "../../components/Console";
import { useRouter } from "next/router";

let socket;

const Editor = dynamic(() => import("../../components/Editor"), { ssr: false });

export default function Page() {
  const router = useRouter();

  const [isConnected, setIsConnected] = useState(false);
  const [code, setCode] = useState("");
  const [output, setOutput] = useState({ stdout: "" });

  const { roomId, language } = router.query;

  const onChange = (updatedCode) => {
    setCode(updatedCode);
    socket.emit("code-change", updatedCode);
  };

  const initializeSocket = async () => {
    await fetch("/api/socket");
    socket = io();

    socket.on("connect", () => {
      console.log("STATUS: connected");
      socket.emit("join-room", { roomId, language, user: { name: "Ben" } });
      setIsConnected(true);
      socket.on("update-code", (value) => setCode(value));
    });
  };

  const onRun = async () => {
    let body = {
      name: "main",
      content: code,
      language: language,
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
      <div className="container">
        <h1>
          {language} room {roomId}
        </h1>
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
        <div className="d-flex justify-content-end align-items-center my-1">
          <div className="btn-group">
            <button
              className="btn btn-secondary"
              onClick={() => {
                setCode("console.log('Hello World')");
                setOutput({ stdout: "Hello World" });
              }}
            >
              Reset
            </button>
            <button className="btn btn-success" onClick={onRun}>
              Run
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6">
            <Editor
              value={code}
              language={language}
              onChange={onChange}
              style={{ width: "100%", minHeight: "300px" }}
            />
          </div>
          <div className="col-lg-6">
            <Console value={output.stderr || output.stdout} />
          </div>
        </div>
      </div>
    </Layout>
  );
}
