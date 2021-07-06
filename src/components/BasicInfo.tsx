import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Checkbox, Grid, TextField } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
              width: 200,
            },
        },
        textField: {
            width: 300,
        },
    }),
);

export default function BasicInfo() {
    const classes = useStyle();
    const [modalStyle] = React.useState(getModalStyle());

    return (
        <div style={modalStyle} className={classes.paper}>
            <h2 id="basicInfo-modal-title">基本情報</h2>
            <p>＊　の付いている項目は、入力必須です。それ以外の項目については、該当箇所のみ入力してください。</p>
            <form className={classes.root} noValidate autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">本人情報</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            id="school-required" 
                            label="学校名" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            id="staff-num-required" 
                            label="職員番号" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            id="name-required" 
                            label="名前" 
                            aria-describedby="component-helper-text"
                            
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            id="ruby-required" 
                            label="フリガナ" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            required
                            id="addres-required" 
                            label="住所" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">配偶者情報</Typography>   
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="pertner-num" 
                            label="個人番号" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="partner-name" 
                            label="名前" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="pertner-ruby" 
                            label="フリガナ" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="partner-address" 
                            label="住所" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="partner-birthdate" 
                            label="生年月日" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControlLabel
                            id="nonresident"
                            value="yes"
                            control={<Checkbox color="primary" />}
                            label="非居住者である配偶者"
                            labelPlacement="end"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField 
                            id="nonresident-verification" 
                            label="非居住者である配偶者と生計を一にする事実" 
                            aria-describedby="component-helper-text"
                        />
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};