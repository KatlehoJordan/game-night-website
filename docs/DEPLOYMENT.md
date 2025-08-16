# GitHub Actions Deployment Guide

This document explains how the automated deployment system works for the Game Night Website.

## Deployment Workflows

### 1. Main Branch Deployment (`deploy.yml`)

- **Trigger**: Push to `main` branch or manual dispatch
- **Purpose**: Deploy the production version to GitHub Pages
- **URL**: Main GitHub Pages URL for the repository

### 2. PR Preview Deployment (`pr-preview.yml`)

- **Trigger**: When a pull request is marked as "ready for review" or synchronized
- **Purpose**: Deploy PR previews for testing and review
- **URL**: `https://[owner].github.io/[repo]/pr-[number]/`
- **Features**:
  - Automatically comments on PR with preview link
  - Updates preview on new commits
  - Only deploys non-draft PRs

### 3. PR Cleanup (`pr-cleanup.yml`)

- **Trigger**: When a pull request is closed
- **Purpose**: Clean up PR preview deployments
- **Features**:
  - Removes PR-specific deployments
  - Comments on closed PR confirming cleanup

## Deployment Protection

### Environment Configuration

The workflows use GitHub environments for deployment protection:

- `github-pages`: Main production environment
- `pr-preview-[number]`: Individual environments for each PR preview

### Permission Control

To control who can mark PRs as "ready for review":

1. **Branch Protection Rules**:
   ```
   Repository Settings → Branches → Add rule for 'main'
   - Require pull request reviews before merging
   - Require review from code owners
   - Dismiss stale PR reviews when new commits are pushed
   ```

2. **Environment Protection Rules**:
   ```
   Repository Settings → Environments → [environment-name]
   - Required reviewers: Add specific users/teams
   - Wait timer: Optional delay before deployment
   - Deployment branches: Restrict to specific branches
   ```

3. **CODEOWNERS File**:
   - Already configured with `@KatlehoJordan`
   - Automatically requests review from code owners
   - Can be extended to include teams: `* @team-name`

## Repository Settings Required

### Enable GitHub Pages

1. Go to Repository Settings → Pages
2. Source: "GitHub Actions"
3. This allows the workflows to deploy to Pages

### Environment Setup (Optional but Recommended)

1. Go to Repository Settings → Environments
2. Create environment: `github-pages`
3. Add protection rules:
   - Required reviewers (specific users who can approve deployments)
   - Wait timer if needed
4. Create environment: `pr-preview-*` (wildcard pattern)
5. Add protection rules for PR previews

## Workflow Features

### PR Preview Benefits

- **Testing**: Review changes in a live environment before merging
- **Collaboration**: Share preview links with stakeholders
- **Continuous Updates**: Automatic updates on new commits
- **Clean URLs**: Organized preview structure

### Security Considerations

- Only deploys PRs marked as "ready for review" (not drafts)
- Uses GitHub's secure deployment tokens
- Respects repository permission settings
- Environment protection rules can require manual approval

## Troubleshooting

### Common Issues

1. **Workflow not triggering**:
   - Ensure PR is marked as "ready for review"
   - Check that PR targets the `main` branch

2. **Deployment failures**:
   - Verify GitHub Pages is enabled
   - Check workflow permissions in repository settings

3. **Preview links not working**:
   - Ensure assets paths are correctly updated
   - Check for any hardcoded URLs in the application

### Monitoring

- View workflow runs in the "Actions" tab
- Check deployment status in "Environments" section
- Monitor comments on PRs for preview links

## Best Practices

1. **Mark PRs as ready for review only when actually ready**
2. **Use meaningful PR titles** (they appear in preview comments)
3. **Test preview links** before requesting final review
4. **Clean up old/stale PRs** to avoid cluttering deployments

## Future Enhancements

- Add visual regression testing to PR previews
- Implement automatic preview link sharing in Slack/Discord
- Add deployment status badges to README
- Include performance metrics in deployment comments