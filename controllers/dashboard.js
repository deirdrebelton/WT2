"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");

const dashboard = {
  index(request, response) {
    logger.info("dashboard rendering");
    const loggedInUser = accounts.getCurrentUser(request);
    
    const viewData = {
      title: "Station Dashboard",
      stations: stationStore.getUserStations(loggedInUser.id),
    };
    logger.info("about to render", stationStore.getAllStations());
    response.render("dashboard", viewData); 
    
  },

  deleteStation(request, response) {
    const stationId = request.params.id;
    logger.debug(`Deleting Station ${stationId}`);
    stationStore.removeStation(stationId);
    response.redirect("/dashboard");
  },

  addStation(request, response) {
    const loggedInUser = accounts.getCurrentUser(request);
    const newStation = {
      id: uuid.v1(),
      userid: loggedInUser.id,
      title: request.body.title,
      readings: []
    };
    logger.debug("Creating a new Station", newStation);
    stationStore.addStation(newStation);
    response.redirect("/dashboard");
  }
};

module.exports = dashboard;
