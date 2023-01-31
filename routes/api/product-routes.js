const router = require('express').Router();
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
            return req.status(404).json({ message: "Unable to find product with this id" });
        }
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new product 
router.post('./', (req, res) => {
    Product.create(req.body)
        .then((product) => {
            if (req.body.tagIds.length) {
                const productTagIdArr = req.body.tagIds.map((tag_id) => {
                    return {
                        product_id: product.id,
                        tag_id,
                    };
                });
                return ProductTag.bulkCreate(productTagIdArr);
            }
            res.status(200).json(product);
        })
        .then((productTagIds) => res.status(200).json(productTagIds))
        .catch((err) => {
            console.log(err);
            resizeBy.status(400).json(err);
        })
});

// update product
router.put("/:id", (req, res) => {
    // update product data
    Product.update(req.body, {
        where: {
            id: req.params.id,
        },
    })
        .then((product) => {
            // find all associated tags from ProductTag
            return ProductTag.findAll({ where: { product_id: req.params.id } });
        })
        .then((productTags) => {
            // get list of current tag_ids
            const productTagIds = productTags.map(({ tag_id }) => tag_id);
            // create filtered list of new tag_ids
            const newProductTags = req.body.tagIds
                .filter((tag_id) => !productTagIds.includes(tag_id))
                .map((tag_id) => {
                    return {
                        product_id: req.params.id,
                        tag_id,
                    };
                });
            // figure out which ones to remove
            const productTagsToRemove = productTags
                .filter(({ tag_id }) => !req.body.tagIds.includes(tag_id))
                .map(({ id }) => id);

            // run both actions
            return Promise.all([
                ProductTag.destroy({ where: { id: productTagsToRemove } }),
                ProductTag.bulkCreate(newProductTags),
            ]);
        })
        .then((updatedProductTags) => res.json(updatedProductTags))
        .catch((err) => {
            // console.log(err);
            res.status(400).json(err);
        });
});

router.delete("/:id", async (req, res) => {
    // delete one product by its `id` value
    try {
        const product = await Product.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!product) {
            res.status(404).json({ message: "No product found with this id!" });
            return;
        }

        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;