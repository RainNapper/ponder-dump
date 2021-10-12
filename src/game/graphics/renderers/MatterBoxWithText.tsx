import React from 'react';
import Box from './Box';
import { IMatterEntity, ITextEntity } from '../../entities';
import { IRendererProps } from '..';

const MatterBoxWithText = ({ entity }: IRendererProps<IMatterEntity & ITextEntity>) => {
  return <Box
    dim={entity.dims}
    pos={entity.getPos()}
    style={{
      textAlign: 'center',
      fontSize: "2em",
      color: "black",
      border: "3px solid black",
      ...entity.style
    }}
  >
    {entity.text}
  </Box>
}

export default MatterBoxWithText;
