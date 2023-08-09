import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './interfaces/product.interface';

@Injectable()
export class ProductsService {
    private readonly products: Product[] =  [
        {
        id: 1,
        name: "Samsung Galaxy",
        category: "electronics"
        }, 
        {
        id: 2,
        name: "Motorola V3",
        category: "electronics"
        }, 
        {
        id: 3,
        name: "Iphone 12",
        category: "electronics"
        }, 
        {
        id: 4,
        name: "Skippy",
        category: "grocery store"
        }
    ];

    create(product: Product) {
        try {
            this.products.push(product);
        } catch (e) {
            console.error(`${__dirname}: ${e}`);
        }
      }

    findAll(productQuerytDto): {products: Product[], suggestedProducts: Product[]} | NotFoundException {

        const { filter } =  productQuerytDto;
        const products: Product[] = filter ?
            this.products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase())) 
            : this.products;

        if (products.length === 0) {
            throw new NotFoundException(`Found no matches for ${filter}`);
        }

        const suggestedProducts: Product[] = filter ?
            this.products.filter(product => (product.category === products[0].category && product.id !== products[0].id)).slice(0, 2) 
            : [];

        return {products, suggestedProducts};
    }


}
