/* global Word console */

export const increaseOrDecreasePicture = async (isIncrease: boolean) => {
  return new Promise((resolve, reject) => {
    Word.run(async (context) => {
      const inlinePictures = context.document.getSelection().inlinePictures;
      inlinePictures.load();

      console.log(inlinePictures, isIncrease);
      await context.sync();

      for (const inlinePicture of inlinePictures.items) {
        const inlinePictureContext = inlinePicture.context;
        inlinePictures.load("width");
        await inlinePictureContext.sync();

        isIncrease ? (inlinePicture.width += 0.05 * 72) : (inlinePicture.width -= 0.05 * 72);
        await inlinePictureContext.sync();
      }

      await context.sync();
      resolve("success");
    }).catch((err) => {
      console.log("word run error = ", err);
      reject(err);
    });
  });
};
