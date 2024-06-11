const Article = require('../models/article.models');

exports.create = (req, res) => {


    const article = new Article({
        title: req.body.title,
        content: req.body.content,
    });

    article.save(article)
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((error) => {
            res.status(500).json({
                message: error.message || 'Some error occurred while publishing the article.',
            });
        });
};

exports.getAllArticle = (req, res) => {
    Company.find()
      .then((article) => {
        res.status(200).json(article);
      })
      .catch((error) => {
        res.status(500).json({
          message: error.message || 'Some error occurred while retrieving companies.',
        });
      });
  };