# Audit Trail Quick Peek (PCF Control)

A Power Apps Component Framework (PCF) control that allows users to instantly view the most recent audit history for a specific field directly on the form, without having to navigate to the system Audit History page.

## 📖 Overview

Navigating to the related "Audit History" tab in Dynamics 365 / Power Apps can be time-consuming for users who just want to know: *"Who changed this field, when did they change it, and what was the previous value?"*

This control attaches a Fluent UI **History icon** directly to standard text fields. When clicked, it fetches the most recent audit log for that specific field via the Dataverse Web API and displays the data in a clean, non-intrusive flyout (Callout).

## ✨ Features

* **Zero-Navigation Auditing:** View the Old Value, New Value, Modified By, and Date without leaving the form.
* **Lazy Loading:** The API call is only triggered when the user clicks the icon, ensuring zero impact on form load performance.
* **Seamless UI:** Built with **Fluent UI** (`TextField`, `Callout`, `Spinner`) to perfectly match the native model-driven app aesthetic.
* **Smart Parsing:** Automatically parses the complex `changedata` JSON blob from the Dataverse `audit` table to extract only the changes relevant to the bound field.
* **Strictly Typed:** Passes the strictest ESLint and PCF validation rules for secure and stable deployment.

## ⚠️ Prerequisites

For this control to return data, your Dataverse environment must be properly configured:

1. **Global Auditing** must be turned ON in the Power Platform Admin Center.
2. **Table Auditing** must be enabled for the table where this control is used.
3. **Column Auditing** must be enabled for the specific column bound to this control.
4. The user viewing the form must have the **View Audit History** (`prvReadAudit`) security privilege.

## 🚀 Installation & Configuration

### For Makers / Admins

1. Download the managed solution `.zip` file from the releases page (if applicable) and import it into your Dataverse environment.
2. Open your Model-Driven App form in the classic or modern Form Designer.
3. Select the field you want to monitor (e.g., a Text field).
4. Go to the **Components** panel, select **Get more components**, and add **Audit Quick Peek**.
5. Bind the control to your chosen field.
6. Save and Publish the form.

### For Developers

To build and deploy this control locally:

1. Clone the repository.
2. Ensure you have the Power Platform CLI (`pac`) and Node.js installed.
3. Open the folder in VS Code and open the terminal.
4. Install dependencies:
```bash
npm install

```


5. Authenticate to your Dataverse environment:
```bash
pac auth create --url https://your-environment.crm.dynamics.com

```


6. Push the control directly to your environment for testing:
```bash
pac pcf push --publisher-prefix yourprefix

```



## 🏗️ Technical Architecture

* **Framework:** React / Power Apps Component Framework (PCF)
* **UI Library:** `@fluentui/react`
* **Data Retrieval:** Uses `context.webAPI.retrieveMultipleRecords` to query the system `audit` table.
* **Query Strategy:** Fetches the `$top=5` most recent audit logs for the current record (`_objectid_value`), then performs client-side JSON parsing on the `changedata` attribute to match the field's `LogicalName`. This overcomes Dataverse OData limitations preventing direct filtering on the `changedata` blob.

## 🤝 Known Limitations

* **Supported Data Types:** Currently optimized for Text and basic data types. Lookup or complex OptionSet formatting may require additional parser mapping.
* **Search Depth:** To maintain high performance, the control only searches the 5 most recent audit logs for the record. If the field was changed further back in history (and 5 other unrelated fields were changed more recently), the control will display "No recent changes found."