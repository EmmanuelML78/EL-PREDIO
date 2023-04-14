import { useState, useEffect } from "react";
const images = [
  {
    url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1681475728/800_600_heroes-futbol-2_kbl0zq.jpg",
    title: "Image 1",
  },
  {
    url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1681347443/14801_20200706085021_o9cszj.jpg",
    title: "Image 2",
  },
  {
    url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1681347442/cancha-futbol-5-autorizada-cuarentena_raontl.jpg",
    title: "Image 3",
  },
  {
    url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1681475728/HD-wallpaper-soccer-field-soccer-pitch_mtm7vn.jpg",
    title: "Image 4",
  }
];

function Carousel() {

  const [selectedIndex, setSelectedIndex] = useState(0);
  const selectedImage = images[selectedIndex];

  

  useEffect(() => {
    const intervalId = setInterval(() => {
      setSelectedIndex((selectedIndex) => (selectedIndex + 1) % images.length);
    }, 3000);

    return () => clearInterval(intervalId);
  }, [images.length]);

  return (
    <>
      <img
        src={selectedImage.url}
        style={{ height: "40rem", width: "100%", marginTop: "10rem" }}
        alt={selectedImage.title}
      />
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}
      >
        {images.map((_, index) => (
          <span
            key={index}
            style={{
              backgroundColor: selectedIndex === index ? "white" : "black",
              borderRadius: "50%",
              width: "10px",
              height: "10px",
              margin: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => setSelectedIndex(index)}
          ></span>
        ))}
      </div>
    </>
  );
}

export default Carousel;
