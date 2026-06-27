import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { AuditQuickPeekComponent,AuditQuickPeekProps } from "./AuditQuickPeekComponent";
import * as React from "react";


interface IExtendedMode {
    contextInfo: {
        entityId: string;
        entityTypeName: string;
    };
}

// Define a clear interface for what we expect back
interface AuditLog {
    modifiedBy?: string;
    createdon: string;
    oldValue: string;
    newValue: string;
}


export class AuditQuickPeekControl implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    private notifyOutputChanged: () => void;
    private newValue: string | undefined;
    /**
     * Empty constructor.
     */
    constructor() {
        // Empty
    }


public async auditData(context: ComponentFramework.Context<IInputs>): Promise<AuditLog | null> {
    const extendedMode = context.mode as { contextInfo?: { entityId?: string } };
    const rawId = extendedMode.contextInfo?.entityId ?? "";
    const cleanId = rawId.replace(/[{}]/g, ""); 
    
    if (!cleanId) return null;
    const queryString = `?$filter=_objectid_value eq (${cleanId})&$orderby=createdon desc&$top=5`;
    
    try {
        const result = await context.webAPI.retrieveMultipleRecords("audit", queryString);
        /* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
        const relevantLog = result?.entities?.find((e: any) => {
            const data = (e.changedata as string) ?? "";
            const logicalName = context.parameters.boundField.attributes?.LogicalName ?? "";
            return data.includes(logicalName);
        });

        if (relevantLog) {
            const logicalName = context.parameters.boundField.attributes?.LogicalName ?? "";
            const parsed = this.parseAuditData(relevantLog.changedata, logicalName);
            return {
                modifiedBy: (relevantLog["_userid_value@OData.Community.Display.V1.FormattedValue"] as string) ?? "Unknown",
                createdon: (relevantLog.createdon as string) ?? "",
                oldValue: parsed.oldValue,
                newValue: parsed.newValue
            };
        }
    } catch (error) {
        console.error("Audit Fetch Error:", error);
    }
    
    return null;
}

public parseAuditData(changedata: string, logicalName: string) {
    try {
        const parsed = JSON.parse(changedata);
        const changes = parsed.changedAttributes ?? [];
        const fieldChange = changes.find((c: any) => c.logicalName === logicalName);

        if (fieldChange) {
            return {
                oldValue: fieldChange.oldValue,
                newValue: fieldChange.newValue
            };
        }
    } catch (e) {
        console.error("Failed to parse JSON:", e);
    }
    return { oldValue: "N/A", newValue: "N/A" };
}
    /**
     * Used to initialize the control instance. Controls can kick off remote server calls and other initialization actions here.
     * Data-set values are not initialized here, use updateView.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to property names defined in the manifest, as well as utility functions.
     * @param notifyOutputChanged A callback method to alert the framework that the control has new outputs ready to be retrieved asynchronously.
     * @param state A piece of data that persists in one session for a single user. Can be set at any point in a controls life cycle by calling 'setControlState' in the Mode interface.
     */
    public init(
        context: ComponentFramework.Context<IInputs>,
        notifyOutputChanged: () => void,
        state: ComponentFramework.Dictionary
    ): void {
        this.notifyOutputChanged = notifyOutputChanged;
    }

    /**
     * Called when any value in the property bag has changed. This includes field values, data-sets, global values such as container height and width, offline status, control metadata values such as label, visible, etc.
     * @param context The entire property bag available to control via Context Object; It contains values as set up by the customizer mapped to names defined in the manifest, as well as utility functions
     * @returns ReactElement root react element for the control
     */
    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const props: AuditQuickPeekProps = {
             value: context.parameters.boundField.raw,
             onChange:(valueChanged)=>{
                this.newValue=valueChanged
                this.notifyOutputChanged();
             } ,
             fetchData: () => this.auditData(context)
            };
        return React.createElement(
            AuditQuickPeekComponent, props
        );
    }

    /**
     * It is called by the framework prior to a control receiving new data.
     * @returns an object based on nomenclature defined in manifest, expecting object[s] for property marked as "bound" or "output"
     */
    public getOutputs(): IOutputs {
        return { 
            boundField: this.newValue
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
