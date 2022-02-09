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
  if (work === "") {
    work = "Task";
  }
  state.workData.works.push(work);
};
