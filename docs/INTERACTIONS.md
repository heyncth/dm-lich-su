# Interactions Spec

Toàn bộ hành vi lấy từ `<p:timing>` của PPT (trigger = `evt="onClick"` trong `interactiveSeq`).
Đơn vị ms. `spid` = id shape gốc (map trong `design-data.json`).

---

## A. BOARD (slide16)

### A1. Click card (`grpSp` 46/47/48/49)

| Thành phần | Hành vi |
|---|---|
| card group | `animEffect out` (fade/collapse) **500ms** → @499ms `set style.visibility=hidden` |

- Card ẩn → lộ `PrizeBox` + panel + deco phía sau (đã entrance từ khi vào màn).
- **Không có audio.** Chạy lại được (card ẩn rồi thì vô hiệu phần tử đã ẩn).

### A2. Click prize/hyperlink

| Shape | PPT target | Web target |
|---|---|---|
| '?' trong card N (id 42/43/44/45) | slide 17/18/19/20 | — (bị ẩn theo card, không dùng) |
| Prize label 2/3/8/35 | **đều slide17 (bug)** | question N tương ứng |

### A3. Entrance khi vào màn (mainSeq)

Stagger 250ms/element, `bounceIn` 750ms: panel → deco → title → prize labels → cards.
Thứ tự thực tế từ XML: sideArt/panel/deco/title (delay 0–500), cards delay 0/250/500/750.

---

## B. QUESTION (slide17–20 — cấu trúc giống hệt)

### B1. Entrance khi vào màn

| Element | Hiệu ứng |
|---|---|
| panel (4), title (5), options (6,19,20,21), deco (9,10 / 2,3 / 7,9) | `bounceIn` 750ms, stagger 250ms |
| question text (8) | `animEffect in wipe(up)` 500ms + `animMotion` rơi xuống **52px** 750ms |
| home (15), timer (18), track (24), bar (26), clock (31) | **không entrance — hiện ngay** |

### B2. Click option — event `answer(slot)`

Cho **mỗi** option (6 = đúng, 19/20/21 = sai), chạy song song (delay 0):

| # | Thành phần | Chi tiết |
|---|---|---|
| 1 | audio | `cmd playFrom(0.0)` → shape media: **6→media2 (1044)**, **19→media3 (1149)**, **20→media4 (1071)**, **21→media5 (1567)** |
| 2 | `animClr` fill nút | 250ms → đúng: `00B050` / sai: `FF0000` |
| 3 | `set` | `fill.type=solid`, `fill.on=true` (250ms) |
| 4 | `animClr` text | 250ms → `FFFFFF` |
| 5 | mascot `set visibility=visible` + `animEffect in barn(outHorizontal)` | 250ms |
| 6 | mascot `animMotion` | lên **31px** (−4.375% height) 750ms |
| 7 | mascot `animScale` | grow 750ms (easeOutBack) |

- **Không có hyperlink, không chuyển slide, không lock.** Bấm lại → audio + anim chạy lại.
- Mascot per option per câu: bảng trong `VISUAL-BRIEF.md`, toạ độ trong `game-data.json`.
- Đúng (6) cũng entrance mascot `image27`; 3 sai lần lượt `image22/image32/image33` (theo option).

### B3. Click timer btn (18) — event `startTimer()`

Chỉ bấm được khi chưa chạy (sau chạy → btn fade out).

| T+ | Thành phần | Chi tiết |
|---|---|---|
| 0 | timer btn | `animEffect out fade` **500ms** + `animScale` pulse (presetID26) |
| 0 | audio | `playFrom(0.0)` → **media1 (11937ms)** |
| 0 | bar (26) | `animMotion` translateX 0 → **−1219px** (−96.77% vw), **10000ms** linear |
| 0 | clock (31) | `animMotion` translateX 0 → **−1210px** (−94.6% vw), 10000ms linear |
| **4000** | bar fill | → `FFE700`, 500ms |
| **8000** | bar fill | → `EE0000`, 500ms |
| **10000** | clock (31) | `set visibility=hidden` |
| **10000** | timeout mascot (32) | `set visibility=visible` (`image22.png` góc trái dưới) |

- Timer **không** chặn option — đáp án vẫn bấm được sau hết giờ (đúng như PPT).
- Bar là "thời gian còn lại": trượt ra trái, lộ track accent phía sau.

### B4. Click home (14/11) → navigate board

`ppaction://hlinksldjump → slide16`. Không anim.

### B5. Các trigger khác

Không còn trigger nào. `onStopAudio`, `onNext/onPrev` chỉ là boilerplate PowerPoint.

---

## C. Điều phối âm thanh (web notes)

- 5 shape media nằm off-canvas (`image34.png` holder) — web bỏ holder, map audio qua option (xem `game-data.json`).
- Autoplay policy: không phát audio trước user gesture đầu tiên. Countdown audio phát từ click timer → an toàn.
- overlap: user bấm option liên tục → restart audio (PPT cũng vậy, `playFrom(0.0)`).
- Timer audio dài 11937ms > 10000ms sequence — để hết, không cut (PPT play trọn).

## D. Điều phối thời gian (web notes)

Dùng 1 `requestAnimationFrame` loop hoặc `setTimeout` chain cho timer sequence; transition CSS cho color/transform. Không cần animation library.
