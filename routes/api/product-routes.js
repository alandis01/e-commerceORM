const router = require ('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const product = await Product.findAll({
            include: [
                {
                    model: Category,
                    required: true,
                },
                {
                    model: Tag,
                    required: true,
                    attributes: [
                        'id',
                        'tag_name',
                    ],
                }
            ]
        })
        res.status(200).json(products); 
       } catch (err) {
        res.status(500).json(err);
       }
});

router.get('./id', async (req, res) => {
    try {
        const product = await Product.findByPk(req.params.id, {
            include: [
            {
                model: Category,
                required: true,
            },
            {
                model: Tag,
                required: true,
            }
            ]
        });
        if (!product) {
            return req.status(404).json({ message: "Unable to find product with this id"});
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});
