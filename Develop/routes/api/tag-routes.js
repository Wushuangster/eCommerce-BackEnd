const router = require('express').Router();
const {
  Tag,
  Product,
  ProductTag
} = require('../../models');


// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  await Tag.findAll({
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]
    })
    .then(tagsData => res.json(tagsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  await Tag.findOne({
      where: {
        id: req.params.id
      },
      include: [{
        model: Product,
        attributes: ['id', 'product_name', 'price', 'stock', 'category_id'],
      }]
    })
    .then(tagsData => {
      if (!tagsData) {
        res.status(404).json({
          message: 'No tag found with this id!'
        });
        return;
      }
      res.json(tagsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.post('/', async (req, res) => {
  // create a new tag
  await Tag.create({
      tag_name: req.body.tag_name
    })
    .then(tagsData => res.json(tagsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  await Tag.update(req.body, {
      where: {
        id: req.params.id
      }
    })
    .then(tagsData => {
      if (!tagsData[0]) {
        res.status(404).json({
          message: 'No tag found with this id!'
        });
        return;
      }
      res.json(tagsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  await Tag.destroy({
      where: {
        id: req.params.id
      }
    })
    .then(tagsData => {
      if (!tagsData) {
        res.status(404).json({
          message: 'No tag found with this id!'
        });
        return;
      }
      res.json(tagsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});


module.exports = router;