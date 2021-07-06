import * as React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Filter1SharpIcon from '@material-ui/icons/Filter1Sharp';

import ModalWrapper from './ModalWrapper';
import BasicInfo from './BasicInfo';
import IncomCal from './IncomCal';
import IncomAdjust from './IncomAdjust';

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

function BodyCard() {
    const classes = useStyle();

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
                    primary={<ModalWrapper name="基本情報シート" body={<BasicInfo />} />}
                    secondary="基本情報のデータを入力する"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<ModalWrapper name="所得金額計算シート" body={<IncomCal />} />}
                    secondary="あなたと配偶者の収入金額等と必要経費等の金額を入力する"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary={<ModalWrapper name="所得金額調整シート" body={<IncomAdjust />} />}
                    secondary="該当する場合は、必要事項を入力する"
                    />
                </ListItem>
                <ListItem>
                    <ListItemText 
                    primary="申告書印刷シート"
                    secondary="給与所得者の配偶者控除申告書を印刷する"
                    />
                </ListItem>
            </List>
            </CardContent>
        </Card>
    );    
}

export default BodyCard;