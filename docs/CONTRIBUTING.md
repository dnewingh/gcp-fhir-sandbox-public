# Contributor reference guide
## Coding Conventions
- JavaScript Style Guide - https://www.w3schools.com/js/js_conventions.asp
- Commonly used verbs - https://dev.to/maikomiyazaki/beginner-s-cheat-sheet-commonly-used-verbs-for-naming-functions-methods-and-variables-509i

## Github Workflow
- Minor changes can be directly committed to master
- Larger changes should be developed in a feature branch then reviewed via a pull request prior to merging into main
  - https://docs.gitlab.com/ee/gitlab-basics/feature_branch_workflow.html

[![](https://mermaid.ink/img/pako:eNqNkbFOAzEMhl8l8gRS2wfIVoEEA0gVXW_xJb5c6CUuPmc4VX13EqpWIBjwYsn2__lPfALHnsBCiPokeBy7bC7hOKWoJnprOvDsZmsehFBps-ngNtULZjeaoTbWaVm3XIT-hrTm3TMnur-izHtJPatw_ob8rXnB7GMOOwxNuvXefJToDmaIk5IYzj8suZHcgYuahDHfqokk0P98zrpMdDX6Ro4nlrYBVlAplerrf52atgMdKVEHTdbjTM3Guc5hUd4v2YFVKbSCcvT1uY8Rg2ACO-A01yr5qCyvlwN83eH8CZJIf-o?type=png)](https://mermaid.live/edit#pako:eNqNkbFOAzEMhl8l8gRS2wfIVoEEA0gVXW_xJb5c6CUuPmc4VX13EqpWIBjwYsn2__lPfALHnsBCiPokeBy7bC7hOKWoJnprOvDsZmsehFBps-ngNtULZjeaoTbWaVm3XIT-hrTm3TMnur-izHtJPatw_ob8rXnB7GMOOwxNuvXefJToDmaIk5IYzj8suZHcgYuahDHfqokk0P98zrpMdDX6Ro4nlrYBVlAplerrf52atgMdKVEHTdbjTM3Guc5hUd4v2YFVKbSCcvT1uY8Rg2ACO-A01yr5qCyvlwN83eH8CZJIf-o)

- Post merge clean-up: https://www.fizerkhan.com/blog/posts/clean-up-your-local-branches-after-merge-and-delete-in-github
  - Then choose option in VS Code to Syncronize Changes

## Commit message guidelines
- Follow the .gitmessage template
- General principles
  - Commits MUST be prefixed with a type chosen from the following list of prefixes
    - `ci:` Changes to our CI configuration files and scripts (e.g., `ci: Add Azure Static Web Apps workflow file`)
    - `docs:` Documentation changes only (e.g., `docs: Fix typo in X`)
    - `test:` Adding missing tests or correcting existing tests (e.g., `test: Check if X does Y`)  
    - `fix`:  A bug fix (e.g., `fix: Fix bugs introduced by ractoring X`)
    - `feat`: A new feature (e.g., `feat(pdfUtility): Implement ability to export redacted PDFs`)
    - `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
    - `refac:` A code change that neither fixes a bug nor adds a feature.  Also used for performance improvements (e.g., `refac: Clean up X`)
    - `infra:` An infrastructure changes (e.g., `infra: Enable cloudfront for X`)
    - `build`: Changes that affect the build system or external dependencies
  - A scope MAY be provided after a type. A scope MUST consist of a noun describing a section of the codebase surrounded by parenthesis.  Often times the component or helper  name can be used, e.g., `style(BaseFooter)` `feat(pdfUtility)`
  - An OPTIONAL `!` should be used for a BREAKING CHANGE
- Additional inspiration
  - Conventional Commits: https://www.conventionalcommits.org/en/v1.0.0/
  - Angular: https://github.com/angular/angular/blob/22b96b9/CONTRIBUTING.md#-commit-message-guidelines


# Versioning
- https://semver.org/