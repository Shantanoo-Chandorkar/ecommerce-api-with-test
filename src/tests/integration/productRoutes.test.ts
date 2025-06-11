// src/tests/integration/productRoutes.test.ts
import request from 'supertest';
import app from '../../app';
import Product from '../../models/Product';

describe('/api/products', () => {
  it('should return paginated products', async () => {
    await Product.insertMany([
      {
        _id: '65a123',
        name: 'Shirt',
        brand: 'BrandA',
        price: 999,
        rating: 4.5,
        description: 'Casual shirt',
        image_url: 'http://image.com/shirt.jpg',
        category: 'Clothing',
        subcategory: 'Shirts',
        gender: 'Men',
        stock: 10,
      },
      {
        _id: '65a124',
        name: 'T-Shirt',
        brand: 'BrandB',
        price: 499,
        rating: 4.2,
        description: 'Cool T-shirt',
        image_url: 'http://image.com/tshirt.jpg',
        category: 'Clothing',
        subcategory: 'T-Shirts',
        gender: 'Women',
        stock: 15,
      },
    ]);

    const res = await request(app).get('/api/products?limit=2');

    expect(res.status).toBe(200);
    expect(res.body.products.length).toBeGreaterThan(0);
    expect(res.body.hasMore).toBe(true);
    expect(res.body.nextCursor).toBeDefined();
  });
});
