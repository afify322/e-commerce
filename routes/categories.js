const {Category} = require('../models/category');
const {addCategory,deleteCategory,getById,getCategories,update}=require('../controller/categories')
const express = require('express');
const router = express.Router();

router.get(`/`,getCategories )

router.get('/:id',getById )



router.post('/',addCategory)


router.put('/:id',update)

router.delete('/:id',deleteCategory)

module.exports =router;