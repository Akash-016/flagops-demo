# FlagOps demo

Demo repository for [FlagOps](https://github.com/Akash-016/flagops). The Flagsmith flags for
each environment live in `flags/`. To change a flag, edit its YAML file and open a pull request:

1. A bot comments on the pull request with the plan: which flags change, from what, to what.
2. On merge, Development and Staging update right away.
3. Production waits until a reviewer approves the deployment.
