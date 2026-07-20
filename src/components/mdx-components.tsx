import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-12 font-display text-3xl leading-snug text-ink"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-8 font-display text-2xl leading-snug text-ink"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-5 font-sans text-base leading-relaxed text-body" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 font-sans text-base leading-relaxed text-body"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 font-sans text-base leading-relaxed text-body"
      {...props}
    />
  ),
  li: (props) => <li {...props} />,
  a: (props) => (
    <a className="text-primary underline underline-offset-2" {...props} />
  ),
  blockquote: (props) => (
    <blockquote
      className="mt-5 border-l-2 border-primary pl-4 font-sans italic text-body"
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
};
