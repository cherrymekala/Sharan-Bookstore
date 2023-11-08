const mongoose = require("mongoose");
const initdata = require("./books.js");
const books = require("/Users/shaikumarfarooq/LinkedIn_Project/models/books.js");

const mongo_url = "mongodb://127.0.0.1:27017/books";
async function main() {
  await mongoose.connect(mongo_url);
}
main()
  .catch((err) => {
    console.log(err);
  });

const initDB = async () => {
  await books.deleteMany({});
  await books.insertMany(initdata.data);
  console.log("Data initialized");
};

initDB();
