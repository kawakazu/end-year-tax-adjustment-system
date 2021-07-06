import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { Grid, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';

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

function createData(name: string, incomeAmount: number, requiredExpenses: number) {
    return { name, incomeAmount, requiredExpenses };
}

const rows = [
    createData('給与所得(1)', 0, 0),
    createData('事業所得(2)', 0, 0),
    createData('雑所得(3)', 0, 0),
    createData('配当所得(4)', 0, 0),
    createData('不動産所得(5)', 0, 0),
    createData('退職所得(6)', 0, 0),
    createData('(1)~(6)以外の所得', 0, 0),
];

export default function IncomCal() {
    const classes = useStyle();
    const [modalStyle] = React.useState(getModalStyle());

    return (
        <div style={modalStyle} className={classes.paper}>
            <Typography variant="h4">所得計算データ入力</Typography>
            <p>計算を行うには、給与所得を除くほかの所得について、「収入金額等」と「必要経費等」諜報の金額を入力する必要があります</p>
            <Grid container>
                <Grid item>
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
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.incomeAmount}</TableCell>
                                    <TableCell align="center">{row.requiredExpenses}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2}>給与以外の所得の合計</TableCell>
                                <TableCell align="center">0</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">あなたの合計所得金額の見積額</TableCell>
                                <TableCell align="center">0円</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">区分Ⅰ</TableCell>
                                <TableCell align="center">A</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
                <Grid item>
                    <Typography variant="h6">あなたの合計所得金（見積額）</Typography>
                    <Table className={classes.table} size="small" aria-label="a sense table">
                        <TableHead>                        
                            <TableRow>
                                <TableCell align="center">所得の種類</TableCell>
                                <TableCell align="center">収入金額等ⓑ</TableCell>
                                <TableCell align="center">必要経費ⓑ</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map(row => (
                                <TableRow key={row.name}>
                                    <TableCell align="center">{row.name}</TableCell>
                                    <TableCell align="center">{row.incomeAmount}</TableCell>
                                    <TableCell align="center">{row.requiredExpenses}</TableCell>
                                </TableRow>
                            ))}
                            <TableRow>
                                <TableCell colSpan={2}>給与以外の所得の合計</TableCell>
                                <TableCell align="center">0</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <Table>
                        <TableBody>
                            <TableRow>
                                <TableCell align="center">あなたの合計所得金額の見積額</TableCell>
                                <TableCell align="center">0円</TableCell>
                            </TableRow>
                            <TableRow>
                                <TableCell align="center">区分Ⅱ</TableCell>
                                <TableCell align="center">A</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </Grid>
            </Grid>
            <Typography variant="h6">※　「区分Ⅱ」が「空欄」となった場合は、配偶者控除の申告をすることができません</Typography>
        </div>
    );
};