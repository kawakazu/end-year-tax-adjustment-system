# 年末調整 基礎控除　配偶者控除　所得金額調整控除申告書作成システム
年末調整の際に作成する「基礎控除・配偶者控除等・所得金額調整控除申告書」を作成する。

## Description
作成の手順
1. **「基本情報」**：基本情報のデータを入力する。
2. **「所得金額計算」**：自分と配偶者の収入金額等と必要経費の金額を入力する。【該当の個所に入力】
3. **「所得金額調整」**：該当する場合は必要事項を入力する。【自分の給与の収入金額が850万円を超える場合】
4. **「Download」**：ボタンをクリックすると1-3で入力した情報が記載されたExcelファイルがダウンロードされる。

## Usage
### install
```
$ git clone https://github.com/kawakazu/end-year-tax-adjustment-system.git
$ cd end-year-tax-adjustment
$ docker-compose up -d
$ dotnet dev-certs https --trust
```
### run
end-year-tax-adjustment-systemディレクトリで
```
$ dotnet run
```
「http://localhost:5001」にアクセスする。

## Requirement
* Ubuntu 20.04
* Docker
* node v14.17.1
* yarn v1.22.10
* .NET 5