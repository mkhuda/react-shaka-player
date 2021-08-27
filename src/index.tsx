import * as React from "react";
import * as Hooks from "./hooks";

import { PlayerProps } from "./types/";

const Player = (props: PlayerProps) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const uiContainerRef = React.useRef<HTMLDivElement>(null);

  const { player } = Hooks.usePlayer(videoRef, uiContainerRef, props);
  Hooks.useCallback(player, props);

  const { className, playerClassName, onLoad, onBuffering, ...newProps } =
    props;

  return (
    <div ref={uiContainerRef} className={props.className}>
      <video
        ref={videoRef}
        className={props.playerClassName}
        style={{
          maxWidth: "100%",
          width: "100%",
        }}
        {...newProps}
      />
    </div>
  );
};

export default Player as React.FC<PlayerProps>;
