// src/controllers/productController.ts
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Product from '../models/Product';

export const getPaginatedProducts = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {

    const limit = parseInt(req.query.limit as string) || 20;
    const after = req.query.after as string | undefined;

    // Build filter for cursor-based pagination using _id
    const filter: Record<string, any> = {};
    if (after) {
        filter._id = { $lt: after };
    }

    const products = await Product.find(filter)
      .sort({ _id: -1 }) // Most recent first by _id
      .limit(limit)
      .exec();
    
    // Safely determine the next cursor (the _id of the last product)
    const lastProduct = products[products.length - 1];
    const nextCursor = lastProduct ? lastProduct._id : null;

    res.status(200).json({
      hasMore: products.length === limit,
      nextCursor,
      pageSize: limit,
      products,
    });

    /* 
    // --- Old createdAt-based cursor pagination (commented out) ---
    const filterCreatedAt: Record<string, any> = {};
    if (after) {
      const afterDate = new Date(after);
      if (!isNaN(afterDate.getTime())) {
        filterCreatedAt.createdAt = { $lt: afterDate }; // paginate backward in time
      }
    }

    const productsCreatedAt = await Product.find(filterCreatedAt)
      .sort({ createdAt: -1 }) // Most recent first
      .limit(limit);

    const nextCursorCreatedAt =
      productsCreatedAt.length > 0
        ? productsCreatedAt[productsCreatedAt.length - 1].createdAt.toISOString()
        : null;
    */
  } catch (error) {
    console.error('❌ Error fetching paginated products:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
