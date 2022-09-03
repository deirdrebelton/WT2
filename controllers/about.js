"use strict";

const logger = require("../utils/logger");

const about = {
  index(request, response) {
    logger.info("about rendering");
    const viewData = {
      title: "Weather application to show the latest conditions and readings at given weather stations."
    };
    response.render("about", viewData);
  }
};

module.exports = about;
