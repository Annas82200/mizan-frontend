#!/usr/bin/env node

/**
 * Simple MCP client to test the mizan-dev-mcp server
 *
 * This script:
 * 1. Spawns the MCP server as a child process
 * 2. Sends test requests via stdio
 * 3. Validates responses
 */

const { spawn } = require('child_process');
const path = require('path');

class MCPTestClient {
  constructor() {
    this.serverProcess = null;
    this.requestId = 0;
  }

  start() {
    return new Promise((resolve, reject) => {
      console.log('🚀 Starting MCP server...\n');

      const serverPath = path.join(__dirname, 'dist', 'index.js');
      this.serverProcess = spawn('node', [serverPath], {
        stdio: ['pipe', 'pipe', 'pipe'],
        env: {
          ...process.env,
          NODE_ENV: 'development',
          MIZAN_REPO_ROOT: path.join(__dirname, '..', '..'),
          ALLOWED_COMMANDS: 'git status,git diff,npm test,npm run lint',
          LOG_LEVEL: 'info',
        },
      });

      let buffer = '';

      this.serverProcess.stdout.on('data', (data) => {
        buffer += data.toString();
        const lines = buffer.split('\n');
        buffer = lines.pop() || '';

        lines.forEach((line) => {
          if (line.trim()) {
            try {
              const message = JSON.parse(line);
              this.handleMessage(message);
            } catch (e) {
              console.log('📝 Server output:', line);
            }
          }
        });
      });

      this.serverProcess.stderr.on('data', (data) => {
        console.log('⚠️  Server stderr:', data.toString());
      });

      this.serverProcess.on('error', (error) => {
        reject(error);
      });

      this.serverProcess.on('exit', (code) => {
        if (code !== 0 && code !== null) {
          reject(new Error(`Server exited with code ${code}`));
        }
      });

      // Give server time to start
      setTimeout(() => {
        console.log('✅ Server started successfully\n');
        resolve();
      }, 1000);
    });
  }

  sendRequest(method, params = {}) {
    const id = ++this.requestId;
    const request = {
      jsonrpc: '2.0',
      id,
      method,
      params,
    };

    console.log(`📤 Sending request: ${method}`);
    this.serverProcess.stdin.write(JSON.stringify(request) + '\n');

    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        reject(new Error('Request timeout'));
      }, 5000);

      this.pendingRequests = this.pendingRequests || new Map();
      this.pendingRequests.set(id, { resolve, reject, timeout });
    });
  }

  handleMessage(message) {
    if (message.id && this.pendingRequests?.has(message.id)) {
      const { resolve, reject, timeout } = this.pendingRequests.get(message.id);
      clearTimeout(timeout);
      this.pendingRequests.delete(message.id);

      if (message.error) {
        reject(new Error(message.error.message || 'Unknown error'));
      } else {
        resolve(message.result);
      }
    }
  }

  async runTests() {
    try {
      // Test 1: Initialize
      console.log('🧪 Test 1: Initialize connection');
      await this.sendRequest('initialize', {
        protocolVersion: '2024-11-05',
        capabilities: {},
        clientInfo: {
          name: 'test-client',
          version: '1.0.0',
        },
      });
      console.log('✅ Test 1 passed: Initialized successfully\n');

      // Test 2: List tools
      console.log('🧪 Test 2: List available tools');
      const toolsResponse = await this.sendRequest('tools/list');
      const tools = toolsResponse.tools || [];

      console.log(`✅ Test 2 passed: Found ${tools.length} tools`);
      tools.forEach((tool) => {
        console.log(`   - ${tool.name}: ${tool.description}`);
      });
      console.log('');

      // Test 3: Read this test file itself
      console.log('🧪 Test 3: Read file (test-client.js)');
      const readResponse = await this.sendRequest('tools/call', {
        name: 'fs_read_file',
        arguments: {
          path: 'mcp/mizan-dev-mcp/test-client.js',
          encoding: 'utf-8',
        },
      });

      const result = JSON.parse(readResponse.content[0].text);
      if (result.path && result.content && result.size) {
        console.log(`✅ Test 3 passed: Read file successfully (${result.size} bytes)\n`);
      } else {
        throw new Error('Invalid read response');
      }

      // Test 4: List directory
      console.log('🧪 Test 4: List directory (mcp/)');
      const listResponse = await this.sendRequest('tools/call', {
        name: 'fs_list_dir',
        arguments: {
          path: 'mcp',
        },
      });

      const listResult = JSON.parse(listResponse.content[0].text);
      console.log(`✅ Test 4 passed: Found ${listResult.entries?.length || 0} entries`);
      (listResult.entries || []).slice(0, 5).forEach((entry) => {
        console.log(`   - ${entry.name} (${entry.type})`);
      });
      console.log('');

      // Test 5: Search for TypeScript files
      console.log('🧪 Test 5: Search files (*.ts in mcp/mizan-dev-mcp)');
      const searchResponse = await this.sendRequest('tools/call', {
        name: 'fs_search',
        arguments: {
          pattern: '**/*.ts',
          paths: ['mcp/mizan-dev-mcp/src'],
          maxResults: 10,
        },
      });

      const searchResult = JSON.parse(searchResponse.content[0].text);
      console.log(`✅ Test 5 passed: Found ${searchResult.count} TypeScript files`);
      (searchResult.matches || []).slice(0, 5).forEach((match) => {
        console.log(`   - ${match}`);
      });
      console.log('');

      console.log('🎉 All tests passed!\n');
      return true;
    } catch (error) {
      console.error('❌ Test failed:', error.message);
      return false;
    }
  }

  stop() {
    if (this.serverProcess) {
      console.log('🛑 Stopping server...');
      this.serverProcess.kill();
    }
  }
}

// Run tests
async function main() {
  const client = new MCPTestClient();

  try {
    await client.start();
    const success = await client.runTests();
    client.stop();
    process.exit(success ? 0 : 1);
  } catch (error) {
    console.error('💥 Fatal error:', error);
    client.stop();
    process.exit(1);
  }
}

main();
