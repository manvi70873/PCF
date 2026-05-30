# 🧩 Dependent Dropdown Manager

## 📖 Overview
The **Dependent Dropdown Manager** is a custom Power Apps Component Framework (PCF) control designed to handle hierarchical data selections elegantly. 

It replaces a standard lookup field with a dynamic dropdown that automatically filters its options based on the selection of a "Parent" field on the same form (e.g., selecting a Country automatically filters the State dropdown). Once a selection is made, the control renders a native-styled "Blue Pill" UI to seamlessly match the standard Dynamics 365 / Dataverse aesthetic.

---

## 🎯 Purpose
Writing custom JavaScript Web Resources to filter lookups (`addCustomFilter`) can be tedious and difficult to maintain. The purpose of this control is to provide a **no-code/low-code configuration approach** to dependent lookups. You simply bind the control to a field, pass in the logical names of your tables and columns, and the control handles the API queries, state management, and UI rendering automatically.

---

## ⚙️ Configuration & Inputs

When adding this control to a form in Power Apps, you will be prompted to map the following properties:

### 1. The Bound Field
This is the primary field the control is attached to. 
* **Type:** Lookup
* **Description:** This is the "Child" field that gets filtered when the user makes a selection (e.g., the `State` lookup field, in which we want that options get filerted when the user selects the country on an form).

### 2. Input Properties
These are the static string values you configure in the maker portal to tell the control how to query the database.
In example - we have taken a student entity to which we haev 2 lookup fields Country and State. We want that on change on Country field value the State Field options automatically filtered.

| Property Name | Data Type | Description | Example |
| :--- | :--- | :--- | :--- |
| **Parent Field Name** | `SingleLine.Text` | The logical name of the parent field(The field you want that on selection of this the bound field to which our control is bounded to get filtered) currently on the form. The control listens to this field for changes. | The logical name of the **Country Lookup Field** on the **Student Entity Form**. |
| **Child Table Name** | `SingleLine.Text` | The logical name of the table that contains the options you want to fetch and you want to filter. | `The logical name of the **State entity** to which we want the value to be filtered |
| **Linked Column Name** | `SingleLine.Text` | The logical name of the lookup column on the child table that points back to the parent table. | The Logical name of **Country Lookup Field** on the **State Entity Form**.|
| **Child Option Name** | `SingleLine.Text` | The logical name of the text column on the child table that should be displayed in the dropdown list. | The logical name of the text column of the State Entity like **Name**. |

---

## 🚀 How It Works Behind the Scenes
1. **Observation:** The control uses `formContext.getAttribute().addOnChange()` to silently listen to the Parent Field.
2. **Querying:** When the Parent Field changes, the control fires a Dataverse Web API request (`retrieveMultipleRecords`) to fetch the relevant child records using an OData `$filter`.
3. **State Management:** If the parent field is cleared, the control automatically wipes its own selected value to prevent orphaned data.
4. **Native Experience:** Users can click the selected text inside the "Blue Pill" to open the linked record directly, replicating native Dynamics behavior.