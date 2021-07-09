import * as React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Button, Checkbox, Grid, TextField } from '@material-ui/core';
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
              width: 800,
            },
        },
        textField: {
            width: 300,
        },
    }),
);

type Item = {
    id: string;
    name: string;
    require: boolean;
}

type informations = {
    shcool: string;
    stuffNum: number;
    name: string;
    ruby: string;
    address: string;
}

const InputInfo: React.VFC<Item> = (props: Item) => {
    if (props.require) {
        return (
            <Grid item xs={12}>
                <TextField 
                    required
                    id={props.id} 
                    label={props.name} 
                    aria-describedby="component-helper-text"
            />
            </Grid>
        );
    } else {
        return (
            <Grid item xs={12}>
                <TextField 
                    id={props.id} 
                    label={props.name} 
                    aria-describedby="component-helper-text"
                />
            </Grid>
        );
    }
}

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
                    <InputInfo id="school-required" name="学校名" require={true} />
                    <InputInfo id="stuff-num-required" name="職員番号" require={true} />
                    <InputInfo id="name-required" name="名前" require={true} />
                    <InputInfo id="ruby-required" name="フリガナ" require={true} />
                    <InputInfo id="address-required" name="住所" require={true} />
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h2">配偶者情報</Typography>   
                    </Grid>
                    <InputInfo id="partner-num" name="個人番号" require={false} />
                    <InputInfo id="partner-name" name="名前" require={false} />
                    <InputInfo id="partner-ruby" name="フリガナ" require={false} />
                    <InputInfo id="partner-address" name="住所" require={false} />
                    <InputInfo id="partner-birthday" name="生年月日" require={false} />
                    <Grid item xs={12}>
                        <FormControlLabel
                            id="nonresident"
                            value="yes"
                            control={<Checkbox color="primary" />}
                            label="非居住者である配偶者"
                            labelPlacement="end"
                        />
                    </Grid>
                    <InputInfo id="partner-num" name="非移住者である配偶者と生計を一にする事実" require={false} />
                    
                    <Grid item xs={10}></Grid>
                    <Grid item xs={2}>
                        <Button variant="contained" color="primary">テスト</Button>
                    </Grid>
                </Grid>
            </form>
        </div>
    );
};