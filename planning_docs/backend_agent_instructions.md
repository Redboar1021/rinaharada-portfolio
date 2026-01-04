# バックエンド開発指示書 (Target: amplify/)

あなたは `amplify/` ディレクトリ配下（AWSインフラおよびバックエンドロジック）の開発を担当するバックエンドエンジニアAIです。
別紙 `project_shared_rules.md` の共通ルールを遵守し、以下の指示に従って実装を行ってください。

## 1. 担当範囲
- `amplify/` 配下の設定ファイル
- API Gateway, DynamoDB, Lambda (Python), Cognito, S3 の構成
- `amplify/backend/function/` 配下の Python コード

## 2. 実装方針 (Amplify Gen 1)
- 基本的に `amplify` コマンドベースでの構築を想定していますが、設定ファイル（`cloudformation` template等）の修正が必要な場合は指示してください。
- Lambda関数は **Python** ランタイムを使用。

## 3. 具体的な実装タスク

### A. API & Database (`amplify add api`)
- **API Type**: REST (API Gateway + Lambda)
- **Path**: `/schedules`, `/contact`
- **DynamoDB Table Name**: `Schedules`
  - Partition Key: `id` (String - UUID)
  - Sort Key: `date` (String - ISO8601 `YYYY-MM-DD`)
  - GSI (Global Secondary Index): 必要に応じて `isArchived` 等で作成。

### B. Lambda Functions (`amplify add function`)

#### 1. `AppHandler` (Python)
- **役割**: スケジュール情報のCRUD操作。
- **Libraries**: `boto3`
- **Logic**:
  - `GET /schedules`: DynamoDBから全件取得し、日付順にソートしてJSON返却。
  - `POST /schedules`: 認証済みユーザーのみ実行可能。データをバリデーションしてDynamoDBへPut。

#### 2. `ContactHandler` (Python)
- **役割**: お問い合わせメール送信。
- **Libraries**: `boto3` (SES)
- **Logic**:
  - `POST /contact`: JSONボディ (`name`, `email`, `message`) を受け取る。
  - **Amazon SES** を使用して `rinaharada.piano@gmail.com` へメールを送信する。
  - **Security**: スパム対策としてレートリミット等の考慮があると望ましい（今回はまずは機能実装優先）。
  - **注意**: SESはSandbox環境の場合、検証済みメールアドレス以外への送信ができないため、AWSコンソールでの検証作業が必要であることをユーザーに通知すること。

### C. Authentication (`amplify add auth`)
- **Config**: Default configuration (Email/Password login).
- **Admin**: オーナーのみがログインできれば良いため、サインアップは管理者のみが許可する設定か、単一固定ユーザーを作成する運用を想定。

## 4. フロントエンド連携用情報の出力
実装が完了したり、変更があった場合は、以下の情報をフロントエンド担当に伝達（または設定ファイルとして出力）してください。
- API Endpoint URL
- 必要なIAM権限（Frontendからの呼び出しに必要な場合）
- S3 Bucket Name（画像アップロード用）

## 5. 禁止事項
- 複雑すぎるステートマシン（Step Functions）の導入（今回はLambda単体で完結させる）。
- 不必要なAWSサービス（RDS, ElasticCache等）の追加。
