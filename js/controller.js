"use strict";

import startButton from "./View/startButton.js";
import clock from "./View/clock.js";
import * as model from "./model.js";
import work from "./View/work.js";
import clockButtons from "./View/clockButtons.js";
import { SEC_TIMEOUT, SEC_WORK, TIMESPEED, POMODORONUM } from "./config.js";
import switcher from "./View/switchbutton.js";
import donelist from "./View/donelist.js";
import pomodoroInfo from "./View/pomodoroInfo.js";
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

/////
/////
/////
/////
/////
//Checks current pomodoros remaining time for remaining time calculations
const checkAndRenderRemainingTimes = function (reset = false) {
  if (model.state.counterData.type != "work") return;
  if (model.state.workData.currentWorkNum === -1) return;
  model.updateCurrentRemaining(reset);

  //Updates total time left to finish
  model.updateTotal();
  work.renderTotal(model.state.workData.total);
  work.renderToList(model.state.workData.works);
};

//Updates and renders remaining works time calculations
const updateandRenderWorkRemaining = function () {
  model.updateOtherRemainings();

  //Updates total time left to finish
  model.updateTotal();
  work.renderTotal(model.state.workData.total);
  work.renderToList(model.state.workData.works);
};

//Renders clocks and status(timeout/work)
const renderClockandStatus = function () {
  //Translates time to min:sec and renders it
  clock.renderTime(model.translateTime(model.state.counterData.time));
  clock.renderStatus(model.state.counterData.type);
};

//This function works every second
const timeMoves = function () {
  model.state.counterData.time--;
  renderClockandStatus();
  model.state.workData.spentTime++;
};

//Updates work number at the end of pomodoro and deletes work at 0
const updateWorkPomodoro = function () {
  const currentWorkNum = model.state.workData.currentWorkNum;
  if (currentWorkNum === -1) return;
  model.minusCurrentWork();
  work.renderToList(model.state.workData.works);
  //Checks if currentwork is at zero and deletes at zero
  if (model.state.workData.works[currentWorkNum].repeat != 0) {
    return;
  }
  model.state.workData.works.splice(currentWorkNum, 1);

  //If works is empty it makes currentWork -1 and if it is not makes first work continue
  if (model.state.workData.works.length === 0) {
    model.state.workData.currentWorkNum = -1;
  } else {
    model.makeInputWorkContinue(0);
  }

  //If the works array is empty rendertolist automaticly renders ''
  work.renderToList(model.state.workData.works);
  return;
};

//After end of pomodoro this func changes work pomodoro to timeout
//and checks every second
//When u want to skip pomodoro not at 0 u use autoskip
//Also updates remainings
const changePomodoroStatus = function (autoskip = false) {
  if (autoskip === false) {
    if (
      model.state.counterData.time === 0 &&
      model.state.counterData.type === "work"
    ) {
      model.defTime(SEC_TIMEOUT, "timeout");
      updateWorkPomodoro();
      model.createDoneWork();
      donelist.render(model.state.workData.donePomodoros);
      if (model.state.workData.currentWorkNum === -1) return; //if there is no work after all reaches 0 dont cast work functions
      //Resets current remaining to start of time because time is 0 and we are at new pomodoro
      model.resetCurrentRemaining();
      updateandRenderWorkRemaining();
    } else if (
      model.state.counterData.time === 0 &&
      model.state.counterData.type === "timeout"
    ) {
      model.defTime(SEC_WORK);
      model.state.workData.spentTime = 0;
    }
  }
  if (autoskip === true) {
    if (model.state.counterData.type === "work") {
      //Defines time and worktype and renders time and worktype
      model.defTime(SEC_TIMEOUT, "timeout");
      updateWorkPomodoro();
      model.createDoneWork();
      donelist.render(model.state.workData.donePomodoros);
      if (model.state.workData.currentWorkNum === -1) return; //if there is no work after all reaches 0 dont cast work functions
      model.resetCurrentRemaining();
      updateandRenderWorkRemaining();
    } else if (model.state.counterData.type === "timeout") {
      //Defines time and worktype and renders time and worktype
      model.defTime(SEC_WORK);
      model.state.workData.spentTime = 0;
    }
  }
};

//Creates time intervals
const resumeWork = function () {
  model.state.counterData.timer = setInterval(timeMoves, TIMESPEED);
  model.state.counterData.pomodoroStatus = setInterval(
    changePomodoroStatus,
    TIMESPEED
  );
  model.state.counterData.checkRemaining = setInterval(
    checkAndRenderRemainingTimes,
    TIMESPEED * 5
  );
};

//Deletes time intervals
const stopWork = function () {
  clearInterval(model.state.counterData.timer);
  clearInterval(model.state.counterData.pomodoroStatus);
  clearInterval(model.state.counterData.checkRemaining);
};
const controlClock = function () {
  //starts if time is stopped
  if (model.state.counterData.status === "stop") {
    resumeWork();
    model.state.counterData.status = "resume";
    clock.toggleStart();
    //stops if time is moving
  } else {
    stopWork();
    clock.toggleStart();
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

  //Updates current ones remaining value and resets other values
  model.updateCurrentRemaining(true);

  //Updates total time left to finish
  model.updateTotal();
  work.renderTotal(model.state.workData.total);

  //Renders works
  work.renderToList(model.state.workData.works);
};
const controlCurrent = function (e) {
  //If you click workhr element or hr(border line) element it returns
  //It listens all of workList
  if (
    !(
      e.target.classList.contains("workText") ||
      e.target.classList.contains("work") ||
      e.target.classList.contains("remaining")
    )
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

  //Changes current works remaining value and resets other values
  model.updateCurrentRemaining(true);

  //Updates total time left to finish
  model.updateTotal();
  work.renderTotal(model.state.workData.total);

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

  //Calculates non-current works time and updates it
  model.updateOtherRemainings(i);

  //Updates total time left to finish
  model.updateTotal();
  work.renderTotal(model.state.workData.total);

  //Re-renders works
  work.renderToList(model.state.workData.works);
};

//
const controlNext = function () {
  //Automaticly changes pomodoro status
  changePomodoroStatus(true);

  //Renders them
  renderClockandStatus();

  //Checks remaining time
  checkAndRenderRemainingTimes();

  //Updates total time left to finish
  model.updateTotal();
  work.renderTotal(model.state.workData.total);
  return;
};
const controlPlus = function () {
  //Adds time a minute
  model.state.counterData.time += 60;

  //Renders time
  renderClockandStatus();

  //Re-calculates remaining times
  checkAndRenderRemainingTimes();

  //Updates total time left to finish
  model.updateTotal();
  work.renderTotal(model.state.workData.total);
};

//Marks dragging element for later usage
const addWorkDraggingClass = function (target) {
  target.classList.toggle("dragging");
};

//
const addWorkDraggingClass2 = function (target) {
  //Removes dragging after dragging
  target.classList.toggle("dragging");

  //Swaps elements at model(Takes our element at a position and takes all bottom elements one down)
  if (model.state.workData.afterEl) {
    const num1 = model.state.workData.dragNum;
    const num2 = model.state.workData.afterNum;
    if (num1 > num2) {
      model.swapwork(num1, num2);
    } else {
      model.swapwork(num1, num2 - 1);
    }
  } else {
    model.swapwork(
      model.state.workData.dragNum,
      model.state.workData.works.length - 1
    );
  }
  work.renderToList(model.state.workData.works);
};
//Gets element after the element we dragging
const getDragAfterElement = function (list, y) {
  const nonDraggingElements = [
    ...list.querySelectorAll(".work:not(.dragging)"),
  ];

  //Compares every elements center y coordinates difference from our elements y point
  //and returns closest element down(if our element is at bottom returns undefined)
  return nonDraggingElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2; //Takes difference from our y point and elements center point
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else return closest;
    },
    { offset: Number.NEGATIVE_INFINITY }
  ); //Its infinite because when y is up from any element offset comes
  //as a negative value and closest offset is the biggest negative value of all elements);
};
const controlDragging = function (e) {
  e.preventDefault();

  const dragging = document.querySelector(".dragging");
  const afterElement = getDragAfterElement(work.list, e.clientY);

  //If there is no element after our element it places our element last place
  if (afterElement.element) {
    //Takes dragging,afterelement and existing data of after element for after usage
    model.state.workData.dragNum = dragging.dataset.id;
    model.state.workData.afterNum = afterElement.element.dataset.id;
    model.state.workData.afterEl = true;

    //Inserts element in UI
    work.list.insertBefore(dragging, afterElement.element); //swaps works at display
  } else {
    ////Takes dragging,afterelement and existing data of after element for after usage
    model.state.workData.dragNum = dragging.dataset.id;
    model.state.workData.afterEl = false;

    ////Inserts element in UI
    work.list.insertAdjacentElement("beforeend", dragging); //takes work at last place in display
  }
};

//Hides ToDoList and shows DoneList
const controlSwitchList = function () {
  switcher.target.classList.toggle("hidden");
  work.parentElement.classList.toggle("hidden");
};

const controlSettings = function (e) {
  if (!e.target.classList.contains("settings")) return;
  const target = e.target.parentElement;

  //Hides value element and shows Input element.
  const value = target.querySelector(".workText");
  const valueInput = target.querySelector(".valueInput");
  valueInput.classList.toggle("hidden");
  value.classList.toggle("hidden");
};

//Takes input from created value element
const controlSettingsInput = function (e) {
  if (!e.target.classList.contains("valueInput")) return;
  model.state.workData.works[e.target.parentElement.dataset.id].value =
    e.target.value;
  work.renderToList(model.state.workData.works);
};
const controlPomodoroInfo = function (e) {
  if (e.target.classList.contains("sol")) {
    pomodoroInfo.exposeElement(
      ++model.state.pomodoroData.curPage % POMODORONUM
    );
  } else {
    pomodoroInfo.exposeElement(
      ((--model.state.pomodoroData.curPage % POMODORONUM) + POMODORONUM) %
        POMODORONUM
    );
  }
};
const init = function () {
  model.defTime(SEC_WORK);
  clock.startHandler(controlClock);
  work.listenInputButton(controladdWork);
  work.listenList(controlCurrent);
  work.listenList(controlPomodoroNumber);
  clockButtons.listenNext(controlNext);
  clockButtons.listenPlus(controlPlus);
  work.listenDragWork(
    addWorkDraggingClass,
    controlDragging,
    addWorkDraggingClass2
  );
  switcher.listenSwitcher(controlSwitchList);
  work.listenList(controlSettings);
  work.listenEnter(controlSettingsInput);
  pomodoroInfo.listenInput(controlPomodoroInfo);
};
init();

//pomodoro sirasinda site boyle kaysin : https://www.youtube.com/watch?v=qxUVTDuF9xk
//Eventlisteneri en basta eklemek lazim yoksa eklenmiyor.
