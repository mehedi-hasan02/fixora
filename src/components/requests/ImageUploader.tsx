"use client";

import { useState } from "react";
import { UploadCloud, X } from "lucide-react";
import { useFormContext } from "react-hook-form";

const ImageUploader = () => {
  const { register, setValue, getValues } = useFormContext();
  const [previews, setPreviews] = useState<string[]>([]);

  const fileListRegister = register("images");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    fileListRegister.onChange(e);

    const files = e.target.files ? Array.from(e.target.files) : [];
    setPreviews(files.map((file) => URL.createObjectURL(file)));
  };

  const removeAt = (index: number) => {
    const currentFiles = Array.from(
      (getValues("images") as FileList | undefined) ?? []
    );
    currentFiles.splice(index, 1);

    const dataTransfer = new DataTransfer();
    currentFiles.forEach((file) => dataTransfer.items.add(file));

    setValue("images", dataTransfer.files);
    setPreviews((prev) => prev.filter((_, i) => i !== index));
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
          Upload photos to help us understand the issue (optional)
        </p>

        <input
          type="file"
          accept="image/*"
          multiple
          className="file-input file-input-bordered mt-4"
          {...fileListRegister}
          onChange={handleChange}
        />
      </div>

      {previews.length > 0 && (
        <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {previews.map((src, index) => (
            <div
              key={src}
              className="relative aspect-square overflow-hidden rounded-lg border"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- blob: preview URLs can't be optimized by next/image */}
              <img
                src={src}
                alt="Problem preview"
                className="h-full w-full object-cover"
              />
              <button
                type="button"
                onClick={() => removeAt(index)}
                className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black/60 text-white"
                aria-label="Remove image"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ImageUploader;
