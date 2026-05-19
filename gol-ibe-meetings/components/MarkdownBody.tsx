"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import type { Components } from "react-markdown";

const components: Components = {
  img({ src, alt }) {
    return (
      <img
        src={src}
        alt={alt ?? ""}
        loading="lazy"
        style={{ maxWidth: "100%", height: "auto", borderRadius: 8, margin: "20px 0", display: "block" }}
      />
    );
  },
  iframe({ src, width, height, ...rest }) {
    return (
      <div className="video-wrap">
        <iframe src={src} width={width} height={height} allowFullScreen {...(rest as React.IframeHTMLAttributes<HTMLIFrameElement>)} />
      </div>
    );
  },
  video({ src, ...rest }) {
    return (
      <video
        src={src}
        controls
        style={{ maxWidth: "100%", borderRadius: 8, margin: "20px 0" }}
        {...(rest as React.VideoHTMLAttributes<HTMLVideoElement>)}
      />
    );
  },
};

export function MarkdownBody({ children }: { children: string }) {
  return (
    <article className="prose">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {children}
      </ReactMarkdown>
    </article>
  );
}
