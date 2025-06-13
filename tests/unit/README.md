# Unit Testing Notes for Todo.vue
## Mocking Explanation
---
**During the setup for unit testing with Vitest, I encountered an issue with the test environment configuration.**

*Problem:*
The **vite.config.js** file referenced a setup file that did not exist:
*setupFiles: './vitest.setup.js'*

This resulted in an error when running the test because vitest.setup.js could not be found.

*Solution:*
Since the tests do not rely on any global mock services or global variables, the setupFiles entry is not necessary.

I resolved the issue by:

Temporarily commenting out the setupFiles line from the vite.config.js file to prevent the test runner from failing.

Also created an empty vitest.setup.js file at the project root to preserve the configuration for future use when global setup might be needed.

## During test execution, I also encountered the following error:
    	*Error: Cannot find package '@/components/Todo.vue'*

This issue arose because the '@' alias I used to reference the src directory in Vue projects, is not recognized by default in the environments.

To resolve this, I configured an alias in vite.config.js

This allows the @ symbol to correctly resolve to the src directory across the project.

Alternatively, the alias can be avoided entirely by using a relative path:
 *'../../src/components/Todo.vue'*.

# Failing Test and Fix
**Test Name: deletes a todo from the list**

*Problem:*
The test was failing with the following error:
*AssertionError: expected [] to have a length of 1 but got +0*

Which shows that after clicking the delete button, Vue’s DOM had not yet updated when the assertion was run.

I fix this by ensuring DOM updates were awaited. The assertion now correctly validates that the item was removed from the list.

With this change, the test now passes well.
