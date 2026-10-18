import { llmsFullTxt } from "@/lib/llms";

// Built once at build time, served as a static file.
export const dynamic = "force-static";

export function GET() {
  return new Response(llmsFullTxt(), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
