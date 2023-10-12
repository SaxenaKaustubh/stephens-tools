import * as React from "react";
import { MenuWrapper, menuImageProps } from "./MenuWrapper";
import { Image } from "@fluentui/react/lib/Image";
import { rearrangePictures } from "../../libs/word/picture";
import { AppContext } from "../../libs/context/AppProvider";

/* global require */

const RearrangePictures = () => {
  const { setLoadingState, openModal } = React.useContext(AppContext);
  const onRearrange = async () => {
    try {
      setLoadingState(true);

      const result = await rearrangePictures();
      setLoadingState(false);
      if (result === "success") {
        openModal({
          visible: true,
          message: "The Selected Photographs are rearranged successfully!",
          status: "success",
        });
      } else {
        openModal({
          visible: true,
          message: "No selected Photographs, please select photographs first!",
          status: "warning",
        });
      }
    } catch (error) {
      setLoadingState(false);
      openModal({
        visible: true,
        message: "Rearrange Pictures failed!",
        status: "error",
      });
    }
  };
  return (
    <MenuWrapper
      text="Rearrange Pictures"
      title="Rearrange Pictures"
      onClick={onRearrange}
      onRenderIcon={() => <Image {...menuImageProps} src={require("../../../../assets/images/arrange-pictures.png")} />}
    />
  );
};

export default RearrangePictures;
