import { IDim, IPos } from "../graphics";
import { IMatterEntity } from ".";
import { Body } from "matter-js";

const posOf = (body: Body, dims: IDim): IPos => {
  return {
    x: body.position.x,
    y: body.position.y,
  };
}

const posOfEntity = (entity: IMatterEntity): IPos => {
  return posOf(entity.body, entity.dims);
}

export {
  posOf,
  posOfEntity,
}
