const path = require("path");

function getHome(req, res) {
  const filePath = path.join(__dirname, "..", "..", "index.html");
  res.sendFile(filePath);
}

module.exports = {
  getHome,
};