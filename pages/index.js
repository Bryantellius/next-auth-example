import { useState } from "react";
import Layout from "../components/layout";

export default function Page() {
  const [term, setTerm] = useState(null);

  const loadTerm = async () => {
    let res = await fetch("/api/terms/single");
    let data = await res.json();
    setTerm(data);
  };

  return (
    <Layout>
      <h1>BB Terms (NextAuth.js)</h1>
      <p>
        This is an example site to demonstrate how to use{" "}
        <a href={`https://next-auth.js.org`}>NextAuth.js</a> for authentication.
      </p>
      <button onClick={loadTerm}>Load Term</button>
      <div>
        <h2>{term?.term || "TERM"}</h2>
        <p>{term?.def || "DEFINITION"}</p>
        <p>
          Learn more at <a href={term?.src || "#"}>{term?.src || "SOURCE"}</a>
        </p>
      </div>
    </Layout>
  );
}
