import { IDim, IPos } from "../graphics";

export interface IEntity {
  dims: IDim;
  style: React.CSSProperties;
  getPos: () => IPos;
}

export interface IMatterEntity extends IEntity {
  body: Matter.Body;
}

export interface ITextEntity extends IEntity {
  text: string;
}
