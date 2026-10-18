# Visual Brief

Canvas cố định **1280×720** (16:9). Mọi toạ độ px, gốc trên-trái, z tăng dần =layer trên.
Machine data: `game-data.json` (đã chuẩn hoá) · raw: `design-data.json`.

## Chiến lược render

Stage 1280×720, scale bảo toàn tỉ lệ: `transform: scale(min(vw/1280, vh/720))`, `transform-origin: center`. Mọi element `position: absolute` theo toạ độ trong doc.

---

## Screen 1 — BOARD (slide16)

**BG:** `BBE6F7` (xanh nhạt). Trang trí: lưới kẻ trắng `FFFFFF` dọc+rộng 62.6px (pattern toàn nền — optional, bỏ không sai cảm giác).

### Layer stack (z tang dần)

| z | Element | Toạ độ | Ghi chú |
|---|---|---|---|
| 0–15 | stripe grid | phủ nền | optional |
| 16 | sideArt `image26.png` | -2.2,-171.7 · 412×892 | minh hoạ cạnh trái, entrance |
| 17 | panel trắng | 397.9,197.6 · 914.5×316.3 | nền vùng card, entrance |
| 18–20 | deco mascot `image14.png` ×3 | 511.6,466.1 / 731.9,448.2 / 914.3,448.2 | hàng mascot dưới panel, entrance |
| 21 | title chip "Mini game" | 624,81.6 · 445.5×67.7 | bg `FEA9B6`, text **white** 36pt bold (fontRef lt1) |
| 23–26 | prize labels ×4 "Phần thưởng là" | 454.8/665.3/879.5/1080.1, y≈261 · 148.6×170.3 | cream `FFF2CF`, viền ink, dưới cards; entrance |
| 27–30 | **cards 1–4** (group) | 427.9/624.3/833.3/1041.6, y248.4 · ~195×210 | trên cùng; entrance bounce stagger 250ms |

### Card anatomy (mỗi card, coordinate local → trừ vào group)

| Thành phần | Size | Chi tiết |
|---|---|---|
| khung cream | 164.6×188.6, x+18 | bg `FFF2CF`, viền ink |
| chữ `?` | 80pt `Baloo Bhaijaan`, màu `FEA9B6` | căn giữa, 2 layer (decorative + hit-target hyperlink) |
| peek image | 82–97px vuông, đáy card | card1 `image22`, card2 `image27`, card3 `image28`, card4 `image29` |

### Vị trí card (grid 4 cột, x nới nhẹ)

| Card | x | y | w | h | → question |
|---|---|---|---|---|---|
| 1 | 427.9 | 248.4 | 182.7 | 204.7 | q1 |
| 2 | 624.3 | 248.4 | 197.1 | 208.9 | q2 |
| 3 | 833.3 | 248.4 | 200.4 | 204.0 | q3 |
| 4 | 1041.6 | 248.4 | 194.7 | 219.3 | q4 |

---

## Screen 2 — QUESTION (slide17–20, khung giống nhau)

**BG per question:** Q1 `FFE8F4` · Q2 `BBE6F7` · Q3 `BBFFC8` · Q4 `FFF2CF`
**Accent per question:** Q1 `FEA9B6` · Q2 `9CCCEF` · Q3 `00B050` · Q4 `B67E00`

### Chrome (cố định 4 câu)

| Element | Toạ độ | Chi tiết |
|---|---|---|
| Home btn | 12.2,13.2 · Ø72.6 | tròn accent, icon `image30.svg` 56.5px @20.3,18.3. **Visible ngay.** Click → board |
| Timer btn | 1195.2,13.2 · Ø72.6 | tròn accent, icon `image31.svg` 56.5px @1205.9,19.1. **Visible ngay.** Click → start timer |
| Panel trắng | 179.9,24.5 · 920.2×345.4 | rounded, bg `FFFFFF` |
| Title chip | 476.9,45.6 · 326.1×67.7 | bg accent, text "CÂU HỎI N" **white** 36pt bold display, căn giữa (fontRef lt1) |
| Question text | 319.8,127.6 · 640.4×48.5 | 24pt body, `404049`, căn giữa |
| Track dưới | 0,669.6 · 1280×50.4 | bg accent |
| Bar time | 20.3,678.4 · 1238.7×31 | trắng → di chuyển/đổi màu khi timer chạy |
| Clock icon | 1192.9,639.8 · 97.4² | `image29.png`, đi cùng bar |
| Timeout mascot | -0.8,657.7 · 72.3² | `image22.png`, ẩn đến 10s |

### Options grid (2×2, button 267.7×110.8, bg `FFFFFF`, text 32pt body `404049` căn giữa)

Toạ độ **khác nhau từng câu** — vị trí đáp án đúng xoay vòng:

| Slot | Q1 (slide17) | Q2 (slide18) | Q3 (slide19) | Q4 (slide20) |
|---|---|---|---|---|
| TL | **✓ 311.7,385.3** | 293.6,388.1 | 293.6,388.1 | 293.6,388.1 |
| TR | 692.5,394.1 | 692.5,394.1 | 692.5,394.1 | **✓ 710,388.1** |
| BL | 311.7,516.0 | 300.6,516.0 | **✓ 306.7,528.6** | 293.6,529.0 |
| BR | 692.5,516.0 | **✓ 689.4,528.6** | 702.4,516.0 | 702.4,516.0 |

**Mascot per option** (hiện khi click, đè mép trái button, toạ độ tuyệt đối — xem `game-data.json`):

| Slot | Q1 | Q2 | Q3 | Q4 |
|---|---|---|---|---|
| TL | ✓cat `image27` | `image33` | `image33` | `image33` |
| TR | `image22` | `image22` | `image22` | ✓cat `image27` |
| BL | `image32` | `image32` | ✓cat `image27` | `image22` |
| BR | `image33` | ✓cat `image27` | `image32` | `image32` |

Mascot file: cat-đúng `image27.png` (125×117) · trắng-sai `image22.png` (109²) · nhím `image32.png` (153×126) · vàng `image33.png` (134×148).

### Decoration (2 ảnh/n câu, entrance)

| Q | Trái | Phải-trên |
|---|---|---|
| Q1 | `image23.png` 122.6,238.7 168² | `image19.png` 1001.3,0 126×123 |
| Q2 | `image6.png` 127.7,182.3 205² | `image13.png` 983.3,-37.7 133×174 |
| Q3 | `image11.png` 179.9,272.1 133×111 | `image10.png` 977.7,5.6 149×148 |
| Q4 | `image7.png` 144.2,221.8 176×162 | `image12.png` 988.9,-5.8 133² |

### Off-canvas (bỏ khi implement — chỉ là holder âm thanh)

5 pic `image34.png` đặt ngoài màn hình (x=-111…1348, y=-109) — trỏ tới MP3. Web: phát audio trực tiếp, không render.

---

## Layer order câu hỏi (z tang dần)

0 panel → 1 title → 2–5 options (đúng + 3 sai) → 6 question text → 7–8 deco → 9 home → 10 timer → 11–14 mascots (ẩn) → 15 audio-holder (bỏ) → 20 track → 21 bar → 22 timeout mascot (ẩn) → 23 clock.

Mascot phải **trên** option (đè một phần nút khi hiện).
