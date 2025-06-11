// src/tests/unit/productController.test.ts
import { getPaginatedProducts } from '../../controllers/productController';
import Product from '../../models/Product';
// src/tests/unit/productController.test.ts
import { Request, Response } from 'express';
import { mocked } from 'jest-mock';

jest.mock('../../models/Product');

describe('getPaginatedProducts', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;

  beforeEach(() => {
    req = {
      query: { limit: '2' },
    };

    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
  });

  it('should return products with correct pagination', async () => {
    const mockProducts = [
      { _id: '65a123', name: 'Product 1' },
      { _id: '65a122', name: 'Product 2' },
    ];

    mocked(Product.find).mockReturnValueOnce({
      sort: () => ({
        limit: () => ({
          exec: () => Promise.resolve(mockProducts),
        }),
      }),
    } as any);

    await getPaginatedProducts(req as Request, res as Response);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      hasMore: true,
      nextCursor: '65a122',
      pageSize: 2,
      products: mockProducts,
    });
  });
});
