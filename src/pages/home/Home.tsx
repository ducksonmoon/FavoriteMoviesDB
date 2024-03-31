import React from "react";
import PhotoSlider from "../../components/PhotoSlider";
import ImageScroller from "../../components/ImageScroller";
import { API_ENDPOINTS } from "../../config/endpoints";

function Home() {
  const scrollers = [
    {
      title: "Movies",
      endpoint: API_ENDPOINTS.Movie,
      desc: "Discover Movies by popularity",
    },
    {
      title: "TV Shows",
      endpoint: API_ENDPOINTS.TV,
      desc: "Discover TV Shows by popularity",
    },
  ];

  return (
    <>
      <PhotoSlider />
      {scrollers.map((scroller, index) => (
        <ImageScroller
          key={index}
          title={scroller.title}
          endpoint={scroller.endpoint}
          desc={scroller.desc}
        />
      ))}
    </>
  );
}

export default Home;
