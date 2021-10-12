import { FunctionComponent } from "react";
import { IRendererProps } from "..";
import { IEntity } from "../../entities";

export interface IEntityRenderer<T extends IEntity = IEntity> {
  entity: T;
  renderer: FunctionComponent<IRendererProps<T>>;
}
