import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Checkbox, Grid, Input, Modal, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Filter1SharpIcon from '@material-ui/icons/Filter1Sharp';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
    name: string;
    // children: React.ReactElement;
    // forwardRef?: React.Ref<HTMLDivElement>;
}

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflow:'scroll',
    };
}

const useStyle = makeStyles((theme: Theme) => 
    createStyles({
        paper: {
            position: 'absolute',
            width: 800,
            height: 800,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        root: {
            '& > *': {
              margin: theme.spacing(1),
              width: 800,
            },
        },
        textField: {
            width: 300,
        },
    }),
);

type ItemProps = {
    id: string;
    name: string;
    require: boolean;
    type: string;
    value: string;
    handle: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputInfo = (props: ItemProps) => {
    if (props.require) {
        return (
            <Grid item xs={12}>
                <Controller 
                    render={({ field }) => <TextField {...field} />}
                    name="school"
                />
            </Grid>
        );
    } else {
        return (
            <Grid item xs={12}>
                <TextField 
                    style={{ margin: 8, paddingBottom: 20 }}
                    id={props.id} 
                    label={props.name} 
                    value={props.value} 
                    aria-describedby="component-helper-text"
                    type="text"
                    onChange={props.handle}
                />
            </Grid>
        );
    }
}

interface BasicInfoDatas {
    school: string;
    stuffNum: number;
    stuffLN: string;
    stuffFN: string;
    stuffLNRuby: string;
    stuffFNRuby: string;
    stuffAdr: string; 
    partnerNum: number;
    partnerLN: string;
    partnerFN: string;
    partnerLNRuby: string;
    partnerFNRuby: string;
    partnerAdr: string;
    partnerBD: string;
    partnerResidnet: string;
    partnerEvid: string;
}

export let basicInfoFlag: boolean = false;
export let basicInfoData: BasicInfoDatas;

const BasicInfo = (props: Props) => {
    const classes = useStyle();
    const [modalStyle] = React.useState(getModalStyle());
    const [open, setOpen] = React.useState(false);
    const { register, watch, handleSubmit, formState: { errors }, control } = useForm<BasicInfoDatas>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            school: '',
            stuffNum: 1111111111,
            stuffLN: '',
            stuffFN: '',
            stuffLNRuby: '',
            stuffFNRuby: '',
            stuffAdr: '', 
            partnerNum: 1111111111,
            partnerLN: '',
            partnerFN: '',
            partnerLNRuby: '',
            partnerFNRuby: '',
            partnerAdr: '',
            partnerBD: '',
            partnerEvid: ''
        }
    });

    const handleOnSubmit: SubmitHandler<BasicInfoDatas> = (values) => {
        console.log(values.school);
        basicInfoFlag = true;
        basicInfoData = values;
        setOpen(false);
    }

    const handleOnError: SubmitErrorHandler<BasicInfoDatas> = (errors) => {
        console.log(errors.school);
    }

    return (
        <div>
            <Button
                variant="contained"
                size='medium'
                color="secondary"
                startIcon={<Filter1SharpIcon />}
                onClick={() => setOpen(true)}
            >
                {props.name}
            </Button>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div style={modalStyle} className={classes.paper}>
                    <h2 id="basicInfo-modal-title">基本情報</h2>
                    <p>＊　の付いている項目は、入力必須です。それ以外の項目については、該当箇所のみ入力してください。</p>
                    <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} className={classes.root} noValidate autoComplete="off">
                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">本人情報</Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <label>学校名</label>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="school"
                                    control={control}
                                    rules={{required: "入力必須です"}}
                                />
                                {errors.school && <p>{errors.school.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>職員番号</label>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="stuffNum"
                                    control={control}
                                    rules={{required: "入力必須です", pattern: { value: /^\d{10}$/, message: "10桁の数字です" }}}
                                />
                                {errors.stuffNum && <p>{errors.stuffNum.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>名前</label>
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="stuffLN"
                                    control={control}
                                    rules={{required: "入力必須です"}}
                                />
                                {errors.stuffLN && <p>{errors.stuffLN.message}</p>}
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="stuffFN"
                                    control={control}
                                    rules={{required: "入力必須です"}}
                                />
                                {errors.stuffFN && <p>{errors.stuffFN.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>フリガナ</label>
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="stuffLNRuby"
                                    control={control}
                                    rules={{required: "入力必須です"}}
                                />
                                {errors.stuffLNRuby && <p>{errors.stuffLNRuby.message}</p>}
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="stuffFNRuby"
                                    control={control}
                                    rules={{required: "入力必須です"}}
                                />
                                {errors.stuffFNRuby && <p>{errors.stuffFNRuby.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>住所</label>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="stuffAdr"
                                    control={control}
                                    rules={{required: "入力必須です"}}
                                />
                                {errors.stuffAdr && <p>{errors.stuffAdr.message}</p>}
                            </Grid>
                            
                            
                            <Grid item xs={12}>
                                <Typography variant="h5" component="h2">配偶者情報</Typography>   
                            </Grid>
                            <Grid item xs={12}>
                                <label>配偶の個人番号</label>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerNum"
                                    control={control}
                                />
                                {errors.partnerNum && <p>{errors.partnerNum.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>配偶者の名前</label>
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerLN"
                                    control={control}
                                />
                                {errors.partnerLN && <p>{errors.partnerLN.message}</p>}
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerFN"
                                    control={control}
                                />
                                {errors.partnerFN && <p>{errors.partnerFN.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>フリガナ</label>
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerLNRuby"
                                    control={control}
                                />
                                {errors.partnerLNRuby && <p>{errors.partnerLNRuby.message}</p>}
                            </Grid>
                            <Grid item xs={6}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerFNRuby"
                                    control={control}
                                />
                                {errors.partnerFNRuby && <p>{errors.partnerFNRuby.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>住所</label>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerAdr"
                                    control={control}
                                />
                                {errors.partnerAdr && <p>{errors.partnerAdr.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <label>配偶者の生年月日</label>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerBD"
                                    control={control}
                                />
                                {errors.partnerBD && <p>{errors.partnerBD.message}</p>}
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <FormControlLabel
                                            id="nonresident"
                                            value="yes"
                                            control={<Checkbox color="primary" />}
                                            label="非居住者である配偶者"
                                            labelPlacement="end"
                                        />
                                    }
                                    name="partnerResidnet"
                                    control={control}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <label>非居住者である配偶者と生計を一にする事実</label>
                            </Grid>
                            <Grid item xs={12}>
                                <Controller
                                    render={({ field }) => <TextField {...field} />}
                                    name="partnerEvid"
                                    control={control}
                                />
                                {errors.partnerEvid && <p>{errors.partnerEvid.message}</p>}
                            </Grid>
                            
                            <Grid item xs={10}></Grid>
                            <Grid item xs={2}>
                                <Button variant="contained" color="primary" type="submit">OK</Button>                         
                            </Grid>
                        </Grid>
                    </form>
                </div>
            </Modal>
        </div>
    );
};

export default BasicInfo;