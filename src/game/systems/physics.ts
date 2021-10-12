import Matter from "matter-js";
import { IMatterEntity } from "../entities";
import { posOf } from "../entities/util";
import { IEntities } from "../Game";
import { IEntityRenderer } from "../graphics/renderers";

const Physics = (entities: IEntities, { touches, time }) => {
  const { engine, world } = entities.physics;



  return entities;
};

export default Physics;
