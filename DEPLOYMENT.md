# Deployment

Enable GitHub Pages using GitHub Actions. The `deploy.yml` workflow builds `site-dist/` and publishes it through the Pages artifact flow. Set the repository Pages source to GitHub Actions and configure the custom domain from `CNAME` only when the domain is owned and its DNS is ready.
