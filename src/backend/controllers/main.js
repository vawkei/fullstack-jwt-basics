const jwt = require("jsonwebtoken");

const login = (req, res) => {
  //console.log(req.body);
  const { name, password } = req.body;
  console.log(name, password);

  if (!name.trim() || !password.trim()) {
    res.status(401).json({ msg: "Inputs cant be EMPTY!!!" });
    return;
  }
  const id = new Date();
  console.log(id);

  const token = jwt.sign({ id, name }, process.env.JWT_SECRET, {
    expiresIn: "20d",
  });

  res.status(200).json({ msg: "User created", token });
};

const dashboard = (req, res) => {
  const headers = req.headers;
  console.log(headers);

  const authHeader = headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(404)
      .json({ msgOne: "You are not permitted to view this route." });
  }

  const authority = authHeader.split(" ")[1];
  console.log(authority);

  const decoded = jwt.verify(authority, process.env.JWT_SECRET);
  console.log(decoded);

  const yourNumber = Math.floor(Math.random() * 1000);

  res.json({
    msg: "This is the Dashboard Page. Please God let me Blow with Webdev",
    number: yourNumber,
    userName: decoded.name,
    userId: decoded.id,
  });
};

module.exports = { login, dashboard };
