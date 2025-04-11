# ntfy-me-mcp
[![NPM Version](https://img.shields.io/npm/v/ntfy-me-mcp.svg)](https://www.npmjs.com/package/ntfy-me-mcp)
[![License](https://img.shields.io/badge/license-GPL--3.0-blue.svg)](LICENSE)

> A streamlined Model Context Protocol (MCP) server for sending notifications via ntfy service 📲


## Overview

ntfy-me-mcp provides AI assistants with the ability to send real-time notifications to your devices through the [ntfy](https://ntfy.sh) service. Get notified when your AI completes tasks, encounters errors, or reaches important milestones - all without constant monitoring.

## Table of Contents

- [Features](#features)
  - [Coming soon...](#coming-soon)
- [NPM/NPX - MCP Server Configuration](#npmnpx---mcp-server-configuration-recommended-method)
  - [Minimal Configuration](#minimal-configuration-for-public-topics-on-ntfysh)
  - [Full Configuration](#full-configuration-for-private-servers-or-protected-topics)
    - [Option 1: Direct Token](#option-1-direct-token-in-configuration-less-secure)
    - [Option 2: VS Code Inputs](#option-2-using-vs-code-inputs-for-secure-token-handling-recommended)
- [Docker](#docker)
  - [Using with MCP in Docker](#using-with-mcp-in-docker)
- [Installation](#installation)
  - [Option 1: Install Globally](#option-1-install-globally)
  - [Option 2: Run with npx](#option-2-run-with-npx)
  - [Option 3: Install Locally](#option-3-install-locally)
  - [Option 4: Build and Use Locally](#option-4-build-and-use-locally-with-node-command)
    - [Using locally built server with MCP](#using-locally-built-server-with-mcp)
- [Configuration](#configuration)
  - [Environment Variables](#environment-variables)
- [Usage](#usage)
  - [Authentication](#authentication)
  - [Setting Up the Notification Receiver](#setting-up-the-notification-receiver)
  - [Using with AI Assistants](#using-with-ai-assistants)
  - [Notification Parameters](#notification-parameters)
  - [Emoji Shortcodes](#emoji-shortcodes)
- [Example Notification](#example-notification)
- [Development](#development)
  - [Building from Source](#building-from-source)
- [License](#license)
- [Contributing](#contributing)

## Features

- 🚀 **Quick Setup**: Run with npx or docker!
- 🔔 **Real-time Notifications**: Get updates on your phone/desktop when tasks complete
- 🎨 **Rich Notifications**: Support for priorities, emoji tags, and detailed messages
- 🔒 **Secure**: Optional authentication with access tokens
- 🔑 **Input Masking**: Securely store your ntfy token in your vs config!
- 🌐 **Self-hosted Support**: Works with both ntfy.sh and self-hosted ntfy instances

### (Coming soon...)
- ⁄ **ntfy Actions**: Use ntfy actions to trigger tasks or commands on your device 
- 📨 **Email**:  Send notifications to email (requires ntfy email server configuration)

## NPM/NPX - MCP Server Configuration (Recommended Method)
- Requires npm / npx installed on your system.
- This method is recommended for most users as it provides a simple & lightweight method to set up the server.

For the easiest setup with MCP-compatible assistants, add this to your MCP configuration:

### Minimal configuration (for public topics on ntfy.sh)

```json
{
  "ntfy-me-mcp": {
    "command": "npx",
    "args": ["ntfy-me-mcp"],
    "env": {
      "NTFY_TOPIC": "your-topic-name"
    }
  }
}
```

### Full configuration (for private servers or protected topics)

#### Option 1: Direct token in configuration

```json
{
  "ntfy-me-mcp": {
    "command": "npx",
    "args": ["ntfy-me-mcp"],
    "env": {
      "NTFY_TOPIC": "your-topic-name",
      "NTFY_URL": "https://your-ntfy-server.com",
      "NTFY_TOKEN": "your-auth-token" // Use if using a protected topic/server
    }
  }
}
```

#### Option 2: Using VS Code inputs for secure token handling (recommended)

Add this to your VS Code settings.json file:

```json
"mcp": {
  "inputs": [
    { // Add this to your inputs array
      "type": "promptString",
      "id": "ntfy_token",
      "description": "Ntfy Token",
      "password": true
    }
  ],
  "servers": {
    // Other servers...
    "ntfy-me-mcp": {
      "command": "npx",
      "args": ["ntfy-me-mcp"],
      "env": {
        "NTFY_TOPIC": "your-topic-name",
        "NTFY_URL": "https://your-ntfy-server.com",
        "NTFY_TOKEN": "${input:ntfy_token}", // Use the input id variable for the token
        "PROTECTED_TOPIC": "true" // Prompts for token and masks it in your config
      }
    }
  }
}
```

With this setup, VS Code will prompt you for the token when starting the server and the token will be masked when entered.

## Docker

### Using with MCP in Docker
- Requires Docker installed on your system.
- This method is useful for running the server in a containerized environment.
- You can use the official Docker images available on Docker Hub or GitHub Container Registry.

Docker Images:
- `gitmotion/ntfy-me-mcp:latest` (Docker Hub)
- `ghcr.io/gitmotion/ntfy-me-mcp:latest` (GitHub Container Registry)

In your MCP configuration (e.g., VS Code settings.json):

```json
"mcp": {
  "servers": {
    "ntfy-mcp": {
      "command": "docker",
      "args": [
        "run",
        "-i",
        "--rm",
        "-e",
        "NTFY_TOPIC",
        "-e",
        "NTFY_URL",
        "-e",
        "NTFY_TOKEN",
        "-e",
        "PROTECTED_TOPIC",         
        "gitmotion/ntfy-me-mcp", // OR use ghcr.io/gitmotion/ntfy-me-mcp:latest
      ],
      "env": {
        "NTFY_TOPIC": "your-topic-name",
        "NTFY_URL": "https://your-ntfy-server.com",
        "NTFY_TOKEN": "${input:ntfy_token}",
        "PROTECTED_TOPIC": "true"
      }
    }
  }
}
```

## Installation

If you need to install and run the server directly (alternative to the MCP configuration above):

### Option 1: Install globally

```bash
npm install -g ntfy-me-mcp
```

### Option 2: Run with npx

```bash
npx ntfy-me-mcp
```

### Option 3: Install locally

```bash
# Clone the repository
git clone https://github.com/gitmotion/ntfy-me-mcp.git
cd ntfy-me-mcp

# Install dependencies
npm install

# Copy the example environment file and configure it
cp .env.example .env
# Edit .env with your preferred editor and update the variables
# nano .env  # or use your preferred editor

# Build the project
npm run build

# Start the server
npm start
```

### Option 4: Build and use locally with node command

If you're developing or customizing the server, you might want to run it directly with node:

```bash
# Clone the repository
git clone https://github.com/gitmotion/ntfy-me-mcp.git
cd ntfy-me-mcp

# Install dependencies
npm install

# Copy the example environment file and configure it
cp .env.example .env
# Edit the .env file to set your NTFY_TOPIC and other optional settings
# nano .env  # or use your preferred editor

# Build the project
npm run build

# Run using node directly
npm start
```

#### Using locally built server with MCP

When configuring your MCP to use a locally built version, specify the node command and path to the built index.js file:

```json
{
  "ntfy-me": {
    "command": "node",
    "args": ["/path/to/ntfy-mcp/build/index.js"],
    "env": {
      "NTFY_TOPIC": "your-topic-name",
      //"NTFY_URL": "https://your-ntfy-server.com", // Use if using a self-hosted server
      //"NTFY_TOKEN": "your-auth-token" // Use if using a protected topic/server
    }
  }
}
```

Remember to use the absolute path to your build/index.js file in the args array.

## Configuration

### Environment Variables

Create a `.env` file in your project directory by copying the provided example:

```bash
# Copy the example file
cp .env.example .env

# Edit the file with your preferred editor
nano .env  # or vim, code, etc.
```

Your `.env` file should contain these variables:

```
# Required
NTFY_TOPIC=your-topic-name

# Optional - Configure these if using a private/protected ntfy server
# NTFY_URL=https://ntfy.sh  # Default is ntfy.sh, change to your self-hosted ntfy server URL if needed
                            # Include port if needed, e.g., https://your-ntfy-server.com:8443
# NTFY_TOKEN=your-access-token  # Required for authentication with protected topics/servers
# PROTECTED_TOPIC=false  # Set to "true" if your topic requires authentication (helps prevent auth errors)
```

> **Note**: The `PROTECTED_TOPIC` flag helps the application determine whether authentication is required for your topic. When set to "true" and no token is provided, you'll be prompted to enter one. This prevents authentication failures with protected topics.

## Usage

### Authentication

This server supports both authenticated and unauthenticated ntfy endpoints:

- **Public Topics**: When using public topics on ntfy.sh or other public servers, no authentication is required.
- **Protected Topics**: For protected topics or private servers, you need to provide an access token.

If authentication is required but not provided, you'll receive a clear error message explaining how to add your token.

### Setting Up the Notification Receiver

1. Install the [ntfy app](https://ntfy.sh/app) on your device
2. Subscribe to your chosen topic (the same as your `NTFY_TOPIC` setting)

### Using with AI Assistants

When working with your AI assistant, include phrases like:

```
Write me a React component, and notify me when it's done.
```

Your AI will use the `ntfy_me` tool to send a notification upon task completion.

### Notification Parameters

The tool accepts these parameters:

| Parameter | Description | Required |
|-----------|-------------|----------|
| taskTitle | The notification title | Yes |
| taskSummary | The notification body | Yes |
| priority | Message priority: min, low, default, high, max | No |
| tags | Array of notification tags (supports emoji shortcodes) | No |

### Emoji Shortcodes

You can use emoji shortcodes in your tags for visual indicators:

- `warning` → ⚠️ 
- `check` → ✅
- `rocket` → 🚀
- `tada` → 🎉

See the [full list of supported emoji shortcodes](https://docs.ntfy.sh/emojis/).

## Example Notification

```javascript
{
  taskTitle: "Code Generation Complete",
  taskSummary: "Your React component has been created successfully with proper TypeScript typing.",
  priority: "high",
  tags: ["check", "code", "react"]
}
```

This will send a high-priority notification with a checkmark emoji.

## Development

### Building from Source

```bash
git clone https://github.com/gitmotion/ntfy-me-mcp.git
cd ntfy-me-mcp
npm install
npm run build
```

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Made with ❤️ by [gitmotion](https://github.com/gitmotion)
