/* global Office console */

export const setOfficeApi = () => {
  return new Promise((resolve, reject) => {
    if (Office.context.requirements.isSetSupported("WordApi", "1.3")) {
      console.log("---------------------", Office.context);
      resolve(true);
    } else {
      console.log("====================");
      reject();
    }
  });
};
