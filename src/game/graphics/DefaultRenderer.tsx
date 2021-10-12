import React, { Component } from "react";
import { IEntityRenderer } from "./renderers";

const DefaultRenderer = (entities: { [key: string]: IEntityRenderer }, window: any) => {
  if (!entities || !window) {
    return null;
  }

  return Object.keys(entities)
    .map(key => {
      let entity = entities[key];
      if (typeof entity.renderer === "function") {
        return (
          <entity.renderer key={key} window={window} {...entity} />
        );
      }
    });
};
