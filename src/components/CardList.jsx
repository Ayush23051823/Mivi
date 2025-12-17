import React, { useState, useEffect } from 'react'
import Cardimg from '../assets/cardimg.jpg'
import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css';  
import {Link} from "react-router";

const CardList = ({title, category}) => {
  const [data, setData]= useState([]);
  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OGE2OGEzNGNiYTg4MjQwZWFlZmE2YzJiMzEwZGQwNSIsIm5iZiI6MTc2NDYzODkwMy42ODUsInN1YiI6IjY5MmU0MGI3MTFjNmFiNTgyODY0YWRlMiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YyWy3kKS52q-HLiO9j8_gtdhUPe64GN9yR-WuVzCdHg'
  }
};


useEffect(() => {
fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1`, options)
  .then(res => res.json())
  .then(res => setData(res.results))
  .catch(err => console.error(err));},[]);

  
  return (
    <div className="text-white md:px-4">
      <h2 className="pt-10 pb-5 text-lg font-medium">
        {title}
      </h2>
      <Swiper slidePerView={"auto"} spaceBetween={10} className="mySwiper">
      {data.map((item, index)=>(
        <SwiperSlide
  key={index}
  className="max-w-64 rounded-2xl overflow-hidden bg-[#1F2937] hover:scale-105 transition-all duration-300"
>
  <Link to={`/movie/${item.id}`}>
    <img
      src={`https://image.tmdb.org/t/p/w500/${item.backdrop_path}`}
      alt=""
      className="h-40 w-full object-cover overflow-hidden shadow-lg"
    />
    <p className="text-center pt-3 text-sm font-medium">
      {item.original_title}
    </p>
  </Link>
</SwiperSlide>


      ))}
      </Swiper>
    </div>
  );
}

export default CardList
