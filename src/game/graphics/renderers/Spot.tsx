import { IEntityRenderer } from ".";
import Box from "./Box";

const Spot = ({ entity }: IEntityRenderer) => {
  return <Box
    dim={entity.dims}
    pos={{ x: 0, y: 0 }}
    style={entity.style}
  />
}

export default Spot
