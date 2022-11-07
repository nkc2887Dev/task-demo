import React, { useEffect, useState } from "react";

export default function Counter() {
  const [taskList, setTaskList] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [task, setTask] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const timerId = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timerId);
  }, []);

  const timeText = currentTime.toLocaleTimeString();

  const onStartTimer = (startTime) => setStartTime(startTime);

  const onEndTimer = (endTime) => setEndTime(endTime);

  const onSaveTimer = () => setIsTaskFormOpen(true);

  const onSaveTask = (e) => {
    e.preventDefault();
    setTaskList([...taskList, { ...task, startTime, endTime }]);
    setEndTime(null);
    setStartTime(null);
    setIsTaskFormOpen(false);
  };

  const onFormChange = (e) => {
    const { name, value } = e.target;
    setTask({
      ...task,
      [name]: value,
    });
  };

  const getTrackedTime = (startDate, endTime) => {
    let hr = 0;
    let mm = 0;
    let ss = 0;
    let day = 0;

    const diffHr = endTime.getHours() - startDate.getHours();
    const diffMm = endTime.getMinutes() - startDate.getMinutes();
    const diffSs = endTime.getSeconds() - startDate.getSeconds();

    if (diffSs > 60) {
      ss = diffSs - 60;
      mm = diffMm + Math.round(ss / 60);
    } else {
      ss = diffSs;
    }
    if (diffMm > 60) {
      mm = diffMm - 60;
      hr = diffHr + Math.round(mm / 60);
    } else {
      mm = diffMm;
    }
    if (diffHr > 24) {
      hr = diffHr - 24;
      day = Math.round(hr / 24);
    }

    const dateText = day
      ? `${day}Days ${hr}HH:${mm}m:${ss}s`
      : `${hr}h:${mm}m:${ss}s`;

    return dateText;
  };

  return (
    <>
      <div className="time container">
        <span className="demo">{timeText}</span>
      </div>
      <div className="Container my-3 btn-des">
        <button
          type="button"
          class="btn btn-primary mx-3"
          disabled={startTime}
          onClick={() => onStartTimer(currentTime)}
        >
          Start
        </button>
        <button
          type="button"
          class="btn btn-primary mx-3"
          disabled={endTime}
          onClick={() => onEndTimer(currentTime)}
        >
          Pause
        </button>
        <button
          type="button"
          class="btn btn-primary mx-3"
          disabled={!startTime || !endTime}
          onClick={() => onSaveTimer(currentTime)}
        >
          Save
        </button>
      </div>
      {isTaskFormOpen && (
        <div>
          <form onSubmit={onSaveTask}>
            <div class="form-group">
              <label for="exampleInputEmail1">Task Title</label>
              <input
                type="text"
                class="form-control"
                name="title"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Enter title"
                onChange={onFormChange}
              />
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Task Description</label>
              <input
                type="text"
                class="form-control"
                id="exampleInputPassword1"
                placeholder="Enter description"
                name="description"
                onChange={onFormChange}
              />
            </div>
            <button type="submit" class="btn btn-primary">
              Submit
            </button>
          </form>
        </div>
      )}
      <div>
        {taskList &&
          taskList.length > 0 &&
          taskList.map((task) => (
            <div>
              <h3>Title : {task.title}</h3>
              <h3>Description : {task.description}</h3>
              <h3>
                Total time : {getTrackedTime(task.startTime, task.endTime)}
              </h3>
            </div>
          ))}
      </div>
    </>
  );
}
