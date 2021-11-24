import React from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField  from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import FormHelperText from "@mui/material/FormHelperText";
import MenuItem from '@mui/material/MenuItem';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup'
import { Controller, useForm } from 'react-hook-form';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import Button from '@mui/material/Button';
import axios from 'axios';
import { idList } from './../App';

type DownloadInputs = {
    japaneseEra: string;
    year: string;
}

const Download = () => {
    const downloadSchema = Yup.object().shape({
        japaneseEra: Yup.string().required('必須項目です').oneOf(['平成', '令和'], 'いずれかを選択してください'),
        year: Yup.string().required('必須項目です'),
    });
    const { control, handleSubmit, formState:{errors} } = useForm<DownloadInputs>({
        defaultValues: {
            japaneseEra: "令和",
            year: "2"
        },
        resolver: yupResolver(downloadSchema)
    });
    const onSubmit = (data: DownloadInputs) => {
        console.log(data);
        // excel download
        var url = '/api/filedownload/download/' + idList.id;
        axios({
          url: url,
          method: 'GET',
          responseType: 'blob',
          params: {
              japaneseEra: data.japaneseEra,
              year: data.year,
          }
        }).then((response)=> {
          const url= window.URL.createObjectURL(new Blob([response.data]));
          const link= document.createElement('a');
          link.href= url;
          link.setAttribute('download', 'test.xlsx');
          document.body.appendChild(link);
          link.click();
        });
    }
    return (
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
            {/* <Grid container alignItems="center" justify="center"> */}
            <Grid container alignItems="center" justifyContent="center">
                <Grid item xs={12}>
                    <Typography
                    component="h1"
                    variant="h4"
                    align="center"
                    color="text.primary"
                    gutterBottom
                    >
                    ダウンロード
                    </Typography>
                    <p>「基礎控除・配偶者控除等・所得金額調整控除申告書」をExelファイルでダウンロードする。</p>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <FormControl fullWidth variant='standard' margin='normal'>
                            <InputLabel id="select-era-label">元号</InputLabel> 
                            <Controller
                                control={control}
                                name="japaneseEra"
                                render={({ field }) => (
                                    <Select
                                        labelId="select-era-label"
                                        id="select-era"
                                        {...field}
                                        error={errors.japaneseEra ? true : false}
                                        // helperText={errors.japaneseCalender?.message}
                                        
                                    >
                                        <MenuItem value="平成">平成</MenuItem>
                                        <MenuItem value="令和">令和</MenuItem>
                                    </Select>
                                )}
                            />
                            <FormHelperText>
                                { errors.japaneseEra?.message }
                            </FormHelperText>
                            <Controller
                                control={control}
                                name="year"
                                render={({ field }) => (
                                    <TextField
                                        {...field}
                                        label="年"
                                        margin="normal"
                                        size="small"
                                        error={errors.year ? true : false}
                                        helperText={errors.year?.message}
                                    />
                                )}
                            />
                            <Button variant="contained" color="primary" type="submit">ダウンロード</Button>
                            </FormControl>
                    </form>
                </Grid>
            </Grid>
        </Container>
    );
}

export default Download;