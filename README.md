# Groq Summary Chrome Extension

## Overview
The Groq Chrome Extension is a powerful tool designed to enhance your web browsing experience by summarizing content from websites using Groq. With this extension, you can:

- **Summarize Entire Web Pages**: Quickly get the gist of any website's content.
- **Summarize Selected Text**: Highlight specific text on a webpage, and the extension will summarize just that portion.
- **Chat with Content**: Ask questions or engage in a conversation with the content of the page or the selected text to deepen your understanding.

### Intended Audience
This extension is ideal for users who need to quickly comprehend or interact with online content, such as researchers, students, or professionals.
The Groq Chrome Extension is a powerful tool designed to enhance your web browsing experience by summarizing content from websites using Groq. With this extension, you can:

- **Summarize Entire Web Pages**: Quickly get the gist of any website's content.
- **Summarize Selected Text**: Highlight specific text on a webpage, and the extension will summarize just that portion.
- **Chat with Content**: Ask questions or engage in a conversation with the content of the page or the selected text to deepen your understanding.

## Setup Requirements
To use this extension, you must provide a Groq API key. The key will be securely stored in the extension's local storage for authentication purposes.

## Key Features
- **React-Based**: Built using the React library for a modern and efficient user interface.
- **ShadCN Components**: Leverages ShadCN for consistent and customizable component styling.
- **Dark Mode Support**: Includes dark mode for a better user experience in low-light environments.
- **Hot Reload**: Supports hot reloading during development when running `pnpm dev` for seamless coding.

## Development Setup
To set up and run the extension locally for development:

1. Install dependencies and start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

## Building for Production
To build the extension for production:

1. Run the build command:
   ```bash
   pnpm build
   ```

2. The extension popup will be available at:
   ```
   dist/index.html
   ```
