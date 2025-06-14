# Bug Investigation: Duplicate Todo Items

## Steps to Reproduce (Based on My Testing)
* Launch the Todo app.
* Enter a task like "Go market" and press Enter rapidly multiple times (within ~1 second).
* Observe that the same todo is added more than once to the list.
* Click the Delete button on one of the duplicate items.
* Use the "short" filter.

Observe that:
* All entries disappear at once.

---
## Root Cause Hypothesis
- The issue is likely caused by the app not preventing rapid multiple submissions when the enter key is pressed quickly, the same todo is added multiple times before the app updates. Because these todos don’t have **unique IDs** and are identified only by their text, deleting one causes all matching items to be removed. This confuses the UI and causes Playwright tests to fail when trying to find an item that was unexpectedly deleted.

---
## How to Prevent Regression
* Implement Unique Identifiers: Ensure each todo item is assigned a truly unique ID (e.g. UUID) at creation, regardless of its text.
* Prevent multiple submissions from a single rapid interaction. This ensure that no duplicate todos are created from rapid submits.
* In test scripts, target elements using unique identifiers instead of text alone to avoid ambiguity in deletion checks.
* 