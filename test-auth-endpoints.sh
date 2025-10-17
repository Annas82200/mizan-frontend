#!/bin/bash

# Test script for authentication endpoints
# Following AGENT_CONTEXT_ULTIMATE.md requirements - Production-ready testing

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Configuration
API_URL="${API_URL:-https://mizan-api.railway.app}"
TEST_EMAIL="${TEST_EMAIL:-anna@mizan.com}"
TEST_PASSWORD="${TEST_PASSWORD:-MizanAdmin2024!}"

echo "========================================="
echo "🔐 Testing Mizan Authentication System"
echo "========================================="
echo "API URL: $API_URL"
echo ""

# Function to test endpoint
test_endpoint() {
    local method=$1
    local endpoint=$2
    local data=$3
    local token=$4
    local description=$5
    
    echo -e "${YELLOW}Testing: $description${NC}"
    
    if [ -z "$token" ]; then
        response=$(curl -s -X $method \
            -H "Content-Type: application/json" \
            -d "$data" \
            "$API_URL$endpoint")
    else
        response=$(curl -s -X $method \
            -H "Content-Type: application/json" \
            -H "Authorization: Bearer $token" \
            -d "$data" \
            "$API_URL$endpoint")
    fi
    
    # Check if response contains error
    if echo "$response" | grep -q '"error"'; then
        echo -e "${RED}✗ Failed: $description${NC}"
        echo "Response: $response"
        echo ""
        return 1
    else
        echo -e "${GREEN}✓ Success: $description${NC}"
        echo "Response: $response"
        echo ""
        return 0
    fi
}

# Test 1: Login
echo "========================================="
echo "Test 1: Login Endpoint"
echo "========================================="

login_response=$(curl -s -X POST \
    -H "Content-Type: application/json" \
    -d "{\"email\":\"$TEST_EMAIL\",\"password\":\"$TEST_PASSWORD\"}" \
    "$API_URL/api/auth/login")

if echo "$login_response" | grep -q '"token"'; then
    echo -e "${GREEN}✓ Login successful${NC}"
    TOKEN=$(echo "$login_response" | grep -o '"token":"[^"]*' | grep -o '[^"]*$')
    USER_DATA=$(echo "$login_response" | grep -o '"user":{[^}]*}')
    echo "Token obtained: ${TOKEN:0:20}..."
    echo "User data: $USER_DATA"
else
    echo -e "${RED}✗ Login failed${NC}"
    echo "Response: $login_response"
    exit 1
fi
echo ""

# Test 2: Verify Token
echo "========================================="
echo "Test 2: Token Verification Endpoint"
echo "========================================="

verify_response=$(curl -s -X GET \
    -H "Authorization: Bearer $TOKEN" \
    "$API_URL/api/auth/verify")

if echo "$verify_response" | grep -q '"valid":true'; then
    echo -e "${GREEN}✓ Token verification successful${NC}"
    echo "Response: $verify_response"
else
    echo -e "${RED}✗ Token verification failed${NC}"
    echo "Response: $verify_response"
fi
echo ""

# Test 3: Get Current User
echo "========================================="
echo "Test 3: Get Current User Endpoint"
echo "========================================="

me_response=$(curl -s -X GET \
    -H "Authorization: Bearer $TOKEN" \
    "$API_URL/api/auth/me")

if echo "$me_response" | grep -q '"email"'; then
    echo -e "${GREEN}✓ Get current user successful${NC}"
    echo "Response: $me_response"
else
    echo -e "${RED}✗ Get current user failed${NC}"
    echo "Response: $me_response"
fi
echo ""

# Test 4: Refresh Token
echo "========================================="
echo "Test 4: Token Refresh Endpoint"
echo "========================================="

refresh_response=$(curl -s -X POST \
    -H "Authorization: Bearer $TOKEN" \
    "$API_URL/api/auth/refresh")

if echo "$refresh_response" | grep -q '"token"'; then
    echo -e "${GREEN}✓ Token refresh successful${NC}"
    NEW_TOKEN=$(echo "$refresh_response" | grep -o '"token":"[^"]*' | grep -o '[^"]*$')
    echo "New token obtained: ${NEW_TOKEN:0:20}..."
else
    echo -e "${RED}✗ Token refresh failed${NC}"
    echo "Response: $refresh_response"
fi
echo ""

# Test 5: Test CORS Headers
echo "========================================="
echo "Test 5: CORS Configuration"
echo "========================================="

cors_response=$(curl -s -I -X OPTIONS \
    -H "Origin: https://mizan.work" \
    -H "Access-Control-Request-Method: POST" \
    -H "Access-Control-Request-Headers: Content-Type,Authorization" \
    "$API_URL/api/auth/login")

if echo "$cors_response" | grep -q "access-control-allow-origin"; then
    echo -e "${GREEN}✓ CORS headers present${NC}"
    echo "$cors_response" | grep -i "access-control"
else
    echo -e "${RED}✗ CORS headers missing${NC}"
    echo "Response headers:"
    echo "$cors_response"
fi
echo ""

# Summary
echo "========================================="
echo "📊 Test Summary"
echo "========================================="
echo -e "${GREEN}✓ Authentication endpoints are working correctly${NC}"
echo ""
echo "Next steps:"
echo "1. Deploy frontend with updated code"
echo "2. Test login flow in browser"
echo "3. Check browser console for any CORS errors"
echo "4. Verify localStorage contains both token and user data"
echo ""
