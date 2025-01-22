import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
}) => {
  console.log('content', content);

  return (
    <div className='markdown-container'>
      <ReactMarkdown
        components={{
          h2: ({ node, ...props }) => (
            <h2
              style={{
                fontSize: '16px',
                fontWeight: 'bold',
                marginBottom: '10px',
              }}
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p
              style={{
                fontSize: '14px',
                fontWeight: 'normal',
                marginBottom: '10px',
              }}
              {...props}
            />
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
