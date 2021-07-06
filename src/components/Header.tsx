import { AppBar, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';

function Header() {
    return (
        <AppBar position="static">
            <Toolbar variant="dense">
                <Typography>年末調整　給与所得者の基礎控除申告書　兼　給与所得者の配偶者控除等申告書　所得金額調整控除申告書　作成システム</Typography>
            </Toolbar>
        </AppBar>
    );
}

export default Header;