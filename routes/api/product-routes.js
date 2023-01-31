const router = require ('express').Router();
const { Product, Category, Tag, ProductTag } = require('../../models');

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll({
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
