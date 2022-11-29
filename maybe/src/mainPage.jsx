import { Typography, Button, TextField, Stack } from '@mui/material';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { DatePicker } from '@mui/x-date-pickers';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

import useAxiosWithJWT from './things_for_auth/useAxiosWithJWT';
import useAuth from './things_for_auth/useAuth';
import { useEffect, useState } from 'react';
import { styles } from './style';
import moment from 'moment';

export function App() {

  //task values to send
  const [startValue, setStartValue] = useState(new Date());
  const [taskLength, setTaskLength] = useState(0);
  const [taskName, setTaskName] = useState("");
  const [taskUsers, setTaskUsers] = useState("");
  const [allTasks, setAllTasks] = useState([]);
  const newTask = [];

  const [errorMsg, setErrormsg] = useState("");

  const navigate = useNavigate();

  // const [openDialog, setOpenDialog] = useState(false);

  //custom hook usages
  const axiosWithJWT = useAxiosWithJWT(); // get request hook
  const { auth } = useAuth(); // get current user
  const loggedUser = auth.name; //Current username for taking tasks from db

  //date localizer for calendar
  moment.locale('en-il');
  const localizer = momentLocalizer(moment);




  useEffect(() => {

    let isMounted = true;
    const controller = new AbortController();


    getTasks(controller);
    return () => {
      isMounted = false;
      controller.abort();
    }

  }, []);


  const getTasks = async (controller) => {

    try {

      const response = await axiosWithJWT.get('/getTasks',
        {
          params: {
            requestedName: loggedUser
          },
          signal: controller.signal
        }
      );

      if (!response.data) {
        return;
      } else {

        response.data.map((p) => {

          const task = {
            title: p.TaskName,
            start: new Date(p.startDate),
            end: new Date(p.endDate)
          };

          newTask.push(task);
        });

        setAllTasks(newTask);
        // console.log("all", allTasks);
      }

    } catch (err) {
      console.error(err);
    }
  }



  const handleNewTask = async () => {
    const controller = new AbortController();
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
        usernames: [loggedUser, taskUsers],
        title: taskName,
        start: startValue,
        lengthIn15: lengthIn15
      })
    )
    handleReset();
    getTasks(controller);
  }

  const handleReset = () => {
    setTaskName("");
    setTaskUsers("");
    setTaskLength(0);
    setStartValue(new Date());
  }

  return (
    <>
      {loggedUser ?
        <>

          <Typography
            textAlign={"center"}
            sx={errorMsg ? styles.errorMsg : styles.offscreen}
          >
            {errorMsg}
          </Typography>

          <Stack margin='dense' mt={2} flexDirection={'row'} sx={styles.rootBox} justifyContent='space-evenly'>

            <TextField
              name="users"
              value={taskUsers}
              label="Any other users?"
              type='text'
              variant='outlined'
              onChange={(e) => {
                setTaskUsers(e.target.value);
                setErrormsg('');
              }}
            />

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
            style={{ height: `500px`, margin: `50px` }}
          />
        </> : <>
          <Stack flexDirection='column' margin='dense'>

            <Typography
              variant='h2'
              color='error'
              textAlign='center'
              marginTop={`10%`}
            > username is undefined, go back to loading screen
            </Typography>
            <br />
            <Button
              variant='contained'
              onClick={() => { navigate('/', { replace: true }) }}
              color='error'
            >
              go back
            </Button>

          </Stack>
        </>
      }
    </>
  );
};
