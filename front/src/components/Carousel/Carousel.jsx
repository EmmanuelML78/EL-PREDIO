  import { useState, useEffect } from "react";
  const images = [
    {
      url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1682002710/pexels-mike-1171084_gm43xm.jpg",
      title: "Image 1",
    },
    {
      url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1682002707/pexels-markus-spiske-114296_imlpin.jpg",
      title: "Image 2",
    },
    {
      url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1682002707/pexels-jonathan-petersson-399187_qe85ru.jpg",
      title: "Image 3",
    },
    {
      url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1682002707/pexels-pixabay-47730_wzbgr3.jpg",
      title: "Image 4",
    },
    {
      url: "https://res.cloudinary.com/ddyk63iig/image/upload/v1682003965/pexels-king-siberia-2277980_vy2q5p.jpg",
      title: "Image 5"
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
      <div style={{zIndex: "1"}}>
        <img
          src={selectedImage.url}
          style={{ height: "75rem", width: "100%", opacity: "0.7"}}
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
      </div>
    );
  }

  export default Carousel;
