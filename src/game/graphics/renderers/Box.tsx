import React, { FunctionComponent, PropsWithChildren } from 'react';
import { IDim, IPos } from '..';

export interface IBoxProps {
  dim: IDim;
  pos: IPos;
  style: React.CSSProperties;
}
export type x = FunctionComponent
const Box = ({ dim, pos, style, children }: PropsWithChildren<IBoxProps>) => {
  const combinedStyle: React.CSSProperties = {
    ...style,
    position: "absolute",
    width: dim.w,
    height: dim.h,
    left: pos.x - (dim.w / 2),
    top: pos.y - (dim.h / 2),
  };
  return <div style={combinedStyle}>
    {children}
  </div>
}

export default Box;
