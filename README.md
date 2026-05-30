# 🧩 PCF Controls Library

Welcome to my repository of custom Power Apps Component Framework (PCF) controls! This repository serves as a centralized library for all the controls I have built to enhance Dynamics 365 and Power Apps interfaces.

## 📁 Repository Structure

This repository is organized as a **Monorepo**. This means that **every folder in the root directory represents one individual PCF control** and contains its respective source code. 

For example:
* `📁 Dependent Dropdown Manager/` ➔ Contains the React/TypeScript source code for the Dependent Dropdown control.
---

## 📥 How to Download & Install

> **⚠️ Note:** You do not need to clone this repository, install `npm`, or touch any code to use these controls in your environment!

To easily install a control, follow these steps:

1. Navigate to the **[Releases](../../releases)** page of this GitHub repository.
2. Scroll through the releases to find the control you want. **The Release Tags match the folder names** (e.g., look for the tag `Dependent_DropDown_Manager` if you want the control from the Dropdown Manager folder).
3. Under the **Assets** section of that specific release, click to download the `.zip` solution file.
4. Open your Power Apps Maker Portal, go to **Solutions**, and click **Import Solution**.
5. Upload the `.zip` file you just downloaded and publish your customizations!

---

## 💻 Building from Source

If you are a developer and wish to view or modify the code:
1. Clone this repository to your local machine.
2. Open your terminal and navigate *into* the specific control's folder you wish to work on.
3. Run `npm install` to restore the dependencies.
4. Run `npm run start` to launch the local test harness, or `dotnet build` inside the `.cdsproj` directory to pack a new solution.
