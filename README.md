# APEXPRAC Website

A premium static multi-page website for the ApexPrac Minecraft server.

## Included

- `index.html` — Home / landing page
- `notifications.html` — announcements
- `shop.html` — coming-soon store
- `styles.css` — complete visual system and responsive styling
- `script.js` — mobile menu, clipboard button, toast, scroll reveals and optional live server status
- `assets/apexprac-logo.png` — supplied ApexPrac logo

## Run locally

The site is static. You can open `index.html` directly, but a local server is better because browser clipboard/API permissions are more reliable.

If Python is installed:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Create a new GitHub repository, for example `apexprac-website`.
2. Upload **all files and folders inside this project**.
3. Go to **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`.
6. Save and wait for GitHub Pages to deploy.
7. Your site will be available at your GitHub Pages URL.

## Custom domain (optional)

If you own a domain, add it in **Settings → Pages → Custom domain** and follow GitHub's DNS instructions.

## Important

- The server IP is configured once in `script.js` as `SERVER_IP`.
- The Discord invite is configured as `DISCORD_URL` and in the HTML links.
- Live server status uses `api.mcsrvstat.us`. If that service is unreachable, the page deliberately shows `STATUS UNAVAILABLE` instead of inventing live data.
- The site uses Google Fonts over HTTPS. If you want a completely self-contained site, replace those font imports with locally hosted font files.
