# フェーズ 2: フロントエンド実装 ガイド

このドキュメントでは、Reactアプリケーションの基盤作成から、デザインシステムの実装、主要ページのセットアップまでの手順を解説します。

## 1. 必要なライブラリのインストール

ルーティング、アニメーション、スタイリング、アイコンに必要なライブラリをインストールします。

### 手順
ターミナルで以下のコマンドを実行してください。

```bash
# ルーティング (画面遷移)
npm install react-router-dom

# アニメーション (Framer Motion)
npm install framer-motion

# スタイリング (Emotion)
npm install @emotion/react @emotion/styled

# HTTPクライアント (今のうちに)
npm install axios
```

## 2. プロジェクトの初期クリーンアップ

不要な初期ファイルを削除し、ディレクトリ構成を整えます。

### 手順
1. **不要ファイルの削除**: `src` フォルダ内の `App.css`, `index.css` の中身を空にするか、必要最低限にします（後述のデザインシステムで上書きするため）。
2. **assetsの整理**: `src/assets/react.svg` など初期の画像を削除。
3. **ディレクトリ作成**: `src` フォルダ内に以下のフォルダを作成してください。
   ```
   src/
     ├── components/      # 共通パーツ
     ├── pages/           # 各ページ
     │   ├── Home.tsx
     │   ├── About.tsx
     │   ├── Works.tsx
     │   ├── Schedule.tsx
     │   ├── Videos.tsx
     │   ├── Lesson.tsx
     │   └── Contact.tsx
     ├── styles/          # スタイル定義
     └── types/           # 型定義
   ```

## 3. グローバルスタイル（デザインシステム）の設定

淡い水色背景、明朝体フォントなどの基本スタイルを定義します。

### 手順
`src/index.css` を以下の内容で上書きしてください。

```css
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500&family=Noto+Serif+JP:wght@300;400&display=swap');

:root {
  --bg-color: #F0F8FF; /* 淡い水色 */
  --text-main: #333333;
  --text-sub: #666666;
  --font-en: 'Cormorant Garamond', serif;
  --font-ja: 'Noto Serif JP', serif;
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--bg-color);
  color: var(--text-main);
  font-family: var(--font-ja);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-en);
  font-weight: 400;
  letter-spacing: 0.05em;
}

a {
  color: inherit;
  text-decoration: none;
}
```

## 4. 各ページの空コンポーネント作成

まずは画面遷移を確認するために、中身が空のファイルを作成します。

### 手順
`src/pages` フォルダ内に作成した各ファイル（`Home.tsx`, `About.tsx`...）に、以下のような仮のコードを記述します。
（ファイル名に合わせて `Home` の部分を書き換えてください）

```tsx
// src/pages/Home.tsx の例
import React from 'react';

const Home: React.FC = () => {
  return (
    <div style={{ padding: '100px 20px', textAlign: 'center' }}>
      <h1>HOME</h1>
      <p>Content coming soon...</p>
    </div>
  );
};

export default Home;
```
※ `About.tsx`, `Works.tsx` なども同様に作成してください。

## 5. ルーティングの設定

メニューから画面遷移できるように設定します。

### 手順
`src/App.tsx` を以下の内容で書き換えてください。

```tsx
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Home from './pages/Home';
import About from './pages/About';
import Works from './pages/Works';
import Schedule from './pages/Schedule';
import Videos from './pages/Videos';
import Lesson from './pages/Lesson';
import Contact from './pages/Contact';

// 左上に名前を表示
const Logo = styled(Link)`
  position: fixed;
  top: 30px;
  left: 40px;
  font-family: var(--font-en);
  font-size: 1.2rem;
  z-index: 100;
`;

// 右上にメニューを表示
const Nav = styled.nav`
  position: fixed;
  top: 30px;
  right: 40px;
  z-index: 100;
  display: flex;
  gap: 2rem;
  
  a {
    font-family: var(--font-en);
    font-size: 0.9rem;
    letter-spacing: 0.1em;
    transition: opacity 0.3s;
    &:hover { opacity: 0.6; }
  }
`;

function App() {
  return (
    <Router>
      <Logo to="/">RINA HARADA</Logo>
      <Nav>
        <Link to="/about">ABOUT</Link>
        <Link to="/works">WORKS</Link>
        <Link to="/schedule">SCHEDULE</Link>
        <Link to="/videos">VIDEOS</Link>
        <Link to="/lesson">LESSON</Link>
        <Link to="/contact">CONTACT</Link>
        <span>JP/EN</span>
      </Nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/works" element={<Works />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/videos" element={<Videos />} />
        <Route path="/lesson" element={<Lesson />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

export default App;
```

## 次のステップ
ここまで実装できたら `npm run dev` でローカルサーバーを立ち上げ、画面遷移ができるか、背景色やフォントが反映されているか確認してください。
確認でき次第、各ページのコンテンツ実装（Homeの画像配置など）に進みます。
