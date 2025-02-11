

 import ProductModel from "../model/product.model.js";
import UserModel from "../model/user.model.js";

export default class UserController{

    getRegister(req, res){
        res.render('register');
    }

    getLogin(req, res){
        res.render('login',{
            errorMessage:null
        })
    }

    postRegister(req, res){

        const {name, email, password} = req.body;

        UserModel.add(name, email, password);

        res.render('login',{
            errorMessage:null
        });


    }

    postLogin(req, res){
        const {email, password} = req.body;

        console.log(email, password);

      const user =  UserModel.isValidUser(email, password);

    

      if(!user){
        return res.render('login',{
            errorMessage:'Invalid Credientials'
        })
      }
      req.session.useremail=email;

      var products = ProductModel.get()

      return res.render('products', {products:products,  useremail:req.session.useremail})

    }

    logout(req,res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }
            else{
                res.redirect('/login')
            }
        })

        res.clearCookie('lastVisit');
    }

}