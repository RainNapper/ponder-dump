import { IEntity } from "../entities";
import { IEntityRenderer } from "./renderers";

export interface IRendererProps<T extends IEntity = IEntity> {
  window: any;
  key: string;
  entity: T;
}

export interface IDim {
  w: number;
  h: number;
}

export interface IPos {
  x: number;
  y: number;
}
