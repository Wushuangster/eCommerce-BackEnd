const router = require('express').Router();
const {
  Category,
  Product
} = require('../../models');


// The `/api/categories` endpoint

// find all categories
// be sure to include its associated Products
router.get('/', async (req, res) => {
  try {
    const categoriesData = await Category.findAll({
      attributes: ["id", "category_name"],
      include: [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


// find one category by its `id` value
// be sure to include its associated Products
router.get('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.findByPk(req.params.id, {
      attributes: ["id", "category_name"],
      include: [{
        model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      }],
    });
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // create a new category
router.post('/', async (req, res) => {
  try {
    const categoriesData = await Category.create(req.body);
    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(400).json(err);
  }
});


  // delete a category by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.destroy({
      where: {
        id: req.params.id
      }
    });

    if (!categoriesData) {
      res.status(404).json({
        message: 'No category found with this id!'
      });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


  // update a category by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const categoriesData = await Category.update({
      where: {
        id: req.params.id
      }
    });

    if (!categoriesData[0]) {
      res.status(404).json({
        message: 'No category found with this id!'
      });
      return;
    }

    res.status(200).json(categoriesData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;