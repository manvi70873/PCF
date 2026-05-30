/* eslint-disable @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-argument */
import * as React from 'react';
import { Dropdown, Option } from '@fluentui/react-components';

// Define this function inside your file or as a separate helper
// Create this component in your file
const PuzzleIcon = (props: { color?: string, size?: number }) => (
    <svg 
        width={props.size ?? 16} 
        height={props.size ?? 16} 
        viewBox="0 0 1024 1024" 
        style={{ display: 'block', flexShrink: 0 }}
    >
        {/* We add a transform to shift the icon to the start and scale it up */}
        <g transform="translate(-48, -48) scale(1.10)">
            <path 
                d="M 883.00 141.00 L 883.00 878.00 L 512.67 878.00 C308.98,878.00 142.03,877.70 141.67,877.33 C141.30,876.97 141.00,711.14 141.00,508.83 L 141.00 141.00 ZM 184.00 184.00 L 184.00 835.00 L 841.00 835.00 L 841.00 184.00 ZM 463.02 730.49 C460.50,731.79 451.66,731.99 399.30,731.94 C365.86,731.90 337.55,731.49 336.39,731.02 C335.23,730.55 333.31,728.94 332.14,727.45 C330.00,724.73 330.00,724.64 330.00,658.50 L 330.00 592.28 L 315.75 591.74 C304.43,591.31 299.70,590.66 292.71,588.59 C275.95,583.62 262.52,575.45 250.44,562.86 C239.30,551.26 234.27,542.89 229.03,527.24 C219.68,499.34 224.93,467.96 243.05,443.50 C247.65,437.29 258.92,426.46 265.33,422.09 C271.67,417.77 284.98,411.69 292.50,409.67 C300.67,407.49 315.68,405.78 323.26,406.18 L 329.50 406.50 L 330.50 279.83 L 333.31 277.41 L 336.11 275.00 L 400.40 275.00 C464.46,275.00 464.70,275.01 466.60,277.10 C468.34,279.02 468.55,281.49 469.04,305.85 C469.54,330.31 469.77,332.96 471.81,338.10 C479.87,358.42 500.43,371.00 519.24,367.11 C533.25,364.22 544.02,355.86 550.33,343.00 C555.35,332.76 556.00,328.13 556.00,302.79 L 556.00 280.85 L 558.92 277.92 L 561.85 275.00 L 624.52 275.00 C627.51,275.00 630.36,275.00 633.09,275.00 C682.27,274.99 690.56,274.99 692.89,278.71 C693.49,279.67 693.70,280.88 694.11,282.41 C694.82,285.06 695.06,306.05 694.84,346.25 L 694.50 406.14 L 707.50 406.48 C722.73,406.88 732.51,408.79 743.32,413.46 C755.97,418.93 761.84,422.93 771.95,433.00 C783.25,444.24 789.71,454.44 794.59,468.74 C799.01,481.70 800.39,491.19 799.65,503.57 C797.26,543.23 769.90,577.18 731.50,588.11 C727.13,589.36 719.12,590.42 710.20,590.94 C702.33,591.40 695.67,592.00 695.39,592.28 C695.11,592.55 694.85,621.97 694.81,657.64 C694.76,709.27 694.47,723.17 693.41,725.79 C693.01,726.75 692.70,727.57 692.21,728.26 C689.54,732.00 681.62,732.00 627.22,732.00 L 625.00 732.00 C561.34,732.00 559.60,731.88 557.19,727.33 C556.65,726.33 555.89,714.03 555.49,700.00 C554.65,670.18 553.27,663.66 545.63,653.28 C529.38,631.22 499.94,629.41 481.31,649.33 C474.88,656.21 470.90,663.54 469.13,671.80 C468.47,674.92 468.00,686.99 468.00,701.11 C468.00,715.67 467.59,725.89 466.97,727.06 C466.40,728.11 464.63,729.66 463.02,730.49 ZM 369.45 691.92 C369.93,692.70 378.58,692.95 398.82,692.77 L 427.50 692.50 L 428.13 678.50 C428.64,667.24 429.29,662.83 431.47,656.00 C441.63,624.10 465.82,602.20 497.79,595.95 C505.59,594.43 524.12,595.22 532.50,597.42 C535.80,598.29 543.09,601.26 548.70,604.02 C556.80,608.00 560.63,610.67 567.33,617.01 C585.72,634.42 594.18,653.73 595.70,681.76 L 596.31 693.03 L 625.40 692.76 L 654.50 692.50 L 654.50 625.46 C654.50,562.57 654.61,558.26 656.30,555.67 C657.29,554.15 659.24,552.48 660.62,551.96 C662.00,551.43 674.55,551.00 688.51,551.00 C712.72,551.00 714.26,550.89 721.70,548.53 C725.99,547.18 731.71,544.67 734.42,542.95 C744.95,536.27 753.78,524.41 757.40,512.07 C759.21,505.93 759.46,493.71 757.92,487.03 C754.98,474.27 743.55,459.24 732.19,453.18 C721.78,447.63 717.33,447.00 688.74,447.00 C661.34,447.00 658.44,446.56 656.03,442.06 C655.35,440.79 655.00,418.56 655.00,377.57 L 655.00 315.00 L 596.29 315.00 L 595.73 326.75 C593.98,363.39 569.86,394.65 535.46,404.88 C505.37,413.84 474.32,405.04 451.82,381.19 C437.73,366.25 430.18,347.67 428.50,323.75 L 427.81 314.00 L 370.00 314.00 L 370.00 375.53 C370.00,441.65 369.99,441.79 364.88,445.37 C362.89,446.77 359.07,447.00 338.03,447.02 C320.32,447.03 311.55,447.44 306.50,448.51 C277.91,454.52 259.40,483.61 266.57,511.28 C271.15,528.94 282.63,541.59 300.53,548.69 L 307.50 551.45 L 335.87 551.68 C367.37,551.93 366.79,551.81 369.08,558.76 C369.95,561.37 370.06,578.72 369.50,626.54 C369.10,661.89 369.07,691.31 369.45,691.92 Z" 
                fill={props.color ?? "#0B5CAD"} 
            />
        </g>
    </svg>
);

export interface IDependentDropdownManagerProps {
  currentChildValue: ComponentFramework.LookupValue[] | undefined;
  currentParentValue: ComponentFramework.LookupValue[] | undefined;
  parentFieldName?: string;
  childTableName?: string;
  LinkedColumnName?: string;
  data?: ComponentFramework.WebApi;
  OnChangeState?: (newValue: ComponentFramework.LookupValue[]) => void;
  formContext: any;
  childOptionName?: string;
  // NEW: The tool that allows React to ask Dataverse to open a window
  onOpenRecord?: (entityName: string, entityId: string) => void;
}

interface IStateOption {
    key: string;
    text: string;
}

export function DependentDropdownManagerComponent(props: IDependentDropdownManagerProps) {
  
  const [dropdownOptions, setDropdownOptions] = React.useState<IStateOption[]>([]);
  const [currentCountryId, setCurrentCountryId] = React.useState<string | undefined>(undefined);

  const [selectedOption, setSelectedOption] = React.useState<string[]>([]);
  const [dropdownValue, setDropdownValue] = React.useState<string>("");

  React.useEffect(() => {
      if (props.currentChildValue && props.currentChildValue.length > 0) {
          setSelectedOption([props.currentChildValue[0].id]);
          setDropdownValue(props.currentChildValue[0].name ?? "");
      }
  }, [props.currentChildValue]);

  const loadRealStates = async () => {
      if (props.data && props.childTableName && props.LinkedColumnName && currentCountryId) {
          const query = `?$filter=_${props.LinkedColumnName}_value eq ${currentCountryId}`;
          try {
              const results = await props.data.retrieveMultipleRecords(props.childTableName, query);
              const newOptions: IStateOption[] = results.entities.map((record: ComponentFramework.WebApi.Entity) => {
                  return {
                      key: record[(props.childTableName ?? "") + "id"], 
                      text: record[props.childOptionName ?? ""] ?? "State Found" 
                  };
              });
              setDropdownOptions(newOptions);
          } catch (error) {
              console.error("Database search failed:", error);
          }
      } else {
          setDropdownOptions([]);
      }
  };

  React.useEffect(() => {
      if (props.formContext && props.parentFieldName) {
          const parentField = props.formContext.getAttribute(props.parentFieldName);
          
          const handleCountryChange = () => {
              const val = parentField?.getValue();
              if (val && val.length > 0) {
                  setCurrentCountryId(val[0].id);
              } else {
                  setCurrentCountryId(undefined);
                  setSelectedOption([]);
                  setDropdownValue("");
                  if (props.OnChangeState) {
                      props.OnChangeState([]); 
                  }
              }
          };

          handleCountryChange();

          if (parentField) {
              parentField.addOnChange(handleCountryChange);
          }
      }
  }, [props.formContext, props.parentFieldName]);

  React.useEffect(() => {
      void loadRealStates();
  }, [currentCountryId]);

  return (
    <div style={{ width: '100%' }}>
      {selectedOption.length > 0 && dropdownValue !== "" ? (
        // 1. THE NATIVE "BLUE PILL" LOOKUP STATE
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          minHeight: '32px', 
          width: '100%', 
          backgroundColor: '#f5f5f5', 
          borderRadius: '4px',
          boxSizing: 'border-box'
        }}>
          {/* The Light Blue Pill Container */}

<div
    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#cce3f5'}
    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f0f6ff'}
    style={{
        display: 'inline-flex',
        alignItems: 'center',
        backgroundColor: '#f0f6ff',
        borderRadius: '2px',
        padding: '2px 6px 2px 4px',
        height: '26px',
        marginLeft: '4px',
        boxSizing: 'border-box'
    }}
>
    {/* ICON */}
    <div
        style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '16px',
            height: '16px',
            flexShrink: 0
        }}
    >
        <PuzzleIcon color="#115EA3" size={18} />
    </div>

    {/* TEXT */}
    <span
        onClick={() => {
            if (props.onOpenRecord && props.childTableName && selectedOption.length > 0) {
                props.onOpenRecord(props.childTableName, selectedOption[0]);
            }
        }}
        style={{
            color: '#115EA3',
            fontSize: '14px',
            lineHeight: '20px',
            cursor: 'pointer',
            fontFamily: '"Segoe UI", sans-serif',
            textDecoration: 'underline',
            marginLeft: '8px',
            display: 'flex',
            alignItems: 'center',
            paddingBottom: '1px'
        }}
    >
        {dropdownValue}
    </span>

    {/* CLOSE BUTTON */}
    <span
        onClick={() => {
            setSelectedOption([]);
            setDropdownValue("");

            if (props.OnChangeState) {
                props.OnChangeState([]);
            }
        }}
        style={{
            marginLeft: '10px',
            width: '16px',
            height: '16px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
        }}
    >
        <svg
            viewBox="0 0 12 12"
            width="14"
            height="14"
            stroke="#115EA3"
            strokeWidth="1.0"
            strokeLinecap="round"
        >
            <path d="M 3 3 L 9 9 M 9 3 L 3 9" />
        </svg>
    </span>
</div>


        </div>
      ) : (
        // 2. THE EMPTY STATE 
        <Dropdown 
          placeholder="---" 
          appearance="filled-lighter" 
          style={{ width: '100%', fontFamily: '"Segoe UI", sans-serif', backgroundColor: '#f5f5f5', border: 'none', borderRadius: '4px' }}
          listbox={{ style: { padding: '4px 0px', maxHeight: '250px', overflowY: 'auto', backgroundColor: '#ffffff' } }}
          value={dropdownValue}
          selectedOptions={selectedOption}
          onOptionSelect={(event, data) => {
            setSelectedOption(data.selectedOptions);
            setDropdownValue(data.optionText ?? "");
            if (props.OnChangeState && data.optionValue) {
              props.OnChangeState([{ id: data.optionValue, name: data.optionText ?? "", entityType: props.childTableName ?? "" }]);
            }
          }}
        >
          {dropdownOptions.map((option) => (
            <Option 
              key={option.key} value={option.key} text={option.text}
              style={{ fontFamily: '"Segoe UI", sans-serif', fontSize: '14px', color: '#323130', display: 'flex', alignItems: 'center', padding: '8px 12px', cursor: 'pointer' }}
            >
              <PuzzleIcon color="#605e5c" size={16} />
              <span style={{ marginLeft: '8px' }}>{option.text}</span>
            </Option>
          ))}
        </Dropdown>
      )}
    </div>
  )

}