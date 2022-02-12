"use strict";

import startButton from "./View/startButton.js";
import clock from "./View/clock.js";
import * as model from "./model.js";
import work from "./View/work.js";
import clockButtons from "./View/clockButtons.js";
import { SEC_TIMEOUT, SEC_WORK } from "./config.js";
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

//Kodu guzel yaziom,cok kodu bir araya getirip function olarak kullan
//ve yorum ekleyerek kodu yaz
const renderClockandStatus = function () {
  //Translates time to min:sec and renders it
  clock.renderTime(model.translateTime(model.state.counterData.time));
  clock.renderStatus(model.state.counterData.type);
};

//This function works every second
const timeMoves = function () {
  model.state.counterData.time--;
  renderClockandStatus();
};

//After end of pomodoro this func changes work pomodoro to timeout
//and checks every second
const changePomodoroStatus = function () {
  if (
    model.state.counterData.time === 0 &&
    model.state.counterData.type === "work"
  ) {
    model.defTime(SEC_TIMEOUT, "timeout");
    clock.renderStatus("timeout");
    if (model.state.workData.currentWorkNum === -1) return;
    model.minusCurrentWork();
    work.renderToList(model.state.workData.works);
  }
  if (
    model.state.counterData.time === 0 &&
    model.state.counterData.type === "timeout"
  ) {
    model.defTime(SEC_WORK);
    clock.renderStatus("work");
  }
};

//Creates time intervals
const resumeWork = function () {
  model.state.counterData.timer = setInterval(timeMoves, 10);
  model.state.counterData.pomodoroStatus = setInterval(
    changePomodoroStatus,
    10
  );
};

//Deletes time intervals
const stopWork = function () {
  clearInterval(model.state.counterData.timer);
  clearInterval(model.state.counterData.pomodoroStatus);
};
const controlClock = function () {
  //starts if time is stopped
  if (model.state.counterData.status === "stop") {
    resumeWork();
    model.state.counterData.status = "resume";

    //stops if time is moving
  } else {
    stopWork();
    model.state.counterData.status = "stop";
  }
};
const controladdWork = function () {
  //Creates works class and defines as inputWork
  model.state.workData.inputWork = model.createValue(work.returnInputValue());

  //Adds input work to works array
  model.addWork(model.state.workData.inputWork);

  //Makes first created work continueing one
  model.makeInputWorkContinue();

  //Renders works
  work.renderToList(model.state.workData.works);
};
const controlCurrent = function (e) {
  //If you click workhr element or hr(border line) element it returns
  //It listens all of workList
  if (
    e.target.classList.contains("workhr") ||
    e.target.classList.contains("addPomodoro")
  )
    return;

  //If you click worktext it targets its parent if you click work box
  //it targets itself(takes HTML element)
  const workTarget = e.target.classList.contains("work")
    ? e.target
    : e.target.parentElement;

  //Takes number of target
  const i = workTarget.dataset.id;

  //Makes target continue
  model.makeInputWorkContinue(i);

  //Re-renders works
  work.renderToList(model.state.workData.works);
};
const controlPomodoroNumber = function (e) {
  //If target isn't add pomodoro number return
  //It listens all of worklist
  if (!e.target.classList.contains("addPomodoro")) return;

  //Takes work element we need as worktarget
  const workTarget = e.target.parentElement;

  //Takes number of target
  const i = workTarget.dataset.id;

  //Adds pomodoros to target
  model.addPomodoro(i);

  //Re-renders works
  work.renderToList(model.state.workData.works);
};
const controlNext = function () {
  if (model.state.counterData.type === "work") {
    //Defines time and worktype and renders time and worktype
    model.defTime(SEC_TIMEOUT, "timeout");
    renderClockandStatus();
    if (model.state.workData.currentWorkNum === -1) {
      return;
    }

    //If there is currentWork it minuses its number and re-renders it
    model.minusCurrentWork();
    work.renderToList(model.state.workData.works);
    return;
  }
  if (model.state.counterData.type === "timeout") {
    //Defines time and worktype and renders time and worktype
    model.defTime(SEC_WORK);
    renderClockandStatus();
  }
};
const controlPlus = function () {
  //Adds time a minute
  model.state.counterData.time += 60;

  //Renders time
  renderClockandStatus();
};
const init = function () {
  model.defTime(SEC_WORK);
  clock.startHandler(controlClock);
  work.listenInputButton(controladdWork);
  work.listenWorkList(controlCurrent);
  work.listenAddPomodoro(controlPomodoroNumber);
  clockButtons.listenNext(controlNext);
  clockButtons.listenPlus(controlPlus);
};
init();

//pomodoro sirasinda site boyle kaysin : https://www.youtube.com/watch?v=qxUVTDuF9xk
