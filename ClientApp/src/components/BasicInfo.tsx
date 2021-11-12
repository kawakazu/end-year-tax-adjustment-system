import React, { useState, useEffect, useContext } from 'react';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { Context } from './Context';
import { idList } from '../App';

import axios from 'axios';


export interface BasicInfoDatas {
    company: string;
    stuffNum: string;
    companyAddress: string;
    taxOffice: string;
    stuffName: string;
    stuffRuby: string;
    stuffAddress: string; 
    partnerNum: string;
    partnerName: string;
    partnerRuby: string;
    partnerAddress: string;
    partnerBD: string;
}

const schema = Yup.object().shape({
    company: Yup.string().required(),
    stuffNum:  Yup.number().positive().integer().required(),
    companyAddress: Yup.string().required(),
    taxOffice: Yup.string().required(),
    stuffName: Yup.string().required(),
    stuffRuby: Yup.string().required(),
    stuffAddress: Yup.string().required(),
    partnerNum: Yup.number().positive().integer(),
    partnerName: Yup.string(),
    partnerRuby: Yup.string(),
    partnerAddress: Yup.string(),
    partnerBD: Yup.string(),
});

const BasicInfo = (props: any) => {    
    const { currentState, setCurrentState } = useContext(Context);
    const { control, handleSubmit, formState:{ errors }, reset } = useForm<BasicInfoDatas>({
        defaultValues: {
            company: '',
            stuffNum: '',
            companyAddress: '',
            taxOffice: '',
            stuffName: '',
            stuffRuby: '',
            stuffAddress: '', 
            partnerNum: '',
            partnerName: '',
            partnerRuby: '',
            partnerAddress: '',
            partnerBD: ''
        }
    });
    useEffect(() => {
        var url: string = '/api/infoinput/getbasicinfo/' + idList.id;
        axios.get(url).then((res) => {
            reset(res.data);
            console.log(res.data);
        });
    }, [reset]);

    const onSubmit = (data: BasicInfoDatas) => {
        props.handleNext();
        setCurrentState({...currentState, 'BasicInfo': data });
    }
    return (       
          <Grid container spacing={3}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid item xs={12}>
                    <Typography variant="h5" component="h2">本人情報</Typography>

                    <Controller
                        control={control}
                        name="company"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="会社"
                                fullWidth
                                margin="normal"
                                // defaultValue={users}
                                // error={errors.company ? true : false}
                                // helperText={errors.company?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="stuffNum"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="個人番号"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="companyAddress"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="会社の住所"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="taxOffice"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="所轄税務署"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="stuffName"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="名前"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="stuffRuby"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="ナマエ"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="stuffAddress"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="住所"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Typography variant="h5" component="h2">配偶者情報</Typography>
                    <Controller
                        control={control}
                        name="partnerNum"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="個人番号"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="partnerName"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="名前"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="partnerRuby"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="ナマエ"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="partnerAddress"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="住所"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="partnerBD"
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="生年月日"
                                fullWidth
                                margin="normal"
                            />
                        )}
                    />
                    <Button variant="contained" color="primary" type="submit">次へ</Button>
                </Grid>
            </form> 
          </Grid>       
    );
}

export default BasicInfo;