const { ProductModel } = require("../model/product.model");
const { UserModel } = require("../model/auth.model");
const token_secret = process.env.TOKEN_KEY;





const addToCart = async(req,res)=>{
      // let {id}  = req.params;
      // try {
      // var decode=jwt.verify(token,token_secret)
      // if(decode){
      //    let userEmail =  decode.email
      //    let user = await UserModel.findOne({email:userEmail});
      //    if(user){
      //       let existing_prod = await UserModel.findOne({"cartItem.productId":id});
      //       if(existing_prod){
      //          return res.send({
      //             message:"Item Already in Cart"
      //          })
      //       }else{
      //             let user = await UserModel.findOneAndUpdate(
      //                { email:userEmail },
      //                {$push:{cartItem:{productId:id}}},
      //                {new:true}
      //                );
      //             if(user){
      //                return res.send({
      //                       message:"Added",
      //                       data:user
      //                    })
      //             }
      //          }
      //       }
         
        
      // }
      
      // } catch (error) {
      //    return res.send({
      //       error:error,
      //       token:token
      //    })
      // }
  }

 const getProductById = async(req,res)=>{
   let {id} = req.params;
   let product = await ProductModel.findOne({_id:id});
   if(product){
      return res.send({
         data:product,
         message:""
      })
   }else{
      return res.status(404).send({
         message:"Data not found"
      })
   }
 } 
  const getProds = async(req,res)=>{
    let products  = await ProductModel.find()
    return res.send(products)
   }

   module.exports = {
    getProds,
    addToCart,
    getProductById
   }