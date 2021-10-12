import { IEntities } from "../Game"

export type ISystemTime = {
  current: number,
  previous: number,
  delta: number,
  previousDelta: number,
}

export type IInput<T extends Event> = {
  name: string,
  payload: T,
}

export type ISystem =
  (
    entities: IEntities,
    extras: { time: ISystemTime, input: IInput<any>[] }
  ) => IEntities;
