# バックエンド開発指示書 (Target: amplify/)

あなたは `amplify/` ディレクトリ配下（AWSインフラおよびバックエンドロジック）の開発を担当するバックエンドエンジニアAIです。
別紙 `project_shared_rules.md` の共通ルール、および最新の機能要件に対応するため、以下の指示に従ってください。

## 1. データベース設計 (DynamoDB)
以下のテーブルを作成（`amplify add api` 経由で設定）してください。

### A. Schedules 
- Partition Key: `id` (String - UUID)
- Sort Key: `date` (String - ISO8601 Format)
- Attributes:
  - `title` (String): 公演名
  - `location` (String): 場所
  - `details` (String): 詳細テキスト
  - `imageUrl` (String, nullable): チラシ等の画像URL (S3 Object URL)
  - `isArchived` (Boolean): アーカイブフラグ（または日付による自動判定ロジックをLambdaで実装）

### B. Videos (新規追加)
要件「リンクは後々追加できるようにする」に対応します。
- Partition Key: `id` (String - UUID)
- Attributes:
  - `url` (String): YouTube URL
  - `title` (String): 動画タイトル
  - `displayOrder` (Number): 表示順序

## 2. ストレージ (S3)
- **機能**: スケジュール詳細に載せる画像の保存先。
- **設定**:
  - `amplify add storage` で Content Storage (S3) を追加。
  - **権限**:
    - Auth Users (Admin): Create/Update/Delete/Read
    - Guest Users (Public): Read Only

## 3. Lambda Functions & API

### A. スケジュール API (`/schedules`)
- `GET`: `Schedules` テーブルから全件取得。`displayOrder` または `date` でソート。
- `POST/PUT/DELETE`: (Auth必須) データの更新。画像のアップロード自体はフロントエンドからS3へ直接行い、Lambdaには `imageUrl` 文字列のみを受け渡す設計を推奨。

### B. ビデオ API (`/videos`)
- `GET`: `Videos` テーブルから全件取得。
- `POST/PUT/DELETE`: (Auth必須) 動画リンクの追加・編集。

### C. お問い合わせ API (`/contact`)
- **Method**: POST
- **Input**: `{ name, email, message, source }`
  - `source`: "contact" または "lesson" 等の文字列が入る。
- **Logic**:
  - Amazon SES を使用してオーナーのメールアドレス (`rinaharada.piano@gmail.com`) へ送信。
  - **件名**: `source` の値に応じて件名を変える（例: "【HP Contact】お問い合わせ", "【HP Lesson】レッスンのお申し込み"）。
  - **本文**: 送信者の Name, Email, Message を整形して記載。

## 4. セキュリティ & 認証
- **Cognito**: 管理者ユーザーのみがログインできるようにする。
- **API Authorization**:
  - GET (Read): `AWS_IAM` (for Guest) or `API Key` (Public)
  - POST/PUT/DELETE (Write): `AMAZON_COGNITO_USER_POOLS` (Admin only)
  - Amplify CLI での `function` へのアクセス権限付与を忘れずに行うこと。

## 5. デプロイメント
- 変更後の `amplify push` で、テーブル作成、Lambda更新、S3バケット作成が正しく行われることを確認する手順を含めること。
