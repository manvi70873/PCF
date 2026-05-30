import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DependentDropdownManagerComponent,IDependentDropdownManagerProps } from "./DependentDropdownManagerComponent";
import * as React from "react";
import * as ReactDOM from "react-dom";

export class DependentDropdownManager implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private selectedStateValue:ComponentFramework.LookupValue[] | undefined;
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }

    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
    // --- THE MASTER KEY BACKDOOR (STRICT MODE) ---
    private getFormContext(context: any): any {
        // Create a list of all possible places the Form Context might be hiding
        const potentialContexts = [
            (window as any).parent?.Xrm?.Page,
            (window as any).top?.Xrm?.Page,
            (window as any).Xrm?.Page,
            context.mode?.contextInfo?.formContext,
            context.page
        ];

        // Loop through them one by one
        for (const ctx of potentialContexts) {
            // ONLY accept the context if it actually has the getAttribute tool!
            if (ctx && typeof ctx.getAttribute === "function") {
                return ctx;
            }
        }
        
        return null; // Return null if we got tricked by all decoys
    }
    /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-return */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary,
        container: HTMLDivElement
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
        }
    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        /* eslint-disable @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */
        const formContext = this.getFormContext(context);

        const currentCountry = formContext?.getAttribute?.(context.parameters.countryFieldLogicalName.raw ?? "")?.getValue?.() ?? undefined;
        
        const props: IDependentDropdownManagerProps = {
            currentChildValue: context.parameters.stateField.raw ?? undefined,
            currentParentValue: currentCountry,
            parentFieldName: context.parameters.countryFieldLogicalName.raw ?? "",
            childTableName: context.parameters.stateTableName.raw ?? "",
            LinkedColumnName: context.parameters.linkingColumnName.raw ?? "",
            data: context.webAPI,
            OnChangeState: (newValue: ComponentFramework.LookupValue[]) => {
                this.selectedStateValue = newValue;
                this.notifyOutputChanged();
            },
            formContext: this.getFormContext(context),
            childOptionName: context.parameters.childOptionName.raw ?? "",
            // NEW: Passing the Navigation tool securely down to React
            onOpenRecord: (entityName: string, entityId: string) => {
                context.navigation.openForm({
                    entityName: entityName,
                    entityId: entityId
                }).catch((error: unknown) => console.error("Navigation failed", error));
            }
        };
        /* eslint-enable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call */

        return React.createElement(DependentDropdownManagerComponent, props);
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return {
            stateField: this.selectedStateValue
         };
    }

    /**
     * Called when the control is to be removed from the DOM tree. Controls should use this call for cleanup.
     * i.e. cancelling any pending remote calls, removing listeners, etc.
     */
    public destroy(): void {
        // Add code to cleanup control if necessary
    }
}
