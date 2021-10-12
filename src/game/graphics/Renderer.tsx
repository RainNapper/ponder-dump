import React, { CanvasHTMLAttributes, MutableRefObject, useEffect, useRef, useState } from 'react';

const CanvasRenderer = ({ entities: IEntities }) => {
  const canvas: MutableRefObject<HTMLCanvasElement | null> = useRef(null);
  const [canvasContext, setCanvasContext] = useState<CanvasRenderingContext2D | undefined>(undefined);

  // draw rectangle
  const drawRect = (canvasContext, info, style: any = {}) => {
    const { x, y, w, h } = info;
    const { borderColor = 'black', borderWidth = 1 } = style;

    canvasContext.beginPath();
    canvasContext.strokeStyle = borderColor;
    canvasContext.lineWidth = borderWidth;
    canvasContext.rect(x, y, w, h);
    canvasContext.stroke();
  }

  // draw rectangle with background
  const drawFillRect = (canvasContext, info, style: any = {}) => {
    const { x, y, w, h } = info;
    const { backgroundColor = 'black' } = style;

    canvasContext.beginPath();
    canvasContext.fillStyle = backgroundColor;
    canvasContext.fillRect(x, y, w, h);
  }

  // initialize the canvas context
  useEffect(() => {
    // dynamically assign the width and height to canvas
    const canvasEle = canvas.current!;
    canvasEle.width = canvasEle.clientWidth;
    canvasEle.height = canvasEle.clientHeight;

    const canvasContextLocal = canvasEle.getContext("2d")!;
    // get context of the canvas
    setCanvasContext(canvasContextLocal);

    const r1Info = { x: 20, y: 30, w: 100, h: 50 };
    const r1Style = { borderColor: 'red', borderWidth: 10 };
    drawRect(canvasContextLocal, r1Info, r1Style);

    const r2Info = { x: 100, y: 100, w: 80, h: 150 };
    drawRect(canvasContextLocal, r2Info);

    const r3Info = { x: 250, y: 80, w: 80, h: 120 };
    drawFillRect(canvasContextLocal, r3Info, { backgroundColor: 'green' });

    const r4Info = { x: 200, y: 220, w: 100, h: 50 };
    drawFillRect(canvasContextLocal, r4Info);
  }, []);

  return (
    <div className="App">
      <canvas ref={canvas}></canvas>
    </div>
  );
}

const Renderer = (entities, window) => {
  return [
    <CanvasRenderer
      entities={entities} />
  ];
}

export default Renderer;
