const express = require('express');
const router = express.Router();
const droneModel = require("../models/Drone.model")
// require the Drone model here

router.get('/drones', (req, res, next) => {
  // Iteration #2: List the drones
  droneModel.find()
    .then((dbSuccess) => res.render("drones/list.hbs", { drones: dbSuccess }))
    .catch(next);
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  res.render("drones/create-form.hbs")
});

router.post('/drones/create', async  (req, res, next) => {
  // Iteration #3: Add a new drone
  const { name, propellers, maxSpeed} = req.body;
  try {
    await droneModel.create({
      name,
      propellers,
      maxSpeed,
    });

    res.redirect("/drones");
  } catch (err) {
    res.redirect("/drones/create");
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  droneModel.findById(req.params.id)
    .then((drone) => res.render("drones/update-form.hbs", { drone }))
    .catch(next);
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // const { name, propellers, maxSpeed} = req.body;
  try {
    await droneModel.findByIdAndUpdate(req.params.id,{
      ...req.body
    });

    res.redirect("/drones");
  } catch (err) {
    res.redirect("/drones/create");
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  try {
    await droneModel.findByIdAndDelete(req.params.id,{
      ...req.body
    });

    res.redirect("/drones");
  } catch (err) {
    res.redirect("/drones/create");
  }
});

module.exports = router;
