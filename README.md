# 東福岡学園祭 2026 — 公式 Web サイト

**Higashi Fukuoka School Festival 2026** の公式 Web サイトリポジトリです。  
URL: **https://schoolfes.hfhs-digital.app**  
運営: 東福岡高等学校 デジタル委員会

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | [Qwik](https://qwik.dev/) + [Qwik City](https://qwik.dev/qwikcity/overview/) |
| ビルドツール | [Vite](https://vitejs.dev/) |
| スタイリング | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` プラグイン) |
| アニメーション | [Anime.js v4](https://animejs.com/) |
| Linter | [Biome](https://biomejs.dev/) + ESLint (Qwik ルール) |
| CMS | [microCMS](https://microcms.io/) |
| 配信 | GitHub Pages (SSG / 静的サイト生成) |
| CI/CD | GitHub Actions (手動 + microCMS webhook トリガー) |

---

## クイックスタート

```sh
bun install
bun run dev             # 開発サーバー起動 (http://localhost:5173)
bun run build.server   # 本番ビルド (型チェック + SSG → dist/)
bun run check          # Biome フォーマット・Lint
bun run lint           # ESLint のみ
```

> **Note:** `bun run dev` 中は Vite が多数の `.js` ファイルをリクエストしますが、本番ビルドでは最適化されます。

---

## 環境変数

`.env.example` をコピーして `.env.local` を作成し、microCMS の認証情報を設定してください。

```sh
cp .env.example .env.local
```

| 変数名 | 説明 |
|---|---|
| `MICROCMS_SERVICE_DOMAIN` | microCMS サービスドメイン (例: `my-service`) |
| `MICROCMS_API_KEY` | microCMS API キー (ビルド時のみ使用、クライアントには非公開) |

本番デプロイ時は GitHub Actions の Secrets に同名で設定してください。

---

## プロジェクト構成

```
src/
  components/
    bokeh-layer/          ← 背景の環境ぼかし円 (Anime.js アンビエントアニメーション)
    festival-shell/       ← 全画面ページ用シェル (coming-soon, 404)
    hero-ornament/        ← ヒーロー装飾 (市松・紫陽花モチーフ)
    notice-bar/           ← 重要なお知らせの固定表示バー
    origami-emblem/       ← 折り紙風エンブレムコンポーネント
    page-heading/         ← セクション見出し共通コンポーネント
    router-head/          ← <head> メタタグ管理
    school-festival-logo/ ← SVG ロゴ
    section-divider/      ← セクション区切り装飾
    site-footer/          ← フッター (学校リンク付き)
    site-header/          ← スティッキーヘッダー + ハンバーガーナビ
    site-page/            ← SiteHeader + Slot + SiteFooter ラッパー
    title-deco/           ← タイトル装飾コンポーネント

  features/
    home/
      config.ts           ← HOME_PAGE_VARIANT スイッチ
      home-page.tsx       ← バリアントへのデリゲーター
      loaders.ts          ← ニュースプレビュー用 routeLoader$
      pages/
        coming-soon-home-page.tsx   ← Coming Soon ページ (カウントダウン付き)
        production-home-page.tsx    ← 本番ホームページ (複数セクション)

  lib/
    microcms.ts           ← microCMS フェッチヘルパーと型定義

  pictures/               ← 静的画像アセット

  routes/
    layout.tsx            ← グローバルレイアウト (重要なお知らせローダー)
    index.tsx             ← ホームページ エントリ
    404.tsx               ← 404 ページ
    news/
      index.tsx           ← ニュース一覧
      [id]/index.tsx      ← ニュース詳細 (onStaticGenerate)
    [id]/index.tsx        ← CMS 管理ページ (onStaticGenerate)
    map/index.tsx         ← 校内マップ
    timetable/index.tsx   ← タイムテーブル

  global.css              ← Tailwind v4 @theme トークン + 背景 + アニメーション + .cms-body

public/
  .nojekyll               ← GitHub Pages の Jekyll 除外設定
  CNAME                   ← カスタムドメイン設定

.github/disabled-workflows/
  deploy.yml              ← GitHub Actions デプロイワークフロー (現在無効)

adapters/static/
  vite.config.ts          ← SSG アダプター設定
```

---

## Coming Soon ↔ 本番の切り替え

`src/features/home/config.ts` の 1 行を変更するだけです。

```ts
// Coming Soon を表示
export const HOME_PAGE_VARIANT: HomePageVariant = 'coming-soon'

// 本番ホームページを表示
export const HOME_PAGE_VARIANT: HomePageVariant = 'production'
```

---

## デプロイ

現在 GitHub Actions ワークフロー (`.github/disabled-workflows/deploy.yml`) は無効化されています。手動デプロイは以下の手順で行います。

```sh
bun run build.server   # MICROCMS_API_KEY を .env.local に設定した状態で実行
# dist/ を gh-pages ブランチへプッシュ
```

microCMS でコンテンツを更新した際の自動リビルドは、microCMS の Webhook から以下のエンドポイントを叩くことで行えます。

```
POST https://api.github.com/repos/{owner}/{repo}/dispatches
Authorization: Bearer {GITHUB_TOKEN}
body: { "event_type": "microcms-update" }
```

---

## microCMS コンテンツモデル

| API ID | 種別 | 用途 |
|---|---|---|
| `news` | リスト | お知らせ一覧・詳細・ホームプレビュー (3件) |
| `pages` | リスト | CMS 管理ページ (`/[id]`) |
| `important-news` | シングル | 重要なお知らせバー (設定時のみ表示) |

---

## デザインシステム

デザインの詳細仕様は [`final-design.md`](./final-design.md) を参照してください。

**カラートークン (Tailwind `@theme` で定義):**

| トークン | 値 | 用途 |
|---|---|---|
| `festival-navy` | `#203042` | タイトル・数字・強調テキスト |
| `festival-navy-soft` | `#20425f` | ラベル・キャプション |
| `festival-text` | `#2c3d4f` | 本文 |
| `festival-muted` | `#6a7787` | 補助テキスト・ラベル |
| `festival-line` | `rgba(32,48,66,0.12)` | ボーダー・区切り線 |
| `wisteria-400` | `#a695d8` | 紫陽花アクセント |
| `coral-500` | `#d9736a` | コーラルアクセント |

**重要:** タイトルの `letter-spacing: -0.08em` はデザインの核心です。変更しないでください。

---

## 参考ドキュメント

| ファイル | 内容 |
|---|---|
| [`final-design.md`](./final-design.md) | 現行デザイン仕様・実装方針 |
| [`final-todo.md`](./final-todo.md) | 残タスク・次のアクション |
| [`old_instructions/design.md`](./old_instructions/design.md) | 元デザイン仕様 (参照用) |
| [`old_instructions/requests-from-executives.md`](./old_instructions/requests-from-executives.md) | デジタル委員会からの要件定義 |
| [`old_instructions/2025-site-reference.md`](./old_instructions/2025-site-reference.md) | 2025 年度サイトのコンテンツ・構造の参照資料 |
