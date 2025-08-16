# Permission Control Guide for PR Review Process

This guide provides recommendations for controlling who has permission to mark pull requests as "ready for review" and trigger automated deployments.

## Overview

The GitHub Actions workflows implemented will automatically deploy PR previews when a pull request is marked as "ready for review". To control who can trigger these deployments, you need to control who can mark PRs as ready for review.

## Permission Control Methods

### 1. Branch Protection Rules (Primary Method)

Configure branch protection for the `main` branch:

**Steps to Configure:**
1. Go to `Repository Settings → Branches`
2. Click "Add rule" for `main` branch
3. Enable these settings:
   - ☑️ **Require a pull request before merging**
   - ☑️ **Require approvals** (set number of required reviewers)
   - ☑️ **Require review from code owners**
   - ☑️ **Dismiss stale PR reviews when new commits are pushed**
   - ☑️ **Require status checks to pass before merging**
   - ☑️ **Include administrators** (applies rules to repo admins too)

**Effect:** Only approved reviewers can mark PRs as ready, which triggers deployments.

### 2. Repository Collaborator Permissions

Control who can contribute to the repository:

**Permission Levels:**
- **Read**: Can view and clone repository
- **Triage**: Can manage issues and PRs but cannot push
- **Write**: Can push to repository and mark PRs as ready for review
- **Maintain**: Write access plus repository management
- **Admin**: Full repository access

**Recommendation:** Give **Write** access only to trusted contributors who should be able to trigger deployments.

### 3. CODEOWNERS File (Already Configured)

The repository already has a `CODEOWNERS` file:
```
* @KatlehoJordan
```

**Benefits:**
- Automatically requests review from code owners
- When "Require review from code owners" is enabled, only code owners can approve
- Can be extended to include teams: `* @organization/team-name`

### 4. Environment Protection Rules (Advanced)

For additional deployment protection, configure environment rules:

**Steps:**
1. Go to `Repository Settings → Environments`
2. Create or edit environment: `pr-preview-*` (wildcard pattern)
3. Configure protection rules:
   - ☑️ **Required reviewers**: Add specific users/teams
   - ☑️ **Wait timer**: Optional delay before deployment
   - ☑️ **Deployment branches**: Restrict to specific branches

**Effect:** Even if PR is marked ready, deployment requires additional approval.

### 5. Organization-Level Controls

For organizations (not applicable to personal repos):

**Team-Based Access:**
- Create teams with specific permissions
- Assign teams to repositories with appropriate access levels
- Use team mentions in CODEOWNERS file

**Repository Permission Settings:**
- Set base permissions for organization members
- Control who can create pull requests
- Manage outside collaborator access

## Recommended Configuration

### For Personal Repository (Current Setup)

1. **Enable Branch Protection** on `main`:
   ```
   ✅ Require pull request reviews (1 reviewer minimum)
   ✅ Require review from code owners
   ✅ Dismiss stale reviews
   ✅ Include administrators
   ```

2. **Grant Write Access** only to trusted collaborators who should trigger deployments

3. **Use Environment Protection** (optional):
   - Add required reviewers for `pr-preview-*` environment
   - Useful for sensitive deployments or when multiple reviewers needed

### For Organization Repository

1. **Create Review Teams**:
   - `@organization/reviewers`: Can review and approve PRs
   - `@organization/developers`: Can create PRs but need approval

2. **Update CODEOWNERS**:
   ```
   # Global code owners
   * @organization/reviewers
   
   # Specific file patterns
   *.yml @organization/devops-team
   docs/ @organization/documentation-team
   ```

3. **Configure Branch Protection** with team requirements

## Workflow Behavior

### Who Can Mark PR as "Ready for Review"

1. **PR Author**: Can always convert from draft to ready
2. **Repository Collaborators** with Write+ access: Can mark others' PRs as ready
3. **Repository Admins**: Can mark any PR as ready

### What Happens When Marked Ready

1. **Workflow Triggers**: `pr-preview.yml` workflow starts
2. **Environment Check**: If environment protection is enabled, requires approval
3. **Deployment**: Creates preview at `https://[owner].github.io/[repo]/pr-[number]/`
4. **PR Comment**: Automatically posts preview link

### Security Considerations

- **Draft PRs**: Never deploy (built into workflow)
- **Fork PRs**: GitHub automatically restricts workflow permissions for security
- **Secret Access**: Workflows from forks don't have access to repository secrets
- **Approval Required**: With proper branch protection, only approved PRs deploy

## Testing the Setup

1. Create a test PR and mark it as draft
2. Verify no deployment triggers
3. Mark PR as "ready for review"
4. Verify deployment triggers (or requires approval if environment protection is enabled)
5. Check that preview link appears in PR comments

## Troubleshooting

### Common Issues

1. **Workflow doesn't trigger**:
   - Ensure PR targets `main` branch
   - Check that PR is marked as "ready for review" (not draft)
   - Verify GitHub Actions are enabled for the repository

2. **Deployment fails**:
   - Check GitHub Pages is enabled with "GitHub Actions" source
   - Verify workflow permissions in repository settings
   - Review workflow run logs in Actions tab

3. **Unauthorized deployments**:
   - Review collaborator permissions
   - Check branch protection settings
   - Verify environment protection rules

### Best Practices

1. **Start Conservative**: Begin with strict permissions and relax as needed
2. **Monitor Deployments**: Regularly review who is triggering deployments
3. **Update CODEOWNERS**: Keep code owner assignments current
4. **Document Process**: Ensure team understands the review workflow
5. **Regular Audits**: Periodically review collaborator access and permissions

## Conclusion

The combination of branch protection rules, CODEOWNERS file, and appropriate collaborator permissions provides robust control over who can trigger PR preview deployments. Start with the recommended configuration and adjust based on your team's needs and security requirements.