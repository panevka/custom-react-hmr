import express from "express";

const PORT = 3000;
const app = express();

app.use(express.static(import.meta.dirname));

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
