import path from "path"


import ProductModel from "../model/product.model.js"

export default class ProductController{

  getProducts(req, res,next){
   
     let products = ProductModel.get();
      // console.log(products)

     res.render("products", {products:products, useremail:req.session.useremail})

    // res.sendFile(path.join(path.resolve(), "sorce", "views", "products.ejs"))
  }

  getAddNEwProduct(req,res,next){
    return res.render("newproduct",{errorMessage: null,  useremail:req.session.useremail});
  }

  addNewProduct(req,res,next){

    const {name, desc, price} = req.body

    const imageurl = "images/" + req.file.filename

    
    let products = ProductModel.get();

   ProductModel.add(name, desc, price, imageurl)

   return res.render("products", {products:products,  useremail:req.session.useremail})

  }

  getUpdateProductView(req,res,next){
    const id = req.params.id;

    

    try {
      const productFound = ProductModel.getById(id);
  
      if (productFound) {
        res.render("updateproduct", { product: productFound, errorMessage: null ,  useremail:req.session.useremail});
      } else {
        res.status(404).send("Product not found");
      }
    } catch (error) {
      console.error(`Error retrieving product by id: ${id}`, error);
      res.status(500).send("Internal server error");
    }
  }

  postUpdateproduct(req,res){

    
    let products = ProductModel.get();

   ProductModel.update(req.body)

   return res.render("products", {products:products,  useremail:req.session.useremail})

  }

  deleteProduct(req, res){

    const id =req.params.id;
    const productFound = ProductModel.getById(id);
  
    if (!productFound) {

      return res.status(404).send("Product not found");
     
    }

    ProductModel.delete(id)
    let products = ProductModel.get();

   res.render("products", {products:products,  useremail:req.session.useremail})

  }

}