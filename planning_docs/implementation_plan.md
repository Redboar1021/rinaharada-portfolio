# 実装計画書: ピアニスト原田莉菜 ホームページ

本ドキュメントは、ピアニスト原田莉菜様のポートフォリオサイトを作成するための詳細な手順書です。

## プロジェクト概要
- **目的**: ピアニストとしての世界観を表現する、ミニマルで美しいポートフォリオサイトの構築
- **デザインコンセプト**: 淡い水色背景、モノトーン、大きな余白、装飾なし、縦スクロール、タイポ中心

## 技術スタック
- **Frontend**: React (Vite), TypeScript
- **Infrastructure**: AWS Amplify
- **Backend**: AWS Lambda (Python)
- **Database**: Amazon DynamoDB
- **Storage**: Amazon S3 (画像・動画)
- **Auth**: AWS Cognito (管理画面用)

## 1. 環境構築手順 (Setup)

### 1-1. GitHub リポジトリのセットアップ
現在のローカルファイルを GitHub にアップロードします。
1. GitHub で新規リポジトリ `rinaharada-portfolio` を作成。
2. ローカルで git 初期化とプッシュ:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin [リポジトリURL]
   git push -u origin main
   ```

### 1-2. AWS Amplify のセットアップ
AWS Amplify を使用してインフラを構築します。
1. AWS マネジメントコンソールで IAM ユーザーを作成（Amplify CLI用）。
2. プロジェクトルートで以下を実行し、Amplify プロジェクトを初期化:
   ```bash
   amplify init
   ```
   - Build settingなどをデフォルトで設定。
3. ホスティングの追加:
   ```bash
   amplify add hosting
   ```
   - GitHub と連携し、main ブランチへのプッシュで自動デプロイされるように設定。

---

## 2. フロントエンド設計・実装 (Frontend)

### 2-1. デザインシステムの実装
- **CSSフレームワーク**: `Emotion` または `Styled-components`、あるいはシンプルな `CSS Modules` を推奨。
- **Color Palette**:
  - Background: 淡い水色 (`#F0F8FF` 近辺のカスタム色)
  - Text: モノトーン (`#333333` / `#111111`)
- **Typography**: セリフ体（Google Fonts: `Noto Serif JP`, `Cormorant Garamond` 等）を使用してエレガントさを演出。

### 2-2. ディレクトリ構成案
```
src/
  ├── components/      # 共通コンポーネント (Button, Layout, Navigation)
  ├── features/        # 機能ごとのコンポーネント
  │   ├── home/
  │   ├── about/
  │   ├── works/
  │   ├── schedule/
  │   ├── videos/
  │   ├── lesson/
  │   └── contact/
  ├── assets/          # 静的画像等
  ├── lib/             # Amplify 設定、API クライアント
  └── types/           # TypeScript 型定義
```

### 2-3. 各ページの実装要件
1. **Home**:
    - ファーストビューに `public/images/home/home.jpg` を全面あるいは大きく配置。
    - 左下にSNSアイコン固定。
    - スクロールで各セクション（Gallery概要 -> Schedule概要 -> Contact）が現れる「縦スクロール」ストーリーテリング。
2. **About**:
    - プロフィールテキストの表示。読みやすさを重視した行間・余白設定。
3. **Works (Gallery)**:
    - `Amplify Storage (S3)` から画像URLリストを取得してグリッド表示、または事前に `public/images/gallery` に配置した画像を表示。
    - クリックで拡大表示（Lightbox的なUI）。
4. **Schedule**:
    - DynamoDB からフェッチしたデータをリスト表示。
    - 「過去のスケジュール」への切り替え機能。
5. **Videos**:
    - YouTube Embed を埋め込み。
    - DynamoDB に動画 ID を保存して動的に追加可能にするか、シンプルに定数ファイルで管理（更新頻度による）。
6. **Contact**:
    - 名前、メール、本文のフォーム。
    - 送信ボタン押下 -> Lambda 関数経由でオーナーへメール送信。
7. **English (多言語)**:
    - `react-i18next` 等を使用し、全テキストをリソースファイルで管理。

---

## 3. バックエンド設計・実装 (Backend)

### 3-1. データベース設計 (DynamoDB)
**Table: Schedules**
- Partition Key: `id` (UUID)
- Attributes:
  - `date` (String: ISO8601) - ソート用
  - `title` (String)
  - `location` (String)
  - `details` (String)
  - `imageUrl` (String, optional)
  - `isArchived` (Boolean) - 過去ログ判定用だが、日付比較でも可

### 3-2. スケジュール API (Lambda + Python)
Amplify CLI (`amplify add api`) で REST API (API Gateway + Lambda) を作成します。

- **GET /schedules**: 全スケジュール取得（日付順ソート）。
- **POST /schedules**: 新規スケジュール追加（要認証）。
- **PUT /schedules/{id}**: 編集（要認証）。
- **DELETE /schedules/{id}**: 削除（要認証）。

**Python ランタイム**:
- `boto3` を使用して DynamoDB を操作。

### 3-3. お問い合わせ機能 (Lambda + SES)
- **POST /contact**:
  - 入力: `{ name, email, message }`
  - 処理: Amazon SES (Simple Email Service) を使用して `rinaharada.piano@gmail.com` へメール送信。
  - 注意: SES はサンドボックス解除申請が必要。

---

## 4. 管理画面 (Admin)

### 4-1. 認証 (Cognito)
- `amplify add auth` で認証機能を追加。
- ユーザープールを作成し、オーナーのアカウントのみ登録。

### 4-2. 管理機能
- 専用ルート `/admin` を作成（要ログイン）。
- スケジュールの追加・編集・削除 UI。
- ビデオリンクの管理（必要であれば）。

---

## 5. デプロイ手順 (Deployment)

1. `amplify push` でバックエンドリソース（Auth, Storage, API, Function, Hosting）を AWS 上に作成・更新。
2. フロントエンドコードを GitHub の main ブランチにプッシュ。
3. Amplify Console が自動でビルド・デプロイを実行。
4. ドメインを購入済みであれば、Amplify Console でカスタムドメイン設定を行う。

---

## ガイドライン
- **美的感覚**: 余白（White Space）を恐れないこと。要素を詰め込みすぎない。
- **滑らかな遷移**: `Framer Motion` などを使用し、ページ遷移やスクロール時のフェードインを実装する。
- **モバイル対応**: メニューはハンバーガーメニューにするなど、レスポンシブデザインを徹底する。
