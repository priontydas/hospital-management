import React, { useState } from "react";
import { RowsPhotoAlbum } from "react-photo-album";
import "react-photo-album/rows.css";

import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";

import { photos } from "./GalleryData";

const GalleryPage = () => {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <h1 className="text-center m-5">Gallery</h1>

      <div className="container-fluid">
        <RowsPhotoAlbum
          photos={photos}
          targetRowHeight={280}   // 🔥 bigger images
          spacing={12}            // 🔥 nice gap
          onClick={({ index: current }) => setIndex(current)}
        />
      </div>

      <Lightbox
        slides={photos}
        open={index >= 0}         // ✅ fixed condition
        index={index}
        close={() => setIndex(-1)}
      />
    </>
  );
};

export default GalleryPage;