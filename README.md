# ID Dost

### Your Friendly HTML ID Validator for VS Code

**Duplicate IDs? Dost sambhaal lega! 😄**

ID Dost is a developer-friendly Visual Studio Code extension that helps you detect common HTML ID mistakes directly in your editor. Keep your markup cleaner, identify issues early, and build better coding habits without interrupting your workflow.

**Created by Sachin Singh · Published by On Time Tech Academy · Part of the Lumo ecosystem**

🌐 [ottacademy.in](https://ottacademy.in)

---

## ✨ Features

### 🔁 Duplicate ID Detection
Detects when the same ID value appears multiple times in a document, helping you avoid confusing DOM selection and unexpected JavaScript behavior.

### 🚫 Whitespace Detection
Identifies ID values containing whitespace so you can maintain clean and valid identifiers.

### 🫙 Empty ID Detection
Finds empty ID attributes that may have been left behind during development.

### 🧩 Duplicate Attribute Detection
Detects elements containing multiple `id` attributes, helping you identify malformed markup.

### 💬 Friendly Diagnostic Messages
Get approachable, developer-friendly messages directly in your editor when ID Dost detects an issue.

### ⚙️ Configurable Validation
Enable or disable individual validation rules according to your preferences.

### 🔔 Optional Notifications
Enable pop-up notifications for newly detected issues. Notifications are disabled by default to keep your workflow uninterrupted.

### 🛠️ Command Palette Integration
Run ID checks manually or clear ID Dost diagnostics directly from the VS Code Command Palette.

---

## 🚀 Get Started

1. Open **Visual Studio Code**.
2. Open the **Extensions** panel.
3. Search for **ID Dost**.
4. Select the extension published by **On Time Tech Academy**.
5. Click **Install**.

After installation, open a supported HTML, JavaScript, TypeScript, JSX, or TSX document. ID Dost checks for supported ID issues and displays diagnostics directly in your editor.

> ID Dost will be available through the VS Code Marketplace after publication.

---

## 🧑‍💻 Supported Validations

ID Dost currently checks for these issues:

| Validation | Description |
|---|---|
| Duplicate IDs | Finds repeated ID values within a document. |
| Whitespace in IDs | Flags whitespace-containing ID values. |
| Empty IDs | Finds empty ID attributes. |
| Duplicate ID attributes | Detects multiple `id` attributes on one element. |

---

## ⌨️ Available Commands

Open the Command Palette with `Ctrl + Shift + P` on Windows/Linux or `Cmd + Shift + P` on macOS.

| Command | Description |
|---|---|
| `ID Dost: Check IDs in Current Document` | Manually validate IDs in the current document. |
| `ID Dost: Clear Diagnostics` | Clear ID Dost diagnostics. |
| `ID Dost: Go to Original ID` | Navigate to the original ID associated with a duplicate, where applicable. |

---

## ⚙️ Extension Settings

ID Dost provides settings that let you customize its validation behavior.

| Setting | Default | Description |
|---|---|---|
| `idDost.enabled` | `true` | Enables or disables ID Dost validation. |
| `idDost.validateDuplicates` | `true` | Detects duplicate IDs. |
| `idDost.validateWhitespace` | `true` | Detects whitespace in ID values. |
| `idDost.validateEmpty` | `true` | Detects empty ID values. |
| `idDost.validateDuplicateAttributes` | `true` | Detects multiple ID attributes on one element. |
| `idDost.notifications.enabled` | `false` | Enables optional pop-up notifications. |
| `idDost.notifications.cooldownMs` | `30000` | Sets the minimum interval between notifications for the same issue, in milliseconds. |

### How to Customize

1. Open VS Code Settings.
2. Search for `ID Dost`.
3. Enable or disable the available validation rules and notifications.

You can also update these options in your VS Code `settings.json` file:

```json
{
  "idDost.enabled": true,
  "idDost.validateDuplicates": true,
  "idDost.validateWhitespace": true,
  "idDost.validateEmpty": true,
  "idDost.validateDuplicateAttributes": true,
  "idDost.notifications.enabled": false,
  "idDost.notifications.cooldownMs": 30000
}
```

---

## 💡 Why ID Dost?

HTML IDs are commonly used by CSS, JavaScript, and DOM APIs to identify specific elements. Duplicate or malformed IDs can make code harder to maintain and may lead to unexpected behavior.

ID Dost helps you:

- Catch common ID mistakes early.
- Keep your markup clean and maintainable.
- Reduce avoidable debugging.
- Develop better coding habits.
- Get useful feedback without leaving your editor.

**Small checks. Cleaner code. Better development habits.**

---

## 🏢 About On Time Tech Academy

**On Time Tech Academy** is focused on technology education, practical learning, and helping learners build real-world development skills.

Alongside education, we aim to create useful developer tools that make everyday coding more productive and approachable.

- **Website:** [https://ottacademy.in](https://ottacademy.in)
- **Marketplace Publisher:** On Time Tech Academy

---

## 💛 Meet Lumo

**Lumo** is our developer-tools ecosystem, focused on practical JavaScript utilities, UI experiences, and tools that improve the development workflow.

ID Dost is part of the Lumo ecosystem, bringing a friendly approach to everyday code quality checks.

Our goal is to make development more productive, approachable, and enjoyable through thoughtfully designed tools.

---

## 👨‍💻 Created by Sachin Singh

**Sachin Singh** is a Full Stack Web Engineer and developer focused on building practical software tools and improving the developer experience.

ID Dost was created to help developers identify common HTML ID mistakes, write cleaner markup, and build better coding habits.

**Creator & Developer:** Sachin Singh

---

## 📄 License

ID Dost is distributed under the **MIT License**.

See the [`LICENSE`](LICENSE) file for the full license text.

---

<p align="center">
  <strong>ID Dost</strong><br>
  Duplicate IDs? Dost sambhaal lega! 😄<br><br>
  Created by <strong>Sachin Singh</strong><br>
  Published by <strong>On Time Tech Academy</strong><br>
  Part of the <strong>Lumo</strong> developer-tools ecosystem<br><br>
  <a href="https://ottacademy.in">ottacademy.in</a>
</p>

---

<p align="center">
  Made with care for developers. 💛
</p>