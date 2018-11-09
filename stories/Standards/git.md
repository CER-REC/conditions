# Git

## Branches

We follow the Git Flow branching model
([1](https://nvie.com/posts/a-successful-git-branching-model/), [2](https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow))
with a slight variation to release branches. Since the project is developed
almost entirely without any public releases, using a short sprint and update
cycle, we have not found a need to do a release branch. Instead, we cut releases
directly from development, and fix any bugs in that release in the next minor
release from development. All other Git Flow processes can be followed as normal.

## Commit Messages

Smart Commits are enabled in both JIRA and BitBucket, and all commit messages
should begin with the JIRA ticket ID. The first line of the commit message should
be around or below 100 characters, and should summarize the main point of the
commit. Any additional information can be added to the remaining lines of the
message.

```
NEBV-1167 Adds standards for Git and Code
* Git uses a variation of Git Flow
* Code is linted with AirBnB ESLint
```

## Pull Requests

All pull requests should be reviewed by at least two other developers that were
not involved in writing the code. Reviews should be done on the code, the
Storybook for both components and views, and the full visualization. Please test
any interactions and accessibility that have changed or regularly results in bugs.
