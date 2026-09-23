# Git Basics

This is the smallest repeatable workflow for proposing a change.

## One-time setup

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Fork and clone

Fork the project on GitHub, then clone your fork:

```bash
git clone https://github.com/YOUR-USERNAME/PROJECT.git
cd PROJECT
```

## Branch, edit, and commit

```bash
git switch -c docs/my-first-change
# edit files
git status
git add path/to/file
git commit -m "docs: clarify beginner instructions"
```

## Push and open a pull request

```bash
git push -u origin docs/my-first-change
```
Then open GitHub, compare the branch with the upstream project, and describe what changed.

## Maintenance note
Check official sources before relying on time-sensitive rules, dates, badge criteria, or program details.
