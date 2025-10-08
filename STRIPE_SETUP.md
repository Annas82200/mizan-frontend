# Stripe Payment Integration - Setup Guide

## Overview

The Mizan platform now has complete Stripe payment integration with automated tenant creation. This guide walks through the setup process.

## Features Implemented

✅ **Demo Request Flow**
- Public demo form submission (`/demo`)
- Superadmin dashboard for managing requests (`/dashboard/superadmin/demo-requests`)
- Status tracking (pending → contacted → qualified → converted/rejected)

✅ **Payment Link Generation**
- Interactive modal with plan selection (Starter, Growth, Scale)
- Monthly/Annual billing toggle with 17% annual discount
- Real-time pricing calculator
- Employee count validation
- Generates Stripe Checkout Sessions with 14-day trial

✅ **Stripe Integration**
- Checkout Session creation
- Webhook handlers for automated processing
- Subscription management
- Invoice tracking

✅ **Automated Tenant Creation**
- Webhook automatically creates tenant after successful payment
- Links subscription to demo request
- Sends welcome email (placeholder for now)

## Pricing Configuration

### Starter Plan
- **Monthly**: $8.00 per employee
- **Annual**: $6.66 per employee (save $1.34/employee/month)
- **Employee Range**: 50-250
- **Features**: Core organizational analysis

### Growth Plan
- **Monthly**: $15.00 per employee
- **Annual**: $12.50 per employee (save $2.50/employee/month)
- **Employee Range**: 251-1,000
- **Features**: Advanced analytics, integrations

### Scale Plan
- **Monthly**: $24.00 per employee
- **Annual**: $20.00 per employee (save $4.00/employee/month)
- **Employee Range**: 1,001-10,000
- **Features**: Enterprise features, dedicated support

### Trial Period
- **All plans include**: 14-day free trial
- No credit card charge until trial ends
- Full access during trial

## Setup Instructions

### 1. Create Stripe Account

1. Go to [stripe.com](https://stripe.com) and sign up
2. Complete account verification
3. Switch to **Test Mode** for initial setup (toggle in top-right)

### 2. Get API Keys

1. Navigate to **Developers** → **API Keys**
2. Copy your keys:
   - **Publishable Key**: Starts with `pk_test_...` or `pk_live_...`
   - **Secret Key**: Starts with `sk_test_...` or `sk_live_...`

### 3. Configure Webhook

1. Go to **Developers** → **Webhooks**
2. Click **Add Endpoint**
3. Set endpoint URL to: `https://your-backend-domain.com/api/webhooks/stripe`
   - For Railway deployment: `https://[your-railway-backend].up.railway.app/api/webhooks/stripe`
4. Select events to listen for:
   - `checkout.session.completed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.payment_succeeded`
   - `invoice.payment_failed`
5. Click **Add Endpoint**
6. Copy the **Signing Secret** (starts with `whsec_...`)

### 4. Add Environment Variables

#### Backend (.env)

```bash
# Stripe Keys
STRIPE_SECRET_KEY=sk_test_51...
STRIPE_PUBLISHABLE_KEY=pk_test_51...
STRIPE_WEBHOOK_SECRET=whsec_...

# Frontend URL (for Stripe redirect)
FRONTEND_URL=https://your-frontend-domain.vercel.app

# Existing variables
DATABASE_URL=postgresql://...
JWT_SECRET=your-secret-key
GOOGLE_API_KEY=your-google-api-key
```

#### Railway Deployment

1. Go to your Railway backend project
2. Navigate to **Variables** tab
3. Add each variable:
   - `STRIPE_SECRET_KEY`
   - `STRIPE_PUBLISHABLE_KEY`
   - `STRIPE_WEBHOOK_SECRET`
   - `FRONTEND_URL`
4. Click **Deploy** to restart with new variables

#### Frontend (.env.local)

```bash
# API URL
NEXT_PUBLIC_API_URL=https://your-backend-domain.com

# Stripe Publishable Key (if needed for future direct integration)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_51...
```

### 5. Test the Flow

#### Test with Stripe Test Cards

Stripe provides test cards that simulate different scenarios:

**Successful Payment**:
```
Card: 4242 4242 4242 4242
Expiry: Any future date (e.g., 12/25)
CVC: Any 3 digits (e.g., 123)
ZIP: Any 5 digits (e.g., 12345)
```

**Declined Card**:
```
Card: 4000 0000 0000 0002
```

**Requires Authentication (3D Secure)**:
```
Card: 4000 0027 6000 3184
```

#### Testing Steps

1. **Submit Demo Request**
   - Go to `https://your-domain.com/demo`
   - Fill out the form with test data
   - Submit

2. **Generate Payment Link**
   - Login as superadmin
   - Go to `/dashboard/superadmin/demo-requests`
   - Click "Send Payment Link" for the demo request
   - Select plan, billing period, employee count
   - Click "Generate Payment Link"
   - Copy the URL

3. **Complete Checkout**
   - Open the payment link in new browser window
   - Fill in test card details
   - Complete checkout
   - Should redirect to `/welcome?session_id=...`

4. **Verify Webhook Processing**
   - Check Railway logs: `View Logs` in Railway dashboard
   - Should see: "Webhook received: checkout.session.completed"
   - Should see: "Creating tenant for demo request..."
   - Should see: "Tenant created successfully"

5. **Verify Database**
   - Check `tenants` table - new tenant should exist
   - Check `subscriptions` table - subscription record created
   - Check `demo_requests` table - status updated to "converted"

## Monitoring & Debugging

### View Stripe Events

1. Go to **Developers** → **Events** in Stripe Dashboard
2. See all webhook deliveries and responses
3. Click any event to see full payload and response

### View Railway Logs

```bash
# If using Railway CLI
railway logs

# Or view in Railway dashboard
# Click your service → Deployments → View Logs
```

### Common Issues

**Issue**: "Webhook signature verification failed"
- **Cause**: Wrong `STRIPE_WEBHOOK_SECRET`
- **Fix**: Copy exact secret from Stripe webhook settings

**Issue**: "Failed to create checkout session"
- **Cause**: Wrong `STRIPE_SECRET_KEY` or missing environment variable
- **Fix**: Verify key starts with `sk_test_` and is added to Railway

**Issue**: "Customer already exists with this email"
- **Cause**: Testing with same email multiple times
- **Fix**: Use different email or delete test customer in Stripe dashboard

**Issue**: Webhook not being called
- **Cause**: Wrong webhook URL or Railway service not publicly accessible
- **Fix**: Ensure Railway backend has public URL and webhook endpoint is correct

## Production Checklist

Before going live with real payments:

- [ ] Switch Stripe to **Live Mode**
- [ ] Get new Live API keys (`sk_live_...` and `pk_live_...`)
- [ ] Create new webhook endpoint with Live mode keys
- [ ] Update environment variables in Railway with Live keys
- [ ] Test with real card (small amount)
- [ ] Verify email sending works (currently placeholder)
- [ ] Set up Stripe billing alerts
- [ ] Review Stripe's compliance requirements (SCA, PCI-DSS)
- [ ] Add terms of service and privacy policy links to checkout
- [ ] Configure receipt emails in Stripe settings

## Next Steps (Optional Enhancements)

### Email Integration
- Integrate SendGrid or AWS SES for transactional emails
- Send payment link via email (not just copy/paste)
- Send welcome email with login credentials after conversion

### Customer Portal
- Add Stripe Customer Portal for self-service subscription management
- Allow customers to update payment methods
- Allow customers to upgrade/downgrade plans
- Allow customers to view invoices

### Analytics Dashboard
- Track conversion rates (demo → qualified → converted)
- Monitor MRR (Monthly Recurring Revenue)
- Track churn rate
- Customer lifetime value (LTV)

### Advanced Features
- Proration for mid-cycle plan changes
- Add-ons (extra modules, support tiers)
- Usage-based billing for certain features
- Multi-currency support
- Tax calculation via Stripe Tax

## Support

For issues with:
- **Stripe Integration**: Check Stripe Dashboard → Developers → Logs
- **Backend API**: Check Railway logs
- **Frontend Issues**: Check browser console
- **Database**: Connect to PostgreSQL and verify records

## Architecture Reference

```
User Flow:
1. Customer submits demo form (/demo)
   ↓
2. Demo request saved to database
   ↓
3. Superadmin reviews request (/dashboard/superadmin/demo-requests)
   ↓
4. Superadmin generates Stripe payment link
   ↓
5. Customer clicks link → Stripe Checkout
   ↓
6. Customer enters payment info
   ↓
7. Stripe processes payment
   ↓
8. Stripe webhook → Backend receives event
   ↓
9. Backend creates tenant + subscription
   ↓
10. Demo request status → "converted"
   ↓
11. Customer receives welcome email (TBD)
```

## File Reference

**Backend**:
- `/backend/db/schema/payments.ts` - Database schema
- `/backend/services/stripe-service.ts` - Stripe integration logic
- `/backend/routes/payment.ts` - Payment API endpoints
- `/backend/routes/webhooks.ts` - Stripe webhook handler
- `/backend/routes/demo.ts` - Demo request API

**Frontend**:
- `/frontend/src/app/demo/page.tsx` - Public demo form
- `/frontend/src/app/dashboard/superadmin/demo-requests/page.tsx` - Demo management + payment modal
- `/frontend/src/components/dashboard/Sidebar.tsx` - Navigation menu

---

**Last Updated**: December 2024
**Mizan Version**: 1.0.0
**Stripe API Version**: 2024-11-20
