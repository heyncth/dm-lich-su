# Flow Brief

## Màn hình

Chỉ có 2 loại màn hình duy nhất (PPT không có slide thắng/thua/kết thúc):

| Screen | Route gợi ý | Nguồn |
|---|---|---|
| `board` | `/` | slide16 — bảng chọn 4 card |
| `question` | `/q/:n` (n=1..4) | slide17–20 — câu hỏi + 4 đáp án |

Slides 1–15 là template thuyết trình thuần, **không tham gia minigame** → web chỉ cần 2 screen.

## Sơ đồ điều hướng

```
            ┌────────────────────────────┐
            │          BOARD             │
            │  card1  card2  card3 card4 │
            └──┬───────┬───────┬──────┬──┘
     click card│       │       │      │  click card → ẩn card (reveal prize)
     + label   ▼       ▼       ▼      ▼
            ┌──────┐┌──────┐┌──────┐┌──────┐
            │ Q1   ││ Q2   ││ Q3   ││ Q4   │   home (top-left)
            │      ││      ││      ││      │◄──────────┐
            └──┬───┘└──┬───┘└──┬───┘└──┬───┘            │
               └───────┴───────┴───────┴────────────────┘
                    click answer → feedback tại chỗ
                    (không đổi màn hình)
```

- **Board → Question:** 2 bước — click card (reveal "Phần thưởng là"), click nhãn prize đã lộ → sang câu hỏi.
  - *PPT gốc:* click '?' trong card nhảy thẳng; click frame card → ẩn card. Xem `UX-ANALYSIS.md` §bug-1.
- **Question → Board:** click nút Home góc trái trên (`image30.svg`).
- **Question → Question:** không có (chỉ qua board).
- Không có next/prev, không có kết thúc.

## State machine

### Board

```
state: revealed: Set<cardN>       // card đã click
on click cardN:
    if N not in revealed:
        revealed += N                    // anim: card exit 500ms
    // prize label N đã visible từ đầu (nằm dưới card)
on click prizeN:
    goto question N                      // bug PPT: mọi label → Q1; web fix → QN
```

### Question

```
state:
    answered: null | {option, correct}   // PPT: không lock — cho phép click lại
    timer: idle | running | timeout
    revealedMascots: Set<slot>

on mount:
    entrance: panel/title/question/options/deco bounce-in (stagger 250ms)

on click option(slot):
    play audio(opt.audio)                // correct/wrongA/B/C
    opt.button fill → correct?00B050:FF0000 ; text → FFFFFF   (250ms)
    show mascot(opt.mascot)              // barn-in + rise + scale
    // KHÔNG disable — PPT cho phép bấm lại, effect chạy lại

on click timerBtn (chỉ lần đầu):
    timerBtn fade-out 500ms
    play audio.timer (media1, 11937ms)
    bar: translateX(0 → -1219px) 10000ms linear
    clock: translateX(0 → -1210px) 10000ms linear
    @4000ms  bar → FFE700
    @8000ms  bar → EE0000
    @10000ms hide clock, show timeoutMascot
    // timer KHÔNG khóa đáp án (đúng như PPT)

on click home:
    goto board
```

## Bảng sự kiện (event → handler)

| Nguồn | Sự kiện | Handler |
|---|---|---|
| board card | click | `revealCard(n)` — exit anim 500ms, set hidden |
| board prize label | click | `navigate(question n)` |
| question option | click | `answer(slot)` — audio + color + mascot |
| question timer btn | click | `startTimer()` — 10s sequence |
| question home btn | click | `navigate(board)` |
| timer timeout | @10s | `showTimeout()` |

## Trạng thái khởi tạo (important)

Shape nào có **entrance animation** trong PPT → web render ẩn trước, vào màn rồi animate:

- Board: title, panel, sideArt, deco mascots, prize labels, 4 cards → tất cả entrance.
- Question: panel, title, question text, 4 options, deco pics → entrance. **Home + timer button visible ngay** (không entrance).
- Mascots đáp án, timeout mascot → ẩn mãi đến trigger.

Chi tiết `startHidden` trong `design-data.json`.
