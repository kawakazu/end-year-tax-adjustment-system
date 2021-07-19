import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import CheckIcon from '@material-ui/icons/Check';

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

const BodyCard = () => {
    const classes = useStyle()
    // const [check1, setCheck1] = React.useState('hidden');
    // const [check2, setCheck2] = React.useState('hidden');
    // const [check3, setCheck3] = React.useState('hidden');

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
                    {/* <CheckIcon color="primary" /> */}
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<IncomCal name="所得金額計算シート" />}
                    secondary="あなたと配偶者の収入金額等と必要経費等の金額を入力する"
                    />
                    {/* <CheckIcon color="primary" visibility={check2} /> */}
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<IncomAdjust name="所得金額調整シート" />}
                    secondary="該当する場合は、必要事項を入力する"
                    />
                    {/* {incomeAdjustFlag ? setCheck3('visible') : setCheck3('hidden')} */}
                    {/* <CheckIcon color="primary" visibility={check3} /> */}
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<Button variant="contained" size='medium' color="primary">申告書印刷シート</Button>}
                    secondary="給与所得者の配偶者控除申告書を印刷する"
                    />
                </ListItem>
            </List>
            </CardContent>
        </Card>
    );    
}

export default BodyCard;