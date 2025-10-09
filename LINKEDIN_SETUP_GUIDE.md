# 🔗 LinkedIn Integration Setup Guide

**Purpose:** Complete guide to set up LinkedIn posting with proper permissions

---

## 📋 QUICK START

### **What You Need:**
1. LinkedIn Developer Account
2. Company Page (for posting on behalf of organization)
3. 15 minutes

### **What You'll Get:**
- Real LinkedIn posting capability
- OAuth integration for user authentication
- Post scheduling and metrics

---

## 🚀 STEP 1: CREATE LINKEDIN APP

### **1. Go to LinkedIn Developers**
Visit: https://www.linkedin.com/developers/apps

### **2. Click "Create app"**

### **3. Fill in App Details:**
```
App name: Mizan Platform
LinkedIn Page: [Select your company page]
Privacy policy URL: https://www.mizan.work/privacy
App logo: [Upload Mizan logo - 300x300px minimum]
Legal agreement: [Check the box to agree]
```

### **4. Click "Create app"**

---

## 🔑 STEP 2: GET YOUR CREDENTIALS

### **1. Go to "Auth" Tab**

You'll see:
- **Client ID** - Copy this (looks like: `86abc123def456`)
- **Client Secret** - Click "Show" and copy (looks like: `xyz789abc123`)

### **2. Add to Railway**
```bash
LINKEDIN_CLIENT_ID=86abc123def456
LINKEDIN_CLIENT_SECRET=xyz789abc123
```

---

## ✅ STEP 3: REQUEST PERMISSIONS (CRITICAL!)

### **1. Go to "Products" Tab**

### **2. Request "Share on LinkedIn" Product**
- Click "Select" on **"Share on LinkedIn"** product
- This gives you `w_member_social` permission
- Status will change to "Under review" or "Approved"

### **3. Request "Sign In with LinkedIn using OpenID Connect"**
- Click "Select" on this product
- This gives you `r_liteprofile` permission
- Usually auto-approved instantly

### **⚠️ IMPORTANT:**
LinkedIn may take **1-3 business days** to approve "Share on LinkedIn"

---

## 🔐 STEP 4: CONFIGURE OAUTH REDIRECT URLs

### **1. Go to "Auth" Tab**

### **2. Scroll to "Redirect URLs"**

### **3. Add These URLs:**
```
https://www.mizan.work/dashboard/superadmin/social-media/callback
http://localhost:3000/dashboard/superadmin/social-media/callback
```

### **4. Click "Update"**

---

## ✅ STEP 5: VERIFY PERMISSIONS

### **How to Check if You Have w_member_social Permission:**

#### **Option 1: Check Products Tab**
1. Go to your app → "Products" tab
2. Look for "Share on LinkedIn"
3. Status should be **"Approved"** (not "Under review" or "Not requested")

#### **Option 2: Check Auth Tab**
1. Go to "Auth" tab
2. Scroll to "OAuth 2.0 scopes"
3. You should see:
   - ✅ `r_liteprofile` - Read basic profile
   - ✅ `w_member_social` - Post on behalf of member

#### **Option 3: Test with API Call**
```bash
# Get authorization URL
curl https://your-backend.railway.app/api/social-media/linkedin/auth-url \
  -H "Authorization: Bearer YOUR_TOKEN"

# Open the returned authUrl in browser
# After authorizing, LinkedIn will show requested permissions
# You should see: "Share content on LinkedIn"
```

---

## 🧪 STEP 6: TEST THE INTEGRATION

### **Option A: Get Access Token via OAuth (Recommended)**

#### **1. Get Authorization URL**
```bash
curl -X GET https://mizan-backend-production.up.railway.app/api/social-media/linkedin/auth-url \
  -H "Authorization: Bearer YOUR_MIZAN_TOKEN"
```

**Response:**
```json
{
  "success": true,
  "data": {
    "authUrl": "https://www.linkedin.com/oauth/v2/authorization?...",
    "state": "abc123"
  }
}
```

#### **2. Open authUrl in Browser**
1. Copy the `authUrl` from response
2. Paste into browser
3. Login to LinkedIn (if not already)
4. You'll see permission request screen:
   ```
   Mizan Platform wants to:
   ✓ Share content on LinkedIn on your behalf
   ✓ Read your basic profile info
   ```
5. Click **"Allow"**
6. You'll be redirected to: `https://www.mizan.work/...?code=AQT...`

#### **3. Exchange Code for Token**
```bash
# Copy the 'code' parameter from the redirect URL

curl -X POST https://mizan-backend-production.up.railway.app/api/social-media/linkedin/callback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MIZAN_TOKEN" \
  -d '{
    "code": "PASTE_CODE_HERE"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "AQX...",
    "expiresIn": 5184000
  }
}
```

**Save this accessToken!** It's valid for 60 days.

---

### **Option B: Quick Test with Manual Token**

If you need to test immediately:

#### **1. Get Token from LinkedIn**
1. Go to: https://www.linkedin.com/developers/tools/oauth
2. Select your app
3. Select scopes: `r_liteprofile`, `w_member_social`
4. Click "Request access token"
5. Copy the token

#### **2. Test Posting**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/social-media/linkedin/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_MIZAN_TOKEN" \
  -d '{
    "content": "Testing Mizan LinkedIn integration! 🚀\n\nThis is a real post via LinkedIn API.\n\n#OrganizationalCulture #AI",
    "accessToken": "PASTE_LINKEDIN_TOKEN_HERE",
    "visibility": "PUBLIC"
  }'
```

**Expected Response:**
```json
{
  "success": true,
  "data": {
    "message": "Posted to LinkedIn successfully",
    "post": {
      "id": "urn:li:share:7284758392847...",
      "url": "https://www.linkedin.com/feed/update/urn:li:share:..."
    }
  }
}
```

#### **3. Verify on LinkedIn**
1. Go to your LinkedIn profile
2. Check your posts/feed
3. ✅ **You should see your test post!**

---

## 🔍 TROUBLESHOOTING

### **Error: "LinkedIn access token not found"**
**Cause:** No token provided in request or environment

**Fix:**
```bash
# Add to Railway (temporary fix for testing)
LINKEDIN_ACCESS_TOKEN=your_token_here

# OR provide in API request
{
  "accessToken": "your_token_here"
}
```

---

### **Error: "Failed to get LinkedIn profile: 403 Forbidden"**
**Cause:** Token doesn't have `r_liteprofile` permission

**Fix:**
1. Go to your app → Products tab
2. Request "Sign In with LinkedIn using OpenID Connect"
3. Wait for approval (usually instant)
4. Get new token

---

### **Error: "LinkedIn post failed: 403 Forbidden"**
**Cause:** Token doesn't have `w_member_social` permission

**Fix:**
1. Go to your app → Products tab
2. Check if "Share on LinkedIn" is approved
3. If not approved:
   - Status = "Under review" → Wait 1-3 days
   - Status = "Not requested" → Click "Select" to request
4. After approval, get new token

---

### **Error: "Token expired"**
**Cause:** LinkedIn tokens expire after 60 days

**Fix:**
1. Use OAuth flow to get fresh token (see Step 6 Option A)
2. Or regenerate token manually (see Step 6 Option B)

---

### **App Stuck in "Under Review"?**
**What LinkedIn Reviews:**
- Privacy policy URL must be accessible
- App must have legitimate use case
- Logo and app details must be complete

**Typical approval time:** 1-3 business days

**Speed it up:**
1. Ensure privacy policy is live at your URL
2. Add detailed app description
3. Fill in all optional fields
4. Use professional logo

---

## 📊 PERMISSION SUMMARY

| Permission | Scope | What It Does | Required For |
|------------|-------|--------------|--------------|
| Read Profile | `r_liteprofile` | Read name, photo, etc | Getting user info |
| Share Content | `w_member_social` | Post on LinkedIn | **Posting! (Required)** |

---

## 🎯 QUICK REFERENCE

### **Environment Variables for Railway:**
```bash
# Required
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=https://www.mizan.work/dashboard/superadmin/social-media/callback

# Optional (for quick testing without OAuth)
LINKEDIN_ACCESS_TOKEN=your_access_token
```

### **API Endpoints:**
```bash
# Get OAuth URL
GET /api/social-media/linkedin/auth-url

# Exchange code for token
POST /api/social-media/linkedin/callback

# Post to LinkedIn
POST /api/social-media/linkedin/post

# Get profile
GET /api/social-media/linkedin/profile
```

---

## ✅ CHECKLIST

Before posting works, ensure:
- [ ] LinkedIn app created
- [ ] "Share on LinkedIn" product approved (w_member_social)
- [ ] Client ID and Secret added to Railway
- [ ] Redirect URL configured in LinkedIn app
- [ ] Access token obtained (via OAuth or manual)
- [ ] Test post succeeds
- [ ] Post visible on LinkedIn profile

---

## 🚀 YOU'RE READY!

Once permissions are approved and tokens obtained, the LinkedIn posting is **100% real** - no mocks!

Your posts will actually appear on LinkedIn. 🎉
