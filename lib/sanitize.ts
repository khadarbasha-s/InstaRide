// Lightweight server-safe HTML sanitization.
// Strips <script> blocks, on* event handlers, javascript: URLs, and a few other
// XSS-prone patterns. For v1 (admin-only blog editor), this is sufficient.
// Swap for `sanitize-html` once admin TipTap editor is wired up.

const SCRIPT_RE = /<script[\s\S]*?<\/script>/gi;
const STYLE_RE = /<style[\s\S]*?<\/style>/gi;
const ON_ATTR_RE = /\son[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi;
const JS_URL_RE = /(href|src|action)\s*=\s*("|')\s*javascript:[^"']*\2/gi;
const IFRAME_RE = /<iframe[\s\S]*?<\/iframe>/gi;
const OBJECT_RE = /<object[\s\S]*?<\/object>/gi;
const EMBED_RE = /<embed[\s\S]*?>/gi;

export function sanitizeHtml(input: string): string {
  if (!input) return "";
  let s = input;
  s = s.replace(SCRIPT_RE, "");
  s = s.replace(STYLE_RE, "");
  s = s.replace(ON_ATTR_RE, "");
  s = s.replace(JS_URL_RE, '$1="#"');
  s = s.replace(IFRAME_RE, "");
  s = s.replace(OBJECT_RE, "");
  s = s.replace(EMBED_RE, "");
  return s;
}
