+++
title = "How to Deploy Your Hugo Site to Cloudflare Pages"
date = "2025-05-19"
#dateFormat = "2006-01-02" # This value can be configured for per-post date formatting
author = ""
authorTwitter = "" #do not include @
cover = ""
Toc = true
tags = ["Cloudflare Pages", "Hugo", "Hosting and Deployment", "Static Site", "GitHub"]
keywords = ["", ""]
description = "Learn how to deploy your static site generated with Hugo to Cloudflare Pages"
showFullContent = false
hideComments = false
+++
Cloudflare Pages is a nice option for hosting a static site. They offer many features for site security, speed and optimization compared to Github Pages. They also seem very promising for privacy, though I'm unsure [how genuine that is!](https://www.simpleanalytics.com/blog/why-simple-analytics-is-a-great-alternative-to-cloudflare-web-analytics#privacy). Remember, they're an American company. But, that's out of the scope for this article. This guide focuses on the process of deploying a Hugo site to Cloudflare Pages - a platform [we use ourselves](https://blog.khalidrafi.me/en/privacy) for this very site! Though the Cloudflare Docs covers much of the process, it lacks some info for a Hugo site. So, I'll share with you what I learnt from my own experience to save you some headache. Cloudflare offers three ways to deploy your static site to Pages. I'll cover the **Git Integration** method to deploy your Hugo site to Cloudflare Pages. With this, you can simply push your commits to GitHub to trigger a deployment just like GitHub Pages.

Alright, let's begin:


## Connect Your GitHub Repo to Pages
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/). Create an account if you haven't already.
2. Select **Workers & Pages** under **Compute (Workers)** from the sidebar.
3. Select **Create**. Then, under **Pages**, choose **Get Started** for the **Import an existing Git repository** option.
4. Then choose **Connect GitHub**. It will redirect you to GitHub. Log into your GitHub account.
5. GitHub will ask you where to install **Cloudflare Workers and Pages**. Choose your personal account. Then, authorize it to **All repositories** or **Only select repositories** according to your choice. Specify a repository if you chose the latter. You can choose from both public and private repo. Then select **Install & Authorize**. It will redirect you again to the Cloudflare dashboard.
5. Then, select the GitHub repository for your Hugo site. Whenever you *(git) push* to this repo, Cloudflare will automatically deploy your site to Pages. 
6. Now, select **Begin setup**. You can then customize your deployment in the **Set up builds and deployments** screen.

## Set up builds and deployments
1. Now, set your **Project name**. A subdomain will be created to the pages.dev domain by this name.
2. Choose your **Production branch**. This branch will be used to deploy the production version of your site. This is usually `main` or `master`. Rest of the branches will be used for preview deployments.
3. Under **Build settings**, choose **Hugo** as your **Framework preset**.
4. Enter `hugo` in **Build command** field.
5. Hugo publishes your site to `public/`. So, your **Build output directory** should be `public`.
6. Cloudflare uses a very old version of Hugo as their default (v0.118.2). If you want to use a newer version, add an **Environment Variable** by the name `HUGO_VERSION`. Set the version number (e.g. `0.147.0`) in the **Value** field.
7. Now, select **Save & Deploy**. Cloudflare will start building your site and deploy it to ~~Region: Earth~~ Cloudflare's global network.
8. You're done. If you want to use a custom domain, now select **Add a custom domain** and move to the next section. Otherwise, select **Continue to project**. You will be directed to a dashboard where you can see your project info, deployment status, production URL, current deployments etc. You can also configure other aspects of your site from here. 

## Set up a custom domain
1. Enter your domain name in the corresponding field.
2. It will ask you to confirm new DNS records. Click **Activate domain**.
3. You'll see a message saying, "<your-domain> is being set up. It may take up to 48 hours for DNS records to update and for your site to become viewable by visitors." Wait a bit and it should show active with green mark. Then, your custom domain will be live. Else, wait for 48 hours as said and keep checking.

## Troubleshooting
1. **URL issues**: If your Pages site isn't using the URL of your choice, ensure your `baseURL` is set correctly in your Hugo config. Incorrect config might cause your Pages site to redirect to **Production URL** (<random-hash>.<project-name>.pages.dev) or show other unexpected behaviors.
2. **Outdated Hugo**: If your site isn't looking as expected or some features aren't working, please check if you're using your desired Hugo version from **Settings > Variables and Secrets**. 
3. **Build issues**: Go to **View details > Build Log** from the **Deployments** section to troubleshoot build issues. Also, verify `hugo` command works locally.

For further details, refer to [Cloudflare Pages Docs](https://developers.cloudflare.com/pages).

Still stuck? I provide IT support [services](https://blog.khalidrafi.me/en/services) and can help you with this from beginning to end! Feel free to [contact](http://blog.khalidrafi.me/en/services/#contact) me. Let me deal with this task for you!!

Thanks for reading. If you liked this tutorial, please share it and support me.
