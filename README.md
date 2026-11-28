# FlagOps demo

Demo repository for [FlagOps](https://github.com/Akash-016/flagops). The Flagsmith flags for
each environment live in `flags/`. To change a flag, edit its YAML file and open a pull request:

1. `validate` checks the files on every pull request (a required check).
2. A bot comments on the pull request with the plan: which flags change, from what, to what, and where the code uses them.
3. On merge, Development and Staging update first.
4. Production waits in its own job until it is released (see "One maintainer" below).
5. A daily drift check opens an issue if someone changes a flag in the Flagsmith dashboard, and closes it once Git and Flagsmith match again.

## Keys

- `plan` and `drift` read flags with read-only server-side environment keys (repository secret `FLAGSMITH_ENVIRONMENT_KEYS`).
- Only `apply` gets the admin key, from the `non-production` and `production` GitHub Environments. Both accept deployments from `main` only, so a pull request workflow can't read the key.
- `CODEOWNERS` covers all of `.github/`, itself included.
- Every workflow pins FlagOps and `actions/checkout` to a commit instead of a moving tag; the apply jobs hold the admin key, and plan and drift hold the read-only keys.

## One maintainer

This repository has one maintainer, so it can't show a second person's review, and it departs from the [FlagOps quick start](https://github.com/Akash-016/flagops#quick-start) in two ways:

- The `production` environment has Prevent self-review on, and the maintainer is its only reviewer, so they can't approve their own deployment. GitHub's "Allow administrators to bypass" is left on, and the maintainer releases Production as admin. GitHub records that as skipped, not approved ([example](https://github.com/Akash-016/flagops-demo/actions/runs/46086054326)).
- The ruleset on `main` requires the `validate` check and code owner review (the maintainer is the code owner), and requires no other approvals. The maintainer, as admin, can bypass the whole ruleset, including direct and force pushes.

So here the production step guards against mistakes, not against the owner. A team should turn admin bypass off and require approvals, as the [security model](https://github.com/Akash-016/flagops#security-model) explains; then Production really waits for a second person.

## Why a self-hosted runner

The FlagOps README advises against self-hosted runners on public repositories. This demo makes an exception on purpose: its Flagsmith runs on the maintainer's laptop, which GitHub's own runners can't reach. To limit the risk:

- `validate`, the only job that runs for fork pull requests, runs on GitHub's runners.
- `plan` skips pull requests from forks.
- Workflows from outside contributors wait for the maintainer's approval before running.

For your own setup, use the [example workflows](https://github.com/Akash-016/flagops/tree/main/examples/workflows) on `ubuntu-latest` with a Flagsmith they can reach.

## History note

On 28 November 2026 the commit messages on `main` were rewritten (files unchanged) to drop a co-author line. Commits made before that, such as the merge commit of [PR #8](https://github.com/Akash-016/flagops-demo/pull/8) that [its apply run](https://github.com/Akash-016/flagops-demo/actions/runs/46086054326) used, are no longer on `main`; their equivalents on `main` have the same files. Run 46096683594 is a no-op re-run caused by that rewrite and was cancelled on purpose.
