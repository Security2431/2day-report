import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  content: string;
}

const renderers = {
  a: ({ href, children }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  },
};

export const Markdown: React.FC<Props> = ({ content }) => {
  return (
    <ReactMarkdown
      className="prose prose-sm break-words dark:prose-invert"
      remarkPlugins={[remarkGfm]}
      components={renderers}
    >
      {content}
    </ReactMarkdown>
  );
};
