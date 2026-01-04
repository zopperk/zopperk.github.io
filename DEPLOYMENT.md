# Deployment Guide: Mood Tracker

This guide will help you deploy your mood tracker webpage and connect it to Google Sheets via Apps Script.

## Part 1: Set Up Google Apps Script

### Step 1: Create a Google Sheet
1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it "Mood Tracker" (or any name you prefer)
4. **Important**: Copy the Sheet ID from the URL
   - The URL looks like: `https://docs.google.com/spreadsheets/d/SHEET_ID_HERE/edit`
   - Copy the `SHEET_ID_HERE` part

### Step 2: Create the Apps Script
1. Go to [Google Apps Script](https://script.google.com)
2. Click "New Project"
3. Delete the default code
4. Copy and paste the contents of `apps-script.js` from this project
5. Replace `YOUR_SHEET_ID_HERE` with your actual Sheet ID (from Step 1)
6. Click "Save" (💾 icon) and name your project "Mood Tracker"

### Step 3: Deploy the Apps Script
1. Click "Deploy" → "New deployment"
2. Click the gear icon ⚙️ next to "Select type" and choose "Web app"
3. Configure the deployment:
   - **Description**: "Mood Tracker API" (or any description)
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (this allows your webpage to call it)
4. Click "Deploy"
5. **Copy the Web App URL** - this is your `SCRIPT_URL`
6. Click "Authorize access" and grant permissions when prompted

### Step 4: Update Your Webpage
1. Open `script.js` in your project
2. Replace the `SCRIPT_URL` constant with the Web App URL you just copied

## Part 2: Deploy Your Webpage

You have several options for hosting your webpage:

### Option A: GitHub Pages (Free & Easy)
1. Create a GitHub account if you don't have one
2. Create a new repository (e.g., "mood-tracker")
3. Upload your files (`index.html`, `script.js`, `styles.css`)
4. Go to Settings → Pages
5. Select your main branch and `/root` folder
6. Your site will be live at: `https://yourusername.github.io/mood-tracker/`

### Option B: Netlify (Free & Easy)
1. Go to [Netlify](https://www.netlify.com)
2. Sign up/login
3. Drag and drop your project folder
4. Your site will be live immediately with a random URL
5. You can add a custom domain later

### Option C: Vercel (Free & Easy)
1. Go to [Vercel](https://vercel.com)
2. Sign up/login
3. Import your project (drag & drop or connect GitHub)
4. Deploy - your site will be live immediately

### Option D: Local Testing
If you just want to test locally:
1. Make sure all files are in the same folder
2. Open `index.html` in a web browser
3. Note: Some browsers may block local file requests to external APIs. For full testing, use one of the hosting options above.

## Part 3: Test Your Deployment

1. Open your deployed webpage
2. Select a mood grade
3. Add notes (optional)
4. Click Submit
5. Check your Google Sheet - you should see a new row with your entry!

## Troubleshooting

### Apps Script Issues
- **Permission denied**: Make sure you set "Who has access" to "Anyone"
- **Sheet not found**: Double-check your Sheet ID is correct
- **CORS errors**: Apps Script web apps handle CORS automatically, but make sure your deployment is set to "Anyone"

### Webpage Issues
- **404 errors**: Make sure all file names match exactly (case-sensitive)
- **Script not loading**: Check browser console for errors
- **Data not saving**: Verify the `SCRIPT_URL` in `script.js` matches your deployed Apps Script URL

## Security Note

The Apps Script URL in your code is publicly accessible. Anyone with the URL can submit data to your sheet. If you want to add security:
- Add authentication to your Apps Script
- Use environment variables for the script URL
- Implement rate limiting

For a personal mood tracker, the current setup is usually sufficient.

