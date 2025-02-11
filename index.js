import express from "express"import ProductController from "./sorce/controller/product.controller.js";import path from "path"import expressEjsLayouts from "express-ejs-layouts";import validationMiddleware from "./sorce/miidleware/validation.middleware.js";import { uploadFile } from "./sorce/miidleware/fileupload.middleware.js";import UserController from "./sorce/controller/user.controller.js";import session from "express-session";import { auth } from "./sorce/miidleware/auth.middleware.js";import cookieParser from "cookie-parser";import { setLastVisit } from "./sorce/miidleware/lastvisit.middleware.js";const app = express();app.use(express.static("public"))app.use(express.urlencoded({ extended : true}));// we nedd to set view engineapp.set("view engine", "ejs")app.set("views", path.join(path.resolve(), "sorce", "views"))app.use(expressEjsLayouts);// creating a instance for the class controller// we are configure the sessionapp.use(session({    secret:"secretKey",    resave:false,    saveUninitialized:true,    cookie:{        secure:false    }}))app.use(cookieParser())app.use(setLastVisit);const PC =new ProductController();const UC = new UserController();app.get('/register',(UC.getRegister));app.get('/login',(UC.getLogin));app.post('/register',(UC.postRegister));app.post('/login',(UC.postLogin));app.get('/logout',(UC.logout))app.get("/", auth,(PC.getProducts))app.get("/new", auth, (PC.getAddNEwProduct))app.get("/updateproduct/:id", auth, (PC.getUpdateProductView))app.post("/deleteproduct/:id", auth, (PC.deleteProduct))app.post("/updateproduct", auth, (PC.postUpdateproduct))app.post("/", auth, uploadFile.single("imageurl"), validationMiddleware, (PC.addNewProduct))app.use(express.static("sorce/views"))app.listen(3200, ()=>{    console.log("App is running on the port 3200");})