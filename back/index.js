const app = require("./src/app");
const { conn } = require("./src/db.js");
require("dotenv").config();
const { PORT } = process.env;

// app.listen(3001, () => {
//   console.log("listening on port 3001");
// });y

conn.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("%s listening at", PORT);
  });
});
