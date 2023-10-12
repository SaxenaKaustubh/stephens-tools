import * as React from "react";
import { MenuWrapper, menuImageProps } from "./MenuWrapper";
import { Image } from "@fluentui/react/lib/Image";
import { AppContext } from "../../libs/context/AppProvider";
import { increaseOrDecreasePicture } from "../../libs/word/scale";

/* global require */

const IncreaseSize = () => {
  const { openModal } = React.useContext(AppContext);
  const onIncrease = async () => {
    try {
      await increaseOrDecreasePicture(true);
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
      title="Increase Size"
      aria-label="Increase Size"
      text="Increase Size"
      onClick={onIncrease}
      onRenderIcon={() => <Image {...menuImageProps} src={require("../../../../assets/images/increase.png")} />}
    />
  );
};

export default IncreaseSize;
