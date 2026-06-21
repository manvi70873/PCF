import * as React from 'react';
import { useState, useEffect } from 'react';

export interface DocumentViewerProps {
  entityId: string;
  entityTypeName: string;
  fileColumnName: string;
  anchorValue: string;
}

// Upgraded to a Modern Functional Component
export const DocumentViewerComponent: React.FC<DocumentViewerProps> = (props) => {
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);

  // 1. The quiet background fetcher
  const fetchDocument = async () => {
    if (!props.entityId || props.entityId === "00000000-0000-0000-0000-000000000000") {
      setFileUrl(null);
      return;
    }

    const logicalName = props.entityTypeName ?? "";
    let entitySetName = logicalName + "s";
    if (logicalName.endsWith("y")) {
        entitySetName = logicalName.slice(0, -1) + "ies";
    }

    const url = `/api/data/v9.2/${entitySetName}(${props.entityId})/${props.fileColumnName}/$value`;

    try {
        const response = await fetch(url, { cache: "no-store" });
        if (response.ok) {
            const buffer = await response.arrayBuffer();
            const bytes = new Uint8Array(buffer).subarray(0, 4);
            let mimeType = "application/octet-stream"; 

            if (bytes[0] === 37 && bytes[1] === 80 && bytes[2] === 68 && bytes[3] === 70) mimeType = "application/pdf"; 
            else if (bytes[0] === 137 && bytes[1] === 80 && bytes[2] === 78 && bytes[3] === 71) mimeType = "image/png"; 
            else if (bytes[0] === 255 && bytes[1] === 216) mimeType = "image/jpeg"; 

            const typedBlob = new Blob([buffer], { type: mimeType });
            
            setFileType(mimeType);
            setFileUrl(URL.createObjectURL(typedBlob));
        } else {
            setFileUrl(null);
            setFileType(null);
        }
    } catch (error) {
        console.error("Failed to download file:", error);
        setFileUrl(null);
    }
  };

  // 2. Smart Listeners: This automatically runs when the ID changes OR your JS trigger fires
  useEffect(() => {
    fetchDocument().catch(console.error);
    // Automatically prevents memory leaks when the component re-renders
    return () => {
        if (fileUrl) {
            URL.revokeObjectURL(fileUrl);
        }
    };
  }, [props.entityId, props.anchorValue]); // <-- React listens to these variables now!

  // 3. The Manual Override Button
  const handleReload = () => {
    if (fileUrl) URL.revokeObjectURL(fileUrl);
    setFileUrl(null);
    fetchDocument().catch(console.error);
  };

  // 4. The Render UI
  const toolbar = (
    <div style={{ display: 'flex', justifyContent: 'flex-end', padding: '8px', backgroundColor: '#f3f2f1', borderBottom: '1px solid #edebe9', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }}>
      <button onClick={handleReload} style={{ padding: '6px 12px', cursor: 'pointer', backgroundColor: '#0f6cbd', color: 'white', border: 'none', borderRadius: '4px', fontWeight: 600 }}>
        ↻ Reload Viewer
      </button>
    </div>
  );

  if (!fileUrl) {
    return (
      <div style={{ border: '1px solid #edebe9', borderRadius: '4px', display: 'flex', flexDirection: 'column' }}>
        {toolbar}
        <div style={{ padding: '30px', fontFamily: 'Segoe UI, sans-serif', color: '#605e5c', textAlign: 'center' }}>
          No document loaded or document is saving.<br/><br/>
          <b>To view a new file:</b> Upload the document, click the Dataverse &quot;Save&quot; button, then click Reload Viewer.
        </div>
      </div>
    );
  }

  let viewerContent;
  const type = fileType ?? "";

  if (type.startsWith("image/")) {
      viewerContent = <div style={{ padding: '10px', textAlign: 'center', backgroundColor: '#faf9f8' }}><img src={fileUrl} alt="Document Viewer" style={{ maxWidth: '100%', maxHeight: '600px', objectFit: 'contain' }} /></div>;
  } else if (type === "application/pdf") {
      viewerContent = <iframe src={fileUrl} style={{ width: '100%', height: '600px', border: 'none' }} title="Inline Document Viewer" />;
  } else {
      viewerContent = (
          <div style={{ padding: '30px', textAlign: 'center', fontFamily: 'Segoe UI, sans-serif' }}>
              <p style={{ color: '#d13438', fontWeight: 600 }}>Inline preview is not supported for this file type.</p>
              <a href={fileUrl} download="Downloaded_Document" style={{ display: 'inline-block', marginTop: '10px', padding: '8px 16px', backgroundColor: '#0f6cbd', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                  ↓ Download File to View
              </a>
          </div>
      );
  }

  return (
    <div style={{ border: '1px solid #edebe9', borderRadius: '4px', display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
      {toolbar}
      {viewerContent}
    </div>
  );
};