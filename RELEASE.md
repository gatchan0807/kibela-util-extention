# About

このリポジトリでは「機能のリリース（Chrome Storeへの公開）」と「機能のデプロイ（masterへのマージ）」を分けて考える

そのため、「機能のデプロイ」さえ行えば、[Chrome Storeを経由しないChrome拡張のインストール方法](https://github.com/gatchan0807/kibela-util-extention/tree/master#chrome-store%E3%82%92%E7%B5%8C%E7%94%B1%E3%81%97%E3%81%AA%E3%81%84%E3%82%A4%E3%83%B3%E3%82%B9%E3%83%88%E3%83%BC%E3%83%AB%E6%96%B9%E6%B3%95)を使ってアーリーリリース版として手元のChromeで最新機能を使用できる

# How to Deploy

デプロイはGitHubのPRマージによって行える

1. masterからブランチを切る
2. 機能を実装する
3. PRを作成する
4. PR作成時に実行されるCIをチェックし、全てGreenであればマージする
5. マージ後、CIで自動的に `yarn package:chrome` が実行され、 `packaged/dist-chrome.zip` が作成される

# How to Release

1. Deployで作成されたタグバージョンのZIPをダウンロードする
    - 例: https://github.com/gatchan0807/kibela-util-extention/tree/1.2.1/packaged
2. Chrome Web Store Developer Dashboardにアクセスする
3. ダウンロードしたZIPを新バージョンとしてダッシュボードにアップロードする
4. Chrome Web Storeの審査に出す
5. 審査が通り次第、GitHub上で指定のタグバージョンを元にしたReleaseを作成する
    - https://github.com/gatchan0807/kibela-util-extention/releases の「Draft a new release」ボタン