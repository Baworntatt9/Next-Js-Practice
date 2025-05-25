"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";

import classes from "./image-picker.module.css";
import { Button } from "../ui/button";

export default function ImagePicker({
  name,
  value,
  onChange,
}: {
  name: string;
  value?: File | null;
  onChange?: (file: File | null) => void;
}) {
  const [pickedImage, setPickedImage] = useState<string | null>(null);
  const imageInput = useRef<HTMLInputElement>(null);

  // อัปเดต pickedImage เมื่อ value เปลี่ยนแปลง
  useEffect(() => {
    if (value) {
      const fileReader = new FileReader();
      fileReader.onload = () => setPickedImage(fileReader.result as string);
      fileReader.readAsDataURL(value);
    } else {
      setPickedImage(null);
    }
  }, [value]);

  function handlePickClick() {
    imageInput.current?.click();
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      setPickedImage(null);
      onChange?.(null);
      return;
    }

    const fileReader = new FileReader();

    fileReader.onload = () => {
      setPickedImage(fileReader.result as string);
    };

    fileReader.readAsDataURL(file);
    onChange?.(file);
  }

  return (
    <div className={classes.picker}>
      <div className={classes.controls}>
        <div className={classes.preview}>
          {!pickedImage && <p>No image picked yet!</p>}
          {pickedImage && <Image src={pickedImage} alt="Picked image" fill />}
        </div>
        <input
          className={classes.input}
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          ref={imageInput}
          onChange={handleImageChange}
        />
        <Button
          className={classes.button}
          onClick={handlePickClick}
          type="button"
        >
          Pick an Image
        </Button>
      </div>
    </div>
  );
}
