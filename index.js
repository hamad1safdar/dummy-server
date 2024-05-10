const express = require("express");
const bodyparser = require("body-parser");
const session = require("express-session");

const app = express();

const PORT = 3000;
const MAX_AGE = 10 * 24 * 60 * 60 * 1000;

const users = [
  { username: "test", password: "test", name: "User One" },
  { username: "user2", password: "password2", name: "User Two" },
];

app.use(bodyparser.json());
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "secret",
    cookie: {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
      maxAge: MAX_AGE,
    },
  })
);

app.get("/", (_req, res) => {
  res.sendFile("Login.html", { root: __dirname });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = users.find(
    (user) => user.username === username && user.password === password
  );
  if (user) {
    req.session.regenerate((err) => {
      if (err) console.log(err);
      req.session.user = username;
      req.session.save((err) => {
        if (err) console.log(err);
        res.sendStatus(200);
      });
    });
  } else {
    res.send("Invalid username or password.");
  }
});

app.get("/profile", (req, res) => {
  const username = req.session.user;
  const user = users.find((user) => user.username === username);
  if (user) {
    res.sendFile("Profile.html", { root: __dirname });
  } else {
    res.send("User not found.");
  }
});

app.get("/session/check", (req, res) => {
  if (req.session.user) {
    res.json({
      authenticated: true,
      user: req.session.user,
    });
  } else {
    res.json({
      authenticated: false,
      user: null,
    });
  }
});

app.get("/presenter", (_req, res) => {
  res.sendFile("Presenter.html", { root: __dirname });
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
