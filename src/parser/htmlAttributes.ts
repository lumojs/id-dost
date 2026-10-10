import { Parser } from 'htmlparser2';

export interface HtmlIdAttribute {
  name: string;
  value: string;
  tagName: string;
  attributeStart: number;
  attributeEnd: number;
  valueStart: number;
  valueEnd: number;
  quote: string | null;
}

/** Parse attributes with a real HTML tokenizer, preserving source offsets and duplicate attributes. */
export function collectIdAttributes(source: string): HtmlIdAttribute[] {
  const found: HtmlIdAttribute[] = [];
  let tagName = '';
  let tagStart = -1;
  const parser = new Parser({
    onopentagname(name) { tagName = name; tagStart = parser.startIndex; },
    onattribute(name, value, quote) {
      if (name.toLowerCase() !== 'id') return;
      const start = parser.startIndex;
      const end = parser.endIndex + 1;
      if (start < 0 || end <= start) return;
      const raw = source.slice(start, end);
      const eq = raw.indexOf('=');
      if (eq < 0) {
        found.push({ name, value: value ?? '', tagName: `${tagName}#${tagStart}`, attributeStart: start, attributeEnd: end, valueStart: end, valueEnd: end, quote: null });
        return;
      }
      let cursor = eq + 1;
      while (/\s/.test(raw[cursor] ?? '')) cursor++;
      let valueStart = start + cursor;
      let valueEnd = valueStart;
      if (raw[cursor] === '"' || raw[cursor] === "'") {
        const q = raw[cursor];
        valueStart++;
        const closing = raw.indexOf(q, cursor + 1);
        valueEnd = start + (closing < 0 ? raw.length : closing);
      } else {
        while (cursor < raw.length && !/[\s>]/.test(raw[cursor])) cursor++;
        valueEnd = start + cursor;
      }
      found.push({ name, value: value ?? '', tagName: `${tagName}#${tagStart}`, attributeStart: start, attributeEnd: end, valueStart, valueEnd, quote: quote ?? null });
    }
  }, { decodeEntities: true, recognizeSelfClosing: true });
  parser.write(source);
  parser.end();
  return found;
}
