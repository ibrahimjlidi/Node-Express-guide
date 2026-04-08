'use client';

import React, { useState } from 'react';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { atomOneDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import { Copy, Check } from 'lucide-react';

/**
 * CodeBlock Component
 * Displays code snippets with syntax highlighting and copy functionality
 * Features:
 * - Syntax highlighting for multiple languages
 * - Copy-to-clipboard button
 * - Smooth copy confirmation feedback
 * - Responsive design
 */
interface CodeBlockProps {
  code: string;
  language: string;
  title?: string;
}

export default function CodeBlock({
  code,
  language,
  title,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  return (
    <div className="my-6 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-800 bg-slate-950">
      {/* Code Block Header */}
      {title && (
        <div className="bg-slate-900 px-4 py-2 flex items-center justify-between border-b border-slate-800">
          <span className="text-sm font-mono text-slate-400">{title}</span>
          <span className="text-xs text-slate-500">{language}</span>
        </div>
      )}

      {/* Code Container */}
      <div className="relative">
        <SyntaxHighlighter
          language={language}
          style={atomOneDark}
          className="!m-0 !bg-slate-950 text-sm"
          customStyle={{
            padding: '1rem',
          }}
          wrapLongLines
        >
          {code}
        </SyntaxHighlighter>

        {/* Copy Button */}
        <button
          onClick={handleCopy}
          className="absolute top-3 right-3 p-2 bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors group"
          title="Copy code"
        >
          {copied ? (
            <Check size={18} className="text-green-400" />
          ) : (
            <Copy
              size={18}
              className="text-slate-400 group-hover:text-slate-300"
            />
          )}
        </button>
      </div>

      {/* Feedback Message */}
      {copied && (
        <div className="px-4 py-2 bg-green-900/20 border-t border-slate-800 text-sm text-green-400">
          Code copied to clipboard!
        </div>
      )}
    </div>
  );
}
