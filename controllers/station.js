"use strict";

const logger = require("../utils/logger");
const stationStore = require("../models/station-store");
const stationAnalytics = require("../utils/station-analytics");
const uuid = require("uuid");

const station = {
  index(request, response) {
    const stationId = request.params.id;  
    logger.debug("Station id = ", stationId);
 

    const station = stationStore.getStation(stationId);
    const lastReading = stationAnalytics.getLastReading(station);
    const convertDegCtoF = stationAnalytics.getConvertDegCtoF(station);
    const bft = stationAnalytics.getWindBft(station);
    const compassDirection = stationAnalytics.getCompassDirection(station);
    const windChill = stationAnalytics.getWindChill(station);
    const weatherCondition = stationAnalytics.getWeatherCondition(station);
    const minTemp = stationAnalytics.getMinTemp(station);
    const maxTemp = stationAnalytics.getMaxTemp(station); 
    const minPressure = stationAnalytics.getMinPressure(station);
    const maxPressure = stationAnalytics.getMaxPressure(station);
    const minWindSpeed = stationAnalytics.getMinWindSpeed(station);
    const maxWindSpeed = stationAnalytics.getMaxWindSpeed(station);
    const pressureTrend = stationAnalytics.getPressureTrend(station);
    const temperatureTrend = stationAnalytics.getTemperatureTrend(station);
    const windTrend = stationAnalytics.getWindTrend(station);
    const date = new Date();
    
    console.log(lastReading);
    const viewData = {
      title: "Station",
      station: stationStore.getStation(stationId),
      lastReading: lastReading,
      convertDegCtoF: convertDegCtoF,
      bft: bft,
      compassDirection: compassDirection,
      windChill : windChill,
      weatherCondition : weatherCondition,
      minTemp: minTemp,
      maxTemp: maxTemp,
      minPressure: minPressure,
      maxPressure: maxPressure,
      minWindSpeed: minWindSpeed,
      maxWindSpeed: maxWindSpeed,
      pressureTrend: pressureTrend,
      temperatureTrend: temperatureTrend,
      windTrend: windTrend,
      date:date
    };
    response.render("station", viewData);
  },

  deleteReading(request, response) {
    const stationId = request.params.id;
    const readingId = request.params.readingid;
    logger.debug(`Deleting Reading ${readingId} from Station ${stationId}`);
    stationStore.removeReading(stationId, readingId);
    response.redirect("/station/" + stationId);
  },

  addReading(request, response) {
    const stationId = request.params.id;
    const station = stationStore.getStation(stationId);
    const newReading = {
      date: Date(),
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure)
    };
    logger.debug("New Reading = ", newReading);
    stationStore.addReading(stationId, newReading);
  
    response.redirect("/station/" + stationId);
  }
};

module.exports = station;
