import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles.css';
import Checkbox from '@mui/material/Checkbox';
import { getToken } from '../../service/authenticate'
import api from '../../service/backend';
import { Grid, Typography } from '@mui/material';

const commonStyles = {
    bgcolor: 'background.paper',
    m: 1,
    width: '100%',
    height: '100%',
    borderRadius: '5px'
};

const theme = createTheme();

function DynamicList(props) {
    const projectId = props.id;
    const token = getToken();
    const [checked, setChecked] = React.useState([true, false]);
    const [list, setList] = useState([]);
    const [value, setValue] = useState("");

    useEffect(() => {
        setList(props.tasks)
    }, [props.tasks]);

    const handleCheck = (event) => {
        setChecked([event.target.checked, event.target.checked]);
    };

    async function deleteProject() {
        let options = {
            method: 'POST',
            url: `${process.env.REACT_APP_API}/project_rm:${projectId}`,
            headers: {
                Authorization: `Bearer ${token}`
            },
        };
        await api.request(options);
    }

    async function loadData(url, data, method) {
        let options = {
            method,
            url,
            headers: {
                Authorization: `Bearer ${token}`
            },
            data
        };
        await api.request(options);
    }

    const addToList = async () => {
        let tempArr = list;
        tempArr.push({ "taskName": value, "status": 1 });
        setList(tempArr);
        setValue("");
        const url = `${process.env.REACT_APP_API}/projectUpdate:${projectId}`;
        await loadData(url, { "tasks": tempArr }, 'POST');
    };

    const deleteItem = async (index) => {
        let temp = list.filter((item, i) => i !== index);
        setList(temp);
        const url = `${process.env.REACT_APP_API}/projectUpdate:${projectId}`;
        const data = { "tasks": temp };
        await loadData(url, data, 'POST');
    };

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        ...commonStyles,
                        border: 1,
                        marginTop: 8,
                        borderColor: 'primary.main',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box noValidate sx={{ mt: 1 }}>
                        <Box
                            sx={{
                                display: "flex",
                                width: "100%",
                                height: 40,
                                backgroundColor: 'primary.dark',
                                alignItems: "center",
                                justifyContent: "space-between"
                            }}>
                            <Typography variant="h6" style={{ color: "#fff", marginLeft: "10px" }}>
                                {props.projectName}
                            </Typography>
                            <div>
                                <IconButton>
                                    <EditIcon style={{ display: "flex", color: "#fff" }} />
                                </IconButton>
                                <IconButton onClick={deleteProject}>
                                    <DeleteIcon style={{ display: "flex", color: "#fff" }} />
                                </IconButton>
                            </div>
                        </Box>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="value"
                            label="value"
                            name="value"
                            autoComplete="value"
                            autoFocus
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            onClick={addToList}
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Add task
                        </Button>
                        <Grid container direction="column">
                            {list.length > 0 &&
                                list.map((item, i) => (
                                    <Grid item key={i}>
                                        <IconButton onClick={() => deleteItem(i)}>
                                            <DeleteIcon />
                                        </IconButton>
                                        <Checkbox
                                            checked={checked[0] && checked[1]}
                                            onChange={handleCheck} />
                                        {item.taskName}
                                    </Grid>
                                ))
                            }
                        </Grid>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider >
    );
}

export default DynamicList;
