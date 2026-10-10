import * as vscode from 'vscode';
import { collectIdAttributes } from '../parser/htmlAttributes';
import { validationOptions, isEnabled } from '../config/settings';
import { validateIds, ValidationIssue } from '../validators/validateIds';
import { IssueNotifier } from '../notifications/notifier';
export class DiagnosticManager {
  readonly collection = vscode.languages.createDiagnosticCollection('id-dost');
  private readonly issueCache = new Map<string, ValidationIssue[]>();
  constructor(private readonly notifier: IssueNotifier) {}
  validate(document: vscode.TextDocument, notify = true): ValidationIssue[] {
    if (!isEnabled() || !this.isSupported(document)) { this.collection.delete(document.uri); this.issueCache.delete(document.uri.toString()); return []; }
    const issues = validateIds(collectIdAttributes(document.getText()), validationOptions());
    const diagnostics = issues.map(issue => {
      const start = document.positionAt(Math.max(0, Math.min(issue.start, document.getText().length)));
      const endOffset = Math.max(issue.start + 1, issue.end);
      const end = document.positionAt(Math.max(0, Math.min(endOffset, document.getText().length)));
      const message = issue.kind === 'duplicate' && issue.originalStart !== undefined
        ? `${issue.message} Original line ${document.positionAt(issue.originalStart).line + 1}, column ${document.positionAt(issue.originalStart).character + 1} par hai.`
        : issue.message;
      const d = new vscode.Diagnostic(new vscode.Range(start, end), message, vscode.DiagnosticSeverity.Error);
      d.source = 'ID Dost';
      d.code = issue.kind;
      if (issue.kind === 'duplicate' && issue.originalStart !== undefined) d.relatedInformation = [new vscode.DiagnosticRelatedInformation(new vscode.Location(document.uri, document.positionAt(issue.originalStart)), 'First occurrence of this ID')];
      return d;
    });
    this.collection.set(document.uri, diagnostics);
    this.issueCache.set(document.uri.toString(), issues);
    if (notify) this.notifier.notify(document, issues);
    return issues;
  }
  getIssues(uri: vscode.Uri): ValidationIssue[] { return this.issueCache.get(uri.toString()) ?? []; }
  clear(uri?: vscode.Uri): void { if (uri) { this.collection.delete(uri); this.issueCache.delete(uri.toString()); } else { this.collection.clear(); this.issueCache.clear(); } }
  dispose(): void { this.collection.dispose(); this.issueCache.clear(); }
  private isSupported(document: vscode.TextDocument): boolean { return ['html', 'javascriptreact', 'typescriptreact', 'javascript', 'typescript'].includes(document.languageId); }
}
