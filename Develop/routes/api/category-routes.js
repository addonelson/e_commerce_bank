const router = require('express').Router();
const { Category, Product, ProductTag } = require('../../models');

// The `/api/categories` endpoint

router.get('/', (req, res) => {
  try {
    const categoryData = await Category.findAll();
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(500).json(err);
  } // find all categories
  // be sure to include its associated Products
});

router.get('/:id', (req, res) => {
  try {
    const categoryData = await Category.findByPk(req.params.id, {
      // JOIN with travellers, using the Trip through table
      include: [{ model: Product, through: ProductTag, as: 'Category_Product' }]
    });

    if (!categoryData) {
      res.status(404).json({ message: 'No category found with this id!' });
      return;
    }

    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json(err);
   } // find one category by its `id` value
  // be sure to include its associated Products
});

router.post('/', (req, res) => {
  try {
    const categoryData = await Category.create(req.body);
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(400).json(err);
  } // create a new category
});

router.put('/:id', (req, res) => {
  try{
    const categoryData = await Category.update(req.body);
    res.status(200).json(categoryData);// update a category by its `id` value
}catch (err) {
  res.status(400).json(err);
}
});

router.delete('/:id', (req, res) => {
 try{
   const categoryData = await Category.destroy({
     where: {
       id: req.params.id
      }
   });
   if(!categoryData) {
     res.status(404).json({ message: `No location found with this id`});
     return;
   }
   res.status(200).json(categoryData);

 } catch(err) {
   res.status(500).json(err)// delete a category by its `id` value
}
});

module.exports = router;
