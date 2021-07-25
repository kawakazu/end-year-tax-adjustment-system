# 年末調整 基礎控除　配偶者控除　所得金額調整控除申告書作成システム
年末調整の際に作成する「基礎控除・配偶者控除等・所得金額調整控除申告書」を作成する。

## Description
作成の手順
1. **「基本情報シート」**：基本情報のデータを入力する。【*の付いている項目は入力必須】
2. **「所得金額計算シート」**：自分と配偶者の収入金額等と必要経費の金額を入力する。【該当の個所に入力】
3. **「所得金額調整シート」**：該当する場合は必要事項を入力する。【自分の給与の収入金額が850万円を超える場合】
4. **「申告書シート」**：ボタンをクリックすると1-3で入力した情報が記載されたExcelファイルがダウンロードされる。

## Usage
### install
```
$ git clone https://github.com/kawakazu/end-year-tax-adjustment-system.git
$ cd end-year-tax-adjustment
$ yarn install
$ cd backend
$ pip install  requirements.txt
```
### run
backendディレクトリで
```
$ python3 app.py
```
end-year-tax-adjustmentディレクトリで
```
$ yarn run start
```
「http://localhost:8080」にアクセスする。

## Requirement
* Ubuntu 20.94
* node v14.17.1
* yarn v1.22.10
* React 17.0.2
* Python 3.9.1
* pip 21.1.3