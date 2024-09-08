import React, { useState, useEffect } from "react";
import Joi from "joi";
import { useParams, useNavigate } from "react-router-dom";
import { getMovie, saveMovie } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import Input from "./common/input";
import Select from "./common/select";

const MovieForm = () => {
  const [data, setData] = useState({
    title: "",
    genreId: "",
    numberInStock: "",
    dailyRentalRate: "",
  });
  const [genres, setGenres] = useState([]);
  const [errors, setErrors] = useState({});

  const { id: movieId } = useParams(); // Get movie ID from URL params
  const navigate = useNavigate(); // For programmatic navigation

  const schema = Joi.object({
    _id: Joi.string().allow(""),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number().required().min(0).max(100).label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Daily Rental Rate"),
  });

  useEffect(() => {
    const genres = getGenres();
    setGenres(genres);

    if (movieId === "new") return;

    const movie = getMovie(movieId);
    if (!movie) return navigate("/not-found");

    setData(mapToViewModel(movie));
  }, [movieId, navigate]);

  const mapToViewModel = (movie) => {
    return {
      _id: movie._id,
      title: movie.title,
      genreId: movie.genre._id,
      numberInStock: movie.numberInStock,
      dailyRentalRate: movie.dailyRentalRate,
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = schema.validate(data, { abortEarly: false });
    const errors = {};
    if (result.error) {
      for (let item of result.error.details) errors[item.path[0]] = item.message;
      setErrors(errors);
      return;
    }

    doSubmit();
  };

  const doSubmit = () => {
    saveMovie(data);
    navigate("/movies");
  };

  const handleChange = ({ currentTarget: input }) => {
    const newData = { ...data };
    newData[input.name] = input.value;
    setData(newData);

    const errorMessage = validateProperty(input);
    if (errorMessage) setErrors({ ...errors, [input.name]: errorMessage });
    else {
      const newErrors = { ...errors };
      delete newErrors[input.name];
      setErrors(newErrors);
    }
  };

  const validateProperty = ({ name, value }) => {
    const obj = { [name]: value };
    const propertySchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = propertySchema.validate(obj);
    return error ? error.details[0].message : null;
  };

  return (
    <div>
      <h1>Movie Form</h1>
      <form onSubmit={handleSubmit}>
        <Input
          name="title"
          value={data.title}
          label="Title"
          onChange={handleChange}
          error={errors.title}
        />
        <Select
          name="genreId"
          value={data.genreId}
          label="Genre"
          options={genres}
          onChange={handleChange}
          error={errors.genreId}
        />
        <Input
          name="numberInStock"
          value={data.numberInStock}
          label="Number in Stock"
          onChange={handleChange}
          error={errors.numberInStock}
          type="number"
        />
        <Input
          name="dailyRentalRate"
          value={data.dailyRentalRate}
          label="Daily Rental Rate"
          onChange={handleChange}
          error={errors.dailyRentalRate}
          type="number"
        />
        <button disabled={schema.validate(data).error} className="btn btn-primary">
          Save
        </button>
      </form>
    </div>
  );
};

export default MovieForm;
