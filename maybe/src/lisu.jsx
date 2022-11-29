import PersonAddAltTwoToneIcon from '@mui/icons-material/PersonAddAltTwoTone';
import { Box, Button, Typography, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from "react";
import LoginIcon from '@mui/icons-material/Login';

import useAxiosWithJWT from './things_for_auth/useAxiosWithJWT';
import useAuth from './things_for_auth/useAuth';
import { styles } from './style';
import axios from './api/axios';


export function LISU() {

    const [success, setSuccess] = useState(false);
    const [signUp, setSignUp] = useState(false);
    //TODO: change errorMsg to a snackbar
    const [errorMsg, setErrormsg] = useState('');
    const [inputs, setInputs] = useState({
        name: "", password: "", confirmPassword: ""
    });

    const navigate = useNavigate();

    const { setAuth } = useAuth();
    const axiosWithJWT = useAxiosWithJWT();

    useEffect(() => {
        setAuth({ name: '', accessToken: '' });
    }, []);

    useEffect(() => {

        if (success) {

            console.log("success");
            navigate('In', { replace: true });
        }

    }, [success])

    const handleChange = (e) => {
        setInputs((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
        setErrormsg('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const name = inputs.name;
        const password = inputs.password;
        const confirmPassword = inputs.confirmPassword;

        if (!name || !password) {

            return setErrormsg('Empty Field');
        } else if (name.length < 6) {

            return setErrormsg('Name must be at least 6 characters');
        } else if (password.length < 8) {

            return setErrormsg('Password must be at least 8 characters');
        }

        try {

            if (signUp) {

                if (password != confirmPassword) {

                    setErrormsg('Passwords does not match');
                    return;

                }

                await axios.post("/signUp",
                    JSON.stringify({ username: inputs.name, password: inputs.password }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );

                handleReset();

            } else {

                const response = await axiosWithJWT.post("/logIn",
                    JSON.stringify({ username: inputs.name, password: inputs.password }),
                    {
                        headers: { 'Content-Type': 'application/json' },
                        withCredentials: true
                    }
                );

                const accessToken = response?.data?.accessToken;
                setAuth({ name: name, accessToken: accessToken });
                setSuccess(true);
            }
        } catch (error) {

            if (!error?.response) {

                setErrormsg('Server Not Responding');
                return

            } else if (error.response?.status === 409) {

                setErrormsg('Username already exists');
                return

            } else if (error.response?.status === 401) {

                setErrormsg('Username & password do not match');
                return

            } else {

                setErrormsg
                    ('Something went wrong :(')
                return
            }
        }
    };

    const handleReset = () => {

        setSignUp(!signUp);
        setInputs({ name: '', password: '', confirmPassword: '' });

    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <Box sx={styles.loginBox}>
                    <Typography
                        textAlign={"center"}
                        sx={errorMsg ? styles.errorMsg : styles.offscreen}
                    >
                        {errorMsg}
                    </Typography>

                    <Typography
                        variant='h2'
                        sx={styles.loginTitle}
                    >
                        {signUp ? "Sign Up" : "Login"}
                    </Typography>

                    <TextField
                        name="name"
                        value={inputs.name}
                        margin="normal"
                        variant="outlined"
                        placeholder="User Name"
                        onChange={handleChange}
                    />

                    <TextField
                        name="password"
                        value={inputs.password}
                        margin="normal"
                        type={"password"}
                        variant="outlined"
                        placeholder="Password"
                        onChange={handleChange}
                    />
                    {signUp ?
                        <TextField
                            name="confirmPassword"
                            value={inputs.confirmPassword}
                            margin="normal"
                            type={"password"}
                            variant="outlined"
                            placeholder="Confirm Password"
                            onChange={handleChange}
                        /> : []}

                    <Button
                        variant="contained"
                        sx={styles.loginButton}
                        type="submit"
                        endIcon={signUp ? <PersonAddAltTwoToneIcon /> : <LoginIcon />}
                    >
                        {signUp ? "Sign Up" : "Login"}
                    </Button>

                    <Button
                        onClick={handleReset}
                        sx={{ marginTop: '15px' }}
                        endIcon={signUp ? <LoginIcon /> : <PersonAddAltTwoToneIcon />}
                    >
                        {signUp ? "already have a user? log in now" : "Don't have a user yet? Sign Up here"}
                    </Button>
                </Box>
            </form>
        </>
    );
};
