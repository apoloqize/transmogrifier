import { convertJsonToYaml } from '../lib/utils/converter';

describe('JSON to YAML Converter', () => {
  test('should convert mcpServers format to LibreChat YAML (Context7 example)', () => {
    const json = JSON.stringify({
      mcpServers: {
        "context7": {
          "command": "npx",
          "args": ["-y", "@upstash/context7-mcp@latest"]
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('context7:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @upstash/context7-mcp@latest');
  });

  test('should convert servers format to LibreChat YAML (VS Code example)', () => {
    const json = JSON.stringify({
      servers: {
        "Context7": {
          "type": "stdio",
          "command": "npx",
          "args": ["-y", "@upstash/context7-mcp@latest"]
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('Context7:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @upstash/context7-mcp@latest');
  });

  test('should convert mcp.servers format to LibreChat YAML (with environment variables)', () => {
    const json = JSON.stringify({
      mcp: {
        servers: {
          "context7": {
            "command": "npx",
            "args": ["-y", "@upstash/context7-mcp@latest"],
            "env": {
              "DEFAULT_MINIMUM_TOKENS": "10000"
            }
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('context7:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @upstash/context7-mcp@latest');
    expect(result).toContain('DEFAULT_MINIMUM_TOKENS: 10000');
  });

  test('should handle Windows-style configuration with cmd /c', () => {
    const json = JSON.stringify({
      mcpServers: {
        "github.com/upstash/context7-mcp": {
          "command": "cmd",
          "args": [
            "/c",
            "npx",
            "-y",
            "@upstash/context7-mcp@latest"
          ]
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('github.com/upstash/context7-mcp:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: cmd');
    expect(result).toContain('- /c');
    expect(result).toContain('- npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @upstash/context7-mcp@latest');
  });

  test('should return empty string for invalid JSON', () => {
    const result = convertJsonToYaml('{invalid json}');
    expect(result).toBe('');
  });

  test('should return empty string when no server configuration is found', () => {
    const json = JSON.stringify({ something: 'else' });
    const result = convertJsonToYaml(json);
    expect(result).toBe('');
  });

  test('should convert GitHub MCP server with Docker configuration', () => {
    const json = JSON.stringify({
      mcpServers: {
        "github": {
          "command": "docker",
          "args": [
            "run",
            "-i",
            "--rm",
            "-e",
            "GITHUB_PERSONAL_ACCESS_TOKEN",
            "mcp/github"
          ],
          "env": {
            "GITHUB_PERSONAL_ACCESS_TOKEN": "gh_token_123"
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('github:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: docker');
    expect(result).toContain('- run');
    expect(result).toContain('- -i');
    expect(result).toContain('- --rm');
    expect(result).toContain('- -e');
    expect(result).toContain('- GITHUB_PERSONAL_ACCESS_TOKEN');
    expect(result).toContain('- mcp/github');
    expect(result).toContain('GITHUB_PERSONAL_ACCESS_TOKEN: gh_token_123');
  });

  test('should convert GitHub MCP server with NPX configuration', () => {
    const json = JSON.stringify({
      mcpServers: {
        "github": {
          "command": "npx",
          "args": [
            "-y",
            "@modelcontextprotocol/server-github"
          ],
          "env": {
            "GITHUB_PERSONAL_ACCESS_TOKEN": "gh_token_456"
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('github:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @modelcontextprotocol/server-github');
    expect(result).toContain('GITHUB_PERSONAL_ACCESS_TOKEN: gh_token_456');
  });

  test('should convert Tavily MCP server with NPX configuration for Claude Desktop', () => {
    const json = JSON.stringify({
      mcpServers: {
        "tavily-mcp": {
          "command": "npx",
          "args": [
            "-y", 
            "tavily-mcp@0.1.4"
          ],
          "env": {
            "TAVILY_API_KEY": "tavily_api_key_123"
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('tavily-mcp:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- tavily-mcp@0.1.4');
    expect(result).toContain('TAVILY_API_KEY: tavily_api_key_123');
  });

  test('should convert Tavily MCP server with NPX configuration for Cline', () => {
    const json = JSON.stringify({
      mcpServers: {
        "tavily-mcp": {
          "command": "npx",
          "args": [
            "-y", 
            "tavily-mcp@0.1.4"
          ],
          "env": {
            "TAVILY_API_KEY": "tavily_api_key_456"
          },
          "disabled": false,
          "autoApprove": []
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('tavily-mcp:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- tavily-mcp@0.1.4');
    expect(result).toContain('TAVILY_API_KEY: tavily_api_key_456');
    // Note: disabled and autoApprove are not part of the LibreChat format
  });

  test('should convert Tavily MCP server with Git installation configuration', () => {
    const json = JSON.stringify({
      mcpServers: {
        "tavily": {
          "command": "npx",
          "args": [
            "/path/to/tavily-mcp/build/index.js"
          ],
          "env": {
            "TAVILY_API_KEY": "tavily_api_key_789"
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('tavily:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain('- /path/to/tavily-mcp/build/index.js');
    expect(result).toContain('TAVILY_API_KEY: tavily_api_key_789');
  });

  test('should convert SSE type MCP server with headers', () => {
    const json = JSON.stringify({
      mcpServers: {
        "googlesheets": {
          "type": "sse",
          "url": "https://mcp.composio.dev/googlesheets/some-endpoint",
          "headers": {
            "X-User-ID": "{{LIBRECHAT_USER_ID}}",
            "X-API-Key": "${SOME_API_KEY}"
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('googlesheets:');
    expect(result).toContain('type: sse');
    expect(result).toContain('url: https://mcp.composio.dev/googlesheets/some-endpoint');
    expect(result).toContain('X-User-ID: {{LIBRECHAT_USER_ID}}');
    expect(result).toContain('X-API-Key: ${SOME_API_KEY}');
  });

  test('should convert WebSocket type MCP server', () => {
    const json = JSON.stringify({
      mcpServers: {
        "myWebSocketServer": {
          "url": "ws://localhost:8080"
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('myWebSocketServer:');
    expect(result).toContain('type: websocket');
    expect(result).toContain('url: ws://localhost:8080');
  });

  test('should convert MCP server with custom icon and chatMenu settings', () => {
    const json = JSON.stringify({
      mcpServers: {
        "filesystem": {
          "command": "npx",
          "args": [
            "-y",
            "@modelcontextprotocol/server-filesystem",
            "/home/user/LibreChat/"
          ],
          "iconPath": "/home/user/LibreChat/client/public/assets/logo.svg",
          "chatMenu": false
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('filesystem:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @modelcontextprotocol/server-filesystem');
    expect(result).toContain('- /home/user/LibreChat/');
    expect(result).toContain('iconPath: /home/user/LibreChat/client/public/assets/logo.svg');
    expect(result).toContain('chatMenu: false');
  });

  test('should convert MCP server with timeout and initTimeout settings', () => {
    const json = JSON.stringify({
      mcpServers: {
        "puppeteer": {
          "type": "stdio",
          "command": "npx",
          "args": [
            "-y",
            "@modelcontextprotocol/server-puppeteer"
          ],
          "timeout": 30000,
          "initTimeout": 10000
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('puppeteer:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @modelcontextprotocol/server-puppeteer');
    expect(result).toContain('timeout: 30000');
    expect(result).toContain('initTimeout: 10000');
  });

  test('should convert MCP server with stderr setting', () => {
    const json = JSON.stringify({
      mcpServers: {
        "customServer": {
          "command": "npx",
          "args": [
            "-y",
            "custom-mcp-server"
          ],
          "stderr": "inherit"
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('customServer:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- custom-mcp-server');
    expect(result).toContain('stderr: inherit');
  });

  test('should infer SSE type from HTTP URL when type is not specified', () => {
    const json = JSON.stringify({
      mcpServers: {
        "everything": {
          "url": "http://localhost:3001/sse"
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('everything:');
    expect(result).toContain('type: sse');
    expect(result).toContain('url: http://localhost:3001/sse');
  });

  test('should handle MCP server with environment variables', () => {
    const json = JSON.stringify({
      mcpServers: {
        "puppeteer": {
          "type": "stdio",
          "command": "npx",
          "args": [
            "-y",
            "@modelcontextprotocol/server-puppeteer"
          ],
          "env": {
            "NODE_ENV": "production",
            "DEBUG": "puppeteer:*"
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('puppeteer:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- @modelcontextprotocol/server-puppeteer');
    expect(result).toContain('NODE_ENV: production');
    expect(result).toContain('DEBUG: puppeteer:*');
  });

  test('should handle a comprehensive MCP server configuration with all options', () => {
    const json = JSON.stringify({
      mcpServers: {
        "comprehensive": {
          "type": "stdio",
          "command": "npx",
          "args": [
            "-y",
            "custom-mcp-server"
          ],
          "env": {
            "API_KEY": "secret-key",
            "DEBUG": "true"
          },
          "iconPath": "/path/to/icon.svg",
          "chatMenu": false,
          "timeout": 60000,
          "initTimeout": 15000,
          "stderr": "pipe"
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('comprehensive:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain("- '-y'");
    expect(result).toContain('- custom-mcp-server');
    expect(result).toContain('API_KEY: secret-key');
    expect(result).toContain('DEBUG: true');
    expect(result).toContain('iconPath: /path/to/icon.svg');
    expect(result).toContain('chatMenu: false');
    expect(result).toContain('timeout: 60000');
    expect(result).toContain('initTimeout: 15000');
    expect(result).toContain('stderr: pipe');
  });

  test('should handle complex headers with template variables', () => {
    const json = JSON.stringify({
      mcpServers: {
        "api-server": {
          "type": "sse",
          "url": "https://api.example.com/events",
          "headers": {
            "Authorization": "Bearer ${API_TOKEN}",
            "User-ID": "{{LIBRECHAT_USER_ID}}",
            "Custom-Header": "static-value",
            "Content-Type": "application/json"
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('api-server:');
    expect(result).toContain('type: sse');
    expect(result).toContain('url: https://api.example.com/events');
    expect(result).toContain('Authorization: Bearer ${API_TOKEN}');
    expect(result).toContain('User-ID: {{LIBRECHAT_USER_ID}}');
    expect(result).toContain('Custom-Header: static-value');
    expect(result).toContain('Content-Type: application/json');
  });

  test('should handle numeric and boolean values correctly', () => {
    const json = JSON.stringify({
      mcpServers: {
        "numeric-test": {
          "command": "npx",
          "args": ["-y", "test-server"],
          "timeout": 30000,
          "initTimeout": 5000,
          "env": {
            "PORT": 3000,
            "MAX_CONNECTIONS": 10,
            "ENABLE_LOGGING": true,
            "DEBUG_MODE": false
          }
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('numeric-test:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain('timeout: 30000');
    expect(result).toContain('initTimeout: 5000');
    expect(result).toContain('PORT: 3000');
    expect(result).toContain('MAX_CONNECTIONS: 10');
    expect(result).toContain('ENABLE_LOGGING: true');
    expect(result).toContain('DEBUG_MODE: false');
  });

  test('should handle multiple MCP servers in a single configuration', () => {
    const json = JSON.stringify({
      mcpServers: {
        "server1": {
          "command": "npx",
          "args": ["-y", "server-one"]
        },
        "server2": {
          "type": "sse",
          "url": "https://example.com/sse"
        },
        "server3": {
          "type": "websocket",
          "url": "ws://localhost:8080"
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('server1:');
    expect(result).toContain('server2:');
    expect(result).toContain('server3:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('type: sse');
    expect(result).toContain('type: websocket');
    expect(result).toContain('url: https://example.com/sse');
    expect(result).toContain('url: ws://localhost:8080');
  });

  test('should handle MCP server with numeric stderr value', () => {
    const json = JSON.stringify({
      mcpServers: {
        "numeric-stderr": {
          "command": "npx",
          "args": ["-y", "test-server"],
          "stderr": 1
        }
      }
    });
    
    const result = convertJsonToYaml(json);
    expect(result).toContain('mcpServers:');
    expect(result).toContain('numeric-stderr:');
    expect(result).toContain('type: stdio');
    expect(result).toContain('command: npx');
    expect(result).toContain('stderr: 1');
  });
});
