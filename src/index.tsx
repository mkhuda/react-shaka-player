// import * as shaka from 'shaka-player/dist/shaka-player.compiled';
import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";

/**
 * A React component for shaka-player.
 * @param {string} src
 * @param {shaka.extern.PlayerConfiguration} config
 * @param {boolean} autoPlay
 * @param {number} width
 * @param {number} height
 * @param ref
 * @returns {*}
 * @constructor
 */

export interface PlayerRefs {
  player?: Shaka.Player | undefined;
  ui?: Shaka.ui.Overlay | undefined;
  videoElement?: any;
}

export interface PlayerProps {
  src?: string;
  config?: any;
  chromeless?: boolean | undefined;
  autoPlay?: boolean | undefined;
  children?: any;
  className?: string;
}

const Player = React.forwardRef((props: PlayerProps, ref) => {
  const uiContainerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [player, setPlayer] = React.useState<Shaka.Player | null>(null);
  const [ui, setUi] = React.useState<Shaka.ui.Overlay | null>(null);

  React.useEffect(() => {
    const player = new Shaka.Player(videoRef.current);
    setPlayer(player);

    if (!props.chromeless) {
      const ui = new Shaka.ui.Overlay(
        player,
        uiContainerRef.current,
        videoRef.current
      );
      setUi(ui);
    }

    return () => {
      player.destroy();
      if (ui) {
        ui.destroy();
      }
    };
  }, []);

  React.useEffect(() => {
    if (player && props.config) {
      player.configure(props.config);
    }
  }, [player, props.config]);

  React.useEffect(() => {
    if (player && props.src) {
      player.load(props.src);
    }
  }, [player, props.src]);

  React.useImperativeHandle(
    ref,
    () => ({
      get player() {
        return player;
      },
      get ui() {
        return ui;
      },
      get videoElement() {
        return videoRef.current;
      },
    }),
    [player, ui]
  );

  return (
    <div ref={uiContainerRef} className={props.className}>
      <video
        ref={videoRef}
        style={{
          maxWidth: "100%",
          width: "100%",
        }}
        {...props}
      />
    </div>
  );
});

export default Player as React.FC<any>;
