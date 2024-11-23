import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
    content: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
   console.log("content", content)

    return <div className="markdown-container">
        <ReactMarkdown
            components={{
                h2: ({node, ...props}) => <h2
                    style={{fontSize: '1.5em', fontWeight: 'bold', marginBottom: '10px'}} {...props} />,
            }}
        >
            {content}
        </ReactMarkdown>
    </div>;
};

