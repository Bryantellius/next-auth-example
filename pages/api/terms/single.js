import terms from "../../../data/terms.json";

export default async (req, res) => {
  let random = Math.floor(Math.random() * terms.length);
  res.json(terms[random]);
};
