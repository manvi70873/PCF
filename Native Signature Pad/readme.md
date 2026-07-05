# Native Signature Pad (PCF)

A modern, responsive Power Apps Component Framework (PCF) control that transforms a standard Dataverse text field into an interactive HTML5 Canvas signature pad. 

Built with React and TypeScript, this control allows users to sign documents seamlessly across desktop (mouse) and mobile (touch) devices.

## ✨ Features
* **Cross-Device Compatibility:** Fully supports both mouse events for desktop users and touch/swipe events for mobile/tablet users.
* **Auto-Initialization:** Automatically loads and renders existing signatures when opening a previously saved record.
* **Base64 PNG Export:** Converts the drawn signature into a standard Base64 image string that can be easily rendered in SSRS reports, Power Automate documents, or Power Pages.
* **Scroll Prevention:** Prevents accidental page scrolling on mobile devices while the user is actively drawing.
* **Native Clear Function:** Includes a Fluent UI button to instantly clear the canvas and wipe the underlying Dataverse data.

---

## ⚠️ Critical Dataverse Configuration
Signatures are converted into Base64 image strings. These strings are typically between **15,000 and 50,000 characters** long. 

To use this control, you **must** configure your Dataverse column correctly, or Dataverse will throw a maximum character limit error.

1. Create a new column in your Dataverse table.
2. Set the **Data type** to **Multiple lines of text** -> **Plain text**.
3. Expand **Advanced options**.
4. Change the **Maximum character count** from the default (2,000) to **`1048576`** (the maximum allowed).
5. Save and Publish.

---

## 🚀 Installation & Deployment

### Option 1: Managed Solution (Recommended for Admins)
1. Download the latest `managed.zip` solution from the Releases tab.
2. Navigate to [make.powerapps.com](https://make.powerapps.com).
3. Go to **Solutions** -> **Import Solution** and upload the zip file.
4. Publish All Customizations.

### Option 2: Build & Deploy via CLI (For Developers)
If you want to clone this repository and deploy it directly to your environment:

```bash
# 1. Install dependencies
npm install

# 2. Authenticate to your Dataverse environment
pac auth create --url [https://your-environment.crm.dynamics.com](https://your-environment.crm.dynamics.com)

# 3. Build and push the control directly to Dataverse
pac pcf push --publisher-prefix your_prefix