# 2025 Site Content Reference

Extracted from the live site at `https://schoolfes.hfhs-digital.app` on 2026-05-11.  
This is the **2025 school festival website** currently served at the production domain.  
It is preserved here as the definitive content and structural reference for the 2026 build.

---

## Overview

| Item | Value |
|---|---|
| Site title | 東風凱旋｜2025年 東福岡学園 学園祭 |
| Theme / キャッチフレーズ | **東風凱旋**（とうふうがいせん）|
| Theme meaning | "East Wind Triumph" — coined for the first year of co-education (共学化) |
| Festival year | 2025 |
| Tech stack | Next.js (App Router), Tailwind CSS, Newt CMS |
| Hosted at | `https://schoolfes.hfhs-digital.app` |
| Built by | 東福岡高等学校 デジタル委員会 |
| Notice | Banner on every page: "これは2025年度の学園祭Webサイトです" |

---

## School information

| Item | Value |
|---|---|
| School name | 東福岡高等学校 / 学校法人東福岡学園 |
| Address | 〒812-0007 福岡県福岡市博多区東比恵2丁目24-1 |
| Tel | 092-411-3702 |
| Fax | 092-475-9639 |
| Official website | https://www.higashifukuoka.ed.jp |
| Official high school page | https://www.higashifukuoka.ed.jp/highschool/ |
| Junior high school | 東福岡自彊館中学校 — https://www.higashifukuoka.ed.jp/juniorhighschool/ |
| Co-education site | https://www.higashifukuoka.ed.jp/kyogaku/ |
| Junior high festival | https://hfjjdigital.wixsite.com/higashi |

---

## 2025 event dates

| Day | Date | Audience | Hours |
|---|---|---|---|
| 1日目 | 2025年6月6日（金） | 生徒・事前予約された保護者のみ | 10:00〜15:00 |
| 2日目 | 2025年6月7日（土） | 一般開放 | 9:30〜14:30 |

**Note:** 6月7日（土）は 高校オープンスクール・中学 OPEN DAY 同時開催  
（※高校オープンスクールの申し込みは終了）

---

## Site navigation / information architecture

### ヘッダーナビゲーション

**学園祭について**
- `/message` — ごあいさつ
- `/cautions` — 来場される際の注意事項
- `/access` — アクセス
- `/about-website` — このWebサイトについて
- `/privacy-policy` — 個人情報保護方針

**学園祭を楽しむ**
- `/#news` — 最新情報
- `/map` — 校内マップ
- `/timetable` — タイムテーブル
- `/with-children` — お子様連れの方へ
- 外部: 中学校学園祭Webサイト

---

## Homepage sections

### 1. 開催情報（Information）
縦書き見出しと白いボーダーボックスで来場日時を表示。

### 2. ご来場の皆様へ（For-Visitor）
7つの丸型アイコンボタングリッド：

| ボタン | リンク先 |
|---|---|
| 来場される際の注意事項 | `/cautions` |
| アクセス | `/access` |
| ごあいさつ | `/message` |
| 校内マップ | `/map` |
| タイムテーブル | `/timetable` |
| お子様連れの来場者の皆様へ | `/with-children` |
| お困りの場合 | `/need-help` |

### 3. おすすめ企画 PickUp
**スタンプラリー：** 文化部展示会場にスタンプを設置し、15個以上集めるとヒガシオリジナルグッズが当たる抽選ができる。景品交換は雄飛館横のスタンプラリーテントで実施。専用ページ `/stamp`。

### 4. News
最新の6件を表示し「すべてのお知らせを見る」ボタンで `/news` へ誘導。

---

## All page content (extracted)

### `/message` — ごあいさつ

5名のメッセージが掲載（顔写真付き）：

| 役職 | 氏名 | メッセージ要旨 |
|---|---|---|
| 東福岡高等学校 学校長 | 德野 慎一郎 | 今年から共学化・81年目の学園祭。981名の新入生を迎え全校生徒2400名超。学園創立80周年・高校創立70周年の記念学園祭。先輩たちの「ヒガシらしさ」を継承しながら新たな「ヒガシらしさ」を創る。 |
| 第69期 学園祭委員長 | 村田 晃也 | 共学化後初の大きな学校行事。在校生・先生・来校者全員が全力で楽しめる学園祭を目指した。模擬店・ダンス・カラオケコンテスト・ヒガシの主張など新企画に注目。 |
| 第69期 学園祭副委員長 | 西谷 栄汰 | 委員長サポートと責任生徒活動。目立たない仕事の積み重ねが成功の鍵という姿勢。 |
| 第69期 学園祭副委員長（模擬店部門） | 楢崎 慎之介 | 模擬店はクラス・部活が一から準備する特別な場。「やってよかった」と「関われてよかった」を目指す。 |
| 第69期 生徒会長 | 田中 十和 | 生徒会スローガン「東風凱旋」に込めた新しい風。共学化元年・80周年の新しいヒガシを作り上げる。 |

### `/cautions` — 来場される際の注意事項

**来場前にご確認いただきたいこと:**
- 自家用車での来場不可・公共交通機関を使用すること（当日は本校駐車場利用不可）
- 本校周辺は「駐車禁止区域」
- 人工芝グラウンドへの立ち入り不可
- ペット（盲導犬を除く）同伴不可
- 敷地内禁煙・火気使用不可
- 校内への土足での立ち入りは可
- 暑さへの注意・水分補給・熱中症対策のお願い

**来場時のお願い:**
- 人工芝グラウンドでは水・お茶以外の飲食全面禁止
- 雄飛館・記念講堂内での飲食はご遠慮ください
- 食べ残し・飲み残しの削減への協力
- 周辺道路・建物での喫煙・ごみの放置は禁止
- ごみは各フロアの入り口付近および模擬店周辺のゴミ箱で分別
- 校内ではアルコール消毒を推奨

**特記:** 模擬店の収益全額は各支援団体を通じて寄付される。

### `/access` — アクセス

- **住所:** 〒812-0007 福岡県福岡市博多区東比恵2丁目24-1
- **TEL:** 092-411-3702 / **FAX:** 092-475-9639
- 地図画像あり（Newt CDN）
- 詳細は東福岡学園 アクセスページ参照：https://www.higashifukuoka.ed.jp/information/access.html

### `/map` — 校内マップ

階層ごとの平面図（画像）：

| フロア | 内容 |
|---|---|
| 1階 | 平面図画像あり |
| 2階 | 平面図画像あり |
| 3階 | 平面図画像あり |
| 4階 | 平面図画像あり（記念講堂 イベントはタイムテーブル参照） |
| 5階 | 平面図画像あり |

- マップ内の「★」印はスタンプラリーの設置場所
- 関連ページ: `/stamp`

**確認できた施設名：**
- センターサークル（外部グラウンド脇のイベント広場）
- 記念講堂（4〜5階相当）
- ICT教室
- 雄飛館
- S15教室（キッズスペース）
- 家庭科室（本館1階 ラグビーグラウンド側）
- 面談室（本館2階 エレベーター降りてすぐ）
- 高校校舎2階 職員室前（学園祭本部 会議室A）

### `/timetable` — タイムテーブル

センターサークル・記念講堂・ICT教室の2日間イベントスケジュール（画像）。

- 6月6日（金）分・6月7日（土）分の2枚の画像で構成
- センターサークルの軽音部出場バンド一覧は別ページ `/center-circle-keion`
- 14:00〜のダンスはサイト公開当初のタイムテーブルに記載なし（後から追記）

**2025年に確認できたイベント形式:**
- ダンス部パフォーマンス（センターサークル）
- 軽音部バンドライブ（センターサークル）
- カラオケコンテスト
- ヒガシの主張（弁論大会風企画）
- 落語会

### `/with-children` — お子様連れの方へ

**キッズスペース（S15教室）**
- 幼稚園児と生徒会員が一緒に遊ぶスペース
- 本・おもちゃなどあり
- 対象: 自由が丘幼稚園児（他の来場者は入室不可）
- 開設: 8:30受付開始〜13:30終了（予定）

**ベビールーム 2ヶ所**

| 場所 | 用途 |
|---|---|
| 家庭科室（本館1階 ラグビーグラウンド側） | おむつ替えスペース |
| 面談室（本館2階 エレベーター降りてすぐ） | 完全個室・鍵付き授乳スペース |

両室ともゴミ箱・おむつ替えグッズ（替えシート・おしり拭き）設置。

### `/need-help` — お困りの場合

**落とし物:**
- 発見・問い合わせ共に: 正門付近の受付 または 学園祭本部（高校校舎2階 職員室前 会議室A）
- スタッフ識別: 黄色のスタッフTシャツ着用の生徒・教員
- 落とし物情報はWebサイトの「お知らせ」に定期掲載
- 受取時に身分証提示を求める場合あり

**迷子対応:** 学園祭本部で対応。

**その他:** 黄色Tシャツのスタッフ or 学園祭本部へ。

### `/stamp` — スタンプラリー

- 文化部展示教室などにスタンプ設置
- 15個以上で景品（くじ引き）、景品交換は雄飛館横のスタンプラリーテント
- 校内マップの「★」がスタンプ設置場所

---

## News items visible on homepage (2025/2026)

| 日付 | カテゴリ | タイトル |
|---|---|---|
| 2026/05/05 | Webサイト | **2026年度学園祭について** |
| 2025/06/09 | その他 | 【6/9 更新】拾得した落とし物について |
| 2025/06/06 | 学園祭 STAFF | STAFFについて |
| 2025/06/06 | イベント | ダンス部 イベント実施時の入場について |
| — | — | 落語会のイベントについて |

> Note: The 2026/05/05 news article "2026年度学園祭について" is already posted on the 2025 site. Its content should be fetched directly from the site once accessible.

---

## 2025 specific context (useful for 2026 planning)

### Co-education first year (共学化)
2025 was the **first year of co-education** (男子校 → 共学校) at Higashi Fukuoka. 981 new students enrolled; total enrollment exceeded 2,400. The theme "東風凱旋" reflected this new era.

### Anniversary year
- 学園創立 **80周年**
- 高校創立 **70周年**

### What this means for 2026
- 2026 is year 2 of co-education — the "new normal"
- No longer an anniversary year by default
- The 2026 theme is TBD (not yet announced as of 2026-05-11)
- The festival committee number will be **第70期**

---

## Implications for the 2026 site build

### Pages to carry forward as content models (all CMS-managed in 2026)

| Page | Notes for 2026 |
|---|---|
| `/message` | New messages from principal, 第70期 委員長, 副委員長s, 生徒会長 — same structure |
| `/cautions` | Rules likely similar; update any year-specific items |
| `/access` | Same school address; same access page layout |
| `/map` | New floor maps for 2026 — same multi-floor structure (1F–5F) |
| `/timetable` | New schedule images for 2026; venue names likely same |
| `/with-children` | Baby room and kids space policy — update location/times as needed |
| `/need-help` | Lost-and-found policy — minimal changes expected |
| `/stamp` | Stamp rally — verify if continuing in 2026 |
| `/news` | Fully CMS-driven via microCMS |

### Venue names to preserve in 2026 UI
- センターサークル（主要イベント広場）
- 記念講堂（ステージ公演）
- ICT教室（展示・企画）
- 雄飛館
- 人工芝グラウンド（立入禁止エリア）

### Visitor policy constants
- 駐車場なし（公共交通機関のみ）
- 禁煙
- ペット禁止（盲導犬を除く）
- アルコール消毒推奨

### Staff identification
- 黄色のスタッフTシャツ（2025実績）— 2026で継続するか確認

### Accessibility facilities
キッズスペース / ベビールームは 2026 でも強く掲載が期待される。場所の確認が必要。

---

## Design differences: 2025 vs 2026

| Aspect | 2025 (live) | 2026 (planned) |
|---|---|---|
| Framework | Next.js (App Router) | Qwik + Qwik City |
| CMS | Newt | microCMS |
| Color scheme | Warm brown/ochre (`#786A5C`) + dark navy footer | Icy white + deep navy (`#14304f`) |
| Navigation style | Top hamburger menu + sidebar | Sticky header (`SiteHeader`) |
| Map | Static flat images (1F–5F) | TBD — static images first, optional 3D later |
| Timetable | Static images | TBD |
| Font | System + custom woff2 (2 files) | Inter / system sans |
| Hosting | Unknown (not GitHub Pages) | GitHub Pages via GitHub Actions |
| Deployment trigger | Manual (assumed) | Git push + microCMS webhook |
