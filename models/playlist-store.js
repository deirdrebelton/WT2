"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const playlistStore = {
  store: new JsonStore("./models/playlist-store.json", {
    playlistCollection: []
  }),
  collection: "playlistCollection",

  getAllPlaylists() {
    return this.store.findAll(this.collection);
  },

  getPlaylist(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getUserPlaylists(userid) {
    return this.store.findBy(this.collection, { userid: userid });
  },

  addPlaylist(playlist) {
    this.store.add(this.collection, playlist);
    this.store.save();
  },

  removePlaylist(id) {
    const playlist = this.getPlaylist(id);
    this.store.remove(this.collection, playlist);
    this.store.save();
  },

  removeAllPlaylists() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  addSong(id, reading) {
    const playlist = this.getPlaylist(id);
    playlist.readings.push(reading);

    
    this.store.save();
  },

  removeSong(id, readingId) {
    const playlist = this.getPlaylist(id);
    const readings = playlist.readings;
    _.remove(readings, { id: readingId });
    this.store.save();
  },

  getSong(id, readingId) {
    const playList = this.store.findOneBy(this.collection, { id: id });
    const readings = playList.readings.filter(reading => reading.id == readingId);
    return readings[0];
  },

  updateSong(reading, updatedReading) {
    reading.id = updatedReading.id;
    reading.code = updatedReading.code;
    reading.temperature = updatedReading.temperature;
    reading.windSpeed = updatedReading.windSpeed;
    reading.windDirection = updatedReading.windDirection;
    reading.pressure = updatedReading.pressure;
    this.store.save();
  }
};

module.exports = playlistStore;
