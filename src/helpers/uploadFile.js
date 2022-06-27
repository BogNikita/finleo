import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { storage } from '../../firebase';

export async function uploadImageAsync(uri) {
  const blob = await new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      resolve(xhr.response);
    };
    xhr.onerror = function () {
      reject(new TypeError('Network request failed'));
    };
    xhr.responseType = 'blob';
    xhr.open('GET', uri, true);
    xhr.send(null);
  });
  const storageRef = ref(storage, `${Date.now()}-avatar.jpg`);

  await uploadBytes(storageRef, blob);
  blob.close();
  const url = await getDownloadURL(storageRef);
  return url;
}
