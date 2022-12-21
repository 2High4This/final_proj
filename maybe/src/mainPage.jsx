import {
  Typography,
  Button,
  TextField,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DatePicker } from "@mui/x-date-pickers";
import { useNavigate } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";

import useAxiosWithJWT from "./things_for_auth/useAxiosWithJWT";
import useAuth from "./things_for_auth/useAuth";
import { useEffect, useState } from "react";
import { styles } from "./style";
import moment from "moment";

export function App() {
  //task values to send
  const [startValue, setStartValue] = useState(new Date());
  const [selectedTask, setSelectedTask] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [taskLength, setTaskLength] = useState(0);
  const [taskUsers, setTaskUsers] = useState("");
  const [taskName, setTaskName] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const [errorMsg, setErrormsg] = useState("");
  const [openNewTask, setOpenNewTask] = useState(false);

  const controller = new AbortController();

  const navigate = useNavigate();

  //custom hook usages
  const axiosWithJWT = useAxiosWithJWT(); // get request hook
  const { auth } = useAuth(); // get current user
  const loggedUser = auth.name; //Current username for taking tasks from db

  //date localizer for calendar
  moment.locale("en-il");
  const localizer = momentLocalizer(moment);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axiosWithJWT.get("/getTasks", {
        params: {
          requestedName: loggedUser,
        },
      });

      if (!response.data) {
        return;
      } else {
        const data = response.data.map((p) => {
          return {
            id: p._id,
            title: p.TaskName,
            start: new Date(p.startDate),
            end: new Date(p.endDate),
          };
        });
        setAllTasks(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleNewTask = async () => {
    if (taskName.length === 0) {
      return setErrormsg("Task must have a name.");
    } else if (taskLength <= 0) {
      setTaskLength(0);
      return setErrormsg("Length must be bigger than 0.");
    }

    const lengthIn15 = taskLength * 4;

    await axiosWithJWT.post(
      "/addTask",
      JSON.stringify({
        usernames: [loggedUser, ...taskUsers.split(" ")],
        title: taskName,
        start: startValue,
        lengthIn15: lengthIn15,
      })
    );
    handleReset();
    getTasks();
  };

  const handleReset = () => {
    setTaskName("");
    setTaskUsers("");
    setTaskLength(0);
    setStartValue(new Date());
  };

  const handleDelete = async () => {
    await axiosWithJWT.post(
      "/deleteTask",
      JSON.stringify({
        id: selectedTask.id,
      })
    );
    getTasks();
    setOpenDialog(false);
  };

  const handleEventSelect = (event) => {
    setSelectedTask(event);
    setOpenDialog(true);
  };

  return (
    <>
      {loggedUser ? (
        <>
          <Dialog
            open={openNewTask}
            aria-labelledby="task-dialog-title"
            sx={{ bgcolor: "text.secondary" }}>
            <DialogTitle id="task-dialog-title">New Task</DialogTitle>

            <Stack
              margin="dense"
              marginX={2}
              spacing={3}
              justifyContent="space-around">
              <Typography
                textAlign={"center"}
                sx={errorMsg ? styles.errorMsg : styles.offscreen}>
                {errorMsg}
              </Typography>
              <TextField
                name="users"
                value={taskUsers}
                label="Any other users? (separate by space)"
                type="text"
                variant="outlined"
                onChange={(e) => {
                  setTaskUsers(e.target.value);
                  setErrormsg("");
                }}
              />

              <TextField
                name="name"
                value={taskName}
                label="Task Name"
                type="text"
                variant="outlined"
                onChange={(e) => {
                  setTaskName(e.target.value);
                  setErrormsg("");
                }}
              />

              <DatePicker
                label="start"
                value={startValue}
                onChange={(newValue) => {
                  setStartValue(newValue);
                }}
                renderInput={(params) => <TextField {...params} />}
              />

              <TextField
                name="length"
                InputProps={{
                  inputProps: { min: 0 },
                }}
                value={taskLength}
                label="Length (in hours)"
                type="number"
                variant="outlined"
                onChange={(e) => {
                  setTaskLength(e.target.value);
                  setErrormsg("");
                }}
              />
              <DialogActions>
                <Button onClick={() => setOpenNewTask(false)}>Cancel</Button>

                <Button
                  onClick={handleNewTask}
                  variant="contained">
                  Add Task
                </Button>
              </DialogActions>
            </Stack>
          </Dialog>

          <Calendar
            localizer={localizer}
            events={allTasks}
            onSelectEvent={handleEventSelect}
            startAccessor="start"
            endAccessor="end"
            dayLayoutAlgorithm="no-overlap"
            style={{
              height: `500px`,
              marginTop: `50px`,
              marginLeft: "2rem",
              marginRight: "2rem",
            }}
          />

          <Button
            variant="contained"
            endIcon={<AddIcon />}
            onClick={() => setOpenNewTask(true)}
            sx={{ float: "right", marginRight: "2rem" }}>
            Add Task
          </Button>

          <Dialog
            open={openDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description">
            <DialogTitle id="alert-dialog-title">delete task?</DialogTitle>

            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                By pressing Delete you will delete the selected task, this
                action cannot be reversed. Press Cancel to cancel deletion.
              </DialogContentText>
            </DialogContent>

            <DialogActions>
              <Button onClick={() => setOpenDialog(false)}>Cancel</Button>

              <Button
                onClick={handleDelete}
                variant="contained"
                sx={{ backgroundColor: `red` }}>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <>
          <Stack
            flexDirection="column"
            margin="dense">
            <Typography
              variant="h2"
              color="error"
              textAlign="center"
              marginTop={`10%`}>
              {" "}
              user is undefined, go back to loading screen
            </Typography>
            <br />
            <Button
              variant="contained"
              onClick={() => {
                navigate("/", { replace: true });
              }}
              color="error">
              go back
            </Button>
          </Stack>
        </>
      )}
    </>
  );
}
