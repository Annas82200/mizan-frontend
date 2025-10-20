#!/usr/bin/env node

const https = require('https');

// Test production API endpoints to verify our fixes
const API_BASE = 'https://mizan-backend-production.up.railway.app';

// Create a fake JWT token for testing (superadmin role)
const testToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAiLCJlbWFpbCI6ImFkbWluQGV4YW1wbGUuY29tIiwicm9sZSI6InN1cGVyYWRtaW4iLCJ0ZW5hbnRJZCI6InRlbmFudDEiLCJpYXQiOjE3MjgzNTk0NzAsImV4cCI6OTk5OTk5OTk5OX0._XvOhCFmGXkf12pQU-qSHKNmquW6T0OTiN7r0tDAB-E';

function testEndpoint(path, description) {
  return new Promise((resolve) => {
    const url = `${API_BASE}${path}`;
    console.log(`\nTesting: ${description}`);
    console.log(`URL: ${url}`);

    https.get(url, {
      headers: {
        'Authorization': `Bearer ${testToken}`,
        'Accept': 'application/json'
      }
    }, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        console.log(`Status: ${res.statusCode}`);

        try {
          const json = JSON.parse(data);

          // Check specific fields based on endpoint
          if (path.includes('activity')) {
            const hasValidTenantId = json[0] && typeof json[0].tenantId === 'number';
            console.log(`✅ Activity endpoint - tenantId is number: ${hasValidTenantId}`);
            if (!hasValidTenantId && json[0]) {
              console.log(`❌ tenantId value: ${json[0].tenantId} (type: ${typeof json[0].tenantId})`);
            }
          }

          if (path.includes('tenants') && !path.includes('/')) {
            const hasValidDomain = json.tenants && json.tenants[0] && json.tenants[0].domain && json.tenants[0].domain.length > 0;
            console.log(`✅ Tenants endpoint - domain not empty: ${hasValidDomain}`);
            if (!hasValidDomain && json.tenants && json.tenants[0]) {
              console.log(`❌ domain value: "${json.tenants[0].domain}"`);
            }
          }

          if (path.includes('analytics/agents')) {
            const hasRequiredFields = json.totalAnalyses !== undefined &&
                                    json.structureAnalyses !== undefined &&
                                    json.successRate !== undefined;
            console.log(`✅ Agent stats has required fields: ${hasRequiredFields}`);
            if (!hasRequiredFields) {
              console.log(`❌ Missing fields - totalAnalyses: ${json.totalAnalyses}, structureAnalyses: ${json.structureAnalyses}, successRate: ${json.successRate}`);
            }
          }

          if (path.includes('analytics/usage')) {
            const hasRequiredFields = json.totalApiCalls !== undefined &&
                                    json.activeUsers !== undefined &&
                                    json.dailyStats !== undefined;
            console.log(`✅ Usage stats has required fields: ${hasRequiredFields}`);
            if (!hasRequiredFields) {
              console.log(`❌ Missing fields - totalApiCalls: ${json.totalApiCalls}, activeUsers: ${json.activeUsers}, dailyStats: ${json.dailyStats}`);
            }
          }

          if (path.includes('analytics/api')) {
            const hasRequiredFields = json.totalRequests !== undefined &&
                                    json.averageResponseTime !== undefined &&
                                    json.endpointStats !== undefined;
            console.log(`✅ API stats has required fields: ${hasRequiredFields}`);
            if (!hasRequiredFields) {
              console.log(`❌ Missing fields - totalRequests: ${json.totalRequests}, averageResponseTime: ${json.averageResponseTime}, endpointStats: ${json.endpointStats}`);
            }
          }

          if (path.includes('analytics/performance')) {
            const hasRequiredFields = json.cpuUsage !== undefined &&
                                    json.memoryUsage !== undefined &&
                                    json.uptime !== undefined;
            console.log(`✅ Performance metrics has required fields: ${hasRequiredFields}`);
            if (!hasRequiredFields) {
              console.log(`❌ Missing fields - cpuUsage: ${json.cpuUsage}, memoryUsage: ${json.memoryUsage}, uptime: ${json.uptime}`);
            }
          }

        } catch (e) {
          console.log(`Response: ${data.substring(0, 200)}`);
        }
        resolve();
      });
    }).on('error', (err) => {
      console.log(`Error: ${err.message}`);
      resolve();
    });
  });
}

async function runTests() {
  console.log('========================================');
  console.log('Testing Production API Endpoints');
  console.log('========================================');

  // Test each problematic endpoint
  await testEndpoint('/api/superadmin/activity', 'Activity Endpoint');
  await testEndpoint('/api/superadmin/tenants', 'Tenants Endpoint');
  await testEndpoint('/api/superadmin/analytics/agents', 'Agent Stats Endpoint');
  await testEndpoint('/api/superadmin/analytics/usage', 'Usage Stats Endpoint');
  await testEndpoint('/api/superadmin/analytics/api', 'API Stats Endpoint');
  await testEndpoint('/api/superadmin/analytics/performance', 'Performance Metrics Endpoint');

  console.log('\n========================================');
  console.log('Test Complete');
  console.log('========================================');
}

runTests();