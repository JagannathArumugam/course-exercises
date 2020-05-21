const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/wikiDB", { useNewUrlParser: true, useUnifiedTopology: true });

const articleSchema = new mongoose.Schema({
  title: String,
  content: String
});

const Article = mongoose.model("Article", articleSchema);


// Requests for getting all articles

app.route("/articles")

  .get(function(req, res) {
    Article.find({}, function(err, foundArticles) {
      if (!err) {
        res.send(foundArticles);
      } else {
        res.send(err0);
      }
    });
  })

  .post(function(req, res) {

    const newArticle = new Article ({
      title: req.body.title,
      content: req.body.content
    });

    newArticle.save(function(err) {
      if (!err) {
        res.send("Successfully added a new article.");
      } else {
        res.send(err);
      }
    });
  })

  .delete(function(req, res) {
    Article.deleteMany(function(err) {
      if (!err) {
        res.send("All articles deleted successfully.");
      } else {
        res.send(err);
      }
    });
  });

// Requests for getting a specific article

app.route("/articles/:articleTitle")

  .get(function(req, res) {
    const articleTitle = req.params.articleTitle;

    Article.findOne({title: articleTitle}, function(err, foundArticle) {
      if (foundArticle) {
        res.send(foundArticle);
      } else {
        res.send("No articles matching that title was found.");
      }
    });
  })

  .put(function(req, res) {

    Article.update(
      {title: req.params.articleTitle},
      {title: req.body.newTitle, content: req.body.newContent},
      {overwrite: true},
      function(err) {
        if (!err) {
          res.send("Article successfully updated.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .patch(function(req, res) {

    Article.update(
      {title: req.params.articleTitle},
      {$set: req.body},
      function(err) {
        if (!err) {
          res.send("Article successfully updated.");
        } else {
          res.send(err);
        }
      }
    );
  })

  .delete(function(req, res) {
    Article.deleteOne(
      {title: req.params.articleTitle},
      function(err) {
        if (!err) {
          res.send("Article successfully deleted.")
        } else {
          res.send(err);
        }
      }
    );
  });



app.listen(3000, function() {
  console.log("Server started on port 3000...");
});
