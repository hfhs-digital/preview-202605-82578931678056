# Next Steps — Logo-Aligned Design Revision

This file now follows `design.md` and the clarified direction derived from the official festival logo.

The redesign priority is no longer just “soft hydrangea accents.”  
It is now:

- pale hydrangea color,
- clear Japanese-pattern ichimatsu structure,
- large centered titles,
- and image-free origami paper modules.

---

## 1. Highest-priority work

### 1. Strengthen the ichimatsu system

Make the site’s decorative language more clearly Japanese-pattern based.

This includes:

- stronger checker rhythm,
- layered square / diamond structure,
- pale geometric overlays,
- and more deliberate pattern placement in hero, headings, and section endings.

The current motif system is still too close to a soft corner-accent approach.

### 2. Rebuild title composition

Major titles should no longer be small or secondary.

Update the heading system so that major page and section titles become:

- large,
- centered,
- spacious,
- and framed by thin lines plus restrained pattern accents.

Do not reintroduce:

- eyebrow labels,
- descriptive intro paragraphs,
- or emblem-first heading structures.

### 3. Replace photo-dependent highlights

Rework highlight and similar information sections so they no longer depend on image assets.

Use:

- folded-paper cards,
- pinned note modules,
- origami memo shapes,
- and tag-like information panels.

The goal is to make the homepage stronger even without prepared photography.

---

## 2. Page-level redesign tasks

### 4. Revisit the home hero

Adjust the hero so it follows the new clarified direction:

- stronger diamond / ichimatsu structure,
- large centered title treatment,
- pale hydrangea color,
- and less reliance on image-led storytelling.

### 5. Revisit home lower sections

Unify the lower homepage with the same system:

- centered titles,
- folded-paper information modules,
- and section-ending ornaments using checker / diamond rhythm.

### 6. Revisit inner-page headings

News, map, timetable, and CMS pages should use the same title language:

- large centered title,
- minimal supporting copy,
- pattern-integrated framing,
- and no emblem block or eyebrow line.

### 7. Add section-ending accents

Use small geometric hydrangea / ichimatsu accents near the end of sections so the page feels continuous and deliberately composed.

---

## 3. Things that are no longer active goals

These should not remain on the redesign agenda:

- photo-heavy highlight layouts,
- emblem-based identity,
- small upper-left-dominant title composition,
- expanded heading descriptions,
- and a large typography migration.

The current font direction remains approved.

---

## 4. Motion and loading

### 8. Update motion toward paper and pattern

Future motion should emphasize:

- paper settling,
- folded edges,
- line drawing,
- and geometric pattern emergence.

### 9. Update loading direction

The loading screen can combine:

- hydrangea softness,
- diamond / checker appearance,
- and folded-paper motion,

instead of leaning on emblem logic or photography.

---

## 5. Working rule

From this point on:

1. `design.md` defines the philosophy.
2. `origami-execution-plan.md` explains how to implement it.
3. This file lists the remaining implementation work.

If a new idea feels too photographic, too emblem-led, too small in title presence, or too weak in Japanese-pattern structure, reject it.

```Gemini said
### 1. グラデーションを「色」から「光と影」へ置換する

AIが多用する「紫から青へのグラデーション」はデジタルすぎて安っぽく見えます。

* **改善案:** 「色のグラデーション」を禁止し、「紙の重なりによる透過率の変化」で表現させます。
* **具体的な指示:** 「CSSの`linear-gradient`で色を混ぜるな。背景はあくまで`#FFFFFF`（白）とし、その上に透過度5%〜15%の『薄紅（Light Ruby）』や『藤色（Wisteria）』のレイヤーを**物理的に重ねた**ように見せろ。色は塗るものではなく、紙を透かして届く光の色だ」と伝えてください。

### 2. タイトル周りの「余白（Negative Space）」を強制する

AIは画面を要素で埋めたがりますが、洗練されたデザインの核は「何もない空間」にあります。

* **改善案:** タイトルのサイズ指定だけでなく、「タイトル周囲の圧倒的な余白」を数値で指定します。
* **具体的な指示:** 添付された「Official Contents」の画像（image_c3381d.png）をAIに見せ、「この画像のように、タイトルの上下左右に画面の30%以上の巨大な余白を持たせろ。タイトルを情報の塊ではなく、**広大な雪原の中に置かれた一つの彫刻**のように扱え」と指示してください。

### 3. 「カード」を「折り紙の断層」に変える

AIが作る「bento grid（四角い枠の羅列）」が、幼稚園の掲示板のような印象を与えています。

* **改善案:** 枠線やベタ塗りをやめ、「影（Shadow）だけで境界を作る」ように変更します。
* **具体的な指示:** 「カードの枠線（Border）や背景色を廃止しろ。代わりに、非常に薄く広範囲に広がる影（`box-shadow`）を使い、一枚の大きな白い紙が一部だけ『浮き上がっている』、あるいは『折り込まれている』ように見せることでセクションを区切れ」と指示してください。

### 4. フォントの「ウェイト」と「カーニング（字間）」を極める

AIはデフォルトの字間を使いがちですが、これが「既製品感」を生みます。

* **改善案:** 繊細な明朝体に対し、「広めの字間」**と**「極細の線」を要求します。
* **具体的な指示:** 「本文は `font-weight: 300`（細め）を使い、`letter-spacing: 0.1em` 程度の余裕を持たせろ。一方で、メインタイトルは `Noto Serif JP` の最も太いウェイトを使い、逆に字間をぎりぎりまで詰めろ（`letter-spacing: -0.02em`）。この『線の細さ』と『文字の密度』の対比が、学術的な美しさを生む」と具体的に指定します。

---

### AIへの「喝」の入れ方（プロンプトへの追加）

もし次に指示を出すなら、以下の一文を冒頭に添えてみてください。

> 「君が今出そうとしている『グラデーションがかった、角丸の、賑やかなモダンWebデザイン』は**このプロジェクトにおける『失敗』**だ。一度それらをすべて忘れろ。目指すべきは、東京大学の五月祭サイトのような、**『極限まで要素を削ぎ落とした、静謐で、冷たいほどに美しい和のミニマリズム』**だ。色は塗るな、光を透かせ。線は引くな、紙を折れ。装飾をするな、構造を見せろ。」
```
