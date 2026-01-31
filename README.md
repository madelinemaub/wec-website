# Women's Evidence Collective Website

A Next.js website with waitlist functionality, ready to deploy on Vercel with PostgreSQL.

---

## 🚀 DEPLOYMENT GUIDE (Step-by-Step)

### Prerequisites
You'll need:
- A GitHub account (free): https://github.com
- A Vercel account (free): https://vercel.com
- Your domain name (you mentioned you have one!)

---

## STEP 1: Get this code on GitHub

### Option A: Using GitHub Desktop (Easiest)

1. **Download GitHub Desktop**: https://desktop.github.com
2. **Install it** and sign in with your GitHub account
3. **Create a new repository**:
   - Click "File" → "New Repository"
   - Name: `wec-website`
   - Choose where to save it on your computer
   - Click "Create Repository"
4. **Copy all the files** from this project folder into that folder on your computer
5. **In GitHub Desktop**, you'll see all the files listed
6. **Write a commit message** at the bottom (like "Initial commit")
7. **Click "Commit to main"**
8. **Click "Publish repository"** (top right)
   - Uncheck "Keep this code private" if you want it public
   - Click "Publish Repository"

### Option B: Using the Command Line

```bash
# Navigate to the project folder
cd wec-website

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit"

# Create repo on GitHub, then:
git remote add origin https://github.com/YOUR-USERNAME/wec-website.git
git branch -M main
git push -u origin main
```

---

## STEP 2: Deploy to Vercel

1. **Go to Vercel**: https://vercel.com
2. **Sign up/Log in** with your GitHub account
3. **Click "Add New..."** → "Project"
4. **Import your repository**: Find `wec-website` and click "Import"
5. **Configure the project**:
   - Framework Preset: Should auto-detect "Next.js"
   - Root Directory: Leave as is
   - Just click **"Deploy"**
6. **Wait ~2 minutes** for it to build
7. **You'll get a URL** like `wec-website-xyz.vercel.app` - your site is live!

---

## STEP 3: Set Up the Database

1. **In Vercel Dashboard**, click on your project
2. **Go to "Storage"** tab (top menu)
3. **Click "Create Database"**
4. **Select "Postgres"** and click "Continue"
5. **Name it** something like `wec-waitlist`
6. **Select your region** (choose closest to your users)
7. **Click "Create"**
8. **Vercel automatically connects it** to your project!

### Create the Table

1. **Click on your new database** in the Storage tab
2. **Click "Query"** in the sidebar
3. **Copy and paste this SQL**:

```sql
CREATE TABLE IF NOT EXISTS waitlist (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  diagnosis VARCHAR(100) NOT NULL,
  primary_wearable VARCHAR(50) NOT NULL,
  other_wearable VARCHAR(100),
  tracking_duration VARCHAR(20),
  open_to_contact VARCHAR(20),
  interest_reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);
CREATE INDEX IF NOT EXISTS idx_waitlist_created ON waitlist(created_at);
```

4. **Click "Run"**
5. **You should see**: "Query executed successfully"

---

## STEP 4: Connect Your Domain

1. **In Vercel Dashboard**, click on your project
2. **Go to "Settings"** tab
3. **Click "Domains"** in sidebar
4. **Type your domain** (e.g., `womensevidencecollective.com`)
5. **Click "Add"**
6. **Vercel will show you DNS settings** to configure

### Configure Your Domain DNS

Go to wherever you bought your domain (GoDaddy, Namecheap, Google Domains, etc.)

**Option A - If Vercel shows "A Record":**
- Add an A record pointing to `76.76.21.21`
- Add a CNAME record for `www` pointing to `cname.vercel-dns.com`

**Option B - Change Nameservers (Easier):**
- Vercel might suggest changing nameservers to theirs
- This is usually the simplest option

7. **Wait 5-30 minutes** for DNS to propagate
8. **Vercel automatically gets you HTTPS** (the padlock)!

---

## STEP 5: Redeploy (To Connect Database)

After adding the database, you need to redeploy:

1. **Go to your project** in Vercel
2. **Click "Deployments"** tab
3. **Click the "..." menu** on your latest deployment
4. **Click "Redeploy"**
5. **Check "Use existing Build Cache"** is OFF (unchecked)
6. **Click "Redeploy"**

---

## ✅ Testing Your Waitlist

1. **Go to your live site**
2. **Fill out the waitlist form**
3. **Submit it**
4. **Check your database**:
   - Vercel Dashboard → Storage → Your Database → Query
   - Run: `SELECT * FROM waitlist;`
   - You should see your submission!

---

## 📊 Viewing Your Waitlist Data

You can always see who signed up:

1. **Vercel Dashboard** → **Storage** → **Your Database** → **Query**
2. Run this:
```sql
SELECT * FROM waitlist ORDER BY created_at DESC;
```

To export to CSV:
```sql
COPY (SELECT * FROM waitlist ORDER BY created_at DESC) TO STDOUT WITH CSV HEADER;
```

---

## 🔧 Making Changes to Your Site

1. **Edit the files** on your computer
2. **In GitHub Desktop**: Write a commit message, click "Commit"
3. **Click "Push origin"**
4. **Vercel automatically redeploys** within ~2 minutes!

---

## 📁 Project Structure

```
wec-website/
├── app/
│   ├── api/
│   │   └── waitlist/
│   │       └── route.ts      ← API endpoint for form submissions
│   ├── globals.css           ← Styles
│   ├── layout.tsx            ← HTML wrapper, metadata
│   └── page.tsx              ← Your landing page
├── scripts/
│   └── setup-database.sql    ← Database schema
├── package.json              ← Dependencies
├── tailwind.config.js        ← Tailwind settings
├── tsconfig.json             ← TypeScript settings
└── next.config.js            ← Next.js settings
```

---

## 🆘 Troubleshooting

### "Build failed"
- Check the Vercel build logs for the error
- Make sure all files are committed and pushed

### "Database connection failed"
- Make sure you created the database in Vercel
- Make sure you redeployed AFTER creating the database

### "Form not submitting"
- Check browser console for errors (Right-click → Inspect → Console)
- Make sure the database table was created

### Domain not working
- DNS can take up to 48 hours (usually much faster)
- Double-check your DNS settings match what Vercel showed

---

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Docs: https://nextjs.org/docs
- Vercel Postgres: https://vercel.com/docs/storage/vercel-postgres

---

Built with ❤️ for the Women's Evidence Collective
