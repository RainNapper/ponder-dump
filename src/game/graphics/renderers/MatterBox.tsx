import React from 'react';
import Box from './Box';
import { posOf } from '../../entities/util';
import { IMatterEntity } from '../../entities';
import { IRendererProps } from '..';

const MatterBox = ({ entity }: IRendererProps<IMatterEntity>) => {
  return <Box
    dim={entity.dims}
    pos={entity.getPos()}
    style={entity.style}
  />
}

export default MatterBox;
