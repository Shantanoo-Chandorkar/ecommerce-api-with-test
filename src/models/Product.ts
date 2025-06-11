import mongoose, { Document, Schema } from 'mongoose';

export interface IProduct extends Document {
  _id: string; // 
  name: string;
  brand: string;
  price: number;
  rating: number;
  description: string;
  image_url: string;
  category: string;
  subcategory: string;
  gender: string;
  stock: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema = new Schema<IProduct>({
  _id: { type: String, required: true },
  name: { type: String, required: true },
  brand: { type: String, required: true },
  price: { type: Number, required: true },
  rating: { type: Number, required: true },
  description: { type: String, required: true },
  image_url: { type: String, required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  gender: { type: String, required: true },
  stock: { type: Number, required: true },
}, { timestamps: true });

// 🔥 Index for pagination (sort by createdAt desc)
ProductSchema.index({ createdAt: -1 });

// 🧠 Optional indexes for filters (if you support filter-based searching)
ProductSchema.index({ category: 1 });
ProductSchema.index({ brand: 1 });
ProductSchema.index({ gender: 1 })

export default mongoose.model<IProduct>('Product', ProductSchema);
