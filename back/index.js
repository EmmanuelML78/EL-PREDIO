const app = require("./src/app");
const { conn } = require("./src/db.js");

// app.listen(3001, () => {
//   console.log("listening on port 3001");
// });y

conn.sync({ force: false }).then(() => {
  app.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
