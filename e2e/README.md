# Handling Flaky Tests
## How I Handled Flakiness

In other to ensure test reliability and eliminate common sources of flakiness, I adopted the following strategies among many others:

1. **Stable Locator Strategies:** I used resilient selectors such as getByRole, getByPlaceholder, and getByText to ensure tests remain stable even with minor DOM or style changes.

2. **Playwright Auto-Waiting:** I leveraged Playwright’s built-in waiting command (e.g., expect().toBeVisible(), expect().toHaveURL(), expect().toHaveCount()) which automatically wait for elements to become stable before execution.

3. **Retry Logic (if configured):** I applied retries selectively (test.describe.configure({ retries: 2 })) to handle transient issues like network delays.

# Test Failure Reporting
## How I would report any test failure (automation)

I will follow a detailed approach to ensure that every test failure is documented, traceable, and actionable by:

1. Enableing Playwright's trace and video recording to capture any failure that occured. This can be congigured in the playwright config file. 

2. I will document the bugs in any issue tracker (e.g., spreedsheet, Jira, Trello, Azure DevOps) with:

-- Clear steps to reproduce
-- Expected and Actual result
-- Screenshots and video/traces
-- Environment it occured

# CI/CD Pipeline Integration
## How This Fits Into CI

-- Test Execution in Pipeline: The pipeline (e.g., GitHub Actions, GitLab CI, Jenkins) can be configured to run tests automatically on every pull request or commit to branches. This will also help to perform regression runs.

-- Notifications on Test Failure: Any failing test will cause the pipeline to fail, preventing codes from merging or deploying. It can also trigger email, or GitHub notifications to alert the team with direct links to reports.

-- Artifacts & Reports: The CI can be configured to upload Playwright's HTML report, trace files, and videos as downloadable artifacts for debugging.