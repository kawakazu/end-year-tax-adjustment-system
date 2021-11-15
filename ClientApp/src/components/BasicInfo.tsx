import React, { useEffect, useContext } from 'react';
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


interface BasicInfoDatas {
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

const basicSchema = Yup.object().shape({
    company: Yup.string().required('必須項目です'),
    stuffNum:  Yup.string().required('必須項目です').matches(/^[0-9]{13}$/, '13桁の数字を入力してください'),
    companyAddress: Yup.string().required('必須項目です'),
    taxOffice: Yup.string().required('必須項目です'),
    stuffName: Yup.string().required('必須項目です').matches(/^(.+?)[\s　]+(.+)$/, 'xx xxで入力してください'),
    stuffRuby: Yup.string().required('必須項目です').matches(/^[ァ-ヶー]+[\s　][ァ-ヶー]+$/, 'xx xx（半角カタカナ）で入力してください'),
    stuffAddress: Yup.string().required('必須項目です'),
    partnerNum: Yup.string().matches(/^[0-9]{12}$/, { message: '12桁の数字を入力してください', excludeEmptyString: true }),
    partnerName: Yup.string().matches(/^(.+?)[\s　]+(.+)$/, { message: 'xx xxで入力してください', excludeEmptyString: true }),
    partnerRuby: Yup.string().matches(/^[ァ-ヶー]+[\s　][ァ-ヶー]+$/, { message: 'xx xx（半角カタカナ）で入力してください', excludeEmptyString: true }),
    partnerAddress: Yup.string().typeError('入力が間違っています'),
    partnerBD: Yup.string().matches(/^[0-9]{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])$/, { message: 'xxxx/xx/xx（数字）の形で入力してください', excludeEmptyString: true }),
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
        },
        resolver: yupResolver(basicSchema)
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
                                error={errors.company ? true : false}
                                helperText={errors.company?.message}
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
                                error={errors.stuffNum ? true : false}
                                helperText={errors.stuffNum?.message}
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
                                error={errors.companyAddress ? true : false}
                                helperText={errors.companyAddress?.message}
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
                                error={errors.taxOffice ? true : false}
                                helperText={errors.taxOffice?.message}
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
                                error={errors.stuffName ? true : false}
                                helperText={errors.stuffName?.message}
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
                                error={errors.stuffRuby ? true : false}
                                helperText={errors.stuffRuby?.message}
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
                                error={errors.stuffAddress ? true : false}
                                helperText={errors.stuffAddress?.message}
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
                                error={errors.partnerNum ? true : false}
                                helperText={errors.partnerNum?.message}
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
                                error={errors.partnerName ? true : false}
                                helperText={errors.partnerName?.message}
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
                                error={errors.partnerRuby ? true : false}
                                helperText={errors.partnerRuby?.message}
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
                                error={errors.partnerAddress ? true : false}
                                helperText={errors.partnerAddress?.message}
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
                                error={errors.partnerBD ? true : false}
                                helperText={errors.partnerBD?.message}
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