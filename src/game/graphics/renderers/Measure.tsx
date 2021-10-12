import { IMatterEntity } from "../../entities";
import Box from "./Box";
import { posOf } from "../../entities/util";
import { IEntityRenderer } from ".";

const Measure = ({ entity }: IEntityRenderer<IMatterEntity>) => {
  return <Box
    dim={entity.dims}
    pos={entity.getPos()}
    style={entity.style}
  />
}

export default Measure
