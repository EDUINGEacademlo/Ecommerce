
const Category = require('./Category');
const Image = require('./Image');
const Product = require('./Product');
const User = require('./User');
const Cart = require('./Cart');
const Purchase = require('./Purchase');




Category.hasMany(Product);
Product.belongsTo(Category);

Product.hasMany(Image)
Image.belongsTo(Product)

Product.hasMany(Cart);
Cart.belongsTo(Product);

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Purchase);
Purchase.belongsTo(User);

User.hasMany(Purchase);
Purchase.belongsTo(User);

