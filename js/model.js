import { SEC_WORK } from "./config.js";
import work from "./View/work.js";

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
    donePomodoros: [],
    currentWorkNum: -1,
    spentTime: 0,
    total: 0,
  },
  pomodoroData: {
    curPage: 0,
  },
  timeData: {
    minutes: 0,
    hours: 12,
    totalTime: 0,
  },
};
export const updateTotal = function () {
  let total = 0;
  state.workData.works.forEach((e) => {
    total += e.curRemaining;
    total += e.othRemaining;
  });
  state.workData.total = total;
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
  state.workData.currentWorkNum = y;
};
export const createDoneWork = function () {
  const curWork = state.workData.works.find((e) => e.continue === true);
  const newDone = {
    timeSpend:
      Math.floor(state.workData.spentTime / 60) === 0
        ? 1
        : Math.floor(state.workData.spentTime / 60),
  };
  if (curWork?.value != null) {
    newDone.value = curWork.value === "" ? "No explanation" : curWork.value;
  } else {
    newDone.value = "No work in queue";
  }
  state.workData.donePomodoros.unshift(newDone);
  console.log(state.workData.donePomodoros);
};
export const getRealTime = function () {
  const time = new Date();
  state.timeData.hours = `${time.getHours()}`;
  state.timeData.minutes = `${time.getMinutes()}`;
  state.timeData.totalTime = time.getHours() * 60 + time.getMinutes();
};
