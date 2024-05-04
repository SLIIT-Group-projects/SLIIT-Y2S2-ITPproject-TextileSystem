// import mongoose from 'mongoose';

// // const reviewSchema = mongoose.Schema(
// //   {
// //     name: { type: String, required: true },
// //     rating: { type: Number, required: true },
// //     comment: { type: String, required: true },
// //     user: {
// //       type: mongoose.Schema.Types.ObjectId,
// //       required: true,
// //       ref: 'User',
// //     },
// //   },
// //   {
// //     timestamps: true,
// //   }
// // );

// const productSchema = mongoose.Schema(
//   {
//     // user: {
//     //   type: mongoose.Schema.Types.ObjectId,
//     //   required: true,
//     //   ref: 'User',
//     // },
//     product_name: {
//       type: String,
//       required: true,
//     },
//     image: {
//       type: String,
//       required: true,
//     },
//     product_description: {
//       type: String,
//       required: true,
//     },
//     unit_price: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     weight:{
//       type: Number, 
//       require: true,
//       default: 0,
//     },
//     quantity: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//     size: {
//       type: String,
//       required: true
//     }
//   },
//   {
//     timestamps: true,
//   }
// );

// const Product = mongoose.model('Product', productSchema);

// export default Product;
