#!/bin/bash

# 🧪 Quick Test Script for Mizan Platform
# Tests: Email, Billing, LinkedIn, Build Status

echo "🧪 MIZAN PLATFORM - QUICK TEST SUITE"
echo "====================================="
echo ""

# Configuration
API_URL="https://mizan-backend-production.up.railway.app"
FRONTEND_URL="https://www.mizan.work"
TEST_EMAIL="annas.dahrouj@gmail.com"  # CHANGE THIS TO YOUR EMAIL

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Test counter
TESTS_RUN=0
TESTS_PASSED=0
TESTS_FAILED=0

# Helper function
run_test() {
    local test_name=$1
    local test_command=$2

    echo ""
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    echo "TEST: $test_name"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

    TESTS_RUN=$((TESTS_RUN + 1))

    response=$(eval $test_command 2>&1)
    status=$?

    echo "$response"

    if [ $status -eq 0 ]; then
        echo -e "${GREEN}✅ PASSED${NC}"
        TESTS_PASSED=$((TESTS_PASSED + 1))
    else
        echo -e "${RED}❌ FAILED${NC}"
        TESTS_FAILED=$((TESTS_FAILED + 1))
    fi
}

# ============================================
# TEST 1: BACKEND HEALTH CHECK
# ============================================
run_test "Backend Health Check" \
  "curl -s -f $API_URL/health"

# ============================================
# TEST 2: DEMO REQUEST (EMAIL TEST)
# ============================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST: Demo Request (Email System)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Submitting demo request..."
echo "Email will be sent to: $TEST_EMAIL"
echo ""

TESTS_RUN=$((TESTS_RUN + 1))

demo_response=$(curl -s -X POST $API_URL/api/demo/submit \
  -H "Content-Type: application/json" \
  -d "{
    \"firstName\": \"Test\",
    \"lastName\": \"User\",
    \"email\": \"$TEST_EMAIL\",
    \"company\": \"Test Company Inc\",
    \"phone\": \"555-1234\",
    \"employeeCount\": 150,
    \"industry\": \"Technology\",
    \"interestedIn\": \"Culture Assessment\",
    \"message\": \"Automated test - checking email system\"
  }")

echo "$demo_response"

if echo "$demo_response" | grep -q "success"; then
    echo -e "${GREEN}✅ PASSED${NC}"
    echo ""
    echo -e "${YELLOW}📧 CHECK YOUR EMAIL INBOX!${NC}"
    echo "   You should receive:"
    echo "   1. Confirmation email at: $TEST_EMAIL"
    echo "   2. Admin notification (if SUPERADMIN_EMAIL is set)"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAILED${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# ============================================
# TEST 3: FRONTEND BUILD STATUS
# ============================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST: Frontend Availability"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

TESTS_RUN=$((TESTS_RUN + 1))

frontend_status=$(curl -s -o /dev/null -w "%{http_code}" $FRONTEND_URL)

echo "Response Code: $frontend_status"

if [ "$frontend_status" = "200" ]; then
    echo -e "${GREEN}✅ PASSED - Frontend is live${NC}"
    TESTS_PASSED=$((TESTS_PASSED + 1))
else
    echo -e "${RED}❌ FAILED - Frontend returned $frontend_status${NC}"
    TESTS_FAILED=$((TESTS_FAILED + 1))
fi

# ============================================
# TEST 4: BILLING ENDPOINT (No auth required for plans)
# ============================================
run_test "Billing Plans Endpoint" \
  "curl -s -f $API_URL/api/billing/plans"

# ============================================
# TEST 5: SOCIAL MEDIA TEMPLATES
# ============================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST: Social Media Templates (requires auth)"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Skipping - requires authentication"
echo -e "${YELLOW}⏭️  SKIPPED (auth required)${NC}"

# ============================================
# SUMMARY
# ============================================
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "TEST SUMMARY"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Total Tests Run:    $TESTS_RUN"
echo -e "${GREEN}Passed:            $TESTS_PASSED${NC}"
echo -e "${RED}Failed:            $TESTS_FAILED${NC}"
echo ""

if [ $TESTS_FAILED -eq 0 ]; then
    echo -e "${GREEN}🎉 ALL TESTS PASSED!${NC}"
    echo ""
    echo "Next steps:"
    echo "1. Check your email inbox at: $TEST_EMAIL"
    echo "2. Check Railway logs: railway logs"
    echo "3. Check SendGrid activity (if emails not arriving)"
    echo ""
    exit 0
else
    echo -e "${RED}⚠️  SOME TESTS FAILED${NC}"
    echo ""
    echo "Troubleshooting:"
    echo "1. Check Railway logs: railway logs"
    echo "2. Verify environment variables are set"
    echo "3. Check RAILWAY_SETUP_GUIDE.md for configuration"
    echo ""
    exit 1
fi
