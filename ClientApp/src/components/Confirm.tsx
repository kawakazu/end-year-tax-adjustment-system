import React from 'react';
import Grid from '@mui/material/Grid';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Button from "@mui/material/Button";
import { Context } from './Context';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import toast from 'react-hot-toast';

const inputDataNameList: string[] = [
    "会社",
    "個人番号（本人）",
    "会社の住所",
    "所轄税務署",
    "名前（本人）",
    "ナマエ（本人）",
    "住所（本人）",
    "個人番号（配偶者）",
    "名前（配偶者）",
    "ナマエ（配偶者）",
    "住所（配偶者）",
    "生年月日",
    "給与所得",
    "あなたの事業所得（収入）",
    "あなたの事業所得（必要経費）",
    "あなたの雑所得（収入）",
    "あなたの雑所得（必要経費）",
    "あなたの配当所得（収入）",
    "あなたの配当所得（必要経費）",
    "あなたの不動産所得（収入）",
    "あなたの不動産所得（必要経費）",
    "あなたの退職所得（収入）",
    "あなたの退職所得（必要経費）",
    "あなたのその他の所得（収入）",
    "あなたのその他の所得（必要経費）",
    "配偶者の給与所得",
    "配偶者の事業所得（収入）",
    "配偶者の事業所得（必要経費）",
    "配偶者の雑所得（収入）",
    "配偶者の雑所得（必要経費）",
    "配偶者の配当所得（収入）",
    "配偶者の配当所得（必要経費）",
    "配偶者の不動産所得（収入）",
    "配偶者の不動産所得（必要経費）",
    "配偶者の退職所得（収入）",
    "配偶者の退職所得（必要経費）",
    "配偶者のその他の所得（収入）",
    "配偶者のその他の所得（必要経費）",
    "要件",
    "個人番号（扶養親族）",
    "生年月日（扶養親族）",
    "名前（扶養親族）",
    "ナマエ（扶養親族）",
    "住所（扶養親族）",
    "続柄",
    "所得",
    "障害者に該当する事実",
];

async function Update(
                      basicInfoList: string[],
                      incomeCalList: number[],
                      incomeAdjustList: string[]
) {
    await axios.put('/api/infoinput/putbasicinfo/1', 
    {
        BasicInfoId: basicInfoList[0],
        ApplicationUserId: basicInfoList[1],
        Company: basicInfoList[2],
        StuffNum: basicInfoList[3],
        CompanyAddress: basicInfoList[4],
        TaxOffice: basicInfoList[5],
        StuffName: basicInfoList[6],
        StuffRuby: basicInfoList[7],
        StuffAddress: basicInfoList[8], 
        PartnerNum: basicInfoList[9],
        PartnerName: basicInfoList[10],
        PartnerRuby: basicInfoList[11],
        PartnerAddress: basicInfoList[12],
        PartnerBD: basicInfoList[13]
        
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log('通信失敗');
        console.log(error.response);
    });

    await axios.put('/api/infoinput/putincomecal/1', 
    { 
        IncomeCalId: incomeCalList[0],
        ApplicationUserId: incomeCalList[1],
        Income1: incomeCalList[2],
        BussinessInc1: incomeCalList[3],
        BussinessExp1: incomeCalList[4],
        MiscellaneousInc1: incomeCalList[5],
        MiscellaneousExp1: incomeCalList[6],
        DividendInc1: incomeCalList[7],
        DividendExp1: incomeCalList[8],
        PropertyInc1: incomeCalList[9],
        PropertyExp1: incomeCalList[10],
        RetirementInc1: incomeCalList[11],
        RetirementExp1: incomeCalList[12],
        ExceptInc1: incomeCalList[13],
        ExceptExp1: incomeCalList[14],
        Income2: incomeCalList[15],
        BussinessInc2: incomeCalList[16],
        BussinessExp2: incomeCalList[17],
        MiscellaneousInc2: incomeCalList[18],
        MiscellaneousExp2: incomeCalList[19],
        DividendInc2: incomeCalList[20],
        DividendExp2: incomeCalList[21],
        PropertyInc2: incomeCalList[23],
        PropertyExp2: incomeCalList[24],
        RetirementInc2: incomeCalList[25],
        RetirementExp2: incomeCalList[26],
        ExceptInc2: incomeCalList[27],
        ExceptExp2: incomeCalList[28]
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log('通信失敗');
        console.log(error.response);
    });

    await axios.put('/api/infoinput/putincomeadjust/1', 
    { 
        IncomeAdjustId: incomeAdjustList[0],
        ApplicationUserId: incomeAdjustList[1],
        RadioGroup: incomeAdjustList[2],
        DependentsNum: incomeAdjustList[3],
        DependentsDB: incomeAdjustList[4],
        DependentsName: incomeAdjustList[5],
        DependentsRuby: incomeAdjustList[6],
        DependentsAdr: incomeAdjustList[7],
        DependentsRel: incomeAdjustList[8],
        DependentsInc: incomeAdjustList[9],
        DependentsPrsEvid: incomeAdjustList[10]
    })
    .then((results) => {
        console.log(results);
    })
    .catch((error) => {
        console.log('通信失敗');
        console.log(error.response);
    });
}

function Confirm(props: any) {
    const { currentState } = React.useContext(Context);
    const notifyError = () => toast.error('データの送信に失敗しました。少し待ってからリトライしてください');
    const onSubmit = async () => {
        // alert(JSON.stringify(currentState));

        const basicInfoList = [];
        const incomeCalList = [];
        const incomeAdjustList = [];
        for (var i in currentState) {
            for (var j in currentState[i]) {
                switch (i) {
                    case 'BasicInfo':
                        basicInfoList.push(currentState[i][j]);
                        break;
                    case 'IncomeCal':
                        incomeCalList.push(currentState[i][j]);
                        break;
                    case 'IncomeAdjust':
                        incomeAdjustList.push(currentState[i][j]);       
                        break;
                    default:
                        break;
                }
            }
        }
        // DB更新
        Update(basicInfoList, incomeCalList, incomeAdjustList)
            .then(data => {
                console.log(JSON.stringify(data));
                props.handleNext();
            })
            .catch(err => {
                notifyError();
                console.log(err);
            });
    };
    const inputDataList = [];
    var id: number = 0;
    for (var i in currentState) {
        for (var j in currentState[i]) {
            var value = currentState[i][j];
            if (!(j === 'basicInfoId' || j === 'incomeCalId' || j === 'incomeAdjustId' || j === 'applicationUserId')) {
                inputDataList.push(
                    {
                        "id": id,
                        "name": inputDataNameList[id],
                        "value": value
                    }
                );
                id++;
            }
        }
    }
    return (
        <Grid container>
            <TableContainer component={Paper}>
                <Table aria-label="Personal Input Data">
                    <TableHead>
                        <TableRow>
                            <TableCell>項目</TableCell>
                            <TableCell>入力項目</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            inputDataList.map(function(element) {
                                return (
                                    <TableRow key={element.id}>
                                        <TableCell>{element.name}</TableCell>
                                        { element.value ? <TableCell>{element.value}</TableCell> : <TableCell>None</TableCell> }
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <Button variant="contained" color="primary" onClick={props.handleBack}>
                戻る
            </Button>
            <Button variant="contained" color="primary" onClick={onSubmit}>
                送信
            </Button>
        </Grid>
    );
}

export default Confirm;