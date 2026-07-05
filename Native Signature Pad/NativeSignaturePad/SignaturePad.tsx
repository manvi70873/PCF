import * as React from 'react';
import { Button, Label } from '@fluentui/react-components';

export interface SignaturePadProps {
  value?: string | undefined;
  onChange:(newValue:string)=>void;
}

export const SignaturePadComponent: React.FunctionComponent <SignaturePadProps> = (props)=> {
  const [isDrwaing,setDrawaing]  = React.useState(false);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  React.useEffect(()=>{
    if(props.value == null || props.value == '') return;
    const current = canvasRef.current;
    if(current == null) return;
    const ctx = current.getContext('2d');
    if(ctx == null) return;
    const img = new Image();
    img.onload = function() {
      ctx?.clearRect(0, 0, current?.width ?? 0, current?.height ?? 0);
      ctx?.drawImage(img, 0, 0);
    }
    img.src = props.value;
  },[props.value]);

  // returns x and y cordinates of touch from the moniter
  function getCoordinates(event:React.TouchEvent | React.MouseEvent,canvas:HTMLCanvasElement) {
    const bindingClient = canvas.getBoundingClientRect();
    if(event.type.includes("touch")){
      const finger = (event as React.TouchEvent) .touches[0];
      const x = finger.clientX - bindingClient.left;
      const y = finger.clientY - bindingClient.top;
      return {x,y};
    }
    else{
      const mouse = (event as React.MouseEvent);
      const x = mouse.clientX - bindingClient.left;
      const y = mouse.clientY - bindingClient.top;
      return {x,y};
    }
  }
    
    function startDrawing(event:React.TouchEvent | React.MouseEvent) {
      event.preventDefault();
      setDrawaing(true);
      const current = canvasRef.current;
      if(current == null) return;
      const ctx = current.getContext('2d');
      if(ctx == null) return;
      const {x,y} = getCoordinates(event,current);
      ctx.beginPath();
      ctx.moveTo(x,y);
    }

  function draw(event:React.TouchEvent | React.MouseEvent) {
    event.preventDefault();
    if(isDrwaing == false) return;
    const current = canvasRef.current;
    if(current == null) return;
    const ctx = current.getContext('2d');
    if(ctx == null) return;
    const {x,y} = getCoordinates(event,current);
    ctx.lineTo(x,y);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.stroke();
  }


  function stopDrawing(event:React.TouchEvent | React.MouseEvent) {
    event.preventDefault();
    setDrawaing(false);
    saveSignature();
  }

  function saveSignature() {
    const current = canvasRef.current;
    if(current == null) return;
    const base64 = current.toDataURL('image/png');
    props.onChange(base64);
  }

  function clearSignature() {
    const current = canvasRef.current;
    if(current == null) return;
    const ctx = current.getContext('2d');
    if(ctx == null) return;
    ctx.clearRect(0, 0, current.width || 0, current.height || 0);
    props.onChange('');
  }

    return (
  <>
    <canvas 
      ref={canvasRef} 
      height={200} 
      width={400} 
      style={{ border: '1px solid #ccc', backgroundColor: '#fff' }}
      onMouseDown={startDrawing}
      onMouseMove={draw}
      onMouseUp={stopDrawing}
      onMouseLeave={stopDrawing}
      onTouchStart={startDrawing}
      onTouchMove={draw}
      onTouchEnd={stopDrawing}
    />
    <br/>
    <Button onClick={clearSignature} style={{marginTop:'10px'}}>
      Clear Signature
    </Button>
  </>
)
  }
