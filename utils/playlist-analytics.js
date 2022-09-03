"use strict";

const playlistAnalytics = {
  getLastReading(playlist) {
    let lastReading = null; 
    for (let i = 0; i < playlist.readings.length; i++) {
          lastReading = playlist.readings[playlist.readings.length - 1];
      }
    return lastReading;
  },

   getConvertDegCtoF(playlist) {
    let convertDegCtoF = 0;
    for (let i = 0; i < playlist.readings.length; i++) {
      let reading = playlist.readings[i];
      convertDegCtoF = (reading.temperature * (9.0 / 5.0)) + 32.0;
    }
    return convertDegCtoF;
  },
  
  getWindBft(playlist) {
    let bft = 0;
    for (let i = 0; i < playlist.readings.length; i++) {
    let reading = playlist.readings[i];
    if (playlist.readings.windSpeed == 0) {
      bft = 0;
    } else if (reading.windSpeed >= 1 && reading.windSpeed <= 6) {
      bft = 1;
    } else if (reading.windSpeed >= 7 && reading.windSpeed <= 11) {
      bft = 2;
    } else if (reading.windSpeed >= 12 && reading.windSpeed <= 19) {
      bft = 3;
    } else if (reading.windSpeed >= 20 && reading.windSpeed <= 29) {
      bft = 4;
    } else if (reading.windSpeed >= 30 && reading.windSpeed <= 39) {
      bft = 5;
    } else if (reading.windSpeed >= 40 && reading.windSpeed <= 50) {
      bft = 6;
    } else if (reading.windSpeed >= 51 && reading.windSpeed <= 62) {
      bft = 7;
    } else if (reading.windSpeed >= 63 && reading.windSpeed <= 75) {
      bft = 8;
    } else if (reading.windSpeed >= 76 && reading.windSpeed <= 87) {
      bft = 9;
    } else if (reading.windSpeed >= 88 && reading.windSpeed <= 102) {
      bft = 10;
    } else if (reading.windSpeed >= 103 && reading.windSpeed <= 117) {
      bft = 11;
    } else if (reading.windSpeed >= 117) {
      bft = 12;
    } else {
      bft = 50;
    }
    }
    return bft;
  },
  
    getCompassDirection(playlist) {
    let compassDirection = null;
    for (let i = 0; i < playlist.readings.length; i++) {
      let reading = playlist.readings[i];
    if (reading.windDirection > 11.25 && reading.windDirection < 33.75) {
      compassDirection = "NNE";
    } else if (reading.windDirection > 33.75 && reading.windDirection < 56.25) {
      compassDirection = "NE";
    } else if (reading.windDirection > 56.25 && reading.windDirection < 78.75) {
      compassDirection = "ENE";
    } else if (reading.windDirection > 78.75 && reading.windDirection < 101.25) {
      compassDirection = "E";
    } else if (reading.windDirection> 101.25 && reading.windDirection < 123.75) {
      compassDirection = "ESE";
    } else if (reading.windDirection > 123.75 && reading.windDirection < 146.25) {
      compassDirection = "SE";
    } else if (reading.windDirection > 146.25 && reading.windDirection < 168.75) {
      compassDirection = "SSE";
    } else if (reading.windDirection > 168.75 && reading.windDirection < 191.25) {
      compassDirection = "S";
    } else if (reading.windDirection> 191.25 && reading.windDirection < 213.75) {
      compassDirection = "SSW";
    } else if (reading.windDirection > 213.75 && reading.windDirection < 236.25) {
      compassDirection = "SW";
    } else if (reading.windDirection> 236.25 && reading.windDirection < 258.75) {
      compassDirection = "WSW";
    } else if (reading.windDirection > 258.75 && reading.windDirection < 281.25) {
      compassDirection = "W";
    } else if (reading.windDirection > 281.25 && reading.windDirection < 303.75) {
      compassDirection = "WNW";
    } else if (reading.windDirection > 303.75 && reading.windDirection < 326.25) {
      compassDirection = "NW";
    } else if (reading.windDirection > 326.25 && reading.windDirection < 348.75) {
      compassDirection = "NNW";
    } else {
      compassDirection = "N";
    }
    }
    return compassDirection;
  },
  
  getWindChill(playlist) {
    let windChill = 0;
    for (let i = 0; i < playlist.readings.length; i++) {
      let reading = playlist.readings[i];
      windChill = Math.round((13.12 + (0.6215 * reading.temperature) - (11.37 * (Math.pow(reading.windSpeed, 0.16))) + (0.3965 * reading.temperature * (Math.pow(reading.windSpeed, 0.16)))));
    }
    return windChill;
  },
  
  getMinTemp(playlist) {
    let minTemp = 0;
    if (playlist.readings.length > 0) {
      minTemp = playlist.readings[0];
    for (let i = 1; i < playlist.readings.length; i++) {
      if (playlist.readings[i].temperature < minTemp.temperature) {
        minTemp = playlist.readings[i];;
      }
    }
    }
    return minTemp;
  }
  
  

  /*
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
  
  getPlaylistDuration(playlist) {
    let playlistDuration = 0;
    for (let i = 0; i < playlist.readings.length; i++) {
      let reading = playlist.readings[i];
      playlistDuration = playlistDuration + reading.temperature;
    }
    return playlistDuration;
  }

getWindBft(playlist) {
    let bft = 0;
    if (playlist.readings.windSpeed == 0) {
      bft = 0;
    } else if (playlist.readings.windSpeed >= 1 && playlist.readings.windSpeed <= 6) {
      bft = 1;
    } else if (playlist.readings.windSpeed >= 7 && playlist.readings.windSpeed <= 11) {
      bft = 2;
    } else if (playlist.readings.windSpeed >= 12 && playlist.readings.windSpeed <= 19) {
      bft = 3;
    } else if (playlist.readings.windSpeed >= 20 && playlist.readings.windSpeedd <= 29) {
      bft = 4;
    } else if (playlist.readings.windSpeed >= 30 && playlist.readings.windSpeed <= 39) {
      bft = 5;
    } else if (playlist.readings.windSpeed >= 40 && playlist.readings.windSpeed <= 50) {
      bft = 6;
    } else if (playlist.readings.windSpeed >= 51 && playlist.readings.windSpeed <= 62) {
      bft = 7;
    } else if (playlist.readings.windSpeed >= 63 && playlist.readings.windSpeed <= 75) {
      bft = 8;
    } else if (playlist.readings.windSpeed >= 76 && playlist.readings.windSpeed <= 87) {
      bft = 9;
    } else if (playlist.readings.windSpeed >= 88 && playlist.readings.windSpeed <= 102) {
      bft = 10;
    } else if (playlist.readings.windSpeed >= 103 && playlist.readings.windSpeed<= 117) {
      bft = 11;
    } else if (playlist.readings.windSpeed >= 117) {
      bft = 12;
    } else {
      bft = 50;
    }
    return bft;
  },

 */
};



module.exports = playlistAnalytics;
