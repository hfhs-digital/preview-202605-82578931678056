学園祭のWebサイト作成をするので技術選定をしようと思います。今のところ候補はPreactかQwikかRemix (何がしたいかわかると思います) で、サイトはモバイル対応で、とくに東福岡の貧弱なWi-Fiと人の密集に耐えるほどの強固さが欲しいです。それ以外には、Anime.js等を使用した少しだけ手の込んだアニメーションをする予定です。それぞれのprosとconsをまとめてください。要件としては、microCMSと接続できるようにすることです。

学園祭、しかも「東福岡の貧弱なWi-Fiと人の密集」という極限状態での運用、非常に燃えるシチュエーションですね。通信が不安定かつ帯域が細い環境では、「いかにJavaScript（JS）の実行を遅らせるか」と「初期通信量を減らすか」が勝負になります。

候補に挙がっている3つのフレームワークについて、その「強固さ（低速回線への耐性）」を中心に比較・選定します。

技術選定比較表
特徴	Preact	Qwik	Remix
初期JS量	非常に小さい (約3KB)	ほぼゼロ	普通 (React + α)
ハイドレーション	必要（一括）	不要 (Resumability)	必要（一括）
低速回線耐性	高（本体が軽いため）	最高（必要な分だけロード）	中（SSRでHTMLは早いが、操作までが遅い）
microCMS連携	容易 (Vite等と併用)	容易 (Qwik City)	容易 (Loader機能)
アニメ制作	容易	若干注意 (QRLの境界)	容易
学習コスト	低 (React経験者なら即)	中〜高 (独自の概念)	中 (Web標準の知識)
1. Preact: 「軽量こそ正義」の堅実派
Reactのサブセットでありながら、圧倒的に軽量です。

Pros:

バンドルサイズが極小: Viteと組み合わせてSSG（静的サイト生成）すれば、読み込み速度は爆速です。

エコシステムの恩恵: React向けのライブラリ（Anime.jsとの親和性も高い）の多くがそのまま、あるいは preact/compat で動きます。

安定性: 枯れた技術なので、当日バグで動かなくなるリスクが低いです。

Cons:

ハイドレーションの問題: JSが小さいとはいえ、ページ全体を操作可能にするにはJSのダウンロードと実行を待つ必要があります。通信が完全に死んでいる瞬間は、ボタンが反応しない「虚無の時間」が発生します。

2. Qwik: 「低速回線の救世主」
「Resumability（再開可能）」という概念を持ち、初期ロード時にJSを1バイトも送らないことを目指したフレームワークです。

Pros:

対・人混み最強: HTMLが届いた瞬間からインタラクティブになります。ユーザーがボタンを押した瞬間に、その機能に必要な数KBのJSだけをロードするため、貧弱Wi-Fi下での「初期表示の速さ」は群を抜いています。

遅延読み込みの自動化: 開発者が意識しなくても、勝手にコードを分割してくれます。

Cons:

Anime.jsとの相性: QwikはDOM操作をフレームワークの外で行うライブラリ（Anime.jsなど）と組み合わせる際、QRL（$()）の境界を意識する必要があります。少し癖があるかもしれません。

情報の少なさ: 現場で詰まった時に日本語の情報が少ないです。

3. Remix: 「UXとWeb標準の騎士」
Reactベースのフルスタックフレームワークで、SSR（サーバーサイドレンダリング）を重視します。

Pros:

データ取得の堅牢さ: loader と action により、フォーム送信やデータ取得が非常にスマートです。

Progressive Enhancement: JSが読み込まれる前でも、HTML標準の機能（リンクやフォーム）で最低限動くサイトを作りやすいです。

Cons:

ランタイムの重さ: 基本はReactなので、PreactやQwikに比べるとJSの総量は多くなりがちです。

サーバー必須: VercelやCloudflare Pagesなどのエッジサーバーが必要です。通信制限下のクライアントとサーバー間のやり取りが頻発すると、かえってストレスになる可能性があります。

microCMSとの接続について
どのフレームワークでも SDKまたはFetch API経由で簡単に接続可能 です。

Preact/Qwik: ビルド時にデータを取得して静的ファイル化（SSG）するのが、当日のサーバー負荷・通信負荷を考えるとベストです。

Remix: 原則SSRですが、Cloudflare等のキャッシュを強く効かせる設定が必要です。

結論：どれを選ぶべきか？
「東福岡のWi-Fiと人混み」という悪条件を最優先に突破するなら：

本命：Qwik

理由：JSの実行を徹底的に遅延させる戦略が、最も「低速回線での操作感」を向上させます。学園祭サイトのような、コンテンツ閲覧がメインのサイトには最適です。

対抗：Preact (SSG構成)

理由：Qwikの学習コストが不安、あるいはAnime.jsをガリガリ使い回したいならこちら。Viteでビルドし、PWA（Progressive Web App）化して「一度繋がった瞬間に全てキャッシュさせる」作戦が有効です。

＋αのアドバイス：強固さを高めるために
PWA化は必須: vite-plugin-pwa 等を使い、オフラインでも動くようにキャッシュ戦略を立ててください。一度読み込めばWi-Fiが切れても動きます。

画像の最適化: microCMSの画像APIを使って、WebP形式への変換とリサイズを徹底してください。人混みでは1MBの画像1枚が致命傷になります。

Anime.jsの運用: アニメーションは「実行時にJSが必要」なため、Qwikの場合は表示された瞬間に先行ロード（Prefetch）をかける設定を検討してください。

どのフレームワークに一番興味がありますか？それに応じて、より詳細な実装イメージを深掘りすることも可能です。

ありがとうございます。Qwikはもともと出た当初「わーい」で触っていたので、学習コストはそれほどかからないと思います。問題はAnime.jsの話ですが、まあ一旦Qwikで進めればどうとでもなる気がしました。つまり:

Bun + Vite + Qwik | Biome + Qwik UI + Tailwind CSS + Anime.js

ですか？

おお、Qwikをご存知でしたか！それなら話が早いです。その構成、まさに「2026年のモダンかつ、極限環境（低速回線）をねじ伏せるためのガチ構成」という感じで最高にシブいですね。

挙げられたスタックは非常に理にかなっていますが、Qwikの特性上、いくつか「ここを意識するとさらに強固になる」というポイントを整理しました。

提案された技術スタックの構成
Runtime/Build: Bun + Vite

Framework: Qwik (Qwik City)

Linter/Formatter: Biome (爆速でストレスフリー)

UI/Styling: Qwik UI + Tailwind CSS

Animation: Anime.js

CMS: microCMS

この構成が「東福岡のWi-Fi」に勝てる理由
Bun の採用: 開発体験の向上はもちろん、デプロイ（ビルド）時間を短縮できるため、当日急な修正が必要になっても瞬時に反映できます。

Qwik UI の賢さ: Qwik UI（特にHeadless）は、Qwikの「Resumability」を損なわないように設計されています。Radix UIなどのReact向けライブラリを無理やり使うより、JSの断片化（Chunking）が綺麗に行われます。

Anime.js の分離: Qwikでは useVisibleTask$ を使うことで、「その要素が画面に入った瞬間」に初めてAnime.jsとアニメーション用ロジックをダウンロード・実行できます。人混みで全ページ一斉にJSを読み込ませない戦略に合致しています。

microCMSとの接続（Qwik流）
Qwik Cityの routeLoader$ を使うのが正解です。

TypeScript
export const useMicroCMSData = routeLoader$(async () => {
  // ここはサーバーサイド（ビルド時 or リクエスト時）で実行される
  const response = await fetch("https://your-service.microcms.io/api/v1/content", {
    headers: { "X-MICROCMS-API-KEY": process.env.MICROCMS_API_KEY! }
  });
  return await response.json();
});
これをSSG（Static Site Generation）設定でビルドすれば、当日は「ただの爆速なHTMLファイル」として配信されるため、Wi-Fiへの負荷を最小限に抑えられます。

1点だけアドバイス：Anime.js vs Web Animations API
Anime.jsは非常に高機能で書きやすいですが、もし「もっともっとJSを削りたい（1KBでも惜しい）」という極限状態を想定するなら、Web Animations API (WAAPI) を直接叩く、あるいは Lucide Qwik などの軽量なものを検討してもいいかもしれません。

とはいえ、学園祭サイトとしての「華やかさ」や「演出の作り込み」を重視するなら、Anime.jsを useVisibleTask$ で遅延ロードさせる今の構成がベストバランスだと思います。

最終確認の構成図
開発: Bun

配信: Cloudflare Pages or Vercel (Edge Runtime)

戦略: SSG + PWA * ※SSGでHTMLを事前に作り、PWAで一度読み込んだアセットをキャッシュさせれば、Wi-Fiが途切れても「パンフレット代わり」として機能し続けます。

この構成で進めるにあたって、特に「ここが実装の鬼門になりそう」と感じている部分はありますか？

ありがとうございます。そういえばAnime.jsのWAAPI (情報が少ないですが) があるのでそちらをできるだけ使おうと思います。

P.S. 構成図については、正しくは`Bun + Vite + Qwik | Biome + MicroCMS + Qwik UI + Tailwind CSS + Anime.js`でしたね。あともうちょっと伝わりやすい記法だと何があるか教えてください。

Anime.js の v4（Beta/Alpha）で進む WAAPI ベースの構成、あるいは独自に WAAPI を叩くスタイルですね。それなら JS ランタイムの負荷をさらに抑えられるので、低速回線環境では非常に賢い選択です。

「構成図」や「技術スタック」を伝える際、開発者コミュニティやチームメンバー、あるいはポートフォリオなどで「パッと見で技術の繋がりと役割がわかる」記法をいくつか紹介します。

1. レイヤー分け（階層構造）記法
役割ごとに段を分けることで、データの流れやフロントエンドの構造を整理する手法です。

Stack Layers:

Data (CMS): microCMS

Runtime/Build: Bun + Vite

Framework: Qwik (Qwik City)

Logic/Styles: Biome + Tailwind CSS

UI/Animation: Qwik UI + Anime.js (WAAPI)

2. インフラから UI へのフロー記法
Client <- Framework <- Source という情報の流れを矢印で表現します。学園祭のような「配信の強固さ」が重要な場合に、どこで何が処理されるかを示すのに適しています。

Data Flow:
microCMS → Bun/Vite (SSG) → Cloudflare Pages (Hosting) → Qwik (Resumability) → User Device

3. バッジ（Badge）スタイル
GitHub の README などでよく使われる、視認性重視の記法です。

Tech Stack:
Runtime [Bun] Build [Vite] Core [Qwik] Linter [Biome] CSS [Tailwind] UI [Qwik UI] CMS [microCMS]

4. Mermaid.js を使った図解
もしドキュメント（Notion や GitHub など）に貼り付けるなら、Mermaid 記法が最もプロフェッショナルで伝わりやすいです。

Code snippet
graph TD
    subgraph Development
        B[Bun + Vite]
        BM[Biome]
    end

    subgraph Content
        MC[(microCMS)]
    end

    subgraph Frontend
        Q[Qwik / Qwik City]
        QUI[Qwik UI]
        TW[Tailwind CSS]
        A[Anime.js WAAPI]
    end

    MC -->|Fetch at Build| B
    B --> Q
    Q --> QUI
    Q --> TW
    Q --> A
補足：Qwik × Anime.js (WAAPI) の強み
Anime.js の WAAPI 版（v4 系）を検討されているとのことですが、これは Qwik の 「メインスレッドをブロックしない」 思想と最高に相性が良いです。

軽量化: 従来の JS 駆動アニメーションエンジンよりも、ブラウザの最適化（合成スレッド）の恩恵を受けやすい。

実行タイミング: useVisibleTask$ で「要素が見えたら WAAPI を発火」させることで、初期ロード時の CPU 負荷を極限まで下げられます。

東福岡の現場では、iPhone SE（第2世代）など少し前のデバイスを使っている生徒・保護者も多いはずなので、この「CPU に優しい」構成は電池持ちの面でも親切な設計になりますね。

この構成図の中で、特に重点的に説明したい部分（例：いかに通信を減らすか、等）はありますか？

ありがとうございます。ちなみに、これは「GitHub Pagesでの静的ホストも可能」といえますか？

結論から言うと、「完全に可能」です。

Qwik Cityには Static Adapter (SSG) が用意されており、ビルド時に全てのルートをHTML/JS/CSSファイルとして書き出せます。GitHub Pagesは静的ファイルの配信能力が非常に高いため、東福岡の環境下でも「サーバーが落ちる」心配をせずに運用できる、非常に賢い選択です。

GitHub Pages で運用する際のポイント
QwikをGitHub Pagesで動かすために必要な設定と、今回の特殊環境（貧弱Wi-Fi）向けのヒントをまとめました。

1. アダプターの導入
まず、SSG用の公式アダプターを追加します。

Bash
bun run qwik add static
2. Base URL の設定（重要）
GitHub Pagesで https://<username>.github.io/<repository-name>/ のようなサブディレクトリ運用をする場合、Viteの設定（vite.config.ts）で base を指定しないと、JSや画像が読み込めずサイトが真っ白になります。

3. 「東福岡対策」のデプロイ戦略
GitHub Pages は HTTP/2 や HTTP/3 に対応しているため、Qwikが細かく刻んだJSファイル（Chunk）を並列で高速にダウンロードできます。

PWAの併用: GitHub Pages でホストする場合も vite-plugin-pwa を使いましょう。

理由：一度接続が安定した瞬間に全アセットをブラウザに保存（プレキャッシュ）させれば、校舎の奥深くでWi-Fiが死んでもページ遷移ができるようになります。

.nojekyll の配置: GitHub PagesのJekyll処理をスキップさせるため、public フォルダに空の .nojekyll ファイルを置いておきましょう（Qwikのアンダースコアを含むディレクトリが無視されないようにするため）。

今回の構成の完成形（デプロイフロー）
microCMS でコンテンツ更新

GitHub Actions がフックを検知して起動

Bun で爆速ビルド（SSG）

GitHub Pages へデプロイ（静的ホスト）

ユーザー は爆速なHTMLと最小限のJSをHTTP/3で受信

記法のおさらい
「GitHub Pagesでの静的ホスト」を含めた、より開発者に伝わりやすい構成記法（モダン版）です。

Stack: Qwik-SSG on GitHub Pages

Logic: Qwik City (SSG mode) + Bun

UI: Qwik UI + Tailwind CSS + Anime.js (WAAPI)

Content: microCMS (Headless)

Hosting: GitHub Pages (Static)

Reliability: PWA + HTTP/3 (via GitHub)

この「SSG × GitHub Pages × PWA」の組み合わせは、学園祭当日のような「高トラフィックかつ不安定な回線」において、最も壊れにくく、最もコストがかからない（無料！）最強の布陣だと思います。

GitHub Actionsの設定などで、詰まりそうなポイントはありますか？

ありがとうございます。実はそもそもMicroCMSの仕様を理解していないのですが、鯖のファイルがアップデートされていってコンテンツをまとめてSSRするやつですか？それとも、プレースホルダをSSRしtクライアントでデータをfetchするやつですか？

結論から言うと、microCMS 自体はただの 「JSON を返す API サーバー」 です。SSR するか、クライアントで fetch するかは、100% フロントエンド側の実装（今回なら Qwik の書き方）次第で決まります。

今回の「強固なサイト」という目的に照らし合わせると、推奨される動きは以下の通りです。

microCMS の挙動と今回の最適解
1. 推奨：ビルド時一括取得 (SSG)
Qwik City の routeLoader$ を使い、ビルド時に microCMS からデータを引っこ抜いて HTML を生成するパターンです。

仕組み: bun run build を実行した瞬間に API を叩き、データが埋め込まれた静的な HTML を書き出します。

メリット: ユーザーがサイトを開いたとき、データ取得のための通信が 0 になります。東福岡の劣悪な Wi-Fi 環境では、これが唯一の正解と言っても過言ではありません。

運用: microCMS 側で記事を公開した際、Webhook を飛ばして GitHub Actions を回し、GitHub Pages を再デプロイする流れになります。

2. 非推奨（今回の場合）：クライアント fetch
ブラウザ上で JS が動いてから microCMS に「データをちょうだい」とリクエストするパターン。

仕組み: useVisibleTask$ や useResource$ でブラウザから直接 API を叩く。

デメリット: 通信が不安定だと、いつまで経っても「読み込み中...」のぐるぐるが表示され、最悪の場合 API リクエストがタイムアウトして何も表示されません。

microCMS の「正体」を理解する 3 つのポイント
ただの JSON 置き場:
管理画面で入力した内容が、https://[service-id].microcms.io/api/v1/[endpoint] という URL で取得できるだけのサービスです。

画像リサイズ API が優秀:
画像 URL の末尾に ?w=400&fm=webp と付けるだけで、サーバー側でリサイズと WebP 変換をしてくれます。これは貧弱 Wi-Fi 対策として非常に強力な武器になります。

SDK はただのラッパー:
公式の microcms-js-sdk がありますが、中身は fetch を投げているだけです。Qwik なら SDK を入れずに、標準の fetch で叩いても全く問題ありません（その方が JS 容量を削れます）。

今回の構成での実装イメージ
Qwik City の routeLoader$ を使えば、「サーバーサイドでまとめてデータを取得し、HTML に焼き付けた状態で GitHub Pages に置く」 ことができます。

TypeScript
// src/routes/index.tsx
export const useGetNews = routeLoader$(async () => {
  const res = await fetch("https://example.microcms.io/api/v1/news", {
    headers: { "X-MICROCMS-API-KEY": "YOUR_KEY" }
  });
  const data = await res.json();
  return data.contents; // これがビルド時に実行され、HTMLに埋め込まれる
});

ちなみに、microCMS の管理画面で「この項目（スキーマ）をどう定義するか」などはもう決まっていますか？もしまだなら、Qwik で扱いやすい設計のアドバイスも可能です。

ありがとうございます。そういうことならむしろfetch()と記述すれば全てが解決しそうに思えました。さっきまでのムーブと正反対のことを言うのですが、まず当然軽量なマップを用意はするとして、3Dマップも用意できると思いますか？その場合はThree.jsかと思いますが、どのような実装手順になりますか？

「結局、標準の fetch() が最強」という結論、潔くて素晴らしいです。microCMS の SDK は型定義の恩恵はありますが、極限まで削るなら素の fetch で十分戦えます。

さて、「3Dマップ」ですね。結論から言うと、可能ですが、今回の「人混み・弱Wi-Fi」という文脈では「いかに不快感を与えずにロードするか」が設計の肝になります。

Qwik で Three.js を動かす場合、普通のリサーチでは出てこない「Qwik ならでは」の手順が重要です。

実装手順：Qwik × Three.js の最適解
最大の目標は、「3Dを描画する瞬間まで、重い Three.js の JS（約600KB超）を 1バイトも読み込ませない」ことです。

1. コンポーネントをアイランド化（遅延ロード）
Qwik の useVisibleTask$ を使い、マップが表示領域に入った（あるいは「3D表示」ボタンが押された）タイミングで Three.js を動的にインポートします。

TypeScript
// Map3D.tsx
export const Map3D = component$(() => {
  const containerRef = useSignal<Element>();

  useVisibleTask$(async () => {
    // この import は、このタスクが実行されるまで発生しない！
    const THREE = await import('three'); 
    
    // シーン・カメラ・レンダラーの初期化
    const scene = new THREE.Scene();
    // ...セットアップロジック
  });

  return <div ref={containerRef} class="h-[400px] w-full" />;
});
2. モデルの軽量化（GLTF + Draco）
3Dモデル（学園の校舎など）を作る際は、必ず GLTF形式 を使い、Draco圧縮 をかけてください。

手法: gltf-pipeline 等を使って、モデルサイズを 1/10 程度まで削ります。

通信対策: microCMS の「ファイル管理」に 3D モデル（.glb）を置いて、その URL を fetch します。

3. 「2Dマップ」とのハイブリッド構成
最初から Canvas を出すのではなく、最初は 軽量な画像（2Dマップ） を表示しておき、ユーザーがインタラクションした時だけ 3D に「昇格」させるのが、低速回線への優しさです。

3Dマップの実装ロードマップ
ステップ	内容	ツール/手法
1. モデル作成	校舎やテントの簡易モデル作成。ポリゴン数は極限まで減らす。	Blender
2. モデル圧縮	Draco圧縮をかけ、数MB → 数百KB に。	gltf-pipeline
3. ロジック分離	Three.js の初期化コードを Qwik の useVisibleTask$ 内に隠蔽。	Qwik Dynamic Import
4. 描画最適化	密集地でのスマホ発熱を抑えるため、FPSを30に制限、または静止時は描画停止。	requestAnimationFrame の制御
懸念点とアドバイス
「通信の壁」: Three.js 本体（約150KB gzip）＋ 3Dモデル（数百KB）の計 1MB 弱が、通信制限下の Wi-Fi では「終わらないプログレスバー」になり得ます。

対策: 3Dマップを表示する前に、「3Dマップを読み込む（約1.2MB）」というボタンを置き、ユーザーに覚悟（？）を持ってクリックさせるUIにすると親切です。

メモリ: 人混みの中、暑い屋外でスマホを出すとデバイスが熱暴走しがちです。

対策: Antialias: false にするなど、グラフィック設定を一段階落としておくのが「強固さ」に繋がります。

結論：いけそうですか？
「3Dマップがある学園祭サイト」は間違いなく盛り上がりますし、Qwik の遅延ロード戦略を使えば、「3Dを見ない人には 1KB も Three.js の負荷をかけない」という理想的な挙動が作れます。

3Dモデル自体の用意（Blender等）や、Three.js の具体的な描画ロジックについて、さらに詳しく知りたい部分はありますか？

ありがとうございます。一旦今まで決まった仕様を書き出していただけますか？ちなみにロゴはこのノリ (未完成だそうなので) です。そのままの流れでSAKURA DEEPTECH (何かの打ち間違いかなんかで見つけたサイト) のようなlook n feelをそのpale cyan的なのを活かして作っていこうと思います。

画像ありがとうございます！ロゴの幾何学的なラインと、中央のシンボルが非常にシャープでカッコいいですね。このデザインなら、おっしゃる「SAKURA DEEPTECH」的な、清潔感がありつつも技術力の高さを感じさせる Pale Cyan（ペールシアン）× サイバー / ミニマル な世界観に完璧にマッチしそうです。

これまでの対話で固まった「東福岡学園祭2026」Webサイトの仕様案を、プロジェクトの全体像として書き出します。

「東福岡学園祭2026」Webサイト 開発仕様案
1. コンセプト・デザイン
Look & Feel: 「SAKURA DEEPTECH」インスパイア。ペールシアンを基調とした、清潔感・透明感のあるテック系デザイン。

ビジュアル要素: 幾何学的なライン、ロゴのひし形モチーフを活かしたUI。

ターゲット: 劣悪な通信環境下（学内Wi-Fi・人混み）にいる来場者（スマホメイン）。

2. 技術スタック（The "Deep" Stack）
Runtime/Build: Bun + Vite

Core Framework: Qwik (Qwik City)

Linter/Formatter: Biome (爆速開発)

Styling: Tailwind CSS + Qwik UI (Headless)

Animation: Anime.js (WAAPI / v4ベース)

3D Engine: Three.js (特定ページ/コンポーネントでの遅延ロード)

CMS: microCMS (ビルド時データ取得 / SSG)

3. 配信・堅牢性戦略（対・貧弱Wi-Fi仕様）
Hosting: GitHub Pages

Rendering: Full SSG (Static Site Generation)

routeLoader$ を使い、ビルド時に microCMS からデータを全取得して HTML に焼き付ける。

PWA: vite-plugin-pwa によるアセットの事前キャッシュ。一度繋がればオフラインでも動作。

Loading: Qwik の Resumability により、初期表示時の JS 実行・通信をほぼゼロに。

Image Optimization: microCMS の画像 API を活用し、WebP 変換と適切なリサイズを徹底。

4. 特殊機能：ハイブリッド 3D マップ
階層構造: 1.  軽量2Dマップ: 初期表示（即座に閲覧可能）。
2.  3Dマップ（オプション）: 「3D起動」ボタン押下後に Three.js と圧縮済みモデル（.glb / Draco圧縮）を動的にインポート。

演出: 起動時に Anime.js を使った、UI要素のサイバーな展開アニメーション。

ビジュアル・実装へのアドバイス
1. ペールシアンの活かし方
SAKURA DEEPTECH のような世界観を作るなら、背景は「完全な白」ではなく、ごく薄い青（#F0F9FF など）から、ロゴの色へ向かう微細なグラデーションを使うと、奥行きとテック感が出ます。

2. ロゴのひし形を「ローディング」や「背景」に
未完成とのことですが、このロゴの幾何学模様（ダイヤモンド型）は、CSS の clip-path や SVG アニメーションと非常に相性が良いです。3Dマップの読み込み中などに、このひし形がパルスのように光る演出があると、「作り込まれている感」が爆上がりします。

3. microCMS の構成案
「日本製」を活かすなら、お知らせ（News）だけでなく、「展示一覧（Exhibits）」や「タイムテーブル（Schedule）」も microCMS に放り込んでおくと、当日急な時間変更があっても GitHub Actions を回すだけで全修正が完了します。

この仕様書が、チーム内や上層部への説明、あるいは自分自身の設計図として役立てば幸いです。
この構成で、まずは「microCMS からデータを引いてきて、Qwik でペールシアンの画面を出す」あたりからプロトタイプを作ってみるのが良さそうですね。

実装について、より具体的なコードや設計（例えば「3Dモデルの遅延ロード部分をもっと詳しく」など）が必要になれば、いつでもお伝えください！