import { HtmlIdAttribute } from '../parser/htmlAttributes';

export type IssueKind = 'duplicate' | 'whitespace' | 'empty' | 'duplicate-attribute';
export interface ValidationIssue {
  kind: IssueKind;
  message: string;
  start: number;
  end: number;
  idValue: string;
  originalStart?: number;
}
export interface ValidationOptions {
  duplicates: boolean;
  whitespace: boolean;
  empty: boolean;
  duplicateAttributes: boolean;
}
const defaults: ValidationOptions = { duplicates: true, whitespace: true, empty: true, duplicateAttributes: true };

export function validateIds(attributes: HtmlIdAttribute[], options: Partial<ValidationOptions> = {}): ValidationIssue[] {
  const opts = { ...defaults, ...options };
  const issues: ValidationIssue[] = [];
  const firstById = new Map<string, HtmlIdAttribute>();
  const perElement = new Map<string, HtmlIdAttribute[]>();
  for (const attr of attributes) {
    const elementKey = attr.tagName;
    const siblings = perElement.get(elementKey) ?? [];
    siblings.push(attr); perElement.set(elementKey, siblings);
    if (opts.empty && attr.value.length === 0) issues.push({ kind: 'empty', message: 'ID toh de bhai! 😭 Khali dabba kisko dikha raha hai?', start: attr.valueStart, end: Math.max(attr.valueEnd, attr.valueStart + 1), idValue: attr.value });
    if (opts.whitespace && /\s/.test(attr.value)) issues.push({ kind: 'whitespace', message: 'Arre bhai! 😂 ID hai, WhatsApp group ka naam nahi. Spaces hata!', start: attr.valueStart, end: attr.valueEnd, idValue: attr.value });
    if (opts.duplicates && attr.value.length > 0 && !/\s/.test(attr.value)) {
      const original = firstById.get(attr.value);
      if (original) issues.push({ kind: 'duplicate', message: 'Bhai, ye ID pehle se committed hai! 😂 Nayi ID bana le.', start: attr.valueStart, end: attr.valueEnd, idValue: attr.value, originalStart: original.valueStart });
      else firstById.set(attr.value, attr);
    }
  }
  if (opts.duplicateAttributes) {
    for (const attrs of perElement.values()) {
      if (attrs.length < 2) continue;
      for (const duplicate of attrs.slice(1)) issues.push({ kind: 'duplicate-attribute', message: 'Ek element, ek ID bhai! 😂 Itne naam toh Bollywood stars ke bhi nahi hote.', start: duplicate.attributeStart, end: duplicate.attributeEnd, idValue: duplicate.value });
    }
  }
  return issues.sort((a, b) => a.start - b.start || a.end - b.end);
}
