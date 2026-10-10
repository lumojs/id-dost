import * as vscode from 'vscode';
import { ValidationOptions } from '../validators/validateIds';
export function isEnabled(): boolean { return vscode.workspace.getConfiguration('idDost').get<boolean>('enabled', true); }
export function validationOptions(): ValidationOptions {
  const c = vscode.workspace.getConfiguration('idDost');
  return { duplicates: c.get('validateDuplicates', true), whitespace: c.get('validateWhitespace', true), empty: c.get('validateEmpty', true), duplicateAttributes: c.get('validateDuplicateAttributes', true) };
}
export function notificationsEnabled(): boolean { return vscode.workspace.getConfiguration('idDost').get<boolean>('notifications.enabled', false); }
export function notificationCooldown(): number { return Math.max(0, vscode.workspace.getConfiguration('idDost').get<number>('notifications.cooldownMs', 30000)); }
