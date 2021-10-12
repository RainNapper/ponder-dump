import React from 'react'
import { IRendererProps } from '..';
import Box from "./Box";

const Background = ({ entity }: IRendererProps) => {
  return <Box
    dim={entity.dims}
    pos={{ x: 0, y: 0 }}
    style={entity.style}
  />
}

export default Background
