"use strict";

const stationAnalytics = {
  getLastReading(station) {
    let lastReading = null; 
    for (let i = 0; i < station.readings.length; i++) {
          lastReading = station.readings[station.readings.length - 1];
      }
    return lastReading;
  },

   getConvertDegCtoF(station) {
    let convertDegCtoF = 0;
    for (let i = 0; i < station.readings.length; i++) {
      let reading = station.readings[i];
      convertDegCtoF = (reading.temperature * (9.0 / 5.0)) + 32.0;
    }
    return convertDegCtoF;
  },
  
  getWindBft(station) {
    let bft = 0;
    for (let i = 0; i < station.readings.length; i++) {
    let reading = station.readings[i];
    if (station.readings.windSpeed == 0) {
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
  
    getCompassDirection(station) {
    let compassDirection = null;
    for (let i = 0; i < station.readings.length; i++) {
      let reading = station.readings[i];
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
  
  getWindChill(station) {
    let windChill = 0;
    for (let i = 0; i < station.readings.length; i++) {
      let reading = station.readings[i];
      windChill = (13.12 + (0.6215 * reading.temperature) - (11.37 * (Math.pow(reading.windSpeed, 0.16))) + (0.3965 * reading.temperature * (Math.pow(reading.windSpeed, 0.16)))).toFixed(1);
    }
    return windChill;
  },
  
   getWeatherCondition(station) {
    let weatherCondition = null;
    for (let i = 0; i < station.readings.length; i++) {
    let reading = station.readings[i];
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
  
  getMinTemp(station) {
    let minTemp = 0;
    if (station.readings.length > 0) {
      minTemp = station.readings[0];
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].temperature < minTemp.temperature) {
        minTemp = station.readings[i];
      }
    }
    }
    return minTemp;
  },
  
  getMaxTemp(station) {
    let maxTemp = 0;
    if (station.readings.length > 0) {
      maxTemp = station.readings[0];
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].temperature > maxTemp.temperature) {
        maxTemp = station.readings[i];
      }
    }
    }
    return maxTemp;
  },
  
  getMinPressure(station) {
    let minPressure = 0;
    if (station.readings.length > 0) {
      minPressure = station.readings[0];
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].pressure < minPressure.pressure) {
        minPressure = station.readings[i];
      }
    }
    }
    return minPressure;
  },
  
  getMaxPressure(station) {
    let maxPressure = 0;
    if (station.readings.length > 0) {
      maxPressure = station.readings[0];
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].pressure > maxPressure.pressure) {
        maxPressure = station.readings[i];
      }
    }
    }
    return maxPressure;
  },
  
  getMinWindSpeed(station) {
    let minWindSpeed = 0;
    if (station.readings.length > 0) {
      minWindSpeed = station.readings[0];
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].windSpeed < minWindSpeed.windSpeed) {
        minWindSpeed = station.readings[i];
      }
    }
    }
    return minWindSpeed;
  },
  
  getMaxWindSpeed(station) {
    let maxWindSpeed = 0;
    if (station.readings.length > 0) {
      maxWindSpeed = station.readings[0];
    for (let i = 0; i < station.readings.length; i++) {
      if (station.readings[i].windSpeed > maxWindSpeed.windSpeed) {
        maxWindSpeed = station.readings[i];
      }
    }
    }
    return maxWindSpeed;
  },
    
  getPressureTrend(station) {
    let pressureTrend = "steady";
   if (station.readings.length > 2) {
      if (station.readings[station.readings.length - 1].pressure > station.readings[station.readings.length - 2].pressure && station.readings[station.readings.length - 2].pressure > station.readings[station.readings.length - 3].pressure) {
        pressureTrend = "increasing";
      } else if (station.readings[station.readings.length - 1].pressure < station.readings[station.readings.length - 2].pressure && station.readings[station.readings.length - 2].pressure < station.readings[station.readings.length - 3].pressure) {
        pressureTrend = "decreasing";
      } 
  }
    return pressureTrend;
  },
  
  getTemperatureTrend(station) {
    let temperatureTrend = "steady";
   if (station.readings.length > 2) {
      if (station.readings[station.readings.length - 1].temperature > station.readings[station.readings.length - 2].temperature && station.readings[station.readings.length - 2].temperature > station.readings[station.readings.length - 3].temperature) {
        temperatureTrend = "increasing";
      } else if (station.readings[station.readings.length - 1].temperature < station.readings[station.readings.length - 2].temperature && station.readings[station.readings.length - 2].temperature < station.readings[station.readings.length - 3].temperature) {
        temperatureTrend = "decreasing";
      } 
  }
    return temperatureTrend;
  },
  
 getWindTrend(station) {
    let windTrend = "steady";
   if (station.readings.length > 2) {
      if (station.readings[station.readings.length - 1].windSpeed > station.readings[station.readings.length - 2].windSpeed && station.readings[station.readings.length - 2].windSpeed > station.readings[station.readings.length - 3].windSpeed) {
        windTrend = "increasing";
      } else if (station.readings[station.readings.length - 1].windSpeed < station.readings[station.readings.length - 2].windSpeed && station.readings[station.readings.length - 2].windSpeed < station.readings[station.readings.length - 3].windSpeed) {
        windTrend = "decreasing";
      } 
  }
    return windTrend;
  }
  
};



module.exports = stationAnalytics;
