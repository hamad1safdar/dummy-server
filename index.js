const express = require("express");

const app = express();
const PORT = 3000;

app.get("/cookie", (req, res) => {
  res.cookie("express", "test", {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
