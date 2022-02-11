export const state = {
  counterData: {
    startTime: 1500,
    time: 0,
    timeText: "",
    timer: "",
    type: "work",
    started: false,
    status: "stop",
  },
  workData: {
    inputWork: {},
    works: [],
    currentWork: {},
  },
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
  };
};
export const makeWorkContinue = function (i = 0) {
  state.workData.works.forEach((a) => {
    a.continue = false;
  });
  state.workData.works[i].continue = true;
};
