#!/bin/bash
#
# MIZAN MOCK DATA DETECTOR
# This script checks for fake/mock data patterns that violate production standards
# Run: ./scripts/check-mock-data.sh
#

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "🔍 MIZAN MOCK DATA DETECTOR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""

cd "$(git rev-parse --show-toplevel)" || exit 1

VIOLATIONS=0

# Check 1: Mock data variable declarations
echo "🔎 Checking for mock data variables..."
MOCK_VARS=$(grep -rn "const mock\|let mock\|var mock\|const fake\|const dummy\|const sample" frontend/src/app/dashboard/ 2>/dev/null | grep -v ".test." | grep -v "__tests__" || true)
if [ -n "$MOCK_VARS" ]; then
    echo "❌ VIOLATION: Mock data variables found:"
    echo "$MOCK_VARS" | head -20
    VIOLATIONS=$((VIOLATIONS + $(echo "$MOCK_VARS" | wc -l)))
    echo ""
fi

# Check 2: setTimeout delays (simulating API)
echo "🔎 Checking for fake API delays..."
FAKE_DELAYS=$(grep -rn "setTimeout.*resolve.*[0-9]00\|setTimeout.*[0-9]00.*resolve" frontend/src/app/dashboard/ 2>/dev/null || true)
if [ -n "$FAKE_DELAYS" ]; then
    echo "❌ VIOLATION: Fake API delays found:"
    echo "$FAKE_DELAYS" | head -20
    VIOLATIONS=$((VIOLATIONS + $(echo "$FAKE_DELAYS" | wc -l)))
    echo ""
fi

# Check 3: Simulated/placeholder comments
echo "🔎 Checking for placeholder comments..."
PLACEHOLDER_COMMENTS=$(grep -rn "Simulated data\|simulated API\|placeholder\|in production this\|TODO.*API\|mock response" frontend/src/app/dashboard/ 2>/dev/null || true)
if [ -n "$PLACEHOLDER_COMMENTS" ]; then
    echo "❌ VIOLATION: Placeholder comments found:"
    echo "$PLACEHOLDER_COMMENTS" | head -20
    VIOLATIONS=$((VIOLATIONS + $(echo "$PLACEHOLDER_COMMENTS" | wc -l)))
    echo ""
fi

# Check 4: Missing apiClient imports in dashboard pages
echo "🔎 Checking for missing API client usage..."
MISSING_API=$(find frontend/src/app/dashboard -name "page.tsx" -exec grep -L "apiClient\|api-client" {} \; 2>/dev/null || true)
if [ -n "$MISSING_API" ]; then
    echo "⚠️  WARNING: Dashboard pages without apiClient import:"
    echo "$MISSING_API"
    echo ""
fi

# Check 5: Backend stub responses
echo "🔎 Checking for backend stub responses..."
STUB_RESPONSES=$(grep -rn "return.*\[\]\|return.*{.*success.*true.*}\|// placeholder\|// stub" backend/src/routes/ 2>/dev/null | grep -v ".test." || true)
if [ -n "$STUB_RESPONSES" ]; then
    echo "⚠️  WARNING: Potential stub responses in backend:"
    echo "$STUB_RESPONSES" | head -10
    echo ""
fi

echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
if [ $VIOLATIONS -gt 0 ]; then
    echo "❌ FAILED: $VIOLATIONS mock data violations found!"
    echo ""
    echo "These files contain FAKE implementations that must be fixed."
    echo "Replace all mock data with real API calls using apiClient."
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 1
else
    echo "✅ PASSED: No mock data violations detected!"
    echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
    exit 0
fi
