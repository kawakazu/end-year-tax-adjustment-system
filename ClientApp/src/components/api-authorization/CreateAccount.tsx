import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
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

// アカウント専用のvalidatinoが必要
const createAccountSchema = Yup.object().shape({
    mail: Yup.string().email().required('メールアドレスを入力してください'),
    password: Yup.string().required('パスワードを入力してください'),
});

async function CreateInfoInput(id: number) {
    await axios.post('/api/InfoInput/PostBasicInfo', 
    { 
        ApplicationUserId: id,
        Company: "sample",
        StuffNum: "9999999999999",
        CompanyAddress: "sample",
        TaxOffice: "sample",
        StuffName: "sample",
        StuffRuby: "sample",
        StuffAddress: "sample", 
        PartnerNum: "",
        PartnerName: "",
        PartnerRuby: "",
        PartnerAddress: "",
        PartnerBD: ""
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log('通信失敗');
        console.log(error.response);
    });

    await axios.post('/api/infoinput/postincomecal', 
    { 
        ApplicationUserId: id,
        Income1: 0,
        BussinessInc1: 0,
        BussinessExp1: 0,
        MiscellaneousInc1: 0,
        MiscellaneousExp1: 0,
        DividendInc1: 0,
        DividendExp1: 0,
        PropertyInc1: 0,
        PropertyExp1: 0,
        RetirementInc1: 0,
        RetirementExp1: 0,
        ExceptInc1: 0,
        ExceptExp1: 0,
        Income2: 0,
        BussinessInc2: 0,
        BussinessExp2: 0,
        MiscellaneousInc2: 0,
        MiscellaneousExp2: 0,
        DividendInc2: 0,
        DividendExp2: 0,
        PropertyInc2: 0,
        PropertyExp2: 0,
        RetirementInc2: 0,
        RetirementExp2: 0,
        ExceptInc2: 0,
        ExceptExp2: 0,
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log('通信失敗');
        console.log(error.response);
    });

    await axios.post('/api/infoinput/postincomeadjust', 
    { 
        ApplicationUserId: id,
        RadioGroup: "0",
        DependentsNum: "",
        DependentsDB: "", // colum名変更する
        DependentsName: "",
        DependentsRuby: "",
        DependentsAdr: "",
        DependentsRel: "",
        DependentsInc: "",
        DependentsPrsEvid: ""
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log('通信失敗');
        console.log(error.response);
    });
}

const CreateAccount = (props: Props) => {
    const { control, handleSubmit, formState:{ errors } } = useForm<User>({
        defaultValues: {
            mail: '',
            password: '',
        },
        resolver: yupResolver(createAccountSchema)
    });

    const onSubmit = async (data: User) => {
        console.log(data);
        await axios.post('/api/auth/create', 
        { 
            Email: data.mail, 
            Password: data.password 
        })
        .then((results) => {
            // results.data.applicationUserId
            console.log(results);
            axios.post('/api/auth/login', 
            { 
                login_id: data.mail, 
                password: data.password 
            })
            .then((results) => {
                console.log(results);
                // アカウント作成時にDB作成
                CreateInfoInput(results.data.applicationUserId);
                props.setAuthenticated();
                // Cookieの設定
                document.cookie = "id=" + results.data.applicationUserId;
                idList['id'] = results.data.applicationUserId;
            })
            .catch((error) => {
                console.log('通信失敗');
                console.log(error);
            });
        })
        .catch((error) => {
            console.log('通信失敗');
            console.log(error.response);
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
            <Typography component="h1" variant="h5">
                Create Account
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
                Create
                </Button>
            </Box>
            </Box>
        </Container>
    );
}

export default CreateAccount;