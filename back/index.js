const app = require("./src/app");
const { conn } = require("./src/db.js");

// app.listen(3001, () => {
//   console.log("listening on port 3001");
// });

conn.sync({ alter: true }).then(() => {
  app.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
