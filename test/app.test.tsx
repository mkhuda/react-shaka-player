import * as React from "react";
import * as renderer from "react-test-renderer";
import * as Shaka from "shaka-player/dist/shaka-player.ui";
import Player from "../src";

it("Player renders correctly", () => {
  const props = { className: "video-test" };
  const tree = renderer.create(<Player {...props} />).toJSON();
  expect(tree).toMatchSnapshot();
});

jest.mock("shaka-player/dist/shaka-player.ui");

it("Shaka player called correctly", () => {
  const component = renderer.create(<Player />);
  expect(Shaka.Player).toHaveBeenCalled();
  expect(Shaka.ui.Overlay).toHaveBeenCalled();
});
