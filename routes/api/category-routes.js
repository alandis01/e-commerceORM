const router = require('express').Router();
const { Category, Product } = requier('../../models');

router.get('/', async (req, res) => {
    try {
        const category = await Category.findAll({
            include: [{
                model: Product,
                attributes: [
                    'product_name',
                ]
            }]
        });
        res.json(category)
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('./:id', async (req,res) => {
    try {
        const category = await Category.findByPk(req.params.id, {
            invlude: [{
                model: Product, }]
        });

        if (!category) {
            res.status(404).json({ message: "No category with this id can be found" });
        }

        res.json(category);
    } catch (err) {
        res.json(err);
    }
});


