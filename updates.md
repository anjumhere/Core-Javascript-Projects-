# Updates Log

This document tracks all changes made across the reviewed projects/scripts. New updates will be appended here each time changes are made.

---

## 1. Odd/Even Number Checker (`script.js`)

**Bugs fixed:**

- **String vs. number comparison** — The odd/even check used `value % 2` (a string) instead of `num % 2` (the converted number). It worked only by accident due to JavaScript's implicit type coercion. Fixed to use `num` directly for a reliable, explicit numeric check.
- **Decimal input not rejected** — Inputs like `3.5` passed the `isNaN()` check and were incorrectly classified as odd/even. Added a `Number.isInteger()` check to reject non-whole numbers with a clear message.
- **Negative numbers silently broke the Odd/Even list** — The counting loop (`for (let i = 0; i <= num; i++)`) never executes for negative numbers, so the odd/even lists came back empty with no explanation. Added a check to reject negative numbers with a clear message.
- **No guard on Even/Odd buttons before first use** — Clicking "Even Numbers" or "Odd Numbers" before ever submitting a number showed a blank, confusing result (`Even Numbers in : <br>`). Added a check that prompts the user to enter a number first.

---

## 2. Custom Cursor + Card Generator (`cursor-cards.js`)

**Bugs fixed:**

- **Inputs not scoped to the form** — `document.querySelectorAll("input")` selected *every* input on the page, not just the ones inside the form. This could pull in or clear unrelated inputs elsewhere on the page. Fixed to `form.querySelectorAll("input")`.
- **Hover effect didn't work on dynamically created cards** — Hover listeners were bound once to a static list of elements captured before any cards existed (cards are only created after form submission), so new cards never got the cursor-hover effect. Fixed by switching to event delegation (listening on `document` and checking `e.target.closest(...)`) so newly created elements are detected automatically.
- **Redundant double form-clearing** — The code manually cleared every input's value in a loop, then also called `form.reset()` right after, which already does the same thing. Removed the duplicate manual loop.

**Dead code removed:**
- Four leftover commented-out lines (`img.setAttribute(...)`, `h3.textContent = ...`, etc.) that were replaced by the `forEach` loop below them but never deleted.

**Note flagged (not changed):** if the `image` input is a `type="file"` field rather than text/URL, `input.value` won't give a usable image source — would need `FileReader` instead. Left as-is pending confirmation of the input type.

---

## 3. Carousel + Search (`carousel-search.js`)

**Bugs fixed:**

- **Grid styles never reset when clearing search** — Searching applied inline styles (`display: grid`, `overflow: visible`, custom `gridTemplateColumns`, etc.) to switch to a grid layout. Clearing the search only rebuilt the carousel's HTML but never removed those inline styles, so the layout stayed stuck in "grid mode" even after returning to an empty search. Fixed by clearing the inline styles when the search is emptied, letting the original carousel styling take over again.
- **Duplicate element lookup** — `document.getElementById("cardsContainer")` was called separately inside both the `if` and `else` branches of the search handler. Hoisted to a single lookup at the top of the handler.

---
