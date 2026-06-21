# 📄 Inline Document Viewer

## 📖 Overview

The **Inline Document Viewer** is a modern, React-driven Power Apps Component Framework (PCF) control designed to seamlessly preview Dataverse files directly within a Model-Driven App form.

Instead of forcing users to download files to their local machines just to see what they contain, this control renders PDFs and images inline. It features a clean, responsive interface with a built-in toolbar, graceful fallbacks for unsupported file types, and instant auto-reloading when new files are uploaded to the record.

---

## 🎯 Purpose

Displaying files natively inside Dynamics 365 / Dataverse can be incredibly frustrating. The standard Canvas App PDF Viewer often fails due to strict URL formatting requirements, API `$value` limitations, and aggressive browser security protocols (like CORS blocks and cipher mismatches).

The purpose of this control is to completely bypass those native restrictions. By leveraging a custom React architecture, it securely fetches the raw binary file data in the background, automatically determines the file type, and paints it to the screen using secure, temporary browser memory (Blob URLs).

---

## ⚙️ Configuration & Inputs

When adding this control to a form in Power Apps, you will bind it to a standard text field and configure the following properties:

### 1. The Bound Field (The Trigger Anchor)

This is the primary field the control is attached to on the form.

* **Type:** `SingleLine.Text`
* **Description:** This field acts as a hidden "tripwire." Because PCF controls cannot natively detect when a user uploads a file to a separate Dataverse file column, we use a lightweight JavaScript web resource to write a timestamp into this Bound Field whenever a file is saved. The React component listens to this field and instantly reloads the viewer when the text changes.

**Implementation Setup:**
To make this trigger work, create a JavaScript Web Resource with the code below and register it on your Model-Driven form's File Column **`OnChange`** event:

```javascript
function onDocumentUpload(executionContext) {
    // 1. Get the form context
    var formContext = executionContext.getFormContext();
    
    // 2. Generate a random timestamp
    var timestamp = new Date().getTime().toString();
    
    // 3. Inject it into the Dummy Anchor field to wake up the PCF
    // IMPORTANT: Replace 'dev_vieweranchor' with the exact logical name of your Dummy Text field
    var anchorField = formContext.getAttribute("dev_vieweranchor");
    
    if (anchorField) {
        anchorField.setValue("Loaded at: " + timestamp);
    }
}

```

### 2. Input Properties

These are the static string values you configure in the maker portal to tell the control exactly where to find the physical file.

| Property Name | Data Type | Description | Example |
| --- | --- | --- | --- |
| **File Column Logical Name** | `SingleLine.Text` | The exact logical name of the Dataverse File column that contains the document you want to view. | `devsss_document` (The logical name of the file column on the Patient entity). |

*> Note: The control automatically detects the current Record ID and Table Name using the native PCF Context. You do not need to configure those manually!*

---

## 🚀 How It Works Behind the Scenes

1. **The Quiet Fetcher:** Upon loading, the control fires a silent Dataverse Web API request to the `$value` endpoint of your specified file column to download the raw binary data.
2. **"Magic Byte" Detection:** To bypass browser file-type confusion, the code reads the first 4 bytes of the downloaded data stream to mathematically prove whether the file is a PDF (`%PDF`), a PNG, or a JPEG.
3. **Secure Rendering:** The binary data is wrapped in a secure `Blob` and fed into a local object URL. PDFs are injected into a native web `iframe` (granting the user zoom and print controls), while images are rendered perfectly to scale.
4. **Smart Memory Cleanup:** As users navigate between records, the React component uses `useEffect` cleanup routines to instantly destroy the old temporary files, preventing RAM memory leaks and maintaining browser performance.
5. **Graceful Fallbacks:** If the user uploads a file that web browsers cannot securely render inline (like a `.docx` Word file or an `.xlsx` Excel sheet), the control elegantly falls back to a custom UI offering a direct "Download File" button.