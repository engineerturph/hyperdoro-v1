import { SEC_WORK } from "./config.js";

export const state = {
  counterData: {
    time: SEC_WORK,
    timer: "",
    type: "work",
    firststart: false,
    status: "stop",
    pomodoroStatus: "",
    workPomodoroStatus: "",
  },
  workData: {
    inputWork: {},
    works: [],
    currentWorkNum: -1,
  },
};

export const updateCurrentRemaining = function (reset = false) {
  //Resets others
  if (reset) {
    state.workData.works.forEach((a) => (a.curRemaining = SEC_WORK / 60));
  }
  state.workData.works[state.workData.currentWorkNum].curRemaining = Math.floor(
    state.counterData.time / 60
  );
};

export const calculateTime = function (timeText) {
  const times = timeText.split(":");
  return +times[1] + +times[0] * 60;
};

export const translateTime = function (time) {
  const times = [
    `${Math.floor(time / 60)}`.padStart(2, 0),
    `${time % 60}`.padStart(2, 0),
  ];
  return times.join(":");
};

export const addWork = function (work) {
  state.workData.works.unshift(work);
};

export const createValue = function (value) {
  return {
    value: value,
    continue: false,
    repeat: 1,
    curRemaining: SEC_WORK / 60,
    othRemaining: 0,
  };
};

export const makeInputWorkContinue = function (i = 0) {
  state.workData.works.forEach((a) => {
    a.continue = false;
  });
  state.workData.works[i].continue = true;
  state.workData.currentWorkNum = i;
};

export const addPomodoro = function (i) {
  state.workData.works[i].repeat++;
};
export const defTime = function (time, status = "work") {
  state.counterData.time = time;
  state.counterData.type = status;
};

export const minusCurrentWork = function () {
  state.workData.works[state.workData.currentWorkNum].repeat--;
};

export const updateOtherRemainings = function (
  i = state.workData.currentWorkNum
) {
  state.workData.works[i].othRemaining =
    ((state.workData.works[i].repeat - 1) * SEC_WORK) / 60;
};

//Resets currentRemaining
export const resetCurrentRemaining = function () {
  state.workData.works[state.workData.currentWorkNum].curRemaining = Math.floor(
    SEC_WORK / 60
  );
};
export const swapwork = function (x, y) {
  //x takes y place and pushes all down
  let b = state.workData.works[x];
  state.workData.works.splice(x, 1);
  state.workData.works.splice(y, 0, b);
};
