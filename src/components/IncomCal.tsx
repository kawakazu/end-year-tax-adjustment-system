import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid, Button, Modal, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Filter1SharpIcon from '@material-ui/icons/Filter1Sharp';
import { useController, SubmitErrorHandler, SubmitHandler, useForm, UseControllerProps } from 'react-hook-form';

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
        table: {
            minWidth: 400,
        },
    }),
);

function createData(
    name: string, 
    income: "bussinessInc1" | "miscellaneousInc1" | "dividendInc1" | "propertyInc1" | "retirementInc1" | "exceptInc1" |  
            "bussinessInc2" | "miscellaneousInc2" | "dividendInc2" | "propertyInc2" | "retirementInc2" | "exceptInc2", 
    requiredExp: "bussinessExp1" | "miscellaneousExp1" | "dividendExp1" | "propertyExp1" | "retirementExp1" | "exceptExp1" |
                 "bussinessExp2" | "miscellaneousExp2" | "dividendExp2" | "propertyExp2" | "retirementExp2" | "exceptExp2"
    ) {
    return { name, income, requiredExp };
}

const rows1 = [
    createData('事業所得(2)', 'bussinessInc1', 'bussinessExp1'),
    createData('雑所得(3)', 'miscellaneousInc1', 'miscellaneousExp1'),
    createData('配当所得(4)', 'dividendInc1', 'dividendExp1'),
    createData('不動産所得(5)', 'propertyInc1', 'propertyExp1'),
    createData('退職所得(6)', 'retirementInc1', 'retirementExp1'),
    createData('(1)~(6)以外の所得', 'exceptInc1', 'exceptExp1'),
];

const rows2 = [
    createData('事業所得(2)', 'bussinessInc2', 'bussinessExp2'),
    createData('雑所得(3)', 'miscellaneousInc2', 'miscellaneousExp2'),
    createData('配当所得(4)', 'dividendInc2', 'dividendExp2'),
    createData('不動産所得(5)', 'propertyInc2', 'propertyExp2'),
    createData('退職所得(6)', 'retirementInc2', 'retirementExp2'),
    createData('(1)~(6)以外の所得', 'exceptInc2', 'exceptExp2'),
];

interface IncomCalData {
    income1: number;
    bussinessInc1: number;
    bussinessExp1: number;
    miscellaneousInc1: number;
    miscellaneousExp1: number;
    dividendInc1: number;
    dividendExp1: number;
    propertyInc1: number;
    propertyExp1: number;
    retirementInc1: number;
    retirementExp1: number;
    exceptInc1: number;
    exceptExp1: number;
    income2: number;
    bussinessInc2: number;
    bussinessExp2: number;
    miscellaneousInc2: number;
    miscellaneousExp2: number;
    dividendInc2: number;
    dividendExp2: number;
    propertyInc2: number;
    propertyExp2: number;
    retirementInc2: number;
    retirementExp2: number;
    exceptInc2: number;
    exceptExp2: number;
}

interface SecdIncomeCal {
    earnings1: number;
    income1: number;
    exIncome1: number;
    earnings2: number;
    income2: number;
    exIncome2: number;
}

const Input = (props: UseControllerProps<IncomCalData>) => {
    const { field, fieldState } = useController(props);
  
    return (
        <>
            <TextField type="number" inputProps={{ style: {textAlign: 'right'} }} {...field} />
        </>
    );
}

function PayrollIncomeDeduction(income: number) {
    if (income >= 8500000) {
        return income - 1950000;
    } else if (income >= 6600000) {
        return income * 0.9 - 1100000;
    } else if (income >= 3600000) {
        return (Math.floor((income / 4) / 1000) * 1000) * 3.2 - 440000;
    } else if (income >= 1800000) {
        return (Math.floor((income / 4) / 1000) * 1000) * 2.8 - 80000;
    } else if (income >= 1628000) { 
        return (Math.floor((income / 4) / 1000) * 1000) * 2.4 + 100000;
    } else if (income >= 1624000) {
        return 1074000;
    } else if (income >= 1622000) {
        return 1072000;
    } else if (income >= 1620000) {
        return 1070000 ;
    } else if (income >= 1619000) {
        return 1069000;
    } else if (income >= 551000) {
        return income - 550000; 
    }
    return 0;
}

function Classification1(incomeQuote: number) {
    if (incomeQuote >= 10000000) {
        return '';
    } else if (incomeQuote >= 9500000) {
        return 'C';
    } else if (incomeQuote >= 9000000) {
        return 'B';
    }
    return 'A';
}

// 48万以下かつ70歳以上　１　昭和27 1.1
// 48万以下かつ70歳未満　２
// 48万超95万以下　3
// 95万超133万以下　4
function Classification2(incomeQuote: number, age: number) {
    if (incomeQuote <= 480000 && age >= 70) {
        return '①';
    } else if (incomeQuote <= 480000 && age < 70) {
        return '②';
    } else if (incomeQuote <= 950000) {
        return '③';
    } else if (incomeQuote <= 1330000) {
        return '④';
    }
    return '';
}

// 180万円以下 180万円以下  収入金額×40％-10万円
//                      55万円に満たない場合には、55万円
// 180万円超　 360万円以下	収入金額×30％+8万円
// 360万円超　 660万円以下	収入金額×20％+44万円
// 660万円超　 850万円以下	収入金額×10％+110万円
// 850万円超	          195万円（上限）

export let incomeCalFlag: boolean = false;
export let incomeCalData: SecdIncomeCal;

const IncomCal = (props: Props) => {
    const classes = useStyle();
    const [modalStyle] = React.useState(getModalStyle());
    const [open, setOpen] = React.useState(false);
    const { watch, handleSubmit, formState: { errors }, control } = useForm<IncomCalData>({
        mode: 'onSubmit',
        reValidateMode: 'onChange',
        defaultValues: {
            income1: 0,
            bussinessInc1: 0,
            bussinessExp1: 0,
            miscellaneousInc1: 0,
            miscellaneousExp1: 0,
            dividendInc1: 0,
            dividendExp1: 0,
            propertyInc1: 0,
            propertyExp1: 0,
            retirementInc1: 0,
            retirementExp1: 0,
            exceptInc1: 0,
            exceptExp1: 0,
            income2: 0,
            bussinessInc2: 0,
            bussinessExp2: 0,
            miscellaneousInc2: 0,
            miscellaneousExp2: 0,
            dividendInc2: 0,
            dividendExp2: 0,
            propertyInc2: 0,
            propertyExp2: 0,
            retirementInc2: 0,
            retirementExp2: 0,
            exceptInc2: 0,
            exceptExp2: 0
        }
    });
    const income1 = Number(watch('income1'));
    const income2 = Number(watch('income2'));
    const expPayInc1 = [
        Number(watch('bussinessInc1')),
        Number(watch('miscellaneousInc1')),
        Number(watch('dividendInc1')),
        Number(watch('propertyInc1')),
        Number(watch('retirementInc1')),
        Number(watch('exceptInc1'))
    ];
    const requiredExp1 = [
        Number(watch('bussinessExp1')),
        Number(watch('miscellaneousExp1')),
        Number(watch('dividendExp1')),
        Number(watch('propertyExp1')),
        Number(watch('retirementExp1')),
        Number(watch('exceptExp1'))
    ];
    const expPayInc2 = [
        Number(watch('bussinessInc2')),
        Number(watch('miscellaneousInc2')),
        Number(watch('dividendInc2')),
        Number(watch('propertyInc2')),
        Number(watch('retirementInc2')),
        Number(watch('exceptInc2'))
    ];
    const requiredExp2 = [
        Number(watch('bussinessExp2')),
        Number(watch('miscellaneousExp2')),
        Number(watch('dividendExp2')),
        Number(watch('propertyExp2')),
        Number(watch('retirementExp2')),
        Number(watch('exceptExp2'))
    ];
    let selfNoSalarySum1 = expPayInc1.reduce((a,x) => a+=x,0) - requiredExp1.reduce((a,x) => a+=x,0);
    let selfNoSalarySum2 = expPayInc2.reduce((a,x) => a+=x,0) - requiredExp2.reduce((a,x) => a+=x,0);
    let selfIncomeAmount1 = PayrollIncomeDeduction(income1);
    let selfIncomeAmount2 = PayrollIncomeDeduction(income2)
    let incomeQuote1 = selfIncomeAmount1 + selfNoSalarySum1;
    let incomeQuote2 = selfIncomeAmount2 + selfNoSalarySum2;
    let classification1 = Classification1(incomeQuote1);
    let classification2 = Classification2(incomeQuote2, 70);

    const handleOnSubmit: SubmitHandler<IncomCalData> = (values) => {
        
        incomeCalFlag = true;
        incomeCalData = {
            earnings1: values.income1,
            income1: incomeQuote1,
            exIncome1: selfNoSalarySum1,
            earnings2: values.income2,
            income2: incomeQuote2,
            exIncome2: selfNoSalarySum2
        }
        console.log(incomeCalData);
        setOpen(false);
        // setCheck2('visible');
    }

    const handleOnError: SubmitErrorHandler<IncomCalData> = (errors) => {
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
                <form onSubmit={handleSubmit(handleOnSubmit, handleOnError)} className={classes.root} noValidate autoComplete="off">
                    <Typography variant="h4">所得計算データ入力</Typography>
                    <p>計算を行うには、給与所得を除くほかの所得について、「収入金額等」と「必要経費等」諜報の金額を入力する必要があります</p>
                    <Grid container>
                        <Grid item xs={12}>
                            <Typography variant="h6">あなたの合計所得金（見積額）</Typography>
                            <Table className={classes.table} size="small" aria-label="a sense table">
                                <TableHead>                        
                                    <TableRow>
                                        <TableCell align="center">所得の種類</TableCell>
                                        <TableCell align="center">収入金額等ⓐ</TableCell>
                                        <TableCell align="center">必要経費ⓐ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key="給与所得(1)">
                                            <TableCell align="center">給与所得(1)</TableCell>
                                            <TableCell align="center"><Input control={control} name="income1" rules={{ required: true }} /></TableCell>
                                            <TableCell align="center">{selfIncomeAmount1}</TableCell>
                                    </TableRow>
                                    {rows1.map(row => (
                                        <TableRow key={row.name}>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center"><Input control={control} name={row.income} /></TableCell>
                                            <TableCell align="center"><Input control={control} name={row.requiredExp} /></TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={2}>給与以外の所得の合計</TableCell>
                                        <TableCell align="center">{selfNoSalarySum1}円</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">あなたの合計所得金額の見積額</TableCell>
                                        <TableCell align="center">{incomeQuote1}円</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">区分Ⅰ</TableCell>
                                        <TableCell align="center">{classification1}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">配偶者の合計所得金（見積額）</Typography>
                            <Table className={classes.table} size="small" aria-label="a sense table">
                                <TableHead>                        
                                    <TableRow>
                                        <TableCell align="center">所得の種類</TableCell>
                                        <TableCell align="center">収入金額等ⓑ</TableCell>
                                        <TableCell align="center">必要経費ⓑ</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key="給与所得(1)">
                                            <TableCell align="center">給与所得(1)</TableCell>
                                            <TableCell align="center"><Input control={control} name="income2" rules={{ required: true }} /></TableCell>
                                            <TableCell align="center">{selfIncomeAmount2}</TableCell>
                                    </TableRow>
                                    {rows2.map(row => (
                                        <TableRow key={row.name}>
                                            <TableCell align="center">{row.name}</TableCell>
                                            <TableCell align="center"><Input control={control} name={row.income} /></TableCell>
                                            <TableCell align="center"><Input control={control} name={row.requiredExp} /></TableCell>
                                        </TableRow>
                                    ))}
                                    <TableRow>
                                        <TableCell colSpan={2}>給与以外の所得の合計</TableCell>
                                        <TableCell align="center">{selfNoSalarySum2}円</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                            <Table>
                                <TableBody>
                                    <TableRow>
                                        <TableCell align="center">配偶者の合計所得金額の見積額</TableCell>
                                        <TableCell align="center">{incomeQuote2}円</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="center">区分Ⅱ</TableCell>
                                        <TableCell align="center">{classification2}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                        <Typography variant="h6">※　「区分Ⅱ」が「空欄」となった場合は、配偶者控除の申告をすることができません</Typography>
                        <Grid item xs={10} />
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

export default IncomCal;