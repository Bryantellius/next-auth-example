const GLOT_TOKEN = process.env.GLOT_TOKEN;
const GLOT_URL = process.env.GLOT_RUN_URL;

export default async (req, res) => {
  const { name, content, language } = req.body;
  let langExt = getLangExt(language);

  let result = await fetch(`${GLOT_URL}${language}/latest`, {
    method: "POST",
    headers: { Authorization: `Token ${GLOT_TOKEN}` },
    body: JSON.stringify({ files: [{ name: name + langExt, content }] }),
  });
  let data = await result.json();
  res.json(data);
};

function getLangExt(language) {
  switch (language) {
    case "javascript":
      return ".js";
    case "typescript":
      return ".ts";
    case "csharp":
      return ".cs";
    case "java":
      return ".java";
    case "python":
      return ".py";
  }
}
