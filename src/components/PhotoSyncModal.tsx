import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Upload, CheckCircle2, Image as ImageIcon, Sparkles, Check, RefreshCw } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { saveProductPhoto, getProductPhoto } from '../utils/imageStorage';

interface PhotoSyncModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoSyncModal: React.FC<PhotoSyncModalProps> = ({ isOpen, onClose }) => {
  const [syncedCount, setSyncedCount] = useState<number>(0);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [photoThumbnails, setPhotoThumbnails] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!isOpen) return;
    // Load existing stored thumbnails
    const loadThumbs = async () => {
      const thumbs: Record<string, string> = {};
      for (const p of PRODUCTS) {
        const stored = await getProductPhoto(p.photoName);
        if (stored) {
          thumbs[p.photoName] = stored;
        }
      }
      setPhotoThumbnails(thumbs);
      setSyncedCount(Object.keys(thumbs).length);
    };
    loadThumbs();
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFiles = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setIsProcessing(true);
    let count = 0;
    const newThumbs = { ...photoThumbnails };

    // Sort files naturally by filename (e.g. IMG_9879, IMG_9880...)
    const fileArray = Array.from(files).sort((a, b) =>
      a.name.localeCompare(b.name, undefined, { numeric: true, sensitivity: 'base' })
    );

    for (let i = 0; i < fileArray.length; i++) {
      const file = fileArray[i];
      const filename = file.name;

      // 1. Try to match by explicit filename or number (e.g. 9879, IMG_9879)
      let matched = PRODUCTS.find((p) => {
        const numPart = p.photoName.match(/\d+/)?.[0];
        const fileNumPart = filename.match(/\d+/)?.[0];
        if (numPart && fileNumPart && numPart === fileNumPart) {
          return true;
        }
        return (
          p.photoName.toLowerCase() === filename.toLowerCase() ||
          p.photoName.split('.')[0].toLowerCase() === filename.split('.')[0].toLowerCase()
        );
      });

      // 2. Fallback to index position if no filename match
      if (!matched && i < PRODUCTS.length) {
        matched = PRODUCTS[i];
      }

      if (matched) {
        const dataUrl = await saveProductPhoto(matched.photoName, file);
        newThumbs[matched.photoName] = dataUrl;
        count++;
      }
    }

    setPhotoThumbnails(newThumbs);
    setSyncedCount(Object.keys(newThumbs).length);
    setIsProcessing(false);
    setStatusMessage(`Успішно завантажено та зв'язано ${count} фото! Вони одразу відображаються у вітрині.`);
  };

  const handleSingleFileUpload = async (productPhotoName: string, file: File) => {
    setIsProcessing(true);
    const dataUrl = await saveProductPhoto(productPhotoName, file);
    setPhotoThumbnails((prev) => ({ ...prev, [productPhotoName]: dataUrl }));
    setSyncedCount((prev) => prev + 1);
    setIsProcessing(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl p-5 sm:p-7 text-neutral-900 overflow-hidden my-auto max-h-[90vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-start justify-between pb-4 border-b border-neutral-100">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <ImageIcon className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bold tracking-tight">
                  Синхронізація фото товарів
                </h2>
                <p className="text-xs text-neutral-500">
                  Строга прив'язка фото до цін 1:1
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Body */}
          <div className="overflow-y-auto flex-grow py-4 space-y-5 pr-1 text-xs sm:text-sm">
            
            {/* Batch Upload Zone */}
            <div className="bg-neutral-50 border-2 border-dashed border-neutral-300 hover:border-neutral-900 rounded-xl p-5 text-center transition-all">
              <label className="flex flex-col items-center justify-center cursor-pointer">
                <Upload className="w-7 h-7 text-neutral-600 mb-2" />
                <span className="text-sm font-bold text-neutral-900">
                  {isProcessing ? 'Збереження фотографій...' : `Вибрати всі ${PRODUCTS.length} фото або перетягнути сюди`}
                </span>
                <span className="text-xs text-neutral-500 mt-1 max-w-md">
                  Виберіть файли з вашого пристрою (IMG_9879... або будь-які). Система автоматично впорядкує їх за вашим суворим списком цін 1:1.
                </span>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  className="hidden"
                  disabled={isProcessing}
                  onChange={(e) => handleFiles(e.target.files)}
                />
              </label>
            </div>

            {statusMessage && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2.5 text-emerald-800 text-xs font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Strict Table of Products & Prices */}
            <div>
              <div className="flex items-center justify-between mb-2.5">
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-500">
                  Порядок товарів та цін ({syncedCount}/{PRODUCTS.length} завантажено):
                </span>
                <span className="text-[11px] text-neutral-400">
                  Можна замінити кожне фото окремо
                </span>
              </div>

              <div className="space-y-1.5 max-h-64 overflow-y-auto border border-neutral-200 rounded-xl p-2 bg-neutral-50/50 divide-y divide-neutral-100">
                {PRODUCTS.map((p, idx) => {
                  const hasCustom = !!photoThumbnails[p.photoName];
                  return (
                    <div
                      key={p.id}
                      className="pt-1.5 first:pt-0 flex items-center justify-between gap-3 text-xs py-1 px-1.5 hover:bg-white rounded-lg transition-colors"
                    >
                      <div className="flex items-center gap-2.5 min-w-0 flex-grow">
                        {/* Thumbnail preview */}
                        <div className="w-8 h-8 rounded-md bg-neutral-200 overflow-hidden flex-shrink-0 border border-neutral-200 relative">
                          {hasCustom ? (
                            <img
                              src={photoThumbnails[p.photoName]}
                              alt={p.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-[10px] font-bold text-neutral-500">
                              #{idx + 1}
                            </div>
                          )}
                        </div>

                        <div className="min-w-0">
                          <div className="flex items-center gap-1.5">
                            <span className="font-bold text-neutral-900">
                              Фото #{idx + 1}
                            </span>
                            <span className="text-[11px] text-neutral-400 font-mono">
                              ({p.photoName})
                            </span>
                          </div>
                          <p className="text-[11px] text-neutral-600 truncate max-w-xs">
                            {p.name}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="font-black text-neutral-900 font-serif bg-white px-2 py-0.5 rounded border border-neutral-200">
                          {p.price.toLocaleString('uk-UA')} ₴
                        </span>

                        <label className="px-2 py-1 bg-neutral-100 hover:bg-neutral-200 text-neutral-700 text-[11px] font-semibold rounded cursor-pointer transition-colors flex items-center gap-1">
                          {hasCustom ? <Check className="w-3 h-3 text-emerald-600" /> : <Upload className="w-3 h-3" />}
                          <span>{hasCustom ? 'Змінити' : 'Завантажити'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                handleSingleFileUpload(p.photoName, e.target.files[0]);
                              }
                            }}
                          />
                        </label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Explanatory note */}
            <div className="p-3 bg-neutral-100/80 rounded-xl text-neutral-600 text-[11px] leading-relaxed">
              💡 <strong>Зверніть увагу:</strong> Завантажені через цю панель фото надійно зберігаються у вашому браузері (IndexedDB) та миттєво з'являються на всіх картках, у каталозі, швидкому перегляді та кошику.
            </div>

          </div>

          {/* Footer actions */}
          <div className="pt-3 border-t border-neutral-100 flex items-center justify-between">
            <span className="flex items-center gap-1.5 text-xs text-neutral-500">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {PRODUCTS.length} позицій відповідають цінам
            </span>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-neutral-950 hover:bg-neutral-800 text-white font-medium text-xs rounded-xl transition-colors cursor-pointer shadow-sm"
            >
              Закрити та дивитись сайт
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

