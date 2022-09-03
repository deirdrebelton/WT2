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
      windChill = (13.12 + (0.6215 * reading.temperature) - (11.37 * (Math.pow(reading.windSpeed, 0.16))) + (0.3965 * reading.temperature * (Math.pow(reading.windSpeed, 0.16)))).toFixed(1);
    }
    return windChill;
  },
  
   getWeatherCondition(playlist) {
    let weatherCondition = null;
    for (let i = 0; i < playlist.readings.length; i++) {
    let reading = playlist.readings[i];
    if (reading.code === 100) {
      weatherCondition = "Clear";
    } else if (reading.code === 200) {
      weatherCondition = "Partial Clouds";
    } else if (reading.code === 300) {
      weatherCondition = "Cloudy";
    } else if (reading.code === 400) {
      weatherCondition = "Light Showers";
    } else if (reading.code === 500) {
      weatherCondition = "Heavy Shower";
    } else if (reading.code === 600) {
      weatherCondition = "Rain";
    } else if (reading.code === 700) {
      weatherCondition = "Snow";
    } else if (reading.code === 800) {
      weatherCondition = "Thunder";
    } 
    }
    return weatherCondition;
  },
  
  getMinTemp(playlist) {
    let minTemp = 0;
    if (playlist.readings.length > 0) {
      minTemp = playlist.readings[0];
    for (let i = 0; i < playlist.readings.length; i++) {
      if (playlist.readings[i].temperature < minTemp.temperature) {
        minTemp = playlist.readings[i];
      }
    }
    }
    return minTemp;
  },
  
  getMaxTemp(playlist) {
    let maxTemp = 0;
    if (playlist.readings.length > 0) {
      maxTemp = playlist.readings[0];
    for (let i = 0; i < playlist.readings.length; i++) {
      if (playlist.readings[i].temperature > maxTemp.temperature) {
        maxTemp = playlist.readings[i];
      }
    }
    }
    return maxTemp;
  },
  
  getMinPressure(playlist) {
    let minPressure = 0;
    if (playlist.readings.length > 0) {
      minPressure = playlist.readings[0];
    for (let i = 0; i < playlist.readings.length; i++) {
      if (playlist.readings[i].pressure < minPressure.pressure) {
        minPressure = playlist.readings[i];
      }
    }
    }
    return minPressure;
  },
  
  getMaxPressure(playlist) {
    let maxPressure = 0;
    if (playlist.readings.length > 0) {
      maxPressure = playlist.readings[0];
    for (let i = 0; i < playlist.readings.length; i++) {
      if (playlist.readings[i].pressure > maxPressure.pressure) {
        maxPressure = playlist.readings[i];
      }
    }
    }
    return maxPressure;
  },
  
  getMinWindSpeed(playlist) {
    let minWindSpeed = 0;
    if (playlist.readings.length > 0) {
      minWindSpeed = playlist.readings[0];
    for (let i = 0; i < playlist.readings.length; i++) {
      if (playlist.readings[i].windSpeed < minWindSpeed.windSpeed) {
        minWindSpeed = playlist.readings[i];
      }
    }
    }
    return minWindSpeed;
  },
  
  getMaxWindSpeed(playlist) {
    let maxWindSpeed = 0;
    if (playlist.readings.length > 0) {
      maxWindSpeed = playlist.readings[0];
    for (let i = 0; i < playlist.readings.length; i++) {
      if (playlist.readings[i].windSpeed > maxWindSpeed.windSpeed) {
        maxWindSpeed = playlist.readings[i];
      }
    }
    }
    return maxWindSpeed;
  },
  
  
};



module.exports = playlistAnalytics;
