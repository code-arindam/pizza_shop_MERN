const mogoose = require("mongoose");
const dotenv = require("dotenv");
require("colors");
const connectDb = require("./config/config");
const Pizza = require("./models/pizzaModel");
const User = require("./models/userModel");
const Data = require("./data/seeder-data");

//config dot env and mongodb conn file
dotenv.config();
connectDb();

//import data
const importData = async () => {
  try {
    await Pizza.deleteMany();
    const samplePizzaData = Data.pizzas.map((pizza) => {
      return { ...pizza };
    });
    await Pizza.insertMany(samplePizzaData);
    console.log("Pizza data Imported".bgGreen.white);

    await User.deleteMany();
    const sampleUserData = Data.users.map((user) => {
      return { ...user };
    });
    await User.insertMany(sampleUserData);
    console.log("User data Imported".bgGreen.white);

    console.log("ALL DATA IMPORTED !!".green);
    process.exit();
  } catch (error) {
    console.log(`${error}`.bgRed.white);
    process.exit(1);
  }
};

const dataDestroy = () => {};

if (process.argv[2] === "-d") {
  dataDestroy();
} else {
  importData();
}
