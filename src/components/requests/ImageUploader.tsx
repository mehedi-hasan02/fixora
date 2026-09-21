"use client";

import { UploadCloud } from "lucide-react";

const ImageUploader = () => {
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
          Upload a photo to help us understand the issue
        </p>

        <input
          type="file"
          accept="image/*"
          className="
                    file-input
                    file-input-bordered
                    mt-4
                    "
        />
      </div>
    </div>
  );
};

export default ImageUploader;
