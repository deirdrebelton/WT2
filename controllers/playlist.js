"use strict";

const logger = require("../utils/logger");
const playlistStore = require("../models/playlist-store");
const playlistAnalytics = require("../utils/playlist-analytics");
const uuid = require("uuid");

const playlist = {
  index(request, response) {
    const playlistId = request.params.id;  
    logger.debug("Playlist id = ", playlistId);
 

    const playlist = playlistStore.getPlaylist(playlistId);
    const lastReading = playlistAnalytics.getLastReading(playlist);
    const convertDegCtoF = playlistAnalytics.getConvertDegCtoF(playlist);
    const bft = playlistAnalytics.getWindBft(playlist);
    const compassDirection = playlistAnalytics.getCompassDirection(playlist);
    const windChill = playlistAnalytics.getWindChill(playlist);
    const minTemp = playlistAnalytics.getMinTemp(playlist);
    
    console.log(lastReading);
    const viewData = {
      title: "Playlist",
      playlist: playlistStore.getPlaylist(playlistId),
      lastReading: lastReading,
      convertDegCtoF: convertDegCtoF,
      bft: bft,
      compassDirection: compassDirection,
      windChill : windChill,
      minTemp: minTemp
    };
    response.render("playlist", viewData);
  },

  deleteSong(request, response) {
    const playlistId = request.params.id;
    const songId = request.params.songid;
    logger.debug(`Deleting Song ${songId} from Playlist ${playlistId}`);
    playlistStore.removeSong(playlistId, songId);
    response.redirect("/playlist/" + playlistId);
  },

  addSong(request, response) {
    const playlistId = request.params.id;
    const playlist = playlistStore.getPlaylist(playlistId);
    const newSong = {
      id: uuid.v1(),
      code: Number(request.body.code),
      temperature: Number(request.body.temperature),
      windSpeed: Number(request.body.windSpeed),
      windDirection: Number(request.body.windDirection),
      pressure: Number(request.body.pressure)
    };
    logger.debug("New Song = ", newSong);
    playlistStore.addSong(playlistId, newSong);
    response.redirect("/playlist/" + playlistId);
  }
};

module.exports = playlist;
