# FlagOps demo

Demo repository for [FlagOps](https://github.com/Akash-016/flagops). The Flagsmith flags for
each environment live in `flags/`. To change a flag, edit its YAML file and open a pull request:

1. `validate` checks the files on every pull request (a required check).
2. A bot comments on the pull request with the plan: which flags change, from what, to what, and where the code uses them.
3. On merge, Development and Staging update right away.
4. Production waits until a reviewer approves the deployment.
5. A daily drift check opens an issue if someone changes a flag in the Flagsmith dashboard, and closes it once Git and Flagsmith match again.

## Keys

- `plan` and `drift` read flags with read-only server-side environment keys (repository secret `FLAGSMITH_ENVIRONMENT_KEYS`).
- Only `apply` gets the admin key, from the `non-production` and `production` GitHub Environments. Both accept deployments from `main` only, so a pull request workflow can't read the key.

## Why a self-hosted runner

The FlagOps README advises against self-hosted runners on public repositories. This demo makes an exception on purpose: its Flagsmith runs on the maintainer's laptop, which GitHub's own runners can't reach. To limit the risk:

- `validate`, the only job that runs for fork pull requests, runs on GitHub's runners.
- `plan` skips pull requests from forks.
- Workflows from outside contributors wait for the maintainer's approval before running.

For your own setup, use the [example workflows](https://github.com/Akash-016/flagops/tree/main/examples/workflows) on `ubuntu-latest` with a Flagsmith they can reach.
