# フェーズ 1: 環境構築 詳細ガイド

このドキュメントでは、ホームページ公開に必要な基盤（GitHub, AWS Amplify）をセットアップする手順を解説します。
**注意**: コマンドライン（ターミナル）での操作が必要です。

## 1. GitHub リポジトリの作成と連携

ソースコードを管理するための場所（リポジトリ）を作成します。

### 手順
1. **GitHub でリポジトリ作成**
   - [GitHub](https://github.com/new) にアクセス。
   - Repository name: `rinaharada-portfolio`
   - Public/Private: **Private** 推奨（個人情報などを含む可能性があるため）
   - "Initialize this repository with:" は**何もチェックしない**でください（空のリポジトリを作成）。
   - "Create repository" をクリック。

2. **ローカルのコードをアップロード**
   - ターミナルを開き、プロジェクトフォルダに移動していることを確認してください。
   - 以下のコマンドを順番に実行します（`[Your-GitHub-Username]` はご自身のアカウント名に置き換えてください）。

   ```bash
   # Git の初期化
   git init
   
   # 全ファイルをステージングエリアに追加
   git add .
   
   # コミット（記録）を作成
   git commit -m "Initial commit"
   
   # メインブランチの名前を main に設定
   git branch -M main
   
   # リモートリポジトリ（GitHub）の登録
   # 注意: 実際にGitHubで作成したリポジトリのURLを使用してください
   git remote add origin https://github.com/[Your-GitHub-Username]/rinaharada-portfolio.git
   
   # GitHub へプッシュ（アップロード）
   git push -u origin main
   ```

## 2. AWS アカウントと IAM ユーザーの準備

### 手順
1. **AWS アカウント作成**
   - [AWS 公式サイト](https://aws.amazon.com/jp/) からアカウントを作成（未作成の場合）。
   
2. **Amplify 用 IAM ユーザーの作成**
   - AWSコンソールの検索窓で「IAM」を検索して選択。
   - サイドメニュー「ユーザー」 > 「ユーザーの作成」。
   - ユーザー名: `amplify-user` （任意の名前）。
   - 許可のオプション: 「ポリシーを直接アタッチする」を選択。
   - 許可ポリシー: `AdministratorAccess-Amplify` を検索してチェック（見つからない場合は `AdministratorAccess` でも可ですが、権限が強いため注意）。
   - ユーザーを作成後、**アクセスキー**を作成します。
     - 作成したユーザー詳細 > 「セキュリティ認証情報」タブ > 「アクセスキーを作成」。
     - 「Command Line Interface (CLI)」を選択。
     - **Access key ID** と **Secret access key** を必ずメモしてください（この画面でしか確認できません）。

## 3. AWS Amplify プロジェクトの初期化

このプロジェクトを AWS Amplify と紐付けます。

### 手順
1. **Amplify CLI のセットアップ**（まだの場合）
   - 以下のコマンドで、接続設定を行います。
   ```bash
   amplify configure
   ```
   - ブラウザが開いてログインを求められます。
   - ターミナルに戻り、先ほど取得した **Access key ID** と **Secret access key** を入力。
   - Profile Name は `default` でOK。

2. **プロジェクトの初期化**
   - 以下のコマンドを実行します。
   ```bash
   amplify init
   ```
   - 対話形式で設定が進みます。基本的には Enter（デフォルト選択）で進めてOKです。
     - **Enter a name for the project**: `rinaharadaportfolio`
     - **Initialize the project with the above configuration?**: `No` を選択して確認するか、正しければ `Yes`。
     - **Select the authentication method you want to use**: `AWS profile`
     - **Please choose the profile you want to use**: `default`

3. **ホスティング（公開設定）の追加**
   ```bash
   amplify add hosting
   ```
   - **Select the plugin module to execute**: `Hosting with Amplify Console (Managed hosting with custom domains, Continuous deployment)`
   - **Choose a type**: `Continuous deployment (Git-based deployments)`
   - ブラウザが開くので、GitHub と Amplify を連携（Authorize）し、先ほど作成した `rinaharada-portfolio` リポジトリと `main` ブランチを選択して保存・デプロイします。

これで、`main` ブランチにコードをプッシュするたびに、自動的にWebサイトが更新されるようになります。
