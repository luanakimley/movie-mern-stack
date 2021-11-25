const mongoose = require("mongoose");
mongoose.connect(`mongodb://localhost/${process.env.DBCARS}`, {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("connected to", db.client.s.url);
});
