const {Product} = require('../models/product');
const express = require('express');
const { Category } = require('../models/category');
const router = express.Router();
const mongoose = require('mongoose');
const { update,addproduct,getProductById,products,UpdateImage,deleteProduct } = require('../controller/products');

  


router.get(`/`,products )

router.get(`/:id`,getProductById)

router.post(`/`,addproduct)

router.put('/:id',update)

router.delete('/:id',deleteProduct)

router.put('/gallery-images/:id', UpdateImage)

module.exports =router;