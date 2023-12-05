const catchError = require('../utils/catchError');
const Purchase = require('../models/Purchase');
const Product = require('../models/Product');
const Image = require('../models/Image');
const Cart = require('../models/Cart');

const getAll = catchError(async(req,res)=> {
    const userId= req.user.id;
    const purchases = await Purchase.findAll({
        where:{userId:userId},
        include: [{
            model: Product,
            include:[Image]
        }]
    });
    return res.json(purchases);
});

const create = catchError(async(req,res)=>{
    const userId= req.user.id;
    const productsCart = await Cart.findAll({where: {userId:userId}, include: [{model:Product}]});
    const purchases = await Purchase.bulkCreate(productsCart.map(product =>{
        const{quantity, productId, userId} = product;
        return {quantity, productId, userId};
     
    }))
  await Cart.destroy({where: {userId: req.user.id}})
  return res.status(201).json(purchases);
});


module.exports = {
    getAll,
    create,
}