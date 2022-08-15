import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import './styles.css';
import { getUserId, getToken } from '../../service/authenticate'
import api from '../../service/backend';

const theme = createTheme();

export default function AddProject() {
    const token = getToken();
    const userId = getUserId();
    const [projectName, setProjectName] = useState('');

    const options = {
        method: 'POST',
        url: `${process.env.REACT_APP_API}/project`,
        headers: {
            Authorization: `Bearer ${token}`
        },
        data: { "userId": userId, "projectName": projectName }
    };

    async function handleSubmit(event) {
        event.preventDefault();
        await api.request(options);
    }

    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="projectName"
                            label="Project Name"
                            name="projectName"
                            autoComplete="username"
                            autoFocus
                            onChange={event => setProjectName(event.target.value)}
                        />

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            Create
                        </Button>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}
