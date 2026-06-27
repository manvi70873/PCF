import * as React from 'react';
import { 
    TextField, 
    IconButton, 
    Callout, 
    DirectionalHint, 
    Spinner,
    SpinnerSize
} from '@fluentui/react';

interface AuditLog {
    modifiedBy?: string;
    createdon: string;
    oldValue: string;
    newValue: string;
}


export interface AuditQuickPeekProps {
  value?: string | null;
  onChange: (valueString?:string) => void;
  fetchData: () => Promise<AuditLog | null>;
}

export const AuditQuickPeekComponent: React.FC<AuditQuickPeekProps> = (props) => {
    const [isFlyout,setFlyout] = React.useState(false);
    const [auditData, setAuditData] = React.useState<AuditLog | null>(null);
    const [isLoading, setIsLoading] = React.useState(false);
    const iconref = React.useRef<HTMLDivElement>(null);

    const handleOnClick = () => {
      const willOpen = !isFlyout; 
      setFlyout(willOpen);
      if (willOpen && !auditData) {
        setIsLoading(true);
        props.fetchData()
          .then((data) => {
            setAuditData(data);
            setIsLoading(false);
            return(data);
          })
          .catch((error) => {
            console.error("Error fetching audit data:", error);
            setIsLoading(false);
          });
      }
    };
    
    const renderSuffix = () => {
        return (
          <div ref={iconref}>
            <IconButton
              iconProps={{ iconName: 'History' }}
              onClick={handleOnClick}
          />
          </div>
        );
    };

    return (
      <div>

        <TextField
      value={props.value ?? '' }
      borderless={false}
      onRenderSuffix={renderSuffix}
      onChange={(event,newValue)=>props.onChange(newValue)}
      >
      </TextField>

      {
        isFlyout && 
        <Callout
        target={iconref}
        directionalHint={DirectionalHint.rightBottomEdge}
        onDismiss={()=>setFlyout(false)}
        >
        <div>
        <h4>Audit Quick Peek</h4>
          {isLoading?
          <Spinner size={SpinnerSize.small} label="Fetching history..." />
          :auditData?
          <p>
          <strong>Modified By:</strong> {auditData.modifiedBy}<br/>
          <strong>Date:</strong> {auditData.createdon}<br/>
          <strong>Old Value:</strong>{auditData.oldValue}<br/>
          <strong>New Value:</strong> {auditData.newValue}
          </p>
          :
          <p style={{ margin: 0, color: 'gray' }}>No recent changes found.</p>
        }
        </div>
        </Callout>
      }

      </div>
    )
}
