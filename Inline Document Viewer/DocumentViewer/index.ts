import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { DocumentViewerComponent, DocumentViewerProps } from "./DocumentViewerComponent";
import * as React from "react";

interface IExtendedMode {
    contextInfo: {
        entityId: string;
        entityTypeName: string;
    };
}

export class DocumentViewer implements ComponentFramework.ReactControl<IInputs, IOutputs> {
    
    public init(context: ComponentFramework.Context<IInputs>, notifyOutputChanged: () => void, state: ComponentFramework.Dictionary): void {
        // Nothing needed here anymore! React will handle everything.
    }

    public updateView(context: ComponentFramework.Context<IInputs>): React.ReactElement {
        const extendedMode = context.mode as unknown as IExtendedMode;
        
        // Use a strictly typed dictionary instead of 'any' to satisfy ESLint
        const parameters = context.parameters as unknown as Record<string, { raw?: string | null }>;
        
        const props: DocumentViewerProps = {
            entityId: extendedMode.contextInfo?.entityId ?? "",
            entityTypeName: extendedMode.contextInfo?.entityTypeName ?? "",
            fileColumnName: context.parameters.fileColumnName.raw ?? "",
            anchorValue: parameters.boundField?.raw ?? ""
        };
        
        return React.createElement(DocumentViewerComponent, props);
    }

    public getOutputs(): IOutputs {
        return {};
    }

    public destroy(): void {
        // Cleanup handled by React now
    }
}