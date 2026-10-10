import * as vscode from 'vscode';
import { DiagnosticManager } from '../diagnostics/manager';
import { goToOriginal } from '../navigation/goToOriginal';
export function registerCommands(context: vscode.ExtensionContext, manager: DiagnosticManager): void {
  context.subscriptions.push(vscode.commands.registerCommand('idDost.checkDocument', () => {
    const editor = vscode.window.activeTextEditor;
    if (!editor) return;
    const issues = manager.validate(editor.document, false);
    void vscode.window.showInformationMessage(issues.length ? `ID Dost: ${issues.length} issue(s) found.` : 'ID Dost: Sab IDs ekdum theek hain! ✅');
  }));
  context.subscriptions.push(vscode.commands.registerCommand('idDost.clearDiagnostics', () => {
    const editor = vscode.window.activeTextEditor;
    manager.clear(editor?.document.uri);
  }));
  context.subscriptions.push(vscode.commands.registerCommand('idDost.goToOriginal', () => goToOriginal(manager)));
}
