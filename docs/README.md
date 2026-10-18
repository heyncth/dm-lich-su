# Chikiwaa Minigame — Design Docs

Bộ tài liệu tái hiện 100% trải nghiệm minigame trong `Chikiwaa.pptx` lên web.
Tất cả số liệu trích trực tiếp từ OpenXML (pixel trên canvas 1280×720).

## File map

| File | Nội dung |
|---|---|
| [FLOW-BRIEF.md](FLOW-BRIEF.md) | Màn hình, luồng điều hướng, state machine, bảng sự kiện |
| [VISUAL-BRIEF.md](VISUAL-BRIEF.md) | Layout từng màn: toạ độ, layer, composition |
| [DESIGN-SYSTEM.md](DESIGN-SYSTEM.md) | Màu, typography, component, motion token, audio token |
| [INTERACTIONS.md](INTERACTIONS.md) | Spec chi tiết trigger: timing (ms), màu, audio, motion path |
| [UX-ANALYSIS.md](UX-ANALYSIS.md) | Đánh giá UI/UX: điểm mạnh, lỗi, khuyến nghị web |
| [ASSETS.md](ASSETS.md) | Manifest toàn bộ asset + vai trò |
| [game-data.json](game-data.json) | Data model máy-đọc cho implement (toạ độ, màu, audio, timing) |
| [design-data.json](design-data.json) | Raw geometry trích từ XML (z-order, fill, text, image) |

## Nguồn

- Source: `Chikiwaa.pptx` (20 slide, 16:9, 0 macro)
- Scale: 9525 EMU = 1px → canvas 1280×720
- Assets gốc đã extract: `../assets/img/`, `../assets/audio/`

## Thứ tự đọc để code

1. `FLOW-BRIEF.md` → router + state
2. `game-data.json` → layout + data
3. `INTERACTIONS.md` → animation/audio behavior
4. `DESIGN-SYSTEM.md` → styling
5. `UX-ANALYSIS.md` → các điểm cần quyết định (bug PPT, đề xuất web)
