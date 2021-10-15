const drones = [
  { name: "Creeper XL 500", propellers: 3, maxSpeed: 12 },
  { name: "Racer 57", propellers: 4, maxSpeed: 20 },
  { name: "Courier 3000i", propellers: 6, maxSpeed: 18 }
];

// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");
const droneModel = require("./../models/Drone.model")


mongoose
  .connect("mongodb://localhost/lab-express-drones", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
  })
  .then(async(x) => {
    console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`);
    const res = await droneModel.create(drones);
    
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });
