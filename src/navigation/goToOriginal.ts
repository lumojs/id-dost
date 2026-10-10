import * as vscode from 'vscode';
import { DiagnosticManager } from '../diagnostics/manager';
export async function goToOriginal(manager: DiagnosticManager): Promise<void> {
  const editor = vscode.window.activeTextEditor;
  if (!editor) return;
  const issues = manager.getIssues(editor.document.uri).filter(i => i.kind === 'duplicate' && i.originalStart !== undefined);
  if (!issues.length) { void vscode.window.showInformationMessage('ID Dost: Is document mein duplicate ID nahi mili.'); return; }
  const offset = editor.document.offsetAt(editor.selection.active);
  const issue = issues.find(i => offset >= i.start && offset <= i.end) ?? issues[0];
  const position = editor.document.positionAt(issue.originalStart!);
  await editor.revealRange(new vscode.Range(position, position), vscode.TextEditorRevealType.InCenter);
  editor.selection = new vscode.Selection(position, position);
}
