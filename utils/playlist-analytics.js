"use strict";

const playlistAnalytics = {
  getShortestSong(playlist) {
    let shortestSong = null;
    if (playlist.readings.length > 0) {
      shortestSong = playlist.readings[0];
      for (let i = 1; i < playlist.readings.length; i++) {
        if (playlist.readings[i].temperature < shortestSong.temperature) {
          shortestSong = playlist.readings[i];
        }
      }
    }
    return shortestSong;
  },
  
  getConversionDegCtoF(playlist) {
    let degCtoF = 0;
    degCtoF = (playlist.readings.temperature * (9.0 / 5.0)) + 32;
    return degCtoF;
  },

  getPlaylistDuration(playlist) {
    let playlistDuration = 0;
    for (let i = 0; i < playlist.readings.length; i++) {
      let reading = playlist.readings[i];
      playlistDuration = playlistDuration + reading.temperature;
    }
    return playlistDuration;
  }
/*  
  getLastReading(playlist) {
    let lastReading = null; 
    for (let i = 0; i < playlist.readings.length; i++) {
          lastReading = playlist.readings[playlist.readings.length - 1];
      }
  
    return lastReading;
  }
 */
};



module.exports = playlistAnalytics;
