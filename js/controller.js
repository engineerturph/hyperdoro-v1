"use strict";

import startButton from "./View/startButton.js";
import clock from "./View/clock.js";
import model from "./model.js";
//body uzunlugu 900 genisligi 1663 4x3 bi uygulama yapcam genisligi 1200
//ilk htmlyi yaz sonradan designi ekle
//User stories
//As a user i want a configurable pomodoro app,so that i can change anything as i want
//svg iconset kullan
//yapilanlari yapilacaklarin ustune switch buttonu ekle ve ordan bak
// const logIn = document.querySelector(".logIn");
// const settings = document.querySelector(".settings");
// const hyperdoro = document.querySelector(".logo");
// const plusButton = document.querySelector(".plusButton1");
// const nextButton = document.querySelector(".nextButton");
// const counter = document.querySelector(".counter");
// const startButton = document.querySelector(".startButton");
// const workInput = document.querySelector(".workInput");
// const workPlusButton = document.querySelector(".plusButton");
const timeMoves = function () {
  model.time--;
  model.timeText = model.translateTime(model.time);
  clock.renderTime(model.timeText);
  if (model.time === 0 && model.type === "work") {
    model.time = 300;
    model.type = "timeout";
    clock.renderStatus("timeout");
  }
  if (model.time === 0 && model.type === "timeout") {
    model.time = 1500;
    model.type = "work";
    clock.renderStatus("work");
  }
};
const startWork = function (startTime) {
  model.time = startTime;
  model.startTime = startTime;
};
const resumeWork = function () {
  model.timer = setInterval(timeMoves, 100);
};
const stopWork = function (startTime) {
  clearInterval(model.timer);
};
const controlClock = function () {
  if (!model.started) {
    startWork(1500);
    model.started = true;
    model.status = "stop";
  }
  if (model.status === "stop") {
    resumeWork();
    model.status = "start";
  } else if (model.status === "start") {
    stopWork();
    model.status = "stop";
  }
};
const init = function () {
  startButton.startHandler(controlClock);
};
init();
