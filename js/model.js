class model {
  startTime = 1500;
  time;
  timeText;
  timer;
  type = "work";
  started = false;
  status = "stop";
  calculateTime(timeText) {
    const times = timeText.split(":");
    return +times[1] + +times[0] * 60;
  }
  translateTime(time) {
    const times = [
      `${Math.floor(time / 60)}`.padStart(2, 0),
      `${time % 60}`.padStart(2, 0),
    ];
    return times.join(":");
  }
}

export default new model();
