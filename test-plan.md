# Test Plan for Todo.vue Component
## 1. Objective: This test plan covers the testing strategy for the `Todo.vue` component, which includes:
* Adding todos via input
* Displaying error for empty inputs
* Filtering todos by text length
* Deleting todos
---
## 2. Test Types & Priorities
| Test Type      | Description                                                                | Priority |
| -------------- | -------------------------------------------------------------------------- | -------- |
| Unit Tests     | Test core logic (input validation, computed filtering, add/delete actions) | High     |
| Integration    | Ensure input, list rendering, and filter dropdown work cohesively          | Medium   |
| E2E Tests      | Full flow: login → add → filter → delete → logout                          | High     |
| Negative Tests | Validate behavior on invalid inputs (e.g. empty input)                     | Medium   |
---
## 3. Test Cases for Todo.vue
### Test Case 1: Add a Todo Item Successfully
- **Description:**  
  Verify that a user can add a todo item using the input field and Enter key.

- **Precondition:**  
  The application is running and the input field is visible.

- **Steps to Reproduce:**  
  1. Click on the input field.  
  2. Type the text `Buy groceries`.  
  3. Press the `Enter` key.

- **Expected Result:**  
  The todo item `Buy groceries` appears in the list below the input field.
---
## Test Case 2: Show Error When Submitting Empty Input
- **Description:**  
  Ensure that submitting an empty todo input triggers an error message and does not add an item.

- **Precondition:**  
  The application is running and the input field is empty.

- **Steps to Reproduce:**  
  1. Without typing anything in the input field, press the `Enter` key.

- **Expected Result:**  
  - An error message should be displayed stating that `Todo cannot be empty`, and No item should be added to the todo list.
---
## Test Case 3: Delete a Todo Item
- **Description:**  
  Confirm that a user can delete a specific todo item from the list.

- **Precondition:**  
  The application is running and at least one todo item exists in the list.

- **Steps to Reproduce:**  
  1. Locate and select the todo item you want to delete from the list.  
  2. Click the `Delete` button next to it.

- **Expected Result:**  
  - Only the selected item should be removed from the list, and no other item should be affected as each todo is unique.
---
## Test Case 4: Filter Short Todos (10 Characters or Less)
- **Description:**  
  Verify that the filter dropdown correctly shows only short todos when "Short" is selected.

- **Precondition:**  
  Three todos has been added:  
  - `Read` (short, 4 characters)  
  - `Check Email` (long, 11 characters)
  - `Go Market` (short, 9 characters)

- **Steps to Reproduce:**  
  1. Click on the filter dropdown.  
  2. Select the option `Short`.

- **Expected Result:**  
  Only the todo items lesser or equal to 10 characters should be visible in the list. `Check Email` should be hidden.
---
## Test Case 5: Filter Long Todos (More Than 10 Characters)
- **Description:**  
  Verify that only long todos are displayed when the "Long" filter is selected.

- **Precondition:**  
  Three todos has been added:  
  - `Read` (short, 4 characters)  
  - `Check Email` (long, 11 characters)
  - `Go Market` (short, 9 characters)

- **Steps to Reproduce:**  
  1. Click on the filter dropdown.  
  2. Select the option `Long`.

- **Expected Result:**  
  Only the todo item `Check Email` should be visible in the list. `Read and Go Market` should be hidden.
---
## Test Case 6: Add Duplicate Todo (Edge Case)
- **Description:**  
  Verify todo item uniqueness by entering an already existing item.

- **Precondition:**  
  The application is running and a todo item with the text `Check email` already exists in the list.

- **Steps to Reproduce:**  
  1. Click on the input field.  
  2. Type `Check email`.  
  3. Press the `Enter` key.

- **Expected Result:**  
  - A second todo item with the text `Check email` should be added to the list without displaying any error message, treating each todo as a **unique item**.

## Test Case 7: Add a Todo Item with Only Spaces (Edge Case)
- **Description:**  
  Verify that a todo item containing only whitespace is treated as invalid and not added to the list.

- **Precondition:**  
  The application is running and the input field is empty.

- **Steps to Reproduce:**  
  1. Click on the input field.  
  2. Type 3 spaces (`   `).  
  3. Press the `Enter` key.

- **Expected Result:**  
  - An error message should be displayed, stating that `Whitespace-only entries are not accepted or Todo cannot be empty`.