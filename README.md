# 東福岡学園祭 2026 — 公式 Web サイト

**HFHS School Festival 2026** の公式 Web サイトリポジトリです。  
URL: **https://schoolfes.hfhs-digital.app**  
運営: 東福岡高等学校 デジタル委員会

---

## 技術スタック

| 項目 | 内容 |
|---|---|
| フレームワーク | [Qwik](https://qwik.dev/) + [Qwik City](https://qwik.dev/qwikcity/overview/) |
| ビルドツール | [Vite](https://vitejs.dev/) |
| スタイリング | [Tailwind CSS v4](https://tailwindcss.com/) (`@tailwindcss/vite` プラグイン) |
| Linter | [Biome](https://biomejs.dev/) + ESLint (Qwik ルール) |
| CMS | [microCMS](https://microcms.io/) |
| 配信 | GitHub Pages (SSG / 静的サイト生成) |
| CI/CD | GitHub Actions (push + microCMS webhook トリガー) |

---

## クイックスタート

```sh
bun install
bun run dev        # 開発サーバー起動 (http://localhost:5173)
bun run build.server      # index.htmlを生成したい場合の本番ビルド (型チェック + SSG)
bun run check       # Biome
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
    festival-shell/       ← 全画面ページ用シェル (coming-soon, 404)
    notice-bar/           ← 重要なお知らせの固定表示バー
    site-header/          ← スティッキーヘッダー + ハンバーガーナビ
    site-footer/          ← フッター (学校リンク付き)
    site-page/            ← SiteHeader + Slot + SiteFooter ラッパー

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

  routes/
    layout.tsx            ← グローバルレイアウト (重要なお知らせローダー)
    index.tsx             ← ホームページ エントリ
    404.tsx               ← 404 ページ
    news/
      index.tsx           ← ニュース一覧
      [id]/index.tsx      ← ニュース詳細 (onStaticGenerate)
    [id]/index.tsx        ← CMS 管理ページ (onStaticGenerate)
    access/index.tsx      ← アクセス
    cautions/index.tsx    ← 来場される際の注意事項
    map/index.tsx         ← 校内マップ
    timetable/index.tsx   ← タイムテーブル
    with-children/index.tsx ← お子様連れの方へ
    need-help/index.tsx   ← お困りの場合

  global.css              ← Tailwind v4 @theme トークン + 背景 + アニメーション + .cms-body

public/
  .nojekyll               ← GitHub Pages の Jekyll 除外設定
  CNAME                   ← カスタムドメイン設定

.github/workflows/
  deploy.yml              ← GitHub Actions デプロイワークフロー

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

`main` ブランチへの push で GitHub Actions が自動的にビルド・デプロイします。

```
push to main
  → bun ci
  → bun run build.server  (MICROCMS_API_KEY を Secrets から注入)
  → dist/ を gh-pages ブランチへデプロイ
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

デザインの詳細仕様は [`stunning-homepage-plan.md`](./stunning-homepage-plan.md) を参照してください。

**カラートークン (Tailwind `@theme` で定義):**

| トークン | 値 | 用途 |
|---|---|---|
| `festival-navy` | `#14304f` | タイトル・数字・強調テキスト |
| `festival-navy-soft` | `#2b5277` | ラベル・キャプション |
| `festival-text` | `#17314f` | 本文 |
| `festival-muted` | `#5c7694` | 補助テキスト・ラベル |
| `festival-line` | `rgba(20,48,79,0.14)` | ボーダー・区切り線 |

**重要:** タイトルの `letter-spacing: -0.08em` はデザインの核心です。変更しないでください。

---

## 参考ドキュメント

| ファイル | 内容 |
|---|---|
| [`stunning-homepage-plan.md`](./stunning-homepage-plan.md) | デザイン仕様・アーキテクチャ決定・ビルドフェーズ |
| [`project-status.md`](./project-status.md) | 実装進捗・次のアクション |
| [`2025-site-reference.md`](./2025-site-reference.md) | 2025 年度サイトのコンテンツ・構造の参照資料 |
| [`requests_from_executives.md`](./requests_from_executives.md) | デジタル委員会からの要件定義 |
