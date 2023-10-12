/* global Word console */

import { IPicture } from "../../interface/PictureModel";

export const insertPicture = (pictures: IPicture[]) => {
  return new Promise((resolve, reject) => {
    Word.run(async (context) => {
      const paragraphs = context.document.getSelection().paragraphs;
      paragraphs.load();
      await context.sync();

      const syncableParagraphs: Word.Paragraph[] = [];
      const rangeParagraphNum = paragraphs.items.length;
      const neededParagraphNum = pictures.length * 2;

      if (rangeParagraphNum < neededParagraphNum) {
        for (let i = 0; i < paragraphs.items.length; i++) {
          const paragraph = paragraphs.items[i];
          paragraph.style = Word.BuiltInStyleName.normal;
          syncableParagraphs.push(paragraph);
        }
        for (let i = rangeParagraphNum; i < neededParagraphNum; i++) {
          const newParagraph = paragraphs.getLast().insertParagraph("", Word.InsertLocation.after);
          syncableParagraphs.push(newParagraph);
        }
      } else {
        for (let i = 0; i < neededParagraphNum; i++) {
          const paragraph = paragraphs.items[i];
          syncableParagraphs.push(paragraph);
        }
        for (let i = neededParagraphNum; i < rangeParagraphNum; i++) {
          const paragraph = paragraphs.items[i];
          paragraph.delete();
        }
      }

      for (let i = 0; i < syncableParagraphs.length; i++) {
        const paragraph = syncableParagraphs[i];
        if (i % 2 === 0) {
          const index = Math.trunc(i * 0.5);
          paragraph.insertText("", Word.InsertLocation.replace);
          paragraph.insertInlinePictureFromBase64(pictures[index].base64, Word.InsertLocation.start);
        } else {
          paragraph.insertText("", Word.InsertLocation.replace);
          paragraph.style = "Photo Captions";
        }
      }

      await context.sync();

      resolve(true);
    }).catch((err) => {
      console.log("word run error = ", err);
      reject(err);
    });
  });
};

export const rearrangePictures = async () => {
  return new Promise((resolve, reject) => {
    Word.run(async (context) => {
      const inlinePictures = context.document.getSelection().inlinePictures;
      inlinePictures.load();
      await context.sync();

      const images = [];
      for (let i = 0; i < inlinePictures.items.length; i++) {
        const inlinePicture = inlinePictures.items[i];
        const pictureContext = inlinePicture.context;

        inlinePicture.load("value");
        await pictureContext.sync();
        images.push(inlinePicture.getBase64ImageSrc());
      }

      const paragraphs = context.document.getSelection().paragraphs;
      paragraphs.load();
      await context.sync();

      for (let i = 0; i < paragraphs.items.length; i++) {
        const paragraph = paragraphs.items[i];
        paragraph.style = Word.BuiltInStyleName.normal;
      }
      await context.sync();

      if (images.length === 1) {
        const paragraph = paragraphs.items[0];
        paragraph.insertText("", Word.InsertLocation.replace);
        paragraph.alignment = Word.Alignment.centered;
        paragraph.spaceAfter = 0;
        paragraph.insertInlinePictureFromBase64(images[0].m_value, Word.InsertLocation.start).width = 3.2 * 72;

        for (let i = 1; i < paragraphs.items.length; i++) {
          const paragraph = paragraphs.items[i];
          paragraph.delete();
        }
      }
      if (images.length === 2) {
        const paragraph = paragraphs.items[0];
        paragraph.insertText("\t", Word.InsertLocation.replace);
        paragraph.alignment = Word.Alignment.left;
        paragraph.spaceAfter = 0;
        paragraph.insertInlinePictureFromBase64(images[0].m_value, Word.InsertLocation.start).width = 3.2 * 72;
        paragraph.insertInlinePictureFromBase64(images[1].m_value, Word.InsertLocation.end).width = 3.2 * 72;

        for (let i = 1; i < paragraphs.items.length; i++) {
          const paragraph = paragraphs.items[i];
          paragraph.delete();
        }
      }

      if (images.length > 2) {
        let boundaryId = 0;
        if (images.length % 2 === 0) {
          for (let i = 0; i < images.length; i += 2) {
            const isLast = i === images.length - 1 || i === images.length - 2;
            const paragraphIndex = Math.trunc(i * 0.5);
            const paragraph = paragraphs.items[paragraphIndex];
            paragraph.insertText("\t", Word.InsertLocation.replace);
            paragraph.alignment = Word.Alignment.left;
            paragraph.spaceAfter = isLast ? 0 : 6;
            paragraph.insertInlinePictureFromBase64(images[i].m_value, Word.InsertLocation.start).width = 3.2 * 72;
            paragraph.insertInlinePictureFromBase64(images[i + 1].m_value, Word.InsertLocation.end).width = 3.2 * 72;
          }
          boundaryId = Math.trunc(images.length * 0.5);
        } else {
          for (let i = 0; i < images.length - 1; i += 2) {
            const paragraphIndex = Math.trunc(i * 0.5);
            const paragraph = paragraphs.items[paragraphIndex];
            paragraph.insertText("\t", Word.InsertLocation.replace);
            paragraph.alignment = Word.Alignment.left;
            paragraph.spaceAfter = 6;
            paragraph.insertInlinePictureFromBase64(images[i].m_value, Word.InsertLocation.start).width = 3.2 * 72;
            paragraph.insertInlinePictureFromBase64(images[i + 1].m_value, Word.InsertLocation.end).width = 3.2 * 72;
          }
          const paragraphLastIndex = Math.trunc((images.length - 1) * 0.5);
          const paragraph = paragraphs.items[paragraphLastIndex];
          paragraph.insertText("", Word.InsertLocation.replace);
          paragraph.alignment = Word.Alignment.centered;
          paragraph.spaceAfter = 0;
          paragraph.insertInlinePictureFromBase64(images[images.length - 1].m_value, Word.InsertLocation.start).width =
            3.2 * 72;
          boundaryId = Math.trunc(images.length * 0.5) + 1;
        }

        for (let i = boundaryId; i < paragraphs.items.length; i++) {
          const paragraph = paragraphs.items[i];
          paragraph.delete();
        }
      }

      await context.sync();
      resolve("success");
    }).catch((err) => {
      console.log("word run error = ", err);
      reject(err);
    });
  });
};
