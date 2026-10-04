import React from "react";

const URL_PATTERN = /(https:\/\/\S+|www\.\S+)/g;

// Turns bare URLs (https://... or www...) inside plain text into clickable
// links, since event descriptions come from veganactivists.nl as plain text.
export function linkify(text: string): React.ReactNode {
  return text.split(URL_PATTERN).map((part, idx) => {
    if (!part.startsWith("https://") && !part.startsWith("www.")) return part;

    const trailing = part.match(/[.,;:!?)\]]+$/)?.[0] || "";
    const url = trailing ? part.slice(0, -trailing.length) : part;
    const href = url.startsWith("www.") ? `https://${url}` : url;

    return (
      <React.Fragment key={idx}>
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="underline break-all"
        >
          {url}
        </a>
        {trailing}
      </React.Fragment>
    );
  });
}

// Source descriptions use a variable number of blank lines between
// paragraphs (sometimes one, sometimes two or three) - normalize that to one
// paragraph break each so spacing stays consistent instead of ballooning.
export function Description({ text }: { text: string }) {
  const paragraphs = text.trim().split(/\n{2,}/);

  return (
    <div className="space-y-2">
      {paragraphs.map((paragraph, idx) => (
        <p key={idx} className="whitespace-pre-line">
          {linkify(paragraph)}
        </p>
      ))}
    </div>
  );
}
