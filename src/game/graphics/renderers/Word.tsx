import { textChangeRangeIsUnchanged } from "typescript";
import { IEntityRenderer } from ".";
import { IPos, IRendererProps } from "..";
import { ITextEntity } from "../../entities";

const Text = ({ entity }: IRendererProps<ITextEntity>) => {
  const { text, style, getPos } = entity;
  const pos = getPos();
  const combinedStyle: React.CSSProperties = {
    ...style,
    position: "absolute",
    left: pos.x,
    top: pos.y,
  };
  return <div style={combinedStyle}>{text}</div>
}

export default Text
