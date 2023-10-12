import * as React from "react";
import { Image, IImageProps, ImageFit } from "@fluentui/react/lib/Image";

/* global require */

const imageProps: IImageProps = {
  imageFit: ImageFit.centerContain,
  width: 100,
  height: 100,
  // Show a border around the image (just for demonstration purposes)
  //   styles: (props) => ({ root: { border: "1px solid " + props.theme.palette.neutralSecondary } }),
};

export const Logo = () => {
  return (
    <section className="ms-welcome__header">
      <Image {...imageProps} src={require("./../../../assets/logo-filled.png")} alt="Logo" />
    </section>
  );
};
