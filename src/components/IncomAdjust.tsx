import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid, ListItem, ListItemText, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Lens from '@material-ui/icons/Lens';

function getModalStyle() {
    const top = 50;
    const left = 50;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`,
    };
}

const useStyle = makeStyles((theme: Theme) => 
    createStyles({
        paper: {
            position: 'absolute',
            width: 850,
            backgroundColor: theme.palette.background.paper,
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
        root: {
            '& > *': {
              margin: theme.spacing(1),
              width: 200,
            },
        },
        table: {
            minWidth: 400,
        },
    }),
);

export default function IncomAdjust() {
    const classes = useStyle();
    const [modalStyle] = React.useState(getModalStyle());

    return (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h4">所得金額調整データ入力</Typography>
            <p>あなたの給与の収入金額が850万を超える場合に、所得金額調整控除の対象となります。</p>
            <Box textAlign="left" m={2} p={1} color="primary">
                <List>
                    <ListItem>
                        <Typography>・年末調整において所得金額調整控除の適用を受けようとする場合は、「要件」欄の概要する項目に"1"を入力（選択）し、その項目に応じて「★扶養親族等」欄及び「☆特別障碍者」欄にその該当する者について入力してください</Typography>
                    </ListItem>
                    <ListItem>
                        <Typography>・年末調整における所得金額調整控除の額については給与の支払い者が計算しますので、この申告書に所得金額調整控除の額を入力する欄はありません</Typography>
                    </ListItem>
                </List>
                <Typography variant="h6">要件</Typography>
                <TextField 
                    id="school-required" 
                    label="あなた自身が特別障碍者" 
                    type="number" 
                    variant="outlined"
                    helperText="下の☆欄のみを記載"    
                />
                <TextField 
                    id="school-required" 
                    label="同一生計配偶者(注)が特別障碍者" 
                    type="number" 
                    variant="outlined"
                    helperText="下の★欄及び☆欄を記載"    
                />
                <TextField 
                    id="school-required" 
                    label="扶養親族が特別障碍者" 
                    type="number" 
                    variant="outlined"
                    helperText="下の★欄及び☆欄を記載"    
                />
                <TextField 
                    id="school-required" 
                    label="扶養親族が年齢23歳未満(H10.1.2以降生)" 
                    type="number" 
                    variant="outlined"
                    helperText="下の★欄のみを記載"    
                />

                <Typography variant="h6">扶養親族等</Typography>
                <form className={classes.root} noValidate autoComplete="off">
                    <TextField id="school-required" label="学校名 *" variant="outlined"/>
                    <TextField id="staff-num-required" label="職員番号 *" variant="outlined"/>
                    <TextField id="ruby-required" label="フリガナ *" variant="outlined"/>
                    <TextField id="name-required" label="名前 *" variant="outlined"/>
                    <TextField id="address-required" label="住所 *" variant="outlined"/>
                </form>
            </Box>
        </div>
    );
};