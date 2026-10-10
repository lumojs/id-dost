
import * as vscode from 'vscode';
import { DiagnosticManager } from './diagnostics/manager';
import { IssueNotifier } from './notifications/notifier';
import { registerCommands } from './commands/registerCommands';
import { isEnabled } from './config/settings';

export function activate(context: vscode.ExtensionContext): void {
  const notifier = new IssueNotifier();
  const manager = new DiagnosticManager(notifier);

  context.subscriptions.push(
    manager.collection,
    { dispose: () => manager.dispose() }
  );

  registerCommands(context, manager);

  const validate = (document: vscode.TextDocument): void => {
    manager.validate(document);
  };

  for (const document of vscode.workspace.textDocuments) {
    validate(document);
  }

  context.subscriptions.push(
    vscode.workspace.onDidOpenTextDocument(validate),

    vscode.workspace.onDidChangeTextDocument(event => {
      validate(event.document);
    }),

    vscode.workspace.onDidCloseTextDocument(document => {
      manager.clear(document.uri);
    }),

    vscode.window.onDidChangeVisibleTextEditors(editors => {
      for (const editor of editors) {
        manager.getIssues(editor.document.uri);
      }
    }),

    vscode.workspace.onDidChangeConfiguration(event => {
      if (event.affectsConfiguration('idDost')) {
        notifier.reset();

        for (const document of vscode.workspace.textDocuments) {
          manager.validate(document, false);
        }

        if (!isEnabled()) {
          manager.clear();
        }
      }
    })
  );

  context.subscriptions.push(
    vscode.languages.registerCodeActionsProvider(
      { language: 'html' },
      {
        provideCodeActions(document, range, context) {
          const actions: vscode.CodeAction[] = [];

          for (const diagnostic of context.diagnostics) {
            if (diagnostic.source !== 'ID Dost') {
              continue;
            }

            if (diagnostic.code === 'whitespace') {
              const action = new vscode.CodeAction(
                'Replace ID spaces with hyphens',
                vscode.CodeActionKind.QuickFix
              );

              action.diagnostics = [diagnostic];

              const current = document.getText(
                new vscode.Range(
                  diagnostic.range.start,
                  diagnostic.range.end
                )
              );

              action.edit = new vscode.WorkspaceEdit();

              action.edit.replace(
                document.uri,
                new vscode.Range(
                  diagnostic.range.start,
                  diagnostic.range.end
                ),
                current.replace(/\s+/g, '-')
              );

              actions.push(action);
            } else if (diagnostic.code === 'duplicate') {
              const action = new vscode.CodeAction(
                'Go to original ID',
                vscode.CodeActionKind.QuickFix
              );

              action.command = {
                command: 'idDost.goToOriginal',
                title: 'Go to original ID'
              };

              action.diagnostics = [diagnostic];
              actions.push(action);
            }
          }

          return actions;
        }
      },
      { providedCodeActionKinds: [vscode.CodeActionKind.QuickFix] }
    )
  );
}

export function deactivate(): void {
  // All subscriptions are disposed by VS Code.
}
