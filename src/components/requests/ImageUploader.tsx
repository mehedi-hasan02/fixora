"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UploadCloud, X } from "lucide-react";
import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";

import { validateImageFile, MAX_REQUEST_IMAGES } from "@/lib/imageValidation";

const ImageUploader = () => {
  const { register } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // react-hook-form's setValue() cannot change a file input's submitted
  // value — it always reads the DOM node's own .files at submit time — so
  // filtering/removing files has to write back to inputRef.current.files.
  const { ref: rhfRef, ...restRegister } = register("images");

  const applyFiles = (files: File[]) => {
    const dataTransfer = new DataTransfer();
    files.forEach((file) => dataTransfer.items.add(file));

    if (inputRef.current) {
      inputRef.current.files = dataTransfer.files;
    }

    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : [];

    const validFiles: File[] = [];

    for (const file of selectedFiles) {
      const validationError = validateImageFile(file);

      if (validationError) {
        toast.error(`${file.name}: ${validationError}`);
        continue;
      }

      validFiles.push(file);
    }

    if (validFiles.length > MAX_REQUEST_IMAGES) {
      toast.error(`You can upload up to ${MAX_REQUEST_IMAGES} images.`);
    }

    applyFiles(validFiles.slice(0, MAX_REQUEST_IMAGES));
  };

  const removeAt = (index: number) => {
    const currentFiles = Array.from(inputRef.current?.files ?? []);
    currentFiles.splice(index, 1);
    applyFiles(currentFiles);
  };

  return (
    <div className="space-y-3">
      <label className="font-semibold">Upload Problem Image</label>

      <div
        className="
                flex
                flex-col
                items-center
                justify-center
                rounded-xl
                border-2
                border-dashed
                p-8
            "
      >
        <UploadCloud size={40} />

        <p className="mt-3 text-sm text-base-content/60">
          Upload up to {MAX_REQUEST_IMAGES} photos (JPG, PNG, WEBP, max 5MB
          each) to help us understand the issue (optional)
        </p>

        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          multiple
          className="file-input file-input-bordered mt-4"
          {...restRegister}
          ref={(el) => {
            rhfRef(el);
            inputRef.current = el;
          }}
          onChange={handleChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          <AnimatePresence>
            {previews.map((src, index) => (
              <motion.div
                key={src}
                layout
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={{ duration: 0.2 }}
                className="relative aspect-square overflow-hidden rounded-lg border"
              >
                {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URLs can't be optimized by next/image */}
                <img
                  src={src}
                  alt="Problem preview"
                  className="h-full w-full object-cover"
                />
                <motion.button
                  type="button"
                  onClick={() => removeAt(index)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
                  aria-label="Remove image"
                >
                  <X size={14} />
                </motion.button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
