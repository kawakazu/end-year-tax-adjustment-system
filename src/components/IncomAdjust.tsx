import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid, Container, Modal } from '@material-ui/core';
import Filter1SharpIcon from '@material-ui/icons/Filter1Sharp';
import Button from '@material-ui/core/Button';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import { Controller, SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';

type Props = {
    name: string;
}

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
      overflow:'scroll'
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
        table: {
            minWidth: 400,
        },
        formControl: {
            margin: theme.spacing(3),
        }
    }),
);

interface IncomAdjustDatas {
    radioGroup: string;
    dependentsNum: string;
    dependentsBD: string;
    dependentsLN: string;
    dependentsFN: string;
    dependentsLNR: string;
    dependentsFNR: string;
    dependentsAdr: string;
    dependentsRel: string;
    dependentsInc: number;
    disabilityPrsEvid: string;

}

export let incomeAdjustFlag: boolean = false;
export let incomeAdjustData: IncomAdjustDatas;

const IncomAdjust = (props: Props) => {
    const classes = useStyle();
    const [modalStyle] = React.useState(getModalStyle());
    const [open, setOpen] = React.useState(false);
    const { handleSubmit, formState: { errors }, control } = useForm<IncomAdjustDatas>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            radioGroup: '',
            dependentsNum: '',
            dependentsBD: '',
            dependentsLN: '',
            dependentsFN: '',
            dependentsLNR: '',
            dependentsFNR: '',
            dependentsAdr: '',
            dependentsInc: 0,
            dependentsRel: '',
            disabilityPrsEvid: ''
        }
    });

    const handleOnSubmit: SubmitHandler<IncomAdjustDatas> = (values) => {
        console.log(values);
        incomeAdjustFlag = true;
        incomeAdjustData = values;
        setOpen(false);
    }

    const handleOnError: SubmitErrorHandler<IncomAdjustDatas> = (errors) => {
        console.log(errors);
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
                    <Typography variant="h4">所得金額調整データ入力</Typography>
                    <p>あなたの給与の収入金額が850万を超える場合に、所得金額調整控除の対象となります。</p>
                    <Container fixed>
                        <ul>
                             <li>年末調整において所得金額調整控除の適用を受けようとする場合は、「要件」欄の概要する項目に「1」を入力（選択）し、その項目に応じて「★扶養親族等」欄及び「☆特別障碍者」欄にその該当する者について入力してください</li>
                             <li>年末調整における所得金額調整控除の額については給与の支払い者が計算しますので、この申告書に所得金額調整控除の額を入力する欄はありません</li>
                        </ul>

                        <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} className={classes.root} noValidate autoComplete="off">
                            <Typography variant="h5">要件</Typography>
                            <Controller
                                control={control}
                                name="radioGroup"
                                render={({ field: {onChange, value} }) => ( 
                                    <RadioGroup aria-label="requirement" value={value} onChange={onChange}>
                                        <FormControlLabel value="0" control={<Radio />} label="なし" />
                                        <FormControlLabel value="1" control={<Radio />} label="あなた自身が特別障害者" />
                                        <FormControlLabel value="2" control={<Radio />} label="同一生計配偶者が特別障害者" />
                                        <FormControlLabel value="3" control={<Radio />} label="扶養親族が特別障害者" />
                                        <FormControlLabel value="4" control={<Radio />} label="扶養親族が年齢23歳未満(平10.1.2以後生)" />
                                    </RadioGroup>
                                )}
                                rules={{required: "入力必須です"}}
                            />
                            {errors.radioGroup && <p>{errors.radioGroup.message}</p>}
                            <FormHelperText>特別障碍者が含まれる項目を選択した場合★を記載し、同一生計者・扶養親族が含まれる項目を選択した場合☆を記載する。</FormHelperText>

                            <Typography variant="h5">☆扶養親族等</Typography>
                            <Grid container spacing={1}>
                                <Grid item xs={12}>
                                    <Controller
                                        render={({ field }) => <TextField label="個人番号" {...field} />}
                                        name="dependentsNum"
                                        control={control}
                                    />
                                    {errors.dependentsNum && <p>{errors.dependentsNum.message}</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        render={({ field }) => <TextField label="生年月日" helperText="西暦/月/日で入力してください" {...field} />}
                                        name="dependentsBD"
                                        control={control}
                                    />
                                    {errors.dependentsBD && <p>{errors.dependentsBD.message}</p>}
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => <TextField label="苗字" {...field} />}
                                        name="dependentsLN"
                                        control={control}
                                    />
                                    {errors.dependentsLN && <p>{errors.dependentsLN.message}</p>}
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => <TextField label="名前" {...field} />}
                                        name="dependentsFN"
                                        control={control}
                                    />
                                    {errors.dependentsFN && <p>{errors.dependentsFN.message}</p>}
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => <TextField label="ミョウジ" {...field} />}
                                        name="dependentsLNR"
                                        control={control}
                                    />
                                    {errors.dependentsLNR && <p>{errors.dependentsLNR.message}</p>}
                                </Grid>
                                <Grid item xs={6}>
                                    <Controller
                                        render={({ field }) => <TextField label="ナマエ" {...field} />}
                                        name="dependentsFNR"
                                        control={control}
                                    />
                                    {errors.dependentsFNR && <p>{errors.dependentsFNR.message}</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        render={({ field }) => <TextField label="住所" {...field} />}
                                        name="dependentsAdr"
                                        control={control}
                                    />
                                    {errors.dependentsAdr && <p>{errors.dependentsAdr.message}</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        render={({ field }) => <TextField label="続柄" {...field} />}
                                        name="dependentsRel"
                                        control={control}
                                    />
                                    {errors.dependentsRel && <p>{errors.dependentsRel.message}</p>}
                                </Grid>
                                <Grid item xs={12}>
                                    <Controller
                                        render={({ field }) => <TextField label="所得金額" {...field} />}
                                        name="dependentsInc"
                                        control={control}
                                    />
                                    {errors.dependentsInc && <p>{errors.dependentsInc.message}</p>}
                                </Grid>
                                <Grid item xs={12} />

                                <Typography variant="h5">★特別障害者</Typography>
                                <Grid item xs={12}>
                                    <Controller
                                        render={({ field }) => <TextField label="該当する証明" {...field} />}
                                        name="disabilityPrsEvid"
                                        control={control}
                                    />
                                    {errors.disabilityPrsEvid && <p>{errors.disabilityPrsEvid.message}</p>}
                                </Grid>
                                <Grid item xs={10} />
                                <Grid item xs={2}>
                                    <Button variant="contained" color="primary" type="submit">OK</Button>                         
                                </Grid>
                            </Grid>
                        </form>
                    </Container>
                </div>
            </Modal>
        </div>
    );
};

export default IncomAdjust;