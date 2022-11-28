import { Typography, Button, TextField, DialogTitle, DialogContent, DialogActions, Dialog, Stack } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DatePicker } from '@mui/x-date-pickers';
// import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import useAxiosWithJWT from './things_for_auth/useAxiosWithJWT';
import useAuth from './things_for_auth/useAuth';
import { useEffect, useState } from 'react';
import { MyAppBar } from './comps/appbar';
import { styles } from './style';
import moment from 'moment';

export function App() {

  //task values to send
  const [startValue, setStartValue] = useState(new Date());
  const [newTask, setNewTask] = useState({ title: "", start: "", end: "" });
  const [taskLength, setTaskLength] = useState(0);
  const [taskName, setTaskName] = useState("");


  const [errorMsg, setErrormsg] = useState("");

  // const [endValue, setEndValue] = useState(new Date());
  // const [openDialog, setOpenDialog] = useState(false);

  //custom hook usages
  const axiosWithJWT = useAxiosWithJWT(); // get request hook
  const { auth } = useAuth(); // get current user
  const aT = auth.accessToken; //Current user's access token
  const loggedUser = auth.name; //Current username for taking tasks from db

  //date localizer for calendar
  moment.locale('en-il');
  const localizer = momentLocalizer(moment);

  const [dates, setDates] = useState([]);
  const [taskNames, setTaskNames] = useState([]);
  const [endDates, setEndDates] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  console.log(loggedUser); // check if user still logged



  useEffect(() => {

    let isMounted = true;


    getTasks();
    // return () => {
    //   isMounted = false;
    //   controller.abort();
    // }
  }, []);

  const getTasks = async () => {

    const controller = new AbortController();
    try {

      const response = await axiosWithJWT.get('/getTasks',
        {
          params: {
            requestedName: loggedUser
          },
          signal: controller.signal
        }
      );

      console.log(response.data);
      for (let i = 0; i < response.data.length; i++) {
        // setTaskNames([...taskNames, response.data[i].TaskName]);
        console.log(taskNames);
      }

    } catch (err) {
      console.error(err);
    }
  }
  // const handleChange = (newValue) => {
  //   setValue(newValue);
  // }


  const handleNewTask = async () => {
    //TODO: send form to server

    if (taskName.length === 0) {

      return setErrormsg('Task must have a name.');

    } else if (taskLength <= 0) {

      setTaskLength(0);
      return setErrormsg('Length must be bigger than 0.');

    }

    const lengthIn15 = (taskLength * 4);


    await axiosWithJWT.post('/addTask',
      JSON.stringify({
        usernames: [loggedUser],
        title: taskName,
        start: startValue,
        lengthIn15: lengthIn15
      })
    )

    handleReset();
  }

  const handleReset = () => {
    setTaskName('');
    setTaskLength(0);
    setStartValue(new Date());
  }

  return (
    <>

      <MyAppBar />

      <Typography
        textAlign={"center"}
        sx={errorMsg ? styles.errorMsg : styles.offscreen}
      >
        {errorMsg}
      </Typography>
      <Stack margin='dense' mt={2} flexDirection={'row'} sx={styles.rootBox} justifyContent='space-evenly'>
        <TextField
          name="name"
          value={taskName}
          label="Task Name"
          type='text'
          variant='outlined'
          onChange={(e) => {
            setTaskName(e.target.value);
            setErrormsg('');
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
            inputProps: { min: 0 }
          }}
          value={taskLength}
          label="Length (in hours)"
          type='number'
          variant='outlined'
          onChange={(e) => {
            setTaskLength(e.target.value);
            setErrormsg('');
          }}
        />

        {/* <Dialog open={openDialog} >

          <DialogTitle>Add Task</DialogTitle>

          <DialogContent>

            <Stack spacing={2} justifyContent='space-evenly' alignItems={'stretch'} mt={2}>
              <TextField
                autoFocus
                margin='dense'
                id="name"
                label="Task Name"
                type='text'
                variant='outlined'
              />
              <TextField
                margin='dense'
                id="lengthInHours"
                label="Length (in hours)"
                type='number'
                variant='outlined'
              />
            </Stack>

          </DialogContent>

          <DialogActions>

            <Button onClick={() => { setOpenDialog(false) }}>Cancel</Button>
            <Button onClick={() => { handleNewTask() }}>Add</Button>

          </DialogActions>

        </Dialog> */}

        <Button variant='contained' endIcon={<AddIcon />} onClick={() => { handleNewTask() }}>
          Add Task
        </Button>

      </Stack>

      <Calendar
        localizer={localizer}
        events={allTasks}
        startAccessor="start"
        endAccessor="end"
        dayLayoutAlgorithm="no-overlap"
        style={{ height: 500, margin: `50px` }}
      />
    </>
  );
};
