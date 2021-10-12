
import Matter from "matter-js";
import { IEntity, IMatterEntity, ITextEntity } from ".";
import { IDim } from "../graphics";
import { posOf } from "./util";

export type INoteEntity = IMatterEntity & ITextEntity;
const NoteEntity = (text: string, windowDims: IDim, x: number): INoteEntity => {
  const noteSize: IDim = {
    w: 50,
    h: 50,
  };
  let body = Matter.Bodies.rectangle(
    x,
    windowDims.h / 2 - noteSize.h,
    noteSize.w,
    noteSize.h,
    { type: "note" }
  );
  return {
    dims: noteSize,
    style: {
      backgroundColor: "white",
    },
    text: text,
    body: body,
    getPos: () => { return posOf(body, noteSize) }
  }
}

const BarEntity = (windowDims: IDim, x: number, primary: boolean = false): IMatterEntity => {
  const barSize: IDim = {
    w: primary ? 5 : 3,
    h: windowDims.h
  };
  let body = Matter.Bodies.rectangle(
    x,
    windowDims.h / 2,
    barSize.w,
    barSize.h,
    { type: primary ? "mainBar" : "bar" }
  )
  if (primary) {
    Matter.Body.setStatic(body, true)
  }
  return {
    dims: barSize,
    style: {
      backgroundColor: primary ? "black" : "#aaaaaa",
    },
    body: body,
    getPos: () => { return posOf(body, barSize) }
  }
}

const BackgroundEntity = (windowDims: IDim): IEntity => {
  return {
    dims: { ...windowDims },
    style: {
      backgroundColor: "white",
      border: "5px",
      borderColor: "black",
    },
    getPos: () => { return { x: 0, y: 0 } },
  };
}

export {
  NoteEntity,
  BarEntity,
  BackgroundEntity,
}
