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
