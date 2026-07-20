import type { MDXComponents } from "mdx/types";
import type { ReactNode } from "react";
import { slugifyHeading } from "@/lib/papers";

function flattenText(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(flattenText).join("");
  if (typeof node === "object" && "props" in node) {
    const element = node as { props?: { children?: ReactNode } };
    return flattenText(element.props?.children);
  }
  return "";
}

export const mdxComponents: MDXComponents = {
  h2: (props) => {
    const text = flattenText(props.children);
    const id = props.id ?? (text ? slugifyHeading(text) : undefined);
    return (
      <h2
        {...props}
        id={id}
        className="mt-12 scroll-mt-28 font-serif text-3xl font-normal leading-snug text-ink"
      />
    );
  },
  h3: (props) => {
    const text = flattenText(props.children);
    const id = props.id ?? (text ? slugifyHeading(text) : undefined);
    return (
      <h3
        {...props}
        id={id}
        className="mt-8 scroll-mt-28 font-serif text-2xl font-normal leading-snug text-ink"
      />
    );
  },
  p: (props) => (
    <p
      className="mt-5 font-serif text-base leading-relaxed text-body"
      {...props}
    />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 font-serif text-base leading-relaxed text-body"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 font-serif text-base leading-relaxed text-body"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
  a: (props) => (
    <a className="text-primary underline underline-offset-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-5 border-l-2 border-primary pl-4 font-serif italic text-body"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-surface-card px-1.5 py-0.5 font-mono text-sm text-ink"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-5 overflow-x-auto rounded-lg bg-surface-dark p-5 font-mono text-sm text-on-dark"
      {...props}
    />
  ),
  img: (props) => (
    <span className="mt-6 block">
      {/* eslint-disable-next-line @next/next/no-img-element -- MDX image paths are user-provided, not statically analyzable */}
      <img
        {...props}
        alt={props.alt ?? ""}
        className="w-full rounded-lg border border-hairline"
      />
    </span>
  ),
  strong: (props) => (
    <strong className="font-semibold text-ink" {...props} />
  ),
};
