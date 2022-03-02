import Layout from "../components/layout";
import { useState } from "react";
import { useRouter } from "next/router";
import id_16 from "id-16";

export default function Home() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [language, setLanguage] = useState("javascript");
  const [roomId, setRoomId] = useState("");

  const router = useRouter();
  const id_generator = id_16.generator(6);

  const createRoom = () => {
    router.push(
      `/editor?roomId=${id_generator()}&language=${language}`,
      undefined,
      { shallow: true }
    );
  };

  const joinRoom = async () => {
    let res = await fetch("/api/join", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roomId }),
    });
    let data = await res.json();
    if (!data.connect) alert(data.msg);
  };

  return (
    <Layout>
      <div className="container text-center">
        <h1>Welcome to Collab! 👋</h1>
        <p>
          This is a place where you can create a coding room and dev out with
          another programmer!
        </p>
        <hr />
        <h2>What would you like to do?</h2>
        <div className="row my-3">
          <div className="col-sm-6">
            <div className="card shadow card-dark">
              <div className="card-body">
                <h3 className="h3 mb-3">Create a room</h3>
                <label htmlFor="languageSelect">
                  Select a programming language:
                </label>
                <div className="input-group my-3">
                  <select
                    aria-label="Select a programming language"
                    className="form-control custom-select"
                    id="languageSelect"
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                  >
                    <option value="javascript">JS</option>
                    <option value="typescript">TS</option>
                    <option value="csharp">C#</option>
                    <option value="java">Java</option>
                    <option value="python">Python</option>
                  </select>
                  <div className="input-group-append">
                    <button className="btn btn-success" onClick={createRoom}>
                      Create
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card shadow card-dark">
              <div className="card-body">
                <h3 className="h3 mb-3">Join a room</h3>
                <label htmlFor="roomId">
                  What's the room ID you're looking to join?
                </label>
                <div className="input-group my-3">
                  <input
                    className="form-control"
                    type="text"
                    name="roomId"
                    id="roomId"
                    max-length={6}
                    min-length={6}
                    required
                    aria-label="Room Id to Join"
                    placeholder="aBcDef567!"
                    value={roomId}
                    onChange={(e) => setRoomId(e.target.value)}
                  />
                  <div className="input-group-append">
                    <button
                      className="btn btn-primary"
                      disabled={roomId.length > 6 || roomId.length < 6}
                      onClick={joinRoom}
                    >
                      Join
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
