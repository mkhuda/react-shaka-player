import * as Shaka from "shaka-player/dist/shaka-player.ui";

export interface PlayerRefs {
    player: Shaka.Player;
    ui: Shaka.ui.Overlay;
    videoElement: HTMLVideoElement;
}

export interface PlayerProps {
    src?: string;
    config?: shaka.extern.PlayerConfiguration | any;
    uiConfig?: shaka.extern.UIConfiguration | any;
    autoPlay?: boolean | undefined;
    playsInline?: boolean | undefined;
    children?: any;
    className?: string;
    playerClassName?: string;
    onLoad?(data: PlayerRefs): void;
    onPlay?(): void | undefined;
    onPause?(): void | undefined;
    onPlayerError?(event: Shaka.extern.Error): void;
    onBuffering?(event: boolean): void;
}
