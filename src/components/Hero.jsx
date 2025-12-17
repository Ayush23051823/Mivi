import { Bookmark, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router";

const Hero = () => {
  const [movie, setMovie] = useState(null);

  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTgzMDFlZGQ2MGEzN2Y3NDlmMzhlNGFmMTJjZDE3YSIsIm5iZiI6MTc0NTQxNjIyNS44NzY5OTk5LCJzdWIiOiI2ODA4ZjAyMTI3NmJmNjRlNDFhYjY0ZWUiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.NA_LMt6-MUBLAvxMRkZtBoUif4p9YQ6aYZo-lv4-PUE",
    },
  };

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const res = await fetch(
          "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
          options
        );
        const data = await res.json();

        if (data.results && data.results.length > 0) {
          const randomIndex = Math.floor(Math.random() * data.results.length);
          const randomMovie = data.results[randomIndex];

          const detailsRes = await fetch(
            `https://api.themoviedb.org/3/movie/${randomMovie.id}?language=en-US`,
            options
          );
          const details = await detailsRes.json();
          setMovie(details); 
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchRandomMovie();
  }, []);

  if (!movie) {
    return <p className="text-white">Loading...</p>;
  }

  const rating = movie.vote_average?.toFixed(1);
  const releaseDate = movie.release_date;
  const duration = movie.runtime ? `${movie.runtime} min` : "N/A";

  return (
    <div className="text-white relative">
      <img
        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
        alt={movie.title}
        className="w-full rounded-2xl h-[480px] object-center object-cover"
      />

      <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

      <div className="absolute left-4 bottom-28 md:left-10 md:bottom-28 max-w-2xl">

        <h1 className="text-2xl md:text-4xl font-bold mb-2">
          {movie.title}
        </h1>

        <div className="flex items-center gap-4 text-sm md:text-base mb-3">
          <span className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            {rating}
          </span>
          <span>{releaseDate}</span>
          <span>{duration}</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-3">
          {movie.genres?.map((genre) => (
            <span
              key={genre.id}
              className="px-3 py-1 rounded-full bg-[#1c2433] bg-opacity-90 text-sm"
            >
              {genre.name}
            </span>
          ))}
        </div>

        <p className="text-sm md:text-base text-gray-100 line-clamp-3 md:line-clamp-4">
          {movie.overview}
        </p>
      </div>

      <div className="flex space-x-2 md:space-x-4 absolute bottom-3 left-4 md:bottom-8 md:left-10 font-medium">
        <button className="flex justify-center items-center bg-white hover:bg-gray-200 text-[#e50914] py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
          <Bookmark className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Save for Later
        </button>

        <Link to={`/movie/${movie.id}`}>
          <button className="flex justify-center items-center bg-[#e50914] text-white py-3 px-4 rounded-full cursor-pointer text-sm md:text-base">
            <Play className="mr-2 w-4 h-5 md:w-5 md:h-5" /> Watch Now
          </button>
        </Link>
        
      </div>
    </div>
  );
};

export default Hero;
