const express = require("express");
const validateId = require("../middleware/validateId");
const Movie = require("../models/movie");

const router = express.Router();

router.get("/", async (req, res) => {
	try {
		const movies = await Movie.find().sort("title");
		return res.send(movies);
	} catch (error) {
		console.log(error);
	}
});

router.get("/:id", validateId, async (req, res) => {
	try {
		const movie = await Movie.findById(req.params.id);
		if (!movie) return res.status(404).send();
		return res.send(movie);
	} catch (error) {
		console.log(error);
	}
});

router.post("/", async (req, res) => {
	try {
		if (!req.body.title) return res.status(400).send("Title is required.");

		const movie = new Movie({ title: req.body.title });
		await movie.save();
		return res.status(201).send(movie);
	} catch (error) {
		console.log(error);
	}
});

router.delete("/:id", async (req, res) => {
	try {
		const movie = await Movie.findByIdAndDelete(req.params.id);

		if (!movie)
			return res.status(404).send("The movie with the given ID was not found.");

		return res.status(204).send();
	} catch (error) {
		console.log(error);
	}
});

module.exports = router;
