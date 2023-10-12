import Resizer from "react-image-file-resizer";
import { IPicture } from "../interface/PictureModel";

/* global console */

export const getPPILevel = (ppi: number) => {
  if (ppi < 96) {
    return 0;
  } else if (ppi >= 96 && ppi < 150) {
    return 1;
  } else if (ppi >= 150 && ppi < 220) {
    return 2;
  } else if (ppi >= 220 && ppi < 330) {
    return 3;
  } else if (ppi >= 330 && ppi < 450) {
    return 4;
  } else if (ppi >= 450) {
    return 5;
  }

  return 0;
};

export const resizePictureFile = async (picture: IPicture, ppi: number) => {
  return new Promise<IPicture>((resolve) => {
    try {
      let quality = 100;
      switch (ppi) {
        case 0:
          quality = 100;
          break;
        case 1:
          quality = 75;
          break;
        case 2:
          quality = 80;
          break;
        case 3:
          quality = 85;
          break;
        case 4:
          quality = 90;
          break;
        case 5:
          quality = 95;
          break;
        default:
          quality = 100;
          break;
      }
      Resizer.imageFileResizer(
        picture.file,
        picture.width,
        picture.height,
        "JPEG",
        quality,
        0,
        (uri) => {
          const base64URL = uri.toString().replace(/data:.+?,/, "");
          resolve({ ...picture, base64: base64URL });
        },
        "base64"
      );
    } catch (err) {
      console.log(err);
    }
  });
};
