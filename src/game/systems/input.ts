import { IInput, ISystem } from ".";
import { IMatterEntity } from "../entities";
import { IEntityRenderer } from "../graphics/renderers";


const InputSystem: ISystem = (entities, { time, input }) => {
  const { notes, targetNoteIdx, startTime, bpm } = entities.timeState;
  const timeZero = time.current - startTime;
  let targetNote = notes[targetNoteIdx];
  let timeUntilTargetNote = Math.abs(timeZero - targetNote.time)

  const mspb = (60000 / bpm)
  const missThreshold = mspb / 4;
  const alreadyHitTargetNote = entities.score.deltas.length > targetNoteIdx;
  const canHitTargetNote = timeUntilTargetNote < missThreshold && !alreadyHitTargetNote;
  const targetNoteRenderer = entities[`note_${targetNoteIdx}`] as IEntityRenderer<IMatterEntity>

  const onTargetNoteMiss = () => {
    targetNoteRenderer.entity.style.backgroundColor = "black";
  }

  // Check if it's been missed
  const missedTargetNote = timeZero > targetNote.time + missThreshold;
  if (!alreadyHitTargetNote && missedTargetNote) {
  }

  const nextNote = targetNoteIdx + 1 < notes.length ? notes[targetNoteIdx + 1] : undefined;
  if (nextNote) {
    const nextNoteDistance = Math.abs(timeZero - nextNote.time)
    if (missedTargetNote || nextNoteDistance < timeUntilTargetNote) {
      entities.timeState.targetNoteIdx = targetNoteIdx + 1;
      if (!alreadyHitTargetNote) {
        onTargetNoteMiss();
      }
      targetNote = nextNote;
      timeUntilTargetNote = nextNoteDistance;
    }
  }




  const handleKeyDown = (input: IInput<KeyboardEvent>) => {
    let description: string;
    if (canHitTargetNote) {
      const key = input.payload.key;
      if (key !== targetNote.text) {
        targetNoteRenderer.entity.style.borderColor = "red";
        targetNoteRenderer.entity.style.backgroundColor = "#aaaaaa";
        description = "wrong"
        entities.score.deltas.push(undefined);
      } else {
        const delta = Math.abs(timeZero - targetNote.time);
        entities.score.deltas.push(delta);
        let color: string;
        if (delta < 20) {
          description = "perfect";
          color = "#aaaaff"
        } else if (delta < 40) {
          description = "good";
          color = "#aaffaa"
        } else if (delta < 80) {
          description = "okay";
          color = "#ddddaa"
        } else if (delta < 150) {
          description = "bad";
          color = "#ddaaaa"
        } else {
          description = "yikes";
          color = "#dd8888"
        }

        description += ` (${delta})`;
        targetNoteRenderer.entity.style.backgroundColor = color;
      }
    } else {
      description = "miss";
    }
    const text = `[${input.payload.key}] ${description}`;
    entities.keyPress.entity.text = text
    console.log(text);
  }

  const keyDowns = input.filter(e => e.name === "onKeyDown")
  if (keyDowns.length !== 0) {
    keyDowns.forEach(k => handleKeyDown(k as IInput<KeyboardEvent>))
  }

  return entities;
}

export default InputSystem;
