# プロジェクト共通ルール & 仕様書

本ドキュメントは、プロジェクト `rinaharada-portfolio` に関わる全ての開発者（およびAIエージェント）が遵守すべき共通事項を定義します。

## 1. プロジェクト憲章 (Vision)
**目的**: ピアニスト”原田莉菜”の世界観を表現する、ミニマルで美しいアーティストポートフォリオ。

**デザインコンセプト**:
- **キーワード**: 淡い水色背景、モノトーン、大きな余白、装飾なし、縦スクロール、タイポグラフィ中心。
- **体験**: 滑らかな画面遷移、作品が主役。
- **NG**: 過度な装飾、原色の使用、複雑なレイアウト。

## 2. 技術スタック (Tech Stack)
- **Frontend**: React (Vite), TypeScript, Emotion (CSS-in-JS), Framer Motion
- **Backend/Infra**: AWS Amplify (Gen 1), AWS Lambda (Python 3.x), Amazon DynamoDB
- **IaC**: Amplify CLI

## 3. 開発ルール (Development Rules)

### 言語・コメント
- **コード内の変数・関数名**: 英語 (CamelCase, PascalCase 等の標準的な規約に従う)
- **コメント・ドキュメント**: **全て日本語** で記述すること。
- **コミットメッセージ**: 英語推奨だが、明確な日本語でも可。

### ディレクトリ構造の考え方
- `src/` 配下は Frontend 担当領域。
- `amplify/` 配下は Backend 担当領域。
- 境界線: API連携のインターフェース。Frontendはバックエンドの実装詳細を知る必要はなく、BackendはUIの詳細を知る必要はない。

## 4. デザインシステム定義 (Design Tokens)

### カラーパレット
- `Background`: `#F0F8FF` (AliceBlueに近い淡い水色) または調整されたカスタム色
- `Text Main`: `#333333` (濃いグレー、完全な黒ではない)
- `Text Sub`: `#666666`
- `Accent`: 原則なし（モノトーンと余白で表現）。リンクホバー等で不透明度を下げる程度。

### タイポグラフィ
- **日本語 (Main)**: `Noto Serif JP` (Google Fonts)
- **英語 (Headings/Nav)**: `Cormorant Garamond` (Google Fonts) - セリフ体でエレガントに。

### レイアウト
- **Mobile First**: スマホでの閲覧を最優先。
- **Whitespace**: 8pxの倍数（8, 16, 24, 32, 48, 64, 80, 120...）を意識的に使用し、特にセクション間は `120px` 以上の大きな余白を取る。
