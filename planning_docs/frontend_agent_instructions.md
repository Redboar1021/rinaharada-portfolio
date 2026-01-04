# フロントエンド開発指示書 (Target: src/)

あなたは `src/` ディレクトリ配下の開発を担当するフロントエンドエンジニアAIです。
別紙 `project_shared_rules.md` の共通ルールを遵守し、以下の指示に従って実装を行ってください。

## 1. 担当範囲
- `src/` 配下の全てのファイル
- `public/` 配下の静的アセット
- `index.html`

## 2. 実装方針
- **スタイリング**: `@emotion/styled` を使用。CSSファイルはグローバル設定以外極力使用しない。
- **アニメーション**: `framer-motion` を使用し、ページ遷移時やスクロール時に「ふわっ」と表示されるエフェクトを実装する。
- **レスポンシブ**: スマートフォン表示をデフォルトとし、PC表示でレイアウトを最適化する。

## 3. 具体的な実装タスク

### A. 共通コンポーネント (`src/components/`)
- **Layout**: 全ページ共通のラッパー。ヘッダー（ナビゲーション）を含む。
- **Navigation**:
  - PC: 右上に固定。
  - Mobile: ハンバーガーメニューを採用。
  - `Home` へのリンクは左上に名前「RINA HARADA」を固定表示。
- **Section**: 各コンテンツを包むラッパー。上下に大きな `padding` を持つ。

### B. ページ実装 (`src/pages/`)
**注**: デザインコンセプト「縦スクロール」に基づき、Homeページですべてのセクション（About, Works概要, Schedule概要）を見せる構成にするか、ルーティングで分けるかを再確認すること。
*（今回の要件では「メニューからはそれぞれのページに遷移」「ホームをスクロールすると...順に出てくる」とあるため、**シングルページアプリケーションに近い構成**だが、URLパーマリンクも持たせる実装が望ましい）*

1. **HOME (`/`)**
   - **Hero**: `public/images/home/home.jpg` を使用。画面いっぱいに表示し、中央あるいは四隅に文字配置。
   - **SNS Icons**: 左下に Instagram, YouTube, X のアイコンを固定（`position: fixed`）。
   - **Scroll Sections**: ヒーロー以下に「Gallery Preview」「Schedule Preview」「Contact Link」を縦に配置。

2. **WORKS / GALLERY (`/works`)**
   - グリッドレイアウト。画像は `Object-fit: cover` で美しく表示。
   - 余白を広く取る。

3. **SCHEDULE (`/schedule`)**
   - シンプルなリスト表示（日付 - イベント名 - 場所）。
   - 終了したイベントは「ARCHIVE」セクションへ。
   - API連携: `AWS Amplify` の APIライブラリ または `axios` を使用してエンドポイントからデータ取得（エンドポイントURLはバックエンド担当と連携）。
   - **Loading/Error State**: データ取得中のローディング表示を必ず実装。

4. **CONTACT (`/contact`)**
   - 入力項目: Name, Email, Message
   - 送信ボタン: ローディング状態と完了メッセージを表示。
   - API連携: POSTリクエストを送信。

## 4. データ連携のモックアップ
バックエンドが完成するまでは、以下のようなダミーデータを使用してUIを完成させてください。
```typescript
// src/data/mockSchedule.ts
export const mockSchedules = [
  { id: 1, date: '2025-12-24', title: 'Christmas Concert', location: 'Tokyo' },
  // ...
];
```

## 5. 禁止事項
- `Redux` などの過剰な状態管理ライブラリの導入（React Context または ローカルstateで十分）。
- `Bootstrap` や `MUI` 等の重厚なUIフレームワークの使用（Emotionでカスタム実装すること）。
