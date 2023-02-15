const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const tag = await Tag.findAll({
            order: ['id'],
            include: [{
                model: Product,
            }]
        });
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('./id', async (req, res) => {
    try {
        const tag = await Tag.findByPk(req.params.id, {
            include: [{
                model: Product,
            }]
        });
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('./', async (req, res) => {
    try {
        const tag = await Tag.create(req.body);
        res.status(200).json(tag);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
      const newTag = await Tag.update(req.body, { where: { id: req.params.id } });
      res.status(200).json(newTag);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.delete('./id', (req, res) => {
    try {
        const deleteTag = Tag.destroy({ where: { id: req.params.id } });
        res.status(200).json(deleteTag);
    } catch (err) {
        res.status(500).json(err);
    }
  });

  module.exports = router; 


