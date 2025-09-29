# MIZAN PLATFORM - COMPLETE TESTING GUIDE

## 🎯 OVERVIEW
This guide shows you how to test all the services we developed from the backend, including the complete flow and analysis results.

## 🚀 BACKEND STATUS
- **Backend URL**: https://mizan-backend-production.up.railway.app
- **Status**: ✅ Healthy and operational
- **Available Services**: All 5 analysis types + client management

---

## 📋 TESTING METHODS

### **Method 1: Frontend Testing (Recommended)**
Test through the actual frontend interface at https://www.mizan.work

### **Method 2: API Testing with curl**
Test individual endpoints directly

### **Method 3: Postman/Insomnia**
Import the API collection for GUI testing

### **Method 4: Browser Testing**
Test through browser developer tools

---

## 🎯 COMPLETE FLOW TESTING

### **Step 1: Test Backend Health**
```bash
curl -s https://mizan-backend-production.up.railway.app/health | jq .
```

### **Step 2: Create a Test Client**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/superadmin/clients \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "name": "Test Company Inc",
    "email": "test@testcompany.com",
    "plan": "premium",
    "employees": 50,
    "industry": "Technology",
    "strategy": "Build innovative solutions and scale globally",
    "vision": "To be the leading innovator in our industry",
    "mission": "Empower businesses with cutting-edge technology",
    "values": ["Innovation", "Collaboration", "Excellence", "Integrity"]
  }'
```

### **Step 3: List All Clients**
```bash
curl -s https://mizan-backend-production.up.railway.app/api/superadmin/clients \
  -H "Origin: https://www.mizan.work" | jq .
```

### **Step 4: Run Analysis for Client**
```bash
# Replace CLIENT_ID with actual client ID from step 2
curl -X POST https://mizan-backend-production.up.railway.app/api/superadmin/clients/CLIENT_ID/analyze \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "analysisType": "culture",
    "clientData": {
      "name": "Test Company Inc",
      "industry": "Technology",
      "employees": 50,
      "strategy": "Build innovative solutions and scale globally",
      "vision": "To be the leading innovator in our industry",
      "mission": "Empower businesses with cutting-edge technology",
      "values": ["Innovation", "Collaboration", "Excellence", "Integrity"]
    }
  }'
```

### **Step 5: Send Survey**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/superadmin/clients/CLIENT_ID/surveys \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "type": "email",
    "serviceType": "culture",
    "clientName": "Test Company Inc",
    "clientEmail": "test@testcompany.com"
  }'
```

---

## 🔬 INDIVIDUAL SERVICE TESTING

### **1. Culture Analysis**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/entry/analyze-culture \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "orgName": "Test Company Inc",
    "industry": "Technology",
    "strategy": "Build innovative solutions and scale globally",
    "vision": "To be the leading innovator in our industry",
    "mission": "Empower businesses with cutting-edge technology",
    "values": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "departments": [
      {"id": "dept1", "name": "Engineering", "headCount": 20, "manager": "Engineering Manager"},
      {"id": "dept2", "name": "Sales", "headCount": 15, "manager": "Sales Manager"},
      {"id": "dept3", "name": "Operations", "headCount": 15, "manager": "Operations Manager"}
    ],
    "roles": [
      {"id": "role1", "title": "Senior Engineer", "department": "dept1", "level": 3},
      {"id": "role2", "title": "Sales Representative", "department": "dept2", "level": 2},
      {"id": "role3", "title": "Operations Specialist", "department": "dept3", "level": 2}
    ],
    "companyValues": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "companyVision": "To be the leading innovator in our industry",
    "companyMission": "Empower businesses with cutting-edge technology",
    "companyStrategy": "Build innovative solutions and scale globally",
    "employeeResponses": [
      {"employeeId": "emp1", "values": ["Innovation", "Excellence"], "engagement": 8, "satisfaction": 7},
      {"employeeId": "emp2", "values": ["Collaboration", "Integrity"], "engagement": 9, "satisfaction": 8}
    ]
  }'
```

### **2. Structure Analysis**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/entry/analyze-org \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "orgName": "Test Company Inc",
    "industry": "Technology",
    "strategy": "Build innovative solutions and scale globally",
    "vision": "To be the leading innovator in our industry",
    "mission": "Empower businesses with cutting-edge technology",
    "values": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "departments": [
      {"id": "dept1", "name": "Engineering", "headCount": 20, "manager": "Engineering Manager"},
      {"id": "dept2", "name": "Sales", "headCount": 15, "manager": "Sales Manager"},
      {"id": "dept3", "name": "Operations", "headCount": 15, "manager": "Operations Manager"}
    ],
    "roles": [
      {"id": "role1", "title": "Senior Engineer", "department": "dept1", "level": 3},
      {"id": "role2", "title": "Sales Representative", "department": "dept2", "level": 2},
      {"id": "role3", "title": "Operations Specialist", "department": "dept3", "level": 2}
    ]
  }'
```

### **3. Skills Analysis**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/entry/analyze-skills \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "orgName": "Test Company Inc",
    "industry": "Technology",
    "strategy": "Build innovative solutions and scale globally",
    "vision": "To be the leading innovator in our industry",
    "mission": "Empower businesses with cutting-edge technology",
    "values": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "departments": [
      {"id": "dept1", "name": "Engineering", "headCount": 20, "manager": "Engineering Manager"},
      {"id": "dept2", "name": "Sales", "headCount": 15, "manager": "Sales Manager"},
      {"id": "dept3", "name": "Operations", "headCount": 15, "manager": "Operations Manager"}
    ],
    "roles": [
      {"id": "role1", "title": "Senior Engineer", "department": "dept1", "level": 3},
      {"id": "role2", "title": "Sales Representative", "department": "dept2", "level": 2},
      {"id": "role3", "title": "Operations Specialist", "department": "dept3", "level": 2}
    ],
    "employeeProfiles": [
      {"id": "emp1", "name": "John Doe", "role": "Senior Engineer", "skills": [{"name": "JavaScript", "level": "expert"}, {"name": "React", "level": "advanced"}]},
      {"id": "emp2", "name": "Jane Smith", "role": "Sales Representative", "skills": [{"name": "Sales", "level": "expert"}, {"name": "CRM", "level": "advanced"}]}
    ]
  }'
```

### **4. Engagement Analysis**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/entry/analyze-engagement \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "orgName": "Test Company Inc",
    "industry": "Technology",
    "strategy": "Build innovative solutions and scale globally",
    "vision": "To be the leading innovator in our industry",
    "mission": "Empower businesses with cutting-edge technology",
    "values": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "departments": [
      {"id": "dept1", "name": "Engineering", "headCount": 20, "manager": "Engineering Manager"},
      {"id": "dept2", "name": "Sales", "headCount": 15, "manager": "Sales Manager"},
      {"id": "dept3", "name": "Operations", "headCount": 15, "manager": "Operations Manager"}
    ],
    "roles": [
      {"id": "role1", "title": "Senior Engineer", "department": "dept1", "level": 3},
      {"id": "role2", "title": "Sales Representative", "department": "dept2", "level": 2},
      {"id": "role3", "title": "Operations Specialist", "department": "dept3", "level": 2}
    ],
    "companyVision": "To be the leading innovator in our industry",
    "companyMission": "Empower businesses with cutting-edge technology",
    "companyStrategy": "Build innovative solutions and scale globally",
    "companyValues": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "employeeResponses": [
      {"employeeId": "emp1", "values": ["Innovation", "Excellence"], "engagement": 8, "satisfaction": 7},
      {"employeeId": "emp2", "values": ["Collaboration", "Integrity"], "engagement": 9, "satisfaction": 8}
    ]
  }'
```

### **5. Recognition Analysis**
```bash
curl -X POST https://mizan-backend-production.up.railway.app/api/entry/analyze-recognition \
  -H "Content-Type: application/json" \
  -H "Origin: https://www.mizan.work" \
  -d '{
    "orgName": "Test Company Inc",
    "industry": "Technology",
    "strategy": "Build innovative solutions and scale globally",
    "vision": "To be the leading innovator in our industry",
    "mission": "Empower businesses with cutting-edge technology",
    "values": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "departments": [
      {"id": "dept1", "name": "Engineering", "headCount": 20, "manager": "Engineering Manager"},
      {"id": "dept2", "name": "Sales", "headCount": 15, "manager": "Sales Manager"},
      {"id": "dept3", "name": "Operations", "headCount": 15, "manager": "Operations Manager"}
    ],
    "roles": [
      {"id": "role1", "title": "Senior Engineer", "department": "dept1", "level": 3},
      {"id": "role2", "title": "Sales Representative", "department": "dept2", "level": 2},
      {"id": "role3", "title": "Operations Specialist", "department": "dept3", "level": 2}
    ],
    "companyVision": "To be the leading innovator in our industry",
    "companyMission": "Empower businesses with cutting-edge technology",
    "companyStrategy": "Build innovative solutions and scale globally",
    "companyValues": ["Innovation", "Collaboration", "Excellence", "Integrity"],
    "employeeResponses": [
      {"employeeId": "emp1", "values": ["Innovation", "Excellence"], "engagement": 8, "satisfaction": 7, "recognition": 7},
      {"employeeId": "emp2", "values": ["Collaboration", "Integrity"], "engagement": 9, "satisfaction": 8, "recognition": 8}
    ]
  }'
```

---

## 🌐 FRONTEND TESTING

### **1. Access the Platform**
- Go to: https://www.mizan.work
- Navigate to: `/superadmin` (if you have access)

### **2. Test Client Management**
1. Click "Add Client" button
2. Fill in client details
3. Submit the form
4. Verify client appears in the list

### **3. Test Individual Client Analysis**
1. Click on a client from the list
2. Go to "Analysis" tab
3. Click "Run Analysis" for different analysis types
4. Check the "Reports" tab for results

### **4. Test Survey System**
1. Go to individual client page
2. Navigate to "Services" tab (if available)
3. Click "Send Email Survey" or "Upload Employee CSV"
4. Verify the action completes successfully

---

## 🔍 EXPECTED RESULTS

### **Analysis Response Format**
Each analysis should return a JSON response with:
```json
{
  "success": true,
  "clientId": "client_id",
  "analysisType": "culture|structure|skills|engagement|recognition",
  "result": {
    "executiveSummary": "Analysis summary...",
    "keyFindings": ["Finding 1", "Finding 2"],
    "recommendations": ["Recommendation 1", "Recommendation 2"],
    "metrics": {
      "score": 85,
      "trend": "positive"
    }
  },
  "timestamp": "2025-09-29T20:42:14.734Z"
}
```

### **Survey Response Format**
```json
{
  "success": true,
  "message": "Survey sent successfully",
  "surveyData": {
    "clientId": "client_id",
    "clientName": "Test Company Inc",
    "clientEmail": "test@testcompany.com",
    "serviceType": "culture",
    "surveyUrl": "https://www.mizan.work/survey/client_id/culture",
    "sentAt": "2025-09-29T20:42:14.734Z",
    "status": "sent"
  }
}
```

---

## 🛠️ TROUBLESHOOTING

### **Common Issues**

1. **CORS Errors**
   - Ensure you're using the correct Origin header
   - Check that the backend CORS configuration includes your domain

2. **404 Errors**
   - Verify the endpoint URLs are correct
   - Check that the backend is running and healthy

3. **500 Errors**
   - Check the backend logs
   - Verify the request payload format

4. **Analysis Failures**
   - Ensure all required fields are provided
   - Check that the client data is valid

### **Debug Commands**
```bash
# Check backend health
curl -s https://mizan-backend-production.up.railway.app/health

# Check available endpoints
curl -s https://mizan-backend-production.up.railway.app/api/status

# Test CORS
curl -H "Origin: https://www.mizan.work" \
     -H "Access-Control-Request-Method: POST" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS \
     https://mizan-backend-production.up.railway.app/api/superadmin/clients
```

---

## 📊 TESTING CHECKLIST

- [ ] Backend health check passes
- [ ] Can create a new client
- [ ] Can list all clients
- [ ] Can run culture analysis
- [ ] Can run structure analysis
- [ ] Can run skills analysis
- [ ] Can run engagement analysis
- [ ] Can run recognition analysis
- [ ] Can send email surveys
- [ ] Can upload CSV files
- [ ] Analysis results are properly formatted
- [ ] Frontend can display results
- [ ] CORS is working correctly
- [ ] All endpoints respond with correct status codes

---

## 🎯 QUICK TEST SCRIPT

Save this as `test-mizan-services.sh` and run it:

```bash
#!/bin/bash

BASE_URL="https://mizan-backend-production.up.railway.app"
ORIGIN="https://www.mizan.work"

echo "🧪 Testing Mizan Platform Services"
echo "=================================="

# Test 1: Health Check
echo "1. Testing backend health..."
curl -s "$BASE_URL/health" | jq '.status'

# Test 2: Create Client
echo "2. Creating test client..."
CLIENT_RESPONSE=$(curl -s -X POST "$BASE_URL/api/superadmin/clients" \
  -H "Content-Type: application/json" \
  -H "Origin: $ORIGIN" \
  -d '{
    "name": "Test Company Inc",
    "email": "test@testcompany.com",
    "plan": "premium",
    "employees": 50,
    "industry": "Technology"
  }')

CLIENT_ID=$(echo $CLIENT_RESPONSE | jq -r '.client.id')
echo "Created client with ID: $CLIENT_ID"

# Test 3: Run Analysis
echo "3. Running culture analysis..."
curl -s -X POST "$BASE_URL/api/superadmin/clients/$CLIENT_ID/analyze" \
  -H "Content-Type: application/json" \
  -H "Origin: $ORIGIN" \
  -d '{
    "analysisType": "culture",
    "clientData": {
      "name": "Test Company Inc",
      "industry": "Technology",
      "employees": 50
    }
  }' | jq '.result.executiveSummary'

echo "✅ Testing complete!"
```

This comprehensive testing guide will help you verify all the services we developed and ensure the complete flow is working correctly!
