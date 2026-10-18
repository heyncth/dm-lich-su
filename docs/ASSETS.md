# Asset Manifest

Extracted: `../assets/img/` (34 file) · `../assets/audio/` (5 file).
Tên giữ nguyên như trong `ppt/media/` để tra rels XML.

## Âm thanh — `assets/audio/`

| File | KB | ms | Vai trò |
|---|---|---|---|
| `media1.MP3` | 186 | 11937 | Âm đồng hồ đếm 10s (bấm timer) |
| `media2.MP3` | 16 | 1044 | Đáp án đúng ("oiiii đúng") |
| `media3.MP3` | 18 | 1149 | Đáp án sai A ("hmmm sai") |
| `media4.MP3` | 16 | 1071 | Đáp án sai B ("Sai eeee") |
| `media5.MP3` | 24 | 1567 | Đáp án sai C ("haaa sai vàng") |

## Ảnh dùng trong minigame — `assets/img/`

### Board (slide16)

| File | KB | Vai trò |
|---|---|---|
| `image26.png` | 343 | SideArt lớn cạnh trái board |
| `image14.png` | 224 | Mascot trang trí hàng dưới panel (×3) |
| `image22.png` | 86 | Peek mascot góc card 1 |
| `image27.png` | 125 | Peek mascot góc card 2 |
| `image28.png` | 49 | Peek mascot góc card 3 |
| `image29.png` | 36 | Peek icon card 4 (cùng file = clock) |

### Câu hỏi (slide17–20)

| File | KB | Vai trò |
|---|---|---|
| `image27.png` | 125 | **Mascot ĐÚNG** (con mèo trắng xanh) — hiện khi chọn đúng |
| `image22.png` | 86 | Mascot SAI 1 (con trắng) — cũng là **timeout mascot** góc trái dưới |
| `image32.png` | 164 | Mascot SAI 2 (con nhím) |
| `image33.png` | 52 | Mascot SAI 3 (con vàng) |
| `image29.png` | 36 | **Clock icon** trên thanh timer (đi cùng bar) |
| `image30.svg` | ~0 | Icon **Home** (nút góc trái trên) |
| `image31.svg` | ~0 | Icon **Timer/Play** (nút góc phải trên) |
| `image34.png` | 4 | ⚠️ Placeholder holder audio đặt off-canvas — **không dùng trên web** |

### Decoration từng câu (entrance)

| File | Dùng ở | Vị trí |
|---|---|---|
| `image23.png` (225KB) | Q1 | trái |
| `image19.png` (156KB) | Q1 | phải-trên |
| `image6.png` (63KB) | Q2 | trái |
| `image13.png` (82KB) | Q2 | phải-trên |
| `image11.png` (43KB) | Q3 | trái |
| `image10.png` (88KB) | Q3 | phải-trên |
| `image7.png` (171KB) | Q4 | trái |
| `image12.png` (73KB) | Q4 | phải-trên |

## Ảnh template (slide 1–15) — không cần cho minigame

`image1,2,3,4,5,8,9,15,16,17,18,20,21,24,25` — trang trí bài thuyết trình.
Có thể xoá khỏi bundle web nếu chỉ build minigame. (Một số file như `image6,7,10..14,19,22,23` dùng chung giữa template và game — đã liệt kê ở mục game, giữ lại.)

## Icon note

- `image30.svg` = home (descr trong XML: "Home1 with solid fill")
- `image31.svg` = timer
- SVG đứng 1 mình — nếu cần tint theo accent, dùng `mask-image` CSS; bản gốc đã trắng.
