import React, { createContext, useContext, useState, ReactNode } from "react";

interface Image {
  name: string;
  image: string;
}

interface FavoritedImagesContextType {
  favoritedImages: Image[];
  addFavoritedImage: (image: Image) => void;
  removeFavoritedImage: (imageName: string) => void;
}

const FavoritedImagesContext = createContext<FavoritedImagesContextType | undefined>(undefined);

export const FavoritedImagesProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [favoritedImages, setFavoritedImages] = useState<Image[]>([]);

  const addFavoritedImage = (image: Image) => {
    setFavoritedImages((prevImages) => [...prevImages, image]);
  };

  const removeFavoritedImage = (imageName: string) => {
    setFavoritedImages((prevImages) =>
      prevImages.filter((image) => image.name !== imageName)
    );
  };

  return (
    <FavoritedImagesContext.Provider
      value={{ favoritedImages, addFavoritedImage, removeFavoritedImage }}
    >
      {children}
    </FavoritedImagesContext.Provider>
  );
};

export const useFavoritedImages = (): FavoritedImagesContextType => {
  const context = useContext(FavoritedImagesContext);
  if (!context) {
    throw new Error("useFavoritedImages must be used within a FavoritedImagesProvider");
  }
  return context;
};
