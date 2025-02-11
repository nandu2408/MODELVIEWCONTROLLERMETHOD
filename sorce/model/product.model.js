

export default class ProductModel{

    constructor(_id, _name, _description, _price, _imageUrl){
        this.id=_id;
        this.name=_name;
        this.description=_description;
        this.price=_price;
        this.imageUrl=_imageUrl;
    }

    static get(){

        return products;

    }

    static update(productObj){
      const index =  products.findIndex(p=>p.id == productObj.id);

      products[index]=productObj
    }

    static add(name, desc, price,
        imageurl
    ){

    //    console.log(productObj);

        let newProduct = new ProductModel(
            products.length + 1,
         name,
         desc,
        price,
        imageurl
        );

        products.push(newProduct);
    }

    static delete(id){
        const index = products.findIndex(p => p.id == id)

        products.splice(index,1);
    }

    static getById(id){
        return products.find((p) =>p.id == id)
    }

}

var products= [
    new ProductModel(1, "product 1", "desciption for product 1", 19.99,  "https://m.media-amazon.com/images/I/419aJfhczCL._SY445_SX342_.jpg"),
    new ProductModel(2, "product 2", "desciption for product 2", 29.99,  "https://m.media-amazon.com/images/I/81l3rZK4lnL._SL1500_.jpg"),
    new ProductModel(3, "product 3", "desciption for product 3", 39.99,  "https://m.media-amazon.com/images/I/61157LApbuL._SY425_.jpg")
]