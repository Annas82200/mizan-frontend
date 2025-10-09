# 🧪 Testing Guide - Email, Billing, LinkedIn & Build

**Last Updated:** 2025-01-08
**Purpose:** Step-by-step testing instructions for newly implemented features

---

## 📋 PRE-TESTING CHECKLIST

### **Before You Start:**
- [ ] Railway backend is deployed and running
- [ ] Railway frontend (Vercel) build succeeded
- [ ] SendGrid variables added to Railway
- [ ] Stripe variables already in Railway (you confirmed this ✅)
- [ ] You have access to:
  - [ ] Email inbox for testing (use your real email)
  - [ ] Stripe test dashboard (dashboard.stripe.com)
  - [ ] LinkedIn account (optional for LinkedIn testing)

---

## 1️⃣ **TEST: BUILD ERRORS** ✅

### **What We Fixed:**
Syntax error in `demo-requests/page.tsx` that was breaking Vercel builds.

### **How to Test:**

#### **Option A: Check Vercel Build Status**
1. Go to your Vercel dashboard
2. Find the latest deployment (should be commit `4a2ee05`)
3. ✅ **Success = Green checkmark**
4. ❌ **Failed = Red X** (should not happen now!)

#### **Option B: Check Railway Logs**
```bash
# In your terminal
railway logs

# Look for:
# ✅ "Build completed successfully"
# ❌ Any syntax errors or webpack errors
```

#### **Expected Result:**
```
✅ Build succeeds without errors
✅ No "Expected ',', got '{'" error
✅ Frontend deploys to production
```

**Status:** Should already be passing now! Check your latest deployment.

---

## 2️⃣ **TEST: EMAIL SYSTEM** 📧

### **What We Implemented:**
- Demo request confirmation emails
- Demo request admin notifications
- Payment success/failure emails
- Employee invitation emails
- Consulting request emails

### **Pre-requisite:**
⚠️ **MUST ADD TO RAILWAY FIRST:**
```bash
SENDGRID_API_KEY=SG.your_key_here
SENDGRID_FROM_EMAIL=noreply@mizan.work
SENDGRID_FROM_NAME=Mizan Platform
SUPERADMIN_EMAIL=admin@mizan.work
CONSULTING_EMAIL=consulting@mizan.work
FRONTEND_URL=https://www.mizan.work
```

⚠️ **MUST VERIFY SENDER IN SENDGRID:**
1. Go to SendGrid Dashboard → Settings → Sender Authentication
2. Verify `noreply@mizan.work` OR your domain

---

### **Test 2A: Demo Request Emails**

#### **Step 1: Submit a Demo Request**
```bash
curl -X POST https://your-railway-backend.railway.app/api/demo/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "your-real-email@gmail.com",
    "company": "Test Company Inc",
    "phone": "555-1234",
    "employeeCount": 150,
    "industry": "Technology",
    "interestedIn": "Culture Assessment",
    "message": "Testing email system"
  }'
```

**Or use the frontend:**
1. Go to `https://www.mizan.work/demo`
2. Fill out the demo request form
3. Submit

#### **Expected Results:**
✅ **Customer Email** (to `your-real-email@gmail.com`):
- Subject: "Thank you for your interest in Mizan!"
- Content: Confirmation with next steps
- Timing: Within 30 seconds

✅ **Admin Email** (to `admin@mizan.work`):
- Subject: "New Demo Request: Test Company Inc (150 employees)"
- Content: Full demo request details
- Action button: "View in Dashboard"

#### **Check Railway Logs:**
```bash
railway logs | grep -i "email"

# Look for:
# ✅ "Email sent successfully to your-real-email@gmail.com"
# ✅ "Email sent successfully to admin@mizan.work"
# ❌ "Email sending failed" (means SendGrid not configured)
```

---

### **Test 2B: Employee Invitation Email**

**Pre-requisite:** Must be logged in as superadmin or clientAdmin

#### **Step 1: Get Auth Token**
```bash
# Login
curl -X POST https://your-railway-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-password"
  }'

# Copy the token from response
```

#### **Step 2: Invite an Employee**
```bash
curl -X POST https://your-railway-backend.railway.app/api/admin/users/invite \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "email": "employee@test.com",
    "name": "John Doe",
    "role": "employee"
  }'
```

#### **Expected Result:**
✅ **Email to `employee@test.com`:**
- Subject: "Your administrator invited you to join [Company] on Mizan"
- Content: Invitation with "Accept Invitation" button
- Link: Should point to frontend invitation page

---

### **Test 2C: Check SendGrid Dashboard**

1. Go to SendGrid Dashboard → Activity
2. Look for recent emails sent
3. Check delivery status (should be "Delivered")
4. If failed, check bounce/spam reasons

---

## 3️⃣ **TEST: STRIPE BILLING SYSTEM** 💳

### **What We Implemented:**
- GET `/api/billing/subscription` - View current subscription
- POST `/api/billing/checkout` - Create payment session
- POST `/api/billing/portal` - Customer portal
- POST `/api/billing/cancel` - Cancel subscription
- POST `/api/billing/reactivate` - Reactivate subscription

### **Pre-requisite:**
✅ Stripe keys already in Railway (you confirmed this)

---

### **Test 3A: Get Current Subscription**

```bash
# Get auth token first (see Test 2B Step 1)

curl -X GET https://your-railway-backend.railway.app/api/billing/subscription \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### **Expected Response (No subscription yet):**
```json
{
  "status": "inactive",
  "plan": "free",
  "message": "No active subscription"
}
```

---

### **Test 3B: Create Checkout Session (REAL Stripe)**

```bash
curl -X POST https://your-railway-backend.railway.app/api/billing/checkout \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "plan": "starter",
    "billingPeriod": "monthly",
    "employeeCount": 100,
    "successUrl": "https://www.mizan.work/dashboard/billing/success",
    "cancelUrl": "https://www.mizan.work/dashboard/billing"
  }'
```

#### **Expected Response:**
```json
{
  "url": "https://checkout.stripe.com/c/pay/cs_test_..."
}
```

#### **Test the Checkout:**
1. Copy the `url` from response
2. Open it in browser
3. You'll see Stripe checkout page with:
   - ✅ Plan: Mizan Starter Plan
   - ✅ Price: $8.00 × 100 employees = $800/month
   - ✅ Credit card form

#### **Use Stripe Test Card:**
```
Card Number: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
```

#### **Complete Payment:**
1. Fill in test card details
2. Click "Pay"
3. Should redirect to success URL
4. Check Railway logs for webhook processing

---

### **Test 3C: Verify Subscription Created**

```bash
# Call subscription endpoint again
curl -X GET https://your-railway-backend.railway.app/api/billing/subscription \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### **Expected Response (After payment):**
```json
{
  "id": "sub_...",
  "status": "active",
  "plan": "starter",
  "billingPeriod": "monthly",
  "employeeCount": 100,
  "amount": 80000,
  "pricePerEmployee": 800,
  "currentPeriodStart": "2025-01-08T...",
  "currentPeriodEnd": "2025-02-08T...",
  "trialEndsAt": null
}
```

---

### **Test 3D: Check Stripe Dashboard**

1. Go to https://dashboard.stripe.com/test/dashboard
2. Click "Payments" → Should see your test payment
3. Click "Subscriptions" → Should see active subscription
4. Click "Customers" → Should see customer created

---

### **Test 3E: Cancel Subscription**

```bash
curl -X POST https://your-railway-backend.railway.app/api/billing/cancel \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### **Expected Response:**
```json
{
  "message": "Subscription will be cancelled at period end",
  "periodEnd": "2025-02-08T..."
}
```

**Check Stripe Dashboard:**
- Subscription should show "Cancels on Feb 8, 2025"

---

### **Test 3F: Reactivate Subscription**

```bash
curl -X POST https://your-railway-backend.railway.app/api/billing/reactivate \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### **Expected Response:**
```json
{
  "message": "Subscription reactivated successfully",
  "subscription": {
    "id": "sub_...",
    "status": "active",
    "currentPeriodEnd": "2025-02-08T..."
  }
}
```

---

### **Test 3G: Customer Portal**

```bash
curl -X POST https://your-railway-backend.railway.app/api/billing/portal \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "returnUrl": "https://www.mizan.work/dashboard/billing"
  }'
```

#### **Expected Response:**
```json
{
  "url": "https://billing.stripe.com/p/session/..."
}
```

**Open the URL in browser:**
- ✅ See Stripe customer portal
- ✅ Can update payment method
- ✅ Can view invoices
- ✅ Can cancel subscription

---

### **Test 3H: Payment Success Email**

When you complete a checkout (Test 3B), you should receive:

✅ **Email to customer:**
- Subject: "Payment Successful - Mizan Starter Plan"
- Content: Payment details with amount, plan, billing period
- Dashboard link

**Check Railway logs:**
```bash
railway logs | grep -i "payment"

# Look for:
# ✅ "Checkout complete: Demo X → Tenant Y"
# ✅ "Email sent successfully" (payment confirmation)
```

---

## 4️⃣ **TEST: LINKEDIN REAL POSTING** 🔗

### **What We Implemented:**
- Real LinkedIn API posting (replaced mock)
- Image upload support
- Metrics fetching (likes, comments, shares)
- Profile fetching

### **Pre-requisite:**
⚠️ **MUST CREATE LINKEDIN APP FIRST:**

1. Go to https://www.linkedin.com/developers/apps
2. Create new app
3. Get Client ID and Client Secret
4. Add to Railway:
```bash
LINKEDIN_CLIENT_ID=your_client_id
LINKEDIN_CLIENT_SECRET=your_client_secret
LINKEDIN_REDIRECT_URI=https://www.mizan.work/dashboard/superadmin/social-media/callback
```

**OR use quick setup:**
```bash
LINKEDIN_ACCESS_TOKEN=your_access_token_here
```

---

### **Test 4A: Generate LinkedIn Content**

```bash
# Login first
curl -X POST https://your-railway-backend.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "admin@example.com",
    "password": "your-password"
  }'

# Generate content
curl -X POST https://your-railway-backend.railway.app/api/social-media/generate \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "platform": "linkedin",
    "contentPillar": "framework-education",
    "topic": "The 7-Cylinder Framework Explained",
    "targetAudience": "HR Leaders",
    "includeVisuals": true
  }'
```

#### **Expected Response:**
```json
{
  "success": true,
  "data": {
    "platform": "linkedin",
    "content": "🎯 The 7-Cylinder Framework Explained...",
    "hashtags": ["#OrganizationalCulture", "#Leadership"],
    "visualSuggestion": "Infographic showing 7 cylinders...",
    "callToAction": "What's your organization's cylinder 1 score?"
  }
}
```

---

### **Test 4B: Post to LinkedIn (REAL)**

#### **Option 1: Via API (if you have access token)**

```bash
curl -X POST https://your-railway-backend.railway.app/api/social-media/linkedin/post \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "content": "Testing Mizan Platform LinkedIn integration! 🚀\n\nThis post was created via the LinkedIn API.\n\n#OrganizationalCulture #AIAutomation",
    "accessToken": "YOUR_LINKEDIN_ACCESS_TOKEN",
    "visibility": "PUBLIC"
  }'
```

#### **Expected Response:**
```json
{
  "success": true,
  "data": {
    "message": "Posted to LinkedIn successfully",
    "post": {
      "id": "urn:li:share:7284758392847...",
      "url": "https://www.linkedin.com/feed/update/urn:li:share:7284758392847.../"
    }
  }
}
```

#### **Verify on LinkedIn:**
1. Go to your LinkedIn profile
2. Check your posts/activity
3. ✅ **You should see the post!**

---

### **Test 4C: Get LinkedIn Profile**

```bash
curl -X GET https://your-railway-backend.railway.app/api/social-media/linkedin/profile \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "x-linkedin-token: YOUR_LINKEDIN_ACCESS_TOKEN"
```

#### **Expected Response:**
```json
{
  "success": true,
  "data": {
    "id": "...",
    "firstName": {
      "localized": { "en_US": "John" }
    },
    "lastName": {
      "localized": { "en_US": "Doe" }
    }
  }
}
```

---

### **Test 4D: OAuth Flow (Recommended for Production)**

#### **Step 1: Get Authorization URL**
```bash
curl -X GET https://your-railway-backend.railway.app/api/social-media/linkedin/auth-url \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

#### **Expected Response:**
```json
{
  "success": true,
  "data": {
    "authUrl": "https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=...",
    "state": "abc123"
  }
}
```

#### **Step 2: Authorize**
1. Open `authUrl` in browser
2. Login to LinkedIn
3. Click "Allow"
4. You'll be redirected to callback URL with `?code=...`

#### **Step 3: Exchange Code for Token**
```bash
curl -X POST https://your-railway-backend.railway.app/api/social-media/linkedin/callback \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{
    "code": "CODE_FROM_REDIRECT_URL"
  }'
```

#### **Expected Response:**
```json
{
  "success": true,
  "data": {
    "accessToken": "AQX...",
    "expiresIn": 5184000
  }
}
```

**Now use this `accessToken` for posting!**

---

## 📊 **TESTING CHECKLIST**

### **Email System** 📧
- [ ] Demo request sends customer confirmation email
- [ ] Demo request sends admin notification email
- [ ] Employee invitation sends email with link
- [ ] Payment success sends confirmation email
- [ ] All emails appear in SendGrid Activity log
- [ ] Sender email is verified in SendGrid

### **Billing System** 💳
- [ ] Can fetch subscription (returns "inactive" if none)
- [ ] Can create Stripe checkout session
- [ ] Checkout URL opens valid Stripe page
- [ ] Test payment completes successfully
- [ ] Subscription appears in database
- [ ] Subscription appears in Stripe dashboard
- [ ] Can cancel subscription
- [ ] Can reactivate subscription
- [ ] Customer portal opens and works
- [ ] Payment emails are sent

### **LinkedIn Posting** 🔗
- [ ] Content generation works (returns AI-generated posts)
- [ ] Can fetch LinkedIn profile
- [ ] Can post to LinkedIn (post appears on LinkedIn)
- [ ] OAuth flow works (get auth URL, authorize, exchange code)
- [ ] Posted content visible on LinkedIn feed
- [ ] No mock data returned (real post IDs)

### **Build Status** ✅
- [ ] Frontend builds successfully on Vercel
- [ ] Backend builds successfully on Railway
- [ ] No syntax errors in logs
- [ ] No webpack/TypeScript errors

---

## 🐛 **TROUBLESHOOTING**

### **Emails Not Sending?**
```bash
# Check Railway logs
railway logs | grep -i "email"

# Common issues:
# ❌ "SENDGRID_API_KEY is not set" → Add variable to Railway
# ❌ "Sender not verified" → Verify in SendGrid dashboard
# ❌ "403 Forbidden" → Check API key permissions
```

### **Stripe Not Working?**
```bash
# Check Railway logs
railway logs | grep -i "stripe"

# Common issues:
# ❌ "STRIPE_SECRET_KEY is not set" → Check Railway variables
# ❌ "No such customer" → Customer creation failed
# ❌ "Invalid plan" → Check plan name (starter/growth/scale)
```

### **LinkedIn Posting Failed?**
```bash
# Check Railway logs
railway logs | grep -i "linkedin"

# Common issues:
# ❌ "LinkedIn access token not found" → Add LINKEDIN_ACCESS_TOKEN
# ❌ "Failed to get LinkedIn profile" → Token expired
# ❌ "403 Forbidden" → Token lacks w_member_social permission
```

### **Build Still Failing?**
```bash
# Check latest deployment
vercel logs

# Look for:
# ❌ Syntax errors
# ❌ Missing dependencies
# ❌ TypeScript errors
```

---

## ✅ **QUICK TEST SCRIPT**

Save this as `test-all.sh` and run it:

```bash
#!/bin/bash

API_URL="https://your-railway-backend.railway.app"

echo "🧪 Testing Mizan Platform Features"
echo "===================================="

# Test 1: Demo Request (Email)
echo ""
echo "📧 Test 1: Demo Request (sends emails)"
curl -X POST $API_URL/api/demo/submit \
  -H "Content-Type: application/json" \
  -d '{
    "firstName": "Test",
    "lastName": "User",
    "email": "your-email@gmail.com",
    "company": "Test Co",
    "employeeCount": 100,
    "message": "Testing"
  }'

echo ""
echo "✅ Check your email inbox for confirmation!"

# Test 2: Health Check
echo ""
echo "🏥 Test 2: Backend Health"
curl -X GET $API_URL/health

echo ""
echo "===================================="
echo "✅ Tests complete! Check Railway logs for details."
```

---

## 📞 **NEED HELP?**

If any tests fail:
1. Check Railway logs: `railway logs`
2. Check Vercel logs: `vercel logs`
3. Check environment variables are set
4. Check sender/domain verification (SendGrid)
5. Check LinkedIn app permissions
6. Share error messages from logs

**All tests should pass now!** 🎉
