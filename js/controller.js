"use strict";

import startButton from "./View/startButton.js";
import clock from "./View/clock.js";
import * as model from "./model.js";
import work from "./View/work.js";
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
  model.state.counterData.time--;
  model.state.counterData.timeText = model.translateTime(
    model.state.counterData.time
  );
  clock.renderTime(model.state.counterData.timeText);
  if (
    model.state.counterData.time === 0 &&
    model.state.counterData.type === "work"
  ) {
    model.state.counterData.time = 300;
    model.state.counterData.type = "timeout";
    clock.renderStatus("timeout");
  }
  if (
    model.state.counterData.time === 0 &&
    model.state.counterData.type === "timeout"
  ) {
    model.state.counterData.time = 1500;
    model.state.counterData.type = "work";
    clock.renderStatus("work");
  }
};
const startWork = function (startTime) {
  model.state.counterData.time = startTime;
  model.state.counterData.startTime = startTime;
};
const resumeWork = function () {
  model.state.counterData.timer = setInterval(timeMoves, 10);
};
const stopWork = function (startTime) {
  clearInterval(model.state.counterData.timer);
};
const controlClock = function () {
  if (!model.state.counterData.started) {
    startWork(1500);
    model.state.counterData.started = true;
    model.state.counterData.status = "stop";
  }
  if (model.state.counterData.status === "stop") {
    resumeWork();
    model.state.counterData.status = "start";
  } else if (model.state.counterData.status === "start") {
    stopWork();
    model.state.counterData.status = "stop";
  }
};
const controladdWork = function () {
  model.state.workData.inputWork = model.createValue(work.returnInputValue());
  model.addWork(model.state.workData.inputWork);
  model.makeWorkContinue();
  //default olarak ilk olusturulan worku calistirior
  work.renderToList(model.state.workData.works);
};
const controlWork = function () {
  const i = work.workTarget.dataset.id;
  model.makeWorkContinue(i);
  work.renderToList(model.state.workData.works);
};
const init = function () {
  startButton.startHandler(controlClock);
  work.listenButton(controladdWork);
  work.listenWorkList(controlWork);
};
init();

//pomodoro sirasinda site boyle kaysin : https://www.youtube.com/watch?v=qxUVTDuF9xk
