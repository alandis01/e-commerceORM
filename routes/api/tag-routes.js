const router = require('express').router;
const { Tag, Product, ProductTag } = require('../../models');

router.get('./', async (req, res) => {
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
