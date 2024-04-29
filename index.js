const express = require("express");

const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.cookie("express", "test", {
    sameSite: "none",
    secure: true,
    httpOnly: true,
  });
  res.json({
    message: "Cookie set",
  });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
