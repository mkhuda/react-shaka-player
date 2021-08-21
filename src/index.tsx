import * as Shaka from "shaka-player/dist/shaka-player.ui";
import * as React from "react";
export interface PlayerRefs {
  player?: Shaka.Player | undefined;
  ui?: Shaka.ui.Overlay | undefined;
  videoElement?: any;
}

export interface PlayerProps {
  src?: string;
  config?: any;
  autoPlay?: boolean | undefined;
  children?: any;
  className?: string;
  playerClassName?: string;
}

const Player = React.forwardRef((props: PlayerProps, ref) => {
  const uiContainerRef = React.useRef<HTMLDivElement>(null);
  const videoRef = React.useRef<HTMLVideoElement>(null);

  const [player, setPlayer] = React.useState<Shaka.Player | null>(null);
  const [ui, setUi] = React.useState<Shaka.ui.Overlay | null>(null);

  React.useEffect(() => {
    Shaka.polyfill.installAll();
    const player = new Shaka.Player(videoRef.current);
    setPlayer(player);

    if (player) {
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
    if (player && props.src && Shaka.Player.isBrowserSupported()) {
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

  let { className, playerClassName, ...newProps } = props;

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
});

export default Player as React.FC<any>;
