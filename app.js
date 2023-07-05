const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();

app.use(
    bodyParser.urlencoded({
        extended: true,
    })
);


const PORT = 3000 || process.env.PORT;

// const mongodb_URI = process.env.MONGODB_URI;

const local_URI = "mongodb://127.0.0.1:27017/wikiDB";

mongoose.connect(local_URI, {
    useNewUrlParser: true,
});

//creating Schema for storing data
const API_Schema = new mongoose.Schema(
    {
        title: String,
        content: String,
    },
    { versionKey: false }
);

//creating collection in DB
const Article = mongoose.model("Article", API_Schema);

//express route handling method when handling same route
app.route("/articles")
    .get(async function (req, res) {
        try {
            const articles = await Article.find();
            if (articles.length === 0) {
                throw new Error("No articles found.");
            }
            res.send(articles);
        } catch (error) {
            res.status(500).send({ error: error.message });
        }
    })
    .post(async function (req, res) {
        try {
            const { title, content } = req.body;

            const newArticle = new Article({
                title: title,
                content: content,
            });
            newArticle.save();

            res.status(201).json({
                id: newArticle._id,
                message: "Resource created successfully",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .delete(async function (req, res) {
        try {
            await Article.deleteMany({});
            res.status(201).json({
                message: "Resource deleted successfully",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

//for specific articles
app.route("/articles/:title")
    .get(async function (req, res) {
        try {
            const found = await Article.findOne({ title: req.params.title });
            if (!found) {
                throw new Error("No article found for this title!");
            }
            res.send(found);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .put(async function (req, res) {
        try {
            const found = await Article.findOne({ title: req.params.title });
            if (!found) {
                throw new Error("No article found for this title!");
            }
            const { title, content } = req.body;

            const query = await Article.replaceOne(
                { title: req.params.title },
                {
                    title: title,
                    content: content,
                }
            );

            res.status(201).json({
                id: query._id,
                message: "Resource updated successfully using 'PUT' ",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .patch(async function (req, res) {
        try {
            const found = await Article.findOne({ title: req.params.title });
            if (!found) {
                throw new Error("No article found for this title!");
            }
            const { title, content } = req.body;

            const query = await Article.updateOne(
                { title: req.params.title },
                {
                    title: title,
                    content: content,
                }
            );

            res.status(201).json({
                id: query._id,
                message: "Resource updated successfully using 'PATCH' ",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    })
    .delete(async function (req, res) {
        try {
            const found = await Article.findOne({ title: req.params.title });
            if (!found) {
                throw new Error("No article found for this title!");
            }

            const query = await Article.findOneAndDelete({
                title: req.params.title,
            });

            res.status(201).json({
                id: query._id,
                message: "Resource deleted successfully! ",
            });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    });

app.listen(PORT, function () {
    console.log("Server started on port " + PORT);
});
