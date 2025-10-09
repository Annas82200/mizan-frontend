# 🚂 Railway Environment Setup Guide

**Last Updated:** 2025-01-08
**Purpose:** Complete guide to configure all environment variables in Railway for Mizan Backend

---

## 📋 QUICK CHECKLIST

### ✅ Already Added (You mentioned these are done):
- [x] `STRIPE_SECRET_KEY` - Stripe secret key
- [x] `STRIPE_PUBLISHABLE_KEY` - Stripe publishable key
- [x] `STRIPE_WEBHOOK_SECRET` - Stripe webhook signing secret

### ⚠️ Need to Add:

#### **Email (SendGrid) - REQUIRED**
- [ ] `SENDGRID_API_KEY` - Your SendGrid API key
- [ ] `SENDGRID_FROM_EMAIL` - Email sender address (e.g., `noreply@mizan.work`)
- [ ] `SENDGRID_FROM_NAME` - Sender name (e.g., `Mizan Platform`)
- [ ] `SUPERADMIN_EMAIL` - Where to send admin notifications (e.g., `admin@mizan.work`)
- [ ] `CONSULTING_EMAIL` - Consulting team email (e.g., `consulting@mizan.work`)

#### **LinkedIn Integration - REQUIRED for Social Media**
- [ ] `LINKEDIN_CLIENT_ID` - LinkedIn OAuth App Client ID
- [ ] `LINKEDIN_CLIENT_SECRET` - LinkedIn OAuth App Client Secret
- [ ] `LINKEDIN_REDIRECT_URI` - OAuth callback URL (see below)

#### **Frontend URL - REQUIRED**
- [ ] `FRONTEND_URL` - Your frontend URL (e.g., `https://www.mizan.work`)

---

## 🔑 DETAILED SETUP INSTRUCTIONS

### 1️⃣ **Stripe** (✅ Already Done)

You've already added these, so you're good to go:
- `STRIPE_SECRET_KEY` - Starts with `sk_test_...` or `sk_live_...`
- `STRIPE_PUBLISHABLE_KEY` - Starts with `pk_test_...` or `pk_live_...`
- `STRIPE_WEBHOOK_SECRET` - Starts with `whsec_...`

**Do you need to create subscriptions in Stripe?**
❌ **NO!** The code creates subscriptions dynamically via the API. You just need:
1. Your Stripe account to be active
2. The 3 keys added to Railway (which you did ✅)

When someone completes a demo and pays, the code automatically:
- Creates a Stripe customer
- Creates a subscription
- Handles webhooks

---

### 2️⃣ **SendGrid Email Service** (⚠️ Need to Add)

#### Step 1: Add to Railway
Go to your Railway backend service → Variables → Add these:

```bash
SENDGRID_API_KEY=SG.your_actual_sendgrid_api_key_here
SENDGRID_FROM_EMAIL=noreply@mizan.work
SENDGRID_FROM_NAME=Mizan Platform
SUPERADMIN_EMAIL=admin@mizan.work
CONSULTING_EMAIL=consulting@mizan.work
```

#### Step 2: What you have already
- ✅ SendGrid API key (you mentioned you have it)

#### Step 3: Where to get your API key
If you need to find/regenerate it:
1. Go to [SendGrid Dashboard](https://app.sendgrid.com/)
2. Settings → API Keys
3. Copy your existing key OR create a new one with "Full Access"
4. The key starts with `SG.`

#### Step 4: Verify sender email
**IMPORTANT:** SendGrid requires sender verification
1. Go to SendGrid → Settings → Sender Authentication
2. Verify your domain (`mizan.work`) OR
3. Verify a single sender email (like `noreply@mizan.work`)

**What happens after you add this?**
✅ Demo requests will send confirmation emails
✅ Payment confirmations will be sent
✅ Employee invitations will be sent
✅ Payment failure alerts will be sent

---

### 3️⃣ **LinkedIn Integration** (⚠️ Need to Setup)

#### Current Status: ⚠️ MOCK IMPLEMENTATION
The code you have is **partially implemented**:
- ✅ Content generation works (AI creates posts)
- ✅ OAuth flow is coded
- ⚠️ Actual posting is MOCKED (see line 22-46 in `linkedin.ts`)

```typescript
// This is currently a MOCK - it doesn't actually post to LinkedIn
async publishPost(content: string, mediaUrl?: string): Promise<{ id: string; url: string }> {
  // Mock implementation - returns fake post ID
  const postId = `linkedin_${Date.now()}`;
  const postUrl = `https://linkedin.com/posts/${postId}`;
  return { id: postId, url: postUrl };
}
```

#### To Make LinkedIn Posting REAL:

**Step 1: Create LinkedIn OAuth App**
1. Go to [LinkedIn Developers](https://www.linkedin.com/developers/apps)
2. Click "Create app"
3. Fill in:
   - App name: `Mizan Platform`
   - LinkedIn Page: Your company page
   - App logo: Upload Mizan logo
   - Privacy policy URL: `https://www.mizan.work/privacy`
   - Legal agreement: Accept

**Step 2: Configure OAuth Settings**
1. In your LinkedIn app → Auth tab
2. Add Redirect URLs:
   ```
   https://www.mizan.work/dashboard/superadmin/social-media/callback
   http://localhost:3000/dashboard/superadmin/social-media/callback (for testing)
   ```
3. Request these scopes:
   - `w_member_social` (Post on behalf of member)
   - `r_liteprofile` (Read basic profile)

**Step 3: Get Credentials**
1. Go to Auth tab
2. Copy **Client ID** (looks like: `86abc123def456`)
3. Copy **Client Secret** (looks like: `xyz789abc123`)

**Step 4: Add to Railway**
```bash
LINKEDIN_CLIENT_ID=your_client_id_here
LINKEDIN_CLIENT_SECRET=your_client_secret_here
LINKEDIN_REDIRECT_URI=https://www.mizan.work/dashboard/superadmin/social-media/callback
```

#### Step 5: Implement Real LinkedIn Posting

**The mock code needs to be replaced with actual LinkedIn API calls.**
Here's what needs to be implemented in `backend/services/social-media/platforms/linkedin.ts`:

```typescript
async publishPost(content: string, mediaUrl?: string): Promise<{ id: string; url: string }> {
  // 1. Get access token from database (for the authenticated user)
  const accessToken = await this.getAccessToken(accountId);

  // 2. Get LinkedIn member ID
  const profileResponse = await fetch('https://api.linkedin.com/v2/me', {
    headers: { 'Authorization': `Bearer ${accessToken}` }
  });
  const profile = await profileResponse.json();
  const author = `urn:li:person:${profile.id}`;

  // 3. Create the post
  const postResponse = await fetch('https://api.linkedin.com/v2/ugcPosts', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'X-Restli-Protocol-Version': '2.0.0'
    },
    body: JSON.stringify({
      author,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: { text: content },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    })
  });

  const result = await postResponse.json();
  const postId = result.id;
  const postUrl = `https://linkedin.com/feed/update/${postId}`;

  return { id: postId, url: postUrl };
}
```

**Do you want me to implement the real LinkedIn posting?** (This will replace the mock)

---

### 4️⃣ **Frontend URL** (⚠️ Need to Add)

Add to Railway:
```bash
FRONTEND_URL=https://www.mizan.work
```

**Why this is needed:**
- Email links (invitation links, password reset, etc.)
- OAuth redirects
- CORS configuration

---

## 📝 COMPLETE RAILWAY VARIABLES LIST

Here's the COMPLETE list of what should be in Railway:

### **Database & Core**
```bash
DATABASE_URL=postgresql://... (Railway auto-provides this)
NODE_ENV=production
PORT=3000
```

### **Authentication**
```bash
JWT_SECRET=your-super-secret-jwt-key-change-this
JWT_EXPIRES_IN=7d
```

### **AI Providers** (you should already have these)
```bash
OPENAI_API_KEY=sk-...
ANTHROPIC_API_KEY=sk-ant-...
GOOGLE_API_KEY=...
MISTRAL_API_KEY=...
```

### **Email (SendGrid)** ⚠️ ADD THESE
```bash
SENDGRID_API_KEY=SG.your_key_here
SENDGRID_FROM_EMAIL=noreply@mizan.work
SENDGRID_FROM_NAME=Mizan Platform
SUPERADMIN_EMAIL=admin@mizan.work
CONSULTING_EMAIL=consulting@mizan.work
```

### **Payments (Stripe)** ✅ DONE
```bash
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLISHABLE_KEY=pk_test_...
STRIPE_WEBHOOK_SECRET=whsec_...
```

### **Social Media (LinkedIn)** ⚠️ ADD THESE
```bash
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=https://www.mizan.work/dashboard/superadmin/social-media/callback
```

### **URLs** ⚠️ ADD THIS
```bash
FRONTEND_URL=https://www.mizan.work
```

### **Optional but Recommended**
```bash
CORS_ORIGINS=https://www.mizan.work,https://mizan.work
LOG_LEVEL=info
```

---

## 🎯 IMMEDIATE ACTION ITEMS

### Priority 1: Email (So notifications work)
1. Go to Railway → Your backend service → Variables
2. Click "New Variable"
3. Add these 5 variables:
   ```
   SENDGRID_API_KEY=SG.your_actual_key
   SENDGRID_FROM_EMAIL=noreply@mizan.work
   SENDGRID_FROM_NAME=Mizan Platform
   SUPERADMIN_EMAIL=admin@mizan.work
   CONSULTING_EMAIL=consulting@mizan.work
   ```
4. **IMPORTANT:** Verify your sender email in SendGrid first!

### Priority 2: Frontend URL (For links to work)
```
FRONTEND_URL=https://www.mizan.work
```

### Priority 3: LinkedIn (If you want real posting)
1. Create LinkedIn OAuth app (see instructions above)
2. Get Client ID and Secret
3. Add to Railway:
   ```
   LINKEDIN_CLIENT_ID=...
   LINKEDIN_CLIENT_SECRET=...
   LINKEDIN_REDIRECT_URI=https://www.mizan.work/dashboard/superadmin/social-media/callback
   ```
4. Let me know if you want me to replace the mock LinkedIn code with real implementation

---

## ❓ FAQ

**Q: Do I need a paid Stripe account?**
A: No, test mode works fine. Use test keys (sk_test_...) for development.

**Q: Do I need to create products/prices in Stripe dashboard?**
A: No, the code creates them dynamically via API.

**Q: Will LinkedIn posting work without the OAuth app?**
A: No, but content generation will work. The mock will return fake post IDs.

**Q: What if I don't add SENDGRID_API_KEY?**
A: Emails will fail silently (won't crash the app, but no emails sent).

**Q: How do I test if emails work?**
A: Submit a demo request at `/demo` - you should receive confirmation email.

---

## 🚀 AFTER SETUP

Once you add all variables to Railway:
1. Railway will auto-deploy (takes ~2 minutes)
2. Check logs: `railway logs`
3. Test email: Submit a demo request
4. Test Stripe: Complete a checkout (test mode)
5. Test LinkedIn: Generate content (will use mock posting unless you implement real API)

---

**Need help with any of these steps? Let me know!** 🎯
