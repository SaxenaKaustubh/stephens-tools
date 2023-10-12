/* global Word console */

export const setCaptionParagragh = () => {
  return new Promise((resolve, reject) => {
    Word.run(async (context) => {
      const styleName = "Normal";

      const style = context.document.getStyles().getByNameOrNullObject(styleName);
      style.load();
      await context.sync();

      if (style.isNullObject) {
        console.warn(`There's no existing style with the name '${styleName}'.`);
      } else {
        style.paragraphFormat.keepWithNext = true;
        console.log(`Successfully the paragraph format of the '${styleName}' style.`);
      }
      resolve(true);
    }).catch((err) => {
      console.log("word run error = ", err);
      reject(err);
    });
  });
};
