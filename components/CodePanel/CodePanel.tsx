import React, { useState, useEffect, useRef } from 'react';
import hljs from 'highlight.js';
import 'highlight.js/styles/github.css'; // Use your preferred highlight.js style
import { FaCopy } from 'react-icons/fa';

interface CodePanelProps {
  code: string;
  language?: string;
  title?: string;
}

const CodePanel: React.FC<CodePanelProps> = ({ code, language = 'javascript', title }) => {
  const codeRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (codeRef.current) {
      hljs.highlightBlock(codeRef.current);
    }
  }, [code]);

  const copyToClipboard = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(codeRef.current.innerText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="code-panel">
      {title && (
        <div className="code-panel-title">
          {title}
          <FaCopy className="copy-icon" onClick={copyToClipboard} />
          {copied && <span className="copied-msg">Copied!</span>}
        </div>
      )}
      <pre>
        <code ref={codeRef} className={language}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodePanel;
