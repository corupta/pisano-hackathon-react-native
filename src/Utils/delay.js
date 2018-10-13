export const delay = (duration) => new Promise((resolve) => {
  setTimeout(() => {
    resolve(true);
  }, duration);
});
