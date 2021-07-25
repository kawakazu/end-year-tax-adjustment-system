import * as React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';


function Header() {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography align="center">年末調整　給与所得者の基礎控除申告書　兼　給与所得者の配偶者控除等申告書　所得金額調整控除申告書　作成システム</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;