# UX / UI Analysis

Đánh giá trải nghiệm PPT minigame + các quyết định cần chốt khi lên web.

## 1. Điểm mạnh (giữ nguyên)

1. **Feedback đa kênh tức thì** — mỗi cú click có đủ màu (đỏ/xanh 250ms) + âm thanh + mascot. Người chơi biết kết quả trong <300ms, không cần đọc.
2. **Không trừng phạt sai** — bấm sai chỉ đổi màu + âm, câu vẫn mở. Phù hợp trò chơi lớp học, giảm anxiety.
3. **Timer opt-in** — đồng hồ chỉ chạy khi bấm nút. Giáo viên tự quyết pressure; không bấm = không stress.
4. **Màu câu hỏi phân vùng** — 4 tông (hồng/xanh/lục/vàng) giúp biết đang ở câu nào, về board thấy mạch rõ.
5. **Wayfinding cố định** — Home luôn góc trái trên, timer luôn góc phải trên, track thời gian luôn đáy. Không cần legend.
6. **Delight** — mascot Chiikawa nhảy ra ở đúng ô vừa bấm (rises + barn-door), peek-mascot núp dưới card board. Đúng chỗ "trẻ em cười".
7. **Vị trí đáp án đúng xoay vòng** (Q1 TL → Q2 BR → Q3 BL → Q4 TR) — chống đoán theo vị trí.

## 2. Lỗi / thiếu trong PPT (phải xử lý khi lên web)

### Bug 1 — Prize hyperlink sai (blocker)
4 nhãn "Phần thưởng là" **đều** trỏ slide17 (copy-paste lỗi). Card 2/3/4 → Q2/3/4 không tới được qua label.
**Web fix:** label card N → question N (`game-data.json` đã fix, `bugNote` trong đó).

### Bug 2 — Trigger group vs hyperlink child mâu nhau
Trong PPT: click '?' child → navigate; click frame card → trigger ẩn card. Hai hành vi chồng nhau, kết quả thực tế khó đoán.
**Web chốt:** tách 2 bước rõ ràng — click card = reveal prize, click prize label = vào câu hỏi (đã ghi ở FLOW-BRIEF). Đơn giản, không phụ thuộc hit-area mơ hồ.

### Bug 3 — Nội dung placeholder
"CÂU HỎI 1", "Đặt câu hỏi tại đây", "Đúng"/"Sai" là chỗ trống. File không có câu hỏi thật.
**Web:** mọi text chạy qua data (`game-data.json` — `question.text`, `options[].label`). Không hardcode.

### Bug 4 — Không có màn kết
PPT end ở board. Không thắng/thua/tổng kết.
**Web (deviation, optional):** sau 4 câu có thể thêm summary — nhưng nếu muốn "giống 100%" thì bỏ. Chưa implement, chờ yêu cầu.

### Bug 5 — Đáp án không lock
Bấm lại được, audio+anim chạy lại → nếu tính điểm sẽ double-count.
**Web chốt:** (a) faithful: vẫn cho bấm lại, không tính điểm (PPT không tính); (b) nếu thêm điểm: disable sau click đúng, sai vẫn cho retry. Mặc định (a).

## 3. Khoảng trống web cần tự thêm

| Vấn đề | Đề xuất |
|---|---|
| Autoplay policy chặn audio | Audio unlock trên first gesture (click đầu); thêm nút mute global góc nào trống |
| Không biết câu nào đã làm | Board: badge ✓/✗ trên card sau khi trả lời (state `answered[q]`) — enhancement nhẹ, không đổi flow |
| 16:9 cứng | Stage 1280×720 + `scale(min(vw/1280,vh/720))`; mobile: hiện hint "xoay ngang" dưới 768px |
| Mouse-only, không keyboard | Options là `<button>` — focus ring + Enter/Space tự nhiên; aria-label "Đáp án A/B/C/D" |
| Không hover state | Thêm `:hover` translateY(-2px) + shadow (PPT không có, web cần affordance) |
| Font gốc thiếu license | Fallback `Baloo 2` (OFL). Chỉ bundle SVN-Good Dog / iCiel Stabile nếu có license |
| Timer không liên kết đáp án | Giữ faithful: hết giờ chỉ hiện mascot + đỏ, KHÔNG lock (đúng spec PPT §B3) |
| Hiệu ứng rơi/nảy chi tiết OpenXML | Không replay đúng từng preset — dùng token motion trong DESIGN-SYSTEM (gần bằng cảm nhận) |

## 4. Quyết định đã chốt trong docs

1. Flow 2 bước card → prize → question (fix bug 1+2).
2. Không lock option sau click (faithful).
3. Không màn kết (faithful) — optional mở rộng, chưa làm.
4. Badge ✓/✗ trên board = enhancement duy nhất được đề xuất (chưa implement).
5. Audio map theo option, không theo nội dung.

## 5. Accessibility tóm tắt

- Options/home/timer/card = native `<button>` (keyboard + screen reader).
- `aria-live="polite"` cho vùng feedback (mascot/kết quả) sau click.
- `prefers-reduced-motion: reduce` → bỏ bounce/motion, giữ color+audio (âm thanh vẫn cần reduced-motion riêng nếu cần — default giữ).
- Color không phải kênh duy nhất: audio + mascot đã đủ redundancy.
