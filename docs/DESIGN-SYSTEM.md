# Design System

## 1. Color

### Core (theme PPT gốc)

| Token | Hex | Dùng |
|---|---|---|
| `--ink` | `404049` | chữ body, chữ nút |
| `--panel` | `FFFFFF` | panel, nút đáp án, card trắng |
| `--cream` | `FFF2CF` | card board, prize box, bg Q4 |
| `--pink` | `FEA9B6` | accent Q1, title board, chữ `?` |

### Per-question accent + bg (mỗi câu 1 tông)

| Câu | Accent (chip, nút tròn, track) | Background |
|---|---|---|
| Q1 | `FEA9B6` pink | `FFE8F4` |
| Q2 | `9CCCEF` blue | `BBE6F7` |
| Q3 | `00B050` green | `BBFFC8` |
| Q4 | `B67E00` gold | `FFF2CF` |

### Semantic

| Token | Hex | Trigger |
|---|---|---|
| `--correct` | `00B050` | fill nút khi đáp đúng |
| `--wrong` | `FF0000` | fill nút khi đáp sai |
| `--timer-warn` | `FFE700` | bar @4s |
| `--timer-danger` | `EE0000` | bar @8s |

### Outline

Prize box: viền `404049` (tx1). Nút panel/khung: theo `lnRef accent1` — gợi ý outline `404049` ~1.5–2px cho style sticker, verify bằng mắt với PPT.

## 2. Typography

| Token | Font gốc | Fallback (web) | Size / weight | Dùng |
|---|---|---|---|---|
| `--font-display` | iCiel Stabile Regular | `'Baloo 2'` | 36px bold | title "Mini game", "CÂU HỎI N" (white) |
| `--font-body` | SVN-Good Dog | `'Baloo 2'` | 24 / 32px regular | question 24px, nút 32px, prize label |
| `--font-mark` | Baloo Bhaijaan | `'Baloo 2'` | 80px | chữ `?` trên card |

- Align chủ đạo: **center**.
- Text color mặc định `404049`; title chip = white.
- ⚠️ Font gốc không nhúng trong pptx (external). Check license trước khi bundle; `Baloo 2` (Google, OFL) là stand-in gần nhất (bo tròn, giống vibe). Sửa `game-data.json → theme.fonts`.

## 3. Component

### `OptionButton`
```
267.7 × 110.8, radius ~16 (PPT roundRect ~12-16px)
bg --panel; border 2px --ink (hoặc lnRef accent); text 32px body --ink center
states:
  default
  :hover → translateY(-2px) + shadow nhẹ   (web enhancement, PPT không có)
  correct → bg --correct, text white, transition 250ms
  wrong   → bg --wrong,   text white, transition 250ms
  (không disable — cho phép bấm lại như PPT)
```

### `ChipTitle` (chip tiêu đề)
```
h 67.7 (board) / 67.7 (question), bg accent, radius ~12
text 36px display bold white center
```

### `CircleBtn` (home + timer)
```
Ø72.6 circle, bg accent, border 3px --panel (ln bg1)
icon 56.5px, white (svgBlip tinted / dùng svg trắng)
hover: scale 1.05
```

### `QuizCard` (board)
```
~195 × 210, bg --cream, radius 16, border 2px --ink
'?' 80px --font-mark --pink
peek image 82–97px, bottom-center, overflow hidden bởi card
click → exit: opacity→0 + scale .9, 500ms ease-in (card biến mất)
```

### `PrizeBox` (board, nằm dưới card)
```
148.6 × 170.3, bg --cream, border 2px --ink
text "Phần thưởng là" body --ink, center
click → navigate câu hỏi correspond
```

### `TrackBar` (timer, đáy màn hình)
```
track: 1280 × 50.4 @ y669.6, bg accent
bar:   1238.7 × 31 @ y678.4, bg white, radius 15
clock: image29 97.4px, góc phải track
```

### `Mascot`
```
img absolute, toạ độ per option (game-data.json)
hidden → hiện khi option được click
```

## 4. Motion token

| Token | Duration | Easing | Ghi chú |
|---|---|---|---|
| `bounceIn` | 750ms | `cubic-bezier(.34,1.56,.64,1)` (easeOutBack) | entrance panel/title/options/cards, stagger 250ms |
| `questionWipe` | 500ms filter + 750ms drop | ease-out | wipe(up) + rơi xuống 52px |
| `mascotIn` | 250ms mask + 750ms move/scale | easeOutBack | barn-door + lên 31px + grow |
| `cardExit` | 500ms | ease-in | fade/collapse khi click card |
| `colorFeedback` | 250ms | ease-out | đổi fill nút |
| `btnFadeOut` | 500ms | ease | timer btn biến mất khi bấm |
| `barTravel` | 10000ms | **linear** | translateX 0 → -1219px |
| `clockTravel` | 10000ms | linear | translateX 0 → -1210px |
| `stepColor` | 500ms | ease | bar → warn/danger |

PPT preset tương ứng: bounce = presetID2/subtype4 · wipe = presetID22? (filter `wipe(up)`) · barn = `barn(outHorizontal)` · pulse timer = presetID26 · fade = `fade`.

## 5. Audio token

| Token | File | ms | Khi |
|---|---|---|---|
| `sfx.correct` | `assets/audio/media2.MP3` | 1044 | đáp đúng |
| `sfx.wrongA` | `assets/audio/media3.MP3` | 1149 | đáp sai (btn B/id19) |
| `sfx.wrongB` | `assets/audio/media4.MP3` | 1071 | đáp sai (btn C/id20) |
| `sfx.wrongC` | `assets/audio/media5.MP3` | 1567 | đáp sai (btn D/id21) |
| `sfx.timer` | `assets/audio/media1.MP3` | 11937 | bấm timer (10s countdown) |

- Map theo **option**, không theo nội dung: mỗi option trong `game-data.json` đã gán `audio` key.
- Mobile/web: play sau user gesture đầu tiên (autoplay policy). restart từ 0 mỗi lần (`currentTime=0`).
- Khuyến nghị: nút mute global (PPT không có — xem UX-ANALYSIS).

## 6. Spacing / shape

- Radius suy đoán từ prstGeom `roundRect`/`round1Rect`: nút ~16px, card ~16px, panel ~24px, chip ~12px. Không có số chính xác trong XML (`avLst adj`) — adjust bằng mắt.
- Grid options: 2 cột x≈293–311 / 692–710, 2 hàng y≈388 / 516 (offset vài px từng câu — giữ exact từ JSON nếu muốn pixel-perfect).
