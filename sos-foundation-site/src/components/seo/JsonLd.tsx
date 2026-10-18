// Renders schema.org structured data as <script type="application/ld+json">.
// Server-rendered, so crawlers that don't run JavaScript still see it.
// "<" is escaped so content can never close the script tag early.

export default function JsonLd({ data }: { data: unknown }) {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.map((item, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item).replace(/</g, "\\u003c") }}
        />
      ))}
    </>
  );
}
