import {Schema, model} from "mongoose";

import {ProductModel} from "./newproduct";

const userSchema = new Schema({
    username: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "customer"
    },
    created: {
        type: String,
        default: Date.now
    },
    cart: {
        items: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "Product",
                    required: true
                },
                quantity: {type: Number}
            }
        ],
        sum: {
            type: Number,
            default: 0
        }
    },
    productNewOrder: {
        order: [],
        fullName: {
            type: String,
        },
        mobileNumber: {
            type: String,
        },
        address: {
            type: String,
        },
        createdOrder: {
            type: String,
        },
    },
});

//Add to Cart
userSchema.methods.addToCart = function (product, newQuantity) {
    const cartProductIndex = this.cart.items.findIndex(cp => {
        return cp.productId.toString() === product._id.toString();
    });

    const updatedCartItems = [...this.cart.items];
    // console.log("TCL: userSchema.methods.addToCart -> updatedCartItems", updatedCartItems)
    // console.log("TCL: userSchema.methods.addToCart -> this.cart.items", this.cart.items)
    const quantityProduct = newQuantity;
    if (cartProductIndex >= 0) {
        newQuantity =
            parseFloat(this.cart.items[cartProductIndex].quantity) +
            parseFloat(newQuantity);
        updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
        updatedCartItems.push({
            productId: product._id,
            quantity: newQuantity
        });
    }
    const priceAddQuantityProduct = product.price * quantityProduct;
    this.cart.sum = this.cart.sum + priceAddQuantityProduct; //product.price * newQuantity;

    console.log(
        "TCL: userSchema.methods.addToCart -> updatedCartItems",
        updatedCartItems
    );
    const updatedCart = {
        items: updatedCartItems,
        sum: this.cart.sum
    };
    this.cart = updatedCart;
    console.log("TCL: cart =>", this.cart);
    return this.save();
};

//Remove
userSchema.methods.removeProductCart = function (product, productDetail) {
    const listProductCart = this.cart.items;
    let sum = this.cart.sum;
    for (let i = 0; i < listProductCart.length; i++) {
        if (listProductCart[i].productId == product) {
            sum = sum - productDetail.price * listProductCart[i].quantity;
            console.log("sum ", sum);
            listProductCart.splice(i, 1);
            break;
        }
    }
    const updatedCart = {
        items: listProductCart,
        sum: sum
    };
    this.cart = updatedCart;
    console.log("TCL: cart =>", this.cart);
    return this.save();
};

//Update
userSchema.methods.updatedCart = function (newUpdateCart) {
    const listUpdateProductCart = [...this.cart.items];
    let newSum = 0;
    ProductModel.find()
        .then(product => {
            listUpdateProductCart.forEach((item, index) => {
                product.forEach(items => {
                    if (items._id.toString() == listUpdateProductCart[index].productId.toString()) {
                        for (var i = 0; i < newUpdateCart.length; i++) {
                            if (newUpdateCart[i].ID.toString() == listUpdateProductCart[index].productId.toString()) {
                                listUpdateProductCart[index].quantity = newUpdateCart[i].Quantity;

                                newSum = newSum + parseFloat(items.price) * parseFloat(newUpdateCart[i].Quantity);
                            }
                        }
                    }
                })
            })
        })
        .then(result => {
            const updatedCart = {
                items: listUpdateProductCart,
                sum: newSum
            };
            this.cart = updatedCart;
            console.log("JSON.parse(JSON.stringify(this.cart))", JSON.parse(JSON.stringify(this.cart)))
            console.log(" JSON.stringify(this.cart)", JSON.stringify(this.cart))
            console.log("TCL: cart =>", this.cart);
            return this.save();
        })

}


//Order
userSchema.methods.CheckOut = function (name, mobilenumber, address) {
    const listUpdateProductCart = [...this.cart.items];
    const orderProduct = this.productNewOrder;
    let itemsCart = JSON.parse(JSON.stringify(this.cart));
    const today = new Date();
    const date_format = new Date(today).toDateString();
    const created = date_format;
    console.log("TCL: userSchema.methods.CheckOut -> this.productNewOrder.order", this.productNewOrder.order)
    ProductModel.find()
        .then(product => {
            listUpdateProductCart.forEach((item, index) => {
                product.forEach(items => {
                    if (items._id.toString() == listUpdateProductCart[index].productId.toString()) {
                        items.quantity = items.quantity - listUpdateProductCart[index].quantity
                        //   return items.save();
                    }
                })
            })
        })
    orderProduct.order.unshift(itemsCart);
    orderProduct.createdOrder = created
    orderProduct.fullname = name;
    orderProduct.mobilenumber = mobilenumber;
    orderProduct.address = address;
    console.log("TCL: userSchema.methods.CheckOut -> orderProduct", orderProduct)
    this.cart = {
        items: [],
        sum: 0
    };
    return this.save();
}

export const UserModel = model('User', userSchema)

//Module.exports


/* update CArt
 var listProductCart = this.cart.items;
  var sum = this.cart.sum;
  for (var i = 0; i < listProductCart.length; i++) {

      if(listProductCart[i].productId== productID){
      console.log('alo',action)
      switch(action){
        case "add":
          listProductCart[i].quantity++;
          sum = sum + productDetail.price; 
          console.log("TCL: userSchema.methods.updatedCart -> sum", sum)
          break;
        case "remove":
          listProductCart[i].quantity--;
          sum = sum - productDetail.price;
          console.log("TCL: userSchema.methods.updatedCart -> sum", sum)
          if(listProductCart[i].quantity<1) listProductCart.splice(i,1);
          break;
        default:
          console.log('Update Cart');
          break;
      }
      break;
    }
  }
  const updatedCart = {
    items: listProductCart,
    sum: sum
  };
  this.cart = updatedCart;
  console.log("TCL: cart =>", this.cart);
  return this.save(); */
