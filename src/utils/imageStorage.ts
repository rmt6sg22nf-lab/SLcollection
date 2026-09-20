// Manages custom uploaded images in browser IndexedDB/LocalStorage

const DB_NAME = 'sl_collection_db';
const STORE_NAME = 'product_photos';

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    if (typeof window === 'undefined' || !window.indexedDB) {
      return reject(new Error('IndexedDB not supported'));
    }
    const request = indexedDB.open(DB_NAME, 1);
    request.onupgradeneeded = () => {
      const db = request.result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'filename' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });
}

export async function saveProductPhoto(filename: string, file: File): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      const reader = new FileReader();
      reader.onload = async () => {
        const dataUrl = reader.result as string;
        try {
          const db = await openDB();
          const tx = db.transaction(STORE_NAME, 'readwrite');
          const store = tx.objectStore(STORE_NAME);
          store.put({ filename, dataUrl, updatedAt: Date.now() });
          tx.oncomplete = () => {
            // Also notify listeners
            window.dispatchEvent(new CustomEvent('sl_photo_updated', { detail: { filename, dataUrl } }));
            resolve(dataUrl);
          };
          tx.onerror = () => reject(tx.error);
        } catch (e) {
          // fallback to localStorage for small thumbs
          try {
            localStorage.setItem(`sl_img_${filename}`, dataUrl);
            window.dispatchEvent(new CustomEvent('sl_photo_updated', { detail: { filename, dataUrl } }));
            resolve(dataUrl);
          } catch {
            resolve(dataUrl);
          }
        }
      };
      reader.onerror = () => reject(reader.error);
      reader.readAsDataURL(file);
    } catch (err) {
      reject(err);
    }
  });
}

export async function getProductPhoto(filename: string): Promise<string | null> {
  try {
    const db = await openDB();
    return new Promise((resolve) => {
      const tx = db.transaction(STORE_NAME, 'readonly');
      const store = tx.objectStore(STORE_NAME);
      const req = store.get(filename);
      req.onsuccess = () => {
        if (req.result && req.result.dataUrl) {
          resolve(req.result.dataUrl);
        } else {
          const local = localStorage.getItem(`sl_img_${filename}`);
          resolve(local);
        }
      };
      req.onerror = () => {
        const local = localStorage.getItem(`sl_img_${filename}`);
        resolve(local);
      };
    });
  } catch {
    const local = typeof window !== 'undefined' ? localStorage.getItem(`sl_img_${filename}`) : null;
    return local;
  }
}
