const {Category} = require('../models/category');
const {asyncHandler}=require('../helpers/error-handler')

exports.getCategories=asyncHandler( async (req, res) =>{
    const categoryList = await Category.find();

    if(!categoryList) {
        res.status(404).json({success: false})
    } 
    res.status(200).json({success:true,categoryList});
})

exports.getById=asyncHandler( async(req,res)=>{
    const category = await Category.findById(req.params.id);

    if(!category) {
        res.status(400).json({message: 'The category with the given ID was not found.'})
    } 
    res.status(200).send(category);
})



exports.addCategory=asyncHandler(  async (req,res)=>{
    const {name,icon,color}=req.body
    let category =await new Category({name,icon,color}).save()

    res.status(201).json({success:true,category});
})


exports.update=asyncHandler( async (req, res)=> {
    const {id}=req.params
    const {name,icon,color}=req.body
    const category = await Category.findByIdAndUpdate(
        id,{name,icon:icon || category.icon,color},
        { new: true})

        res.status(201).json({success:true,category});
    })

exports.deleteCategory=asyncHandler(async (req, res)=>{
        const{id}=req.params
    const category=await Category.findByIdAndRemove(id)
        if(category) {
            return res.status(200).json({success: true, message: 'the category is deleted!'})
        } else {
            return res.status(404).json({success: false , message: "category not found!"})
        }

})

