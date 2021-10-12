import React, { useEffect, useState } from "react";
import Matter from "matter-js";
import { GameEngine, DefaultRenderer } from "react-game-engine";
import Physics from "./systems/physics"

import "../index.css";
import { IEntity, IMatterEntity, ITextEntity } from "./entities";
import { IDim } from "./graphics";
import useWindowDimensions from "./graphics/window";
import { IEntityRenderer } from "./graphics/renderers";
import Background from "./graphics/renderers/Background";
import MatterBox from "./graphics/renderers/MatterBox";
import { BackgroundEntity, BarEntity } from "./entities/entities";
import { AnyLoader, LatheBufferGeometry } from "three";
import TempoSystem from "./systems/tempo";
import InputSystem from "./systems/input";
import Text from "./graphics/renderers/Word";

export type INote = {
  text: string;
  time: number;
}

export type IEntities = {
  physics: {
    engine: any,
    world: any,
    windowDims: IDim,
  };
  background: IEntityRenderer;
  mainBar: IEntityRenderer<IMatterEntity>;
  [key: string]: any;
  timeState: {
    bpm: number;
    velocity: number;
    currentBarNum: number;
    startTime: number;
    notes: INote[];
    targetNoteIdx: number;
    renderedNoteIdx?: number;
  },
  score: {
    deltas: (number | undefined)[];
  }
  keyPress: IEntityRenderer<ITextEntity>;
  clock: IEntityRenderer<ITextEntity>;
}

const Game = () => {
  const [gameEngine, setGameEngine] = useState(undefined);
  const [entities, setEntities] = useState<IEntities | undefined>(undefined);
  const windowDims: IDim = useWindowDimensions();

  useEffect(() => {
    const setupWorld = (): IEntities => {
      let engine = Matter.Engine.create();
      engine.gravity = { scale: 0.0, x: 0.0, y: 0.0 };
      let world = engine.world;

      const background = BackgroundEntity(windowDims);

      const barStartX = windowDims.w / 5;
      // const remainingX = windowDims.w - barStartX;
      // const spacing = 400;
      // const numBars = remainingX / spacing + 1;
      // const movingBarsWithRenderer: { [key: number]: IEntityRenderer<IMatterEntity> } = {}
      // for (let i = 0; i < numBars; i++) {
      //   const bar = BarEntity(windowDims, barStartX + i * spacing)
      //   movingBarsWithRenderer[`movingBar_${i}`] = {
      //     entity: bar,
      //     renderer: Bar,
      //   }
      // }
      const mainBar = BarEntity(windowDims, barStartX, true);
      // Matter.Events.on(engine, 'collisionStart', (event) => {
      //   console.log("Detected collision");
      //   event.pairs.forEach(p => {
      //     if (p.bodyA.type === "bar") {
      //       console.log("Detected collision");
      //       Matter.World.remove(world, p.bodyA)
      //     }
      //     if (p.bodyB.type === "bar") {
      //       Matter.World.remove(world, p.bodyB)
      //     }
      //   });
      // });

      Matter.World.add(
        world,
        [
          mainBar.body,
          // ...Object.values(movingBarsWithRenderer)
          //   .map(b => b.entity.body)
        ]
      );

      const notes = [
        { time: 1000, text: "a" },
        { time: 2000, text: "b" },
        { time: 2500, text: "c" },
        { time: 3000, text: "d" },
        { time: 3333, text: "a" },
        { time: 3666, text: "b" },
        { time: 4000, text: "c" },
        { time: 6000, text: "d" },
        { time: 9000, text: "e" },
      ];
      return {
        physics: { engine: engine, world: world, windowDims },
        background: {
          entity: background,
          renderer: Background,
        },
        mainBar: {
          entity: mainBar,
          renderer: MatterBox,
        },
        timeState: {
          bpm: 60,
          velocity: 0.2,
          currentBarNum: 1,
          startTime: 3000,
          notes,
          targetNoteIdx: 0,
          renderedNoteIdx: undefined,
        },
        score: {
          deltas: [],
        },
        keyPress: {
          entity: {
            text: "[Key Press]",
            style: {},
            dims: { w: 0, h: 0 },
            getPos: () => { return { x: windowDims.w - 100, y: 25 } },
          },
          renderer: Text
        },
        clock: {
          entity: {
            text: "0:00",
            style: {},
            dims: { w: 0, h: 0 },
            getPos: () => { return { x: 100, y: 25 } },
          },
          renderer: Text
        }
      };
    }

    setEntities(setupWorld())
  }, [windowDims])

  if (!entities) {
    return <div>Loading...</div>
  }

  return (
    <GameEngine
      ref={(ref) => { setGameEngine(ref) }}
      className="game"
      entities={entities}
      systems={[Physics, TempoSystem, InputSystem]}
      running={true}
    >
    </GameEngine>
  );
}

export default Game;
