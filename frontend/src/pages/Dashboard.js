import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Grid from '@mui/material/Grid';
import LogoutIcon from '@mui/icons-material/Logout';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUserRounded';
import { getFullName, logout, getUserId, getToken } from '../service/authenticate';
import AddProject from '../components/AddProject';
import io from 'socket.io-client';
import api from '../service/backend';
import DynamicList from '../components/DynamicList';

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: 0,
        width: `100% `,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const mdTheme = createTheme();

function DashboardContent() {
    const [open, setOpen] = useState(true);
    const [fullname, setFullname] = useState();
    let [projects, setProjects] = useState([]);

    useEffect(() => {
        const fullname = getFullName();
        setFullname(fullname)
    }, []);

    async function getAllProjects() {
        const token = getToken();
        const userId = getUserId();

        const options = {
            method: 'GET',
            url: `${process.env.REACT_APP_API}/project:${userId}`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        };

        const { data } = await api.request(options);
        setProjects(data);
    }

    useEffect(() => {
        const socket = io(process.env.REACT_APP_AUTH);
        socket.on("addProject", () => {
            getAllProjects();
        });

        socket.on("rmProject", () => {
            getAllProjects();
        });
    })

    useEffect(() => {
        getAllProjects();
    }, [])

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >

                            <Grid container direction="row">
                                <Grid item>
                                    <VerifiedUserIcon />
                                </Grid>
                                <Grid item>
                                    <Typography style={{ marginLeft: "10px" }}>
                                        {fullname}
                                    </Typography>
                                </Grid>
                            </Grid>

                        </Typography>

                        <IconButton color="inherit" onClick={logout} href="/">
                            <LogoutIcon />
                        </IconButton>

                    </Toolbar>
                </AppBar>
            </Box>
            <Grid container spacing={2}>
                <Grid item style={{ marginTop: "20px", marginLeft: "20px" }}>
                    {projects.map((project, index) => (
                        <Grid item key={index}>
                            <DynamicList projectName={project.projectName} id={project._id} tasks={project?.tasks} />
                        </Grid>
                    ))}
                </Grid>
                <Grid item style={{ marginLeft: "50px" }}>
                    <AddProject />
                </Grid>
            </Grid>

        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <DashboardContent />;
}