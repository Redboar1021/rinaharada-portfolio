# フロントエンド開発指示書 (Target: src/)

あなたは `src/` ディレクトリ配下の開発を担当するフロントエンドエンジニアAIです。
別紙 `project_shared_rules.md` の共通ルールを遵守し、以下の最新要件に従って実装を行ってください。

## 1. 担当範囲
- `src/` 配下の全てのファイル
- 管理画面（`/admin`）およびログイン画面の実装も含む

## 2. 実装方針
- **画像・メディア**:
  - `src/assets/images/home/home.jpg` (Home用)
  - `src/assets/images/gallery/` 配下の画像 (Works用)
  - 画像はViteの `import.meta.glob` 機能を使って動的に読み込むか、API経由でURLリストを取得することを想定して実装する。
- **スタイリング**: `@emotion/styled` を使用。
- **アニメーション**: `framer-motion` を使用し、スクロールに応じて各セクションが「ふわっ」と現れる演出を実装。

### 重要: レスポンシブ対応 (Responsive Design)
現在、デバイスサイズによる表示崩れが報告されています。以下を徹底してください。

1. **モバイルファースト (Mobile First)**:
   - 基本のスタイルは「スマートフォン」向けに記述する。
   - PC向けのスタイルは `@media (min-width: ...)` 内に記述する。

2. **ブレークポイントの定義**:
   `src/styles/media.ts` を作成し、以下のように管理すること。
   ```typescript
   export const breakpoints = {
     mobile: 480,
     tablet: 768,
     desktop: 1024,
   };
   
   export const media = {
     tablet: `@media (min-width: ${breakpoints.tablet}px)`,
     desktop: `@media (min-width: ${breakpoints.desktop}px)`,
   };
   ```

3. **index.css の初期化**:
   - `src/index.css` にViteデフォルトの `display: flex; place-items: center;` 等が残っている場合は**必ず削除**する。これがあると画面全体が中央寄せになりレイアウトが崩れる。
   - `width: 100%` を確保し、スクロールを妨げない設定にする。

## 3. 具体的な実装タスク

### A. 共通・ナビゲーション
- **SNSアイコン**:
  - **Mobile**: 画面下部あるいはメニュー内に配置（指で押しやすい位置）。
  - **PC**: 画面左下に固定表示。
  - Links:
    - Instagram: `https://www.instagram.com/rinaharada_pf/?igsh=cm1odHFocHg3anIx&utm_source=qr`
    - YouTube: `https://youtube.com/@rinaharada.klavier?si=i6KRfqWfoI8fvU6R`
    - X (Twitter): `https://x.com/rinaharada_pf?s=21`

- **Header / Navigation**:
  - **PC**: 右上にテキストリンク (`ABOUT`, `WORKS`...) を横並びで固定表示。
  - **Mobile**: 右上にハンバーガーメニュー（`≡`）を配置。タップすると全画面あるいはドロワーでメニューが開く実装。
  - 左上の名前「RINA HARADA」は常に表示。

### B. ページ詳細要件

#### 1. HOME (`/`)
- **First View (Hero)**:
  - 画像 (`src/assets/images/home/home.jpg`) を `100vh` (画面いっぱい) に表示。
  - `object-fit: cover` を使用し、スマホでもPCでも画像が歪まないようにする。
- **スクロール体験**:
  - スクロールで Works Preview -> Schedule Preview -> Contact Link が順次フェードイン。
  - **Mobile**: 各セクションを縦積みし、十分な余白（`80px`〜）を取る。
  - **PC**: コンテンツ幅を最大 `1200px` 程度に制限し、中央揃えにする（`max-width` + `margin: 0 auto`）。

#### 2. ABOUT (`/about`)
- テキストの可読性重視。
- **Mobile**: フォントサイズ `14px`〜`16px`、行間広め。左右パディング `20px`。
- **PC**: フォントサイズ `16px`〜`18px`。最大幅 `800px` で中央配置。

#### 3. WORKS (`/works`)
- `src/assets/images/gallery/` にある画像を一覧表示。
- **Mobile**: 1列 または 2列表示。
- **PC**: 3列 または 4列のグリッド表示（Masonry Layout推奨）。
- 画像クリックでModal拡大表示。

#### 4. SCHEDULE (`/schedule`)
- リスト表示。
- **Mobile**: 日付とイベント名を縦積みにする等、狭い幅でも崩れないレイアウト。
- **PC**: 日付・タイトル・場所を横並びテーブルライクに表示。

#### 5. VIDEOS (`/videos`)
- YouTube埋め込み (`iframe`)。
- `width: 100%`, `aspect-ratio: 16 / 9` を指定し、どのデバイスでもアスペクト比を維持してレスポンシブに可変させること。

#### 6. LESSON (`/lesson`)
- コンテンツ幅を適切に制限し、文章を読みやすくする。
- 問い合わせフォームへの導線を明確に。

#### 7. CONTACT (`/contact`)
- フォーム部品（Input, Textarea）はモバイルでタップしやすい高さ（`44px`以上）を確保する。
- `font-size: 16px` 以上にして、iOSでの入力時ズームを防ぐ。

### C. 管理画面 (`/admin`)
- **認証**: Cognito (Amplify Authenticator)
- PCでの操作を前提としても良いが、タブレット等でも崩れない程度にレスポンシブ対応する。

## 4. データ・State要件
- 非同期通信中のローディング表示。
- エラーハンドリング。
