// Reads an image file's width and height in pixels, in the browser.
// Loading an image takes a moment, so this returns a Promise: use `await`.
export function readImageSize(
  file: File,
): Promise<{ width: number; height: number }> {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const img = new window.Image();

    img.onload = () => {
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
      URL.revokeObjectURL(url); // free the temporary link
    };
    img.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error("Couldn't read the image"));
    };

    img.src = url;
  });
}
