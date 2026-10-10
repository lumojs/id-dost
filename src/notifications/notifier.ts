import * as vscode from 'vscode';
import { ValidationIssue } from '../validators/validateIds';
import { notificationCooldown, notificationsEnabled } from '../config/settings';
export class IssueNotifier {
  private readonly lastShown = new Map<string, number>();
  private readonly seen = new Set<string>();
  notify(document: vscode.TextDocument, issues: ValidationIssue[]): void {
    if (!notificationsEnabled()) { this.seen.clear(); return; }
    const now = Date.now();
    for (const issue of issues) {
      const key = `${document.uri.toString()}|${issue.kind}|${issue.start}|${issue.idValue}`;
      if (this.seen.has(key)) continue;
      this.seen.add(key);
      if (now - (this.lastShown.get(issue.kind) ?? -Infinity) < notificationCooldown()) continue;
      this.lastShown.set(issue.kind, now);
      const action = issue.kind === 'duplicate' ? 'Go to Original' : undefined;
      const message = issue.message;
      if (action) void vscode.window.showWarningMessage(message, action).then(choice => { if (choice === action) void vscode.commands.executeCommand('idDost.goToOriginal'); });
      else void vscode.window.showWarningMessage(message);
      break;
    }
    // Bound retained state for long editing sessions.
    if (this.seen.size > 2000) this.seen.clear();
  }
  reset(): void { this.seen.clear(); this.lastShown.clear(); }
}
