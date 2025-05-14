+++
title = "Deploy Hugo Cloudflare Pages"
date = "2025-05-14T15:49:47+06:00"
draft = true
#dateFormat = "2006-01-02" # This value can be configured for per-post date formatting
author = ""
authorTwitter = "" #do not include @
cover = ""
tags = ["", ""]
keywords = ["", ""]
description = ""
showFullContent = false
hideComments = false
+++
Cloudflare Pages is a nice option for hosting a static site because Cloudflare offers many features for site security, speed and optimization. They also seem to be very promising for privacy though I'm not sure how real is that! Not to mention they're an American company. Anyways, that's not the topic of this article. In this article, I'll show you how to deploy a Hugo site to Cloudflare Pages. Though the Cloudflare Docs cover much of the process, it misses some info specific for a Hugo site. Here, I'll share that info learnt from my own experience to save you some headache. Before diving in, let's share an open secret - this site is also hosted in Cloudflare Pages! Alright, let's start:

Cloudflare offers three ways to deploy your static site to Pages. However, I'll only cover the Git Integration method to deploy your Hugo site to Cloudflare Pages (specifically with Github which I used) in this tutorial.

## Connect Your Github Repo to Pages
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/). Create an account if you haven't already.
2. Select **Workers & Pages** under **Compute (Workers)** from the sidebar.3. Select **Create**. Then, under **Pages**, choose **Get Started** for the**Import an existing Git repository** option.
4. Then choose **Connect Github**. It will redirect you to Github. Log into Github.
5. Github will ask you where to install **Cloudflare Workers and Pages**. Choose your personal account. Then, authorize it to **All repositories** or **Only select repositories** according to your choice. Specify a repository if you chose the later. You can choose from both public and private repo. Then select **Install & Authorize**. It will redirect you again to the Cloudflare dashboard.
5. Then, selct the Github repository for your Hugo site. Whenever you *(git) push* to this repo, Cloudflare will automatically deploy your site to Pages. 
6. Once you have selected a Github repository, select **Begin setup**. You can then customize your deployment in **Set up builds and deployments**.

## Set up builds and deployments
1. Now, set your **Project name**. A subdomain will be created to the pages.dev domain by this name.
2. Choose your **Production branch**. This branch will be used to deploy the production version of your site. This is usually `main` or `master`. Rest of the branches will be used for preview deployments.
3. Under **Build settings**, choose **Hugo** as your **Framework preset**.
4. Enter `hugo` in **Build command** field.
5. Hugo publishes your site to `public/`. So, your **Build output directory** should be `public`.
6. Now, select **Save & Deploy**. Cloudflare will now build your site and deploy it to *Region: Earth*
7. If you want to use a custom domain, select **Add a custom domain**. 
