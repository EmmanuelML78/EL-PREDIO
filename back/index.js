const app = require("./src/app");

conn.sync({ force: true }).then(() => {
  app.listen(3001, () => {
    console.log("%s listening at 3001");
  });
});
