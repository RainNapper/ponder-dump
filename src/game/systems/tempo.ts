import Matter from "matter-js";
import { deflateSync } from "zlib";
import { ISystem } from ".";
import { IMatterEntity } from "../entities";
import { BarEntity, NoteEntity } from "../entities/entities";
import { IEntityRenderer } from "../graphics/renderers";
import MatterBox from "../graphics/renderers/MatterBox";
import MatterBoxWithText from "../graphics/renderers/MatterBoxWithText";

const TempoSystem: ISystem = (entities, { time }) => {
  const { engine, world, windowDims } = entities.physics;
  const { notes, targetNoteIdx, renderedNoteIdx, bpm, currentBarNum, startTime, velocity } = entities.timeState;
  const timeZero = time.current - startTime;

  const mainBar = entities.mainBar;
  const mainBarPos = mainBar.entity.getPos();

  const timeSec = (time.current / 1000) % 60 | 0;
  const timeMin = time.current / (1000 * 60) | 0;
  const clockText = `${timeMin}:${timeSec < 10 ? "0" + timeSec : timeSec}`;
  if (entities.clock.entity.text !== clockText) {
    entities.clock.entity.text = clockText;
  }

  const startX = windowDims.w - 5;
  const endX = mainBarPos.x;
  // Area past the bar before it disappears
  const deadX = endX - 200;
  const travelWidth = startX - endX;
  const mspb = (60000 / bpm)
  const nextBarTime = currentBarNum * mspb
  // velocity is pixels per ms
  const millisToTravelFullWidth = travelWidth / velocity

  let lastBarX = -1;
  Object.keys(entities).forEach(k => {
    if (k.startsWith("bar_") || k.startsWith("note_")) {
      const entity = (entities[k] as IEntityRenderer<IMatterEntity>).entity
      const entityPos = entity.getPos();
      const newX = entityPos.x - (velocity * time.delta);
      if (newX < deadX) {
        Matter.World.remove(world, entity.body);
        delete entities[k];
      } else {
        Matter.Body.translate(entity.body, { x: -velocity * time.delta, y: 0 });
        lastBarX = Math.max(entity.body.position.x, lastBarX);
      }
    }
  });

  const maybeRenderItemForTime = (targetTime: number, render: (x: number) => void) => {
    const millisUntilTarget = targetTime - timeZero;
    if (millisUntilTarget <= millisToTravelFullWidth) {
      const x = endX + millisUntilTarget * velocity
      if (x <= windowDims.w) {
        render(x);
      }
    }
  }

  maybeRenderItemForTime(
    nextBarTime,
    (x) => {
      const newBar = BarEntity(windowDims, x);
      entities[`bar_${currentBarNum}`] = {
        entity: newBar,
        renderer: MatterBox,
      }
      entities.timeState.currentBarNum += 1;
      Matter.World.add(world, [newBar.body]);
    }
  );

  const nextRenderedNoteIdx = renderedNoteIdx !== undefined ? renderedNoteIdx + 1 : 0;
  if (nextRenderedNoteIdx < notes.length) {
    // There are more notes
    const nextNoteToRender = notes[nextRenderedNoteIdx]
    maybeRenderItemForTime(
      nextNoteToRender.time,
      (x) => {
        const key = `note_${nextRenderedNoteIdx}`;
        entities[key] = {
          entity: NoteEntity(nextNoteToRender.text, windowDims, x),
          renderer: MatterBoxWithText,
        }
        // console.log(`spawned note ${key} at time: ${time.current}`)
        entities.timeState.renderedNoteIdx = nextRenderedNoteIdx;
      },
    )
  }

  // Quarter note

  Matter.Engine.update(engine, time.delta);
  return entities;
}

export default TempoSystem;
