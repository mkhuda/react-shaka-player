import * as Shaka from "shaka-player/dist/shaka-player.ui";

export interface PlayerRefs {
    player: Shaka.Player;
    ui: Shaka.ui.Overlay;
    videoElement: HTMLVideoElement;
}

export interface PlayerProps {
    src?: string;
    config?: any;
    autoPlay?: boolean | undefined;
    children?: any;
    className?: string;
    playerClassName?: string;
    onLoad?(data: PlayerRefs): void;
    onBuffering?(event: boolean): void;
}
