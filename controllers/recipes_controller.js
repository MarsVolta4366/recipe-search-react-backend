const recipes = require("express").Router()
const db = require("../models")
const { Recipe } = db
const { Sequelize } = require("sequelize")

// GET ALL RECIPES
recipes.get("/", async (__req, res) => {
    try {
        const foundRecipes = await Recipe.findAll()
        res.status(200).json(foundRecipes)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// GET RANDOM RECIPE
recipes.get("/randomRecipe", async (__req, res) => {
    try {
        const randomRecipe = await Recipe.findOne({
            order: Sequelize.literal('random()')
        })
        res.status(200).json(randomRecipe)
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// GET RECIPE BY ID
recipes.get("/:id", async (req, res) => {
    try {
        const foundRecipe = await Recipe.findOne({
            where: {
                recipe_id: req.params.id
            }
        })
        res.status(200).json(foundRecipe)
    } catch (error) {
        res.status(500).json(error)
    }
})

// POST RECIPE
recipes.post("/", async (req, res) => {
    try {
        const newRecipe = Recipe.create(req.body)
        res.status(200).json({
            message: "Successfully inserted recipe",
            data: newRecipe
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
})

// DELETE RECIPE
recipes.delete("/:recipeId", async (req, res) => {
    try {
        const deletedRecipe = await Recipe.destroy({
            where: {
                recipe_id: req.params.recipeId
            }
        })
        res.status(200).json({
            message: `Successfully delete ${deletedRecipe} recipe`
        })
    }
    catch (error) {
        res.status(500).json(error)
    }
})

module.exports = recipes