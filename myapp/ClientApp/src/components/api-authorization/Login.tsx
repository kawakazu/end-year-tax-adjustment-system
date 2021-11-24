import React from 'react';
import { Link as RouterLink } from "react-router-dom";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { idList } from './../../App';

interface Props {
    authenticated: boolean;
    setAuthenticated: ()=>void;
}

type User = {
    mail: string;
    password: string;
}

const loginSchema = Yup.object().shape({
    mail: Yup.string().email().required('メールアドレスを入力してください'),
    password: Yup.string().required('パスワードを入力してください'),
});

export default function Login(props: Props) {
    const { control, handleSubmit, formState:{ errors } } = useForm<User>({
        defaultValues: {
            mail: '',
            password: '',
        },
        resolver: yupResolver(loginSchema)
    });

    const onSubmit = async (data: User) => {
        await axios.post('/api/auth/login', 
        { 
            login_id: data.mail, 
            password: data.password 
        })
        .then((results) => {
            console.log(results);
            props.setAuthenticated();
            // Cookieの設定
            document.cookie = "id=" + results.data.applicationUserId;
            idList['id'] = results.data.applicationUserId;
        })
        .catch((error) => {
            console.log('通信失敗');
            console.log(error);
        });
    }

    return (
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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
                Sign in
            </Typography>
            <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate sx={{ mt: 1 }}>
                <Controller
                    control={control}
                    name="mail"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Email Address"
                            name="email"
                            autoComplete="email"
                            autoFocus
                            error={errors.mail ? true : false}
                            helperText={errors.mail?.message}
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
                        <TextField
                            {...field}
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Password"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            error={errors.password ? true : false}
                            helperText={errors.password?.message}
                        />
                    )}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                >
                Sign In
                </Button>
                <Grid container>
                <Grid item>
                    <Link
                        component={RouterLink}
                        to="/create-account"
                        color="primary"
                    >
                    {"Create account"}
                    </Link> 
                    
                </Grid>
                </Grid>
            </Box>
            </Box>
        </Container>
    );
}