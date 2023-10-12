import * as React from "react";
import { MenuWrapper, menuImageProps } from "./MenuWrapper";
import { Image } from "@fluentui/react/lib/Image";
import { AppContext } from "../../libs/context/AppProvider";
import { increaseOrDecreasePicture } from "../../libs/word/scale";

/* global require */

const DecreaseSize = () => {
  const { openModal } = React.useContext(AppContext);
  const onDecrease = async () => {
    try {
      await increaseOrDecreasePicture(false);
    } catch (error) {
      openModal({
        visible: true,
        message: "Increase Size failed!",
        status: "error",
      });
    }
  };
  return (
    <MenuWrapper
      title="Decrease Size"
      aria-label="Decrease Size"
      text="Decrease Size"
      onClick={onDecrease}
      onRenderIcon={() => <Image {...menuImageProps} src={require("../../../../assets/images/reduce.png")} />}
    />
  );
};

export default DecreaseSize;
