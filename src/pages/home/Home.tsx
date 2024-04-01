import React from "react";
import PhotoSlider from "../../components/PhotoSlider";
import ImageScroller from "../../components/ImageScroller";
import { API_ENDPOINTS } from "../../config/endpoints";

function Home() {
  const scrollers = [
    {
      title: "Movies",
      endpoint: API_ENDPOINTS.DiscoverMovie,
      desc: "Discover Movies",
    },
    {
      title: "TV Shows",
      endpoint: API_ENDPOINTS.DiscoverTvShows,
      desc: "Discover TV Shows",
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
