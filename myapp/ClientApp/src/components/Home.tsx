import React, { Component } from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';


export class Home extends Component {
  static displayName = Home.name;

  render () {
    return (
      <div>
        <Container disableGutters maxWidth="sm" component="main" sx={{ pt: 8, pb: 6 }}>
          <Typography
            component="h1"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            年末調整申告書作成システム
          </Typography>
          <p>年末調整の際に作成する「基礎控除・配偶者控除等・所得金額調整控除申告書」を作成する。</p>
          <ol>
            <li><b>「ログイン」</b>：アカウントを作成し、ログインする</li>
            <li><b>「基本情報」</b>：基本情報のデータを入力する。【*の付いている項目は入力必須】</li>
            <li><b>「所得金額計算」</b>：自分と配偶者の収入金額等と必要経費の金額を入力する。【該当の個所に入力】</li>
            <li><b>「所得金額調整」</b>：該当する場合は必要事項を入力する。【自分の給与の収入金額が850万円を超える場合】</li>
            <li><b>「ダウンロード」</b>：ボタンをクリックすると1-3で入力した情報が記載されたExcelファイルがダウンロードされる。</li>
          </ol>
        </Container>
      </div>
    );
  }
}
