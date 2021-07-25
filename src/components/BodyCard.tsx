import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import axios from 'axios';

import BasicInfo, { basicInfoFlag, basicInfoData } from './BasicInfo';
import IncomCal, { incomeCalFlag, incomeCalData } from './IncomCal';
import IncomAdjust, { incomeAdjustFlag, incomeAdjustData } from './IncomAdjust';

const useStyle = makeStyles((theme: Theme) =>
    createStyles({
        bullet: {
            display: 'inline-block',
            margin: '0.2px',
            transform: 'scale(0.8)',
        },
        title: {
            fontSize: 14,
        },
        pos: {
            marginBottom: 12,
        },
        demo: {
            backgroundColor: theme.palette.background.paper,
        },
    }),
);

function createExcel() {
    const param = {
        "basicInfo": basicInfoData,
        "incomeCal": incomeCalData,
        "incomeAdjust": incomeAdjustData
    }
    // Excelを作成し、ダウンロードする。
    if (basicInfoFlag && incomeCalFlag && incomeAdjustFlag) {
        const url = ' http://localhost:8000/download';
        axios.post(url, param, {
                responseType: "blob"
            })
            .then(response => {
                const data = response.data;
                console.log(response);
                const url = URL.createObjectURL( new Blob([data], { type:  data.type }) );
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "Deduction_application.xlsx");
                document.body.appendChild(link);
                link.click();
                URL.revokeObjectURL(url);
                document.body.removeChild(link);
            })
            .catch(error => {
                console.log(error);
            })
    } else { // シートを入力していない場合
        let message: string = '';
        if (!basicInfoFlag) { message += "基本情報シートを入力してください。\n"; }
        if (!incomeCalFlag) { message += "所得金額計算シートを入力してください。\n"; }
        if (!incomeAdjustFlag) { message += "所得金額調整シートを入力してください。\n"; }
        alert(message);
    }
}

const BodyCard = () => {
    const classes = useStyle()

    return (
        <Card variant="outlined">
            <CardContent>
            <Typography className={classes.title} color="initial" gutterBottom>
                はじめに
            </Typography>
            <Typography variant="h5" component="h2">
                作成から製作までの手順
            </Typography>
            <List component="nav" aria-label="secondary mailbox folders">
                <ListItem>
                    <ListItemText 
                    primary={<BasicInfo name="基本情報シート" />}
                    secondary="基本情報のデータを入力する"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<IncomCal name="所得金額計算シート" />}
                    secondary="あなたと配偶者の収入金額等と必要経費等の金額を入力する"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<IncomAdjust name="所得金額調整シート" />}
                    secondary="該当する場合は、必要事項を入力する"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<Button variant="contained" size='medium' color="primary" onClick={() => createExcel()}>申告書印刷シート</Button>}
                    secondary="給与所得者の配偶者控除申告書を印刷する"
                    />
                </ListItem>
            </List>
            </CardContent>
        </Card>
    );    
}

export default BodyCard;