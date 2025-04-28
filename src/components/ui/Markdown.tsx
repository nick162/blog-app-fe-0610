"use client";

import React, { FC } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import { Components } from "react-markdown"; // ⬅️ import Components type!

interface MarkdownProps {
  content: string;
}

const Markdown: FC<MarkdownProps> = ({ content }) => {
  const components: Components = {
    h1: ({ children }) => <h1 className="text-2xl font-bold">{children}</h1>,
    h2: ({ children }) => <h2 className="ext-xl font-semibold">{children}</h2>,
    h3: ({ children }) => <h3 className="text-lg font-medium">{children}</h3>,
    p: ({ children }) => <p className="text-base text-gray-700">{children}</p>,
  };

  return (
    <ReactMarkdown rehypePlugins={[rehypeRaw]} components={components}>
      {content}
    </ReactMarkdown>
  );
};

export default Markdown;
