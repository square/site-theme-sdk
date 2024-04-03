## Git workflow

This repo uses the [GitHub flow](https://guides.github.com/introduction/flow/).

`alpha` is currently the main branch and is [protected](https://docs.github.com/en/github/administering-a-repository/about-protected-branches). All changes must be PR'd, reviewed, and squashed when merging.

### Commit style

This repository uses [Conventional Commits](https://www.conventionalcommits.org) for simple yet meaningful commit messages. Not only are they user-friendly, they are also machine-readable for automated release notes and versioning.

It has the following formats:

#### Without scope

```
<type>: <subject>
```

#### With scope
```
<type>(<scope>): <subject>
```

#### Types

Version influencing types:
- `fix`: user-facing bug fix (patch version bump 🏥)
- `feat`: user-facing feature (minor version bump 🌟)

Other types:
- `revert`: reverts a previous commit
- `docs`: changes to the documentation
- `build`: changes that affect the build system or external dependencies
- `test`: adding missing tests, refactoring tests; no production code change
- `refactor`: refactoring production code, eg. renaming a variable
- `style`: formatting, missing semi colons, etc; no production code change
- `perf`: changes that improve performance
- `ci`: changes to CI configuration files and scripts (eg. GitHub Actions)
- `chore`: updating grunt tasks etc; no production code change

If deciding between `feat` or `fix` vs another type, choose `feat` or `fix` because they influence the version bump appropriately.

There is a Husky git hook that ensures all your commit messages follow Conventional Commits, and a GitHub action that ensures your PR title does as well.

**Note that because of the squash and merge, by default the commit message used for release will be the PR title. Ensure the title contains a relevant message and nothing generic, as it will be used as part of the release notes.**

- ✅ chore: split linting command
- ✅ fix: properly set status code on errors
- ❌ chore: update package.json
- ❌ fix: code review changes

### Testing

Every PR is expected to have unit tests that cover any newly added code for 100% test coverage. There is a GitHub action that's run to ensure this is followed.
- `npm run test` can be used to run the tests
- `npm run coverage` can be used to view the test coverage

### Linting

ESLint is used and a GitHub action is run to ensure any new code follows the linting rules.

### Package Size

There are two package size GitHub actions that are run.
- `Package size report` shows the size difference of the individual files in the final build.
- `Package size limit` uses [Size Limit](https://github.com/ai/size-limit) to determine the real cost of the library and throws an error if it is exceeded. At the moment we've set the limit to 16kB.

### TypeDoc

Prior to pushing your PR, use `npm run typedoc` to autogenerate documentation for your newly added code. `TypeDoc` aims to recognize most `JSDoc` comments, so you can leverage those to better improve the documentation.

If you add new files, you may need to update the `typedocOptions` in `tsconfig.json`.

### Releasing

Merging to `alpha` will trigger a release GitHub Actions workflow that will appropriately version-bump based on semantic commit messages, and make a GitHub release.

Note that because alpha is a pre-release, both `feat` and `fix` will just increment the alpha version.