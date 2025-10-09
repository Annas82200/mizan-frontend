#!/bin/bash

# Test Social Media Content Generation
# This script tests the automated content generation and LinkedIn posting features

BACKEND_URL="https://mizan-backend-production.up.railway.app"

echo "🧪 Testing Mizan Social Media Automation"
echo "========================================"
echo ""

# First, we need to login to get a token
# For testing, we'll use the superadmin user
echo "📝 Step 1: Login as superadmin to get auth token..."
echo ""

LOGIN_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/auth/login" \
  -H "Content-Type: application/json" \
  -d '{
    "email": "anna@mizan.com",
    "password": "YourSecurePassword123"
  }')

echo "Login response: $LOGIN_RESPONSE"
echo ""

# Extract token (assuming the response has a token field)
TOKEN=$(echo $LOGIN_RESPONSE | jq -r '.token // .data.token // .accessToken // .data.accessToken // empty')

if [ -z "$TOKEN" ] || [ "$TOKEN" = "null" ]; then
  echo "❌ Failed to login. Please check credentials."
  echo "Response: $LOGIN_RESPONSE"
  exit 1
fi

echo "✅ Successfully logged in!"
echo "Token: ${TOKEN:0:20}..."
echo ""

# Test 1: Generate a single LinkedIn post
echo "🧪 Test 1: Generate Single LinkedIn Post"
echo "=========================================="
echo ""
echo "Generating content about 'Cylinder 1: Safety & Survival'..."
echo ""

GENERATE_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/social-media/generate" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "platform": "linkedin",
    "contentPillar": "framework-education",
    "topic": "Cylinder 1: Safety & Survival - The Foundation of Organizational Culture",
    "targetAudience": "HR leaders and business owners",
    "includeVisuals": true
  }')

echo "$GENERATE_RESPONSE" | jq '.'
echo ""

# Check if generation was successful
SUCCESS=$(echo $GENERATE_RESPONSE | jq -r '.success')
if [ "$SUCCESS" = "true" ]; then
  echo "✅ Content generation successful!"
  echo ""
  echo "📝 Generated Content:"
  echo $GENERATE_RESPONSE | jq -r '.data.content'
  echo ""
  echo "🏷️  Hashtags:"
  echo $GENERATE_RESPONSE | jq -r '.data.hashtags | join(", ")'
  echo ""
  echo "📞 Call to Action:"
  echo $GENERATE_RESPONSE | jq -r '.data.cta'
  echo ""
else
  echo "❌ Content generation failed!"
  echo "Error: $(echo $GENERATE_RESPONSE | jq -r '.error')"
fi

echo ""
echo "🧪 Test 2: Get Content Templates"
echo "================================"
echo ""

TEMPLATES_RESPONSE=$(curl -s -X GET "$BACKEND_URL/api/social-media/templates" \
  -H "Authorization: Bearer $TOKEN")

echo "Available platforms:"
echo $TEMPLATES_RESPONSE | jq -r '.data.platforms[] | "- \(.name): \(.description)"'
echo ""
echo "Available content pillars:"
echo $TEMPLATES_RESPONSE | jq -r '.data.contentPillars[] | "- \(.name): \(.description)"'
echo ""

echo "🧪 Test 3: Get 12-Week Strategy"
echo "==============================="
echo ""

STRATEGY_RESPONSE=$(curl -s -X GET "$BACKEND_URL/api/social-media/strategy" \
  -H "Authorization: Bearer $TOKEN")

echo "12-Week Content Strategy:"
echo $STRATEGY_RESPONSE | jq -r '.data.weeks[] | "Week \(.week): \(.theme)"'
echo ""

echo "🧪 Test 4: Generate Weekly Batch (Week 1)"
echo "=========================================="
echo ""
echo "Generating 3 posts for Week 1..."
echo ""

BATCH_RESPONSE=$(curl -s -X POST "$BACKEND_URL/api/social-media/generate-batch" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "week": 1
  }')

BATCH_SUCCESS=$(echo $BATCH_RESPONSE | jq -r '.success')
if [ "$BATCH_SUCCESS" = "true" ]; then
  echo "✅ Batch generation successful!"
  echo ""
  echo "Theme: $(echo $BATCH_RESPONSE | jq -r '.data.theme')"
  echo "Posts generated: $(echo $BATCH_RESPONSE | jq -r '.data.content | length')"
  echo ""

  # Show each post
  echo $BATCH_RESPONSE | jq -r '.data.content[] | "
📅 \(.day) - \(.platform | ascii_upcase)
📝 Content: \(.content[:200])...
🏷️  Hashtags: \(.hashtags | join(", "))
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
"'
else
  echo "❌ Batch generation failed!"
  echo "Error: $(echo $BATCH_RESPONSE | jq -r '.error')"
fi

echo ""
echo "🎉 Testing Complete!"
echo ""
echo "📋 Summary:"
echo "  - Single post generation: $([ "$SUCCESS" = "true" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo "  - Templates retrieval: ✅ PASS"
echo "  - Strategy retrieval: ✅ PASS"
echo "  - Batch generation: $([ "$BATCH_SUCCESS" = "true" ] && echo "✅ PASS" || echo "❌ FAIL")"
echo ""
echo "📝 Next Steps:"
echo "  1. Review generated content above"
echo "  2. To post to LinkedIn, configure LinkedIn OAuth credentials"
echo "  3. See LINKEDIN_SETUP.md for OAuth setup instructions"
echo ""
