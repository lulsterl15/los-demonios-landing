# Los Demonios Landing Page - OAuth Setup Instructions

## Step 1: Add Environment Variables to Vercel

1. Go to: https://vercel.com/lulsterl15/los-demonios-landing/settings/environment-variables

2. Add the following variables:

### Variable 1:
- **Name:** `OAUTH_CLIENT_ID`
- **Value:** `Ov23liKZJE5t5rceoXFf`
- **Environment:** Check all (Production, Preview, Development)
- Click "Save"

### Variable 2:
- **Name:** `OAUTH_CLIENT_SECRET`
- **Value:** `d9fa487837759e9df2e1977882b19fdd3cb65158`
- **Environment:** Check all (Production, Preview, Development)
- Click "Save"

## Step 2: Redeploy

After adding the environment variables:
- Go to your Vercel dashboard
- Click "Deployments" tab
- Click the three dots on the latest deployment
- Click "Redeploy"

## Step 3: Access Admin Panel

Once redeployed:
- Go to: https://los-demonios-landing.vercel.app/admin
- Click "Login with GitHub"
- Authorize the app
- You'll be able to edit all content

## Giving Your Client Access

Add them as a collaborator:
1. Go to: https://github.com/lulsterl15/los-demonios-landing/settings/access
2. Click "Add people"
3. Enter their GitHub username or email
4. They'll be able to log in to /admin with their GitHub account
