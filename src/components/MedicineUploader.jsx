
import React from "react";
import { Upload, Camera, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const MedicineUploader = ({
  selectedImage,
  isDragging,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDrop,
  handleImageUpload,
  removeImage,
  onCameraClick
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Medicine Image</h2>
      <div
        className={`relative flex flex-col items-center justify-center border-2 ${
          isDragging ? 'border-primary' : 'border-dashed'
        } border-gray-300 rounded-lg p-6 bg-white/50 transition-colors duration-200`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        {selectedImage ? (
          <div className="relative w-full">
            <Button
              variant="destructive"
              size="icon"
              className="absolute -right-2 -top-2 z-10 h-6 w-6 rounded-full"
              onClick={removeImage}
            >
              <X className="h-4 w-4" />
            </Button>
            <img
              src={selectedImage}
              alt="Selected medicine"
              className="max-w-full h-auto rounded-lg"
            />
          </div>
        ) : (
          <div className="text-center">
            <Upload className={`w-12 h-12 mx-auto mb-4 ${
              isDragging ? 'text-primary' : 'text-gray-400'
            }`} />
            <p className={`${isDragging ? 'text-primary' : 'text-gray-500'}`}>
              {isDragging ? 'Drop your image here' : 'Drag and drop or click to upload'}
            </p>
            <p className="text-sm text-gray-400 mt-2">
              Supported formats: JPEG, PNG, GIF, WebP (max 5MB)
            </p>
          </div>
        )}
        <input
          type="file"
          accept="image/jpeg,image/png,image/gif,image/webp"
          onChange={handleImageUpload}
          className="hidden"
          id="image-upload"
        />
        {!selectedImage && (
          <label htmlFor="image-upload">
            <Button className="mt-4" variant="outline">
              Select Image
            </Button>
          </label>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <Button 
          className="w-full md:w-auto"
          onClick={onCameraClick}
        >
          <Camera className="mr-2 h-4 w-4" />
          Use Camera
        </Button>
      </div>
    </div>
  );
};

export default MedicineUploader;
