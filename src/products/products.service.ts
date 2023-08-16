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

    findAll(productQuerytDto): {products: Product[], suggestedProducts: Product[]} | NotFoundException {

        const firstIndex = 0;
        const secondIndex = 2;
        
        const { filter } =  productQuerytDto;
        const products: Product[] = filter ?
            this.products.filter(product => product.name.toLowerCase().includes(filter.toLowerCase())) 
            : this.products;

        if (products.length === 0) {
            throw new NotFoundException(`Found no matches for ${filter}`);
        }

        const suggestedProducts: Product[] = filter ?
            this.products.filter(product => (product.category === products[firstIndex].category && product.id !== products[firstIndex].id)).slice(firstIndex, secondIndex) 
            : [];

        return {products, suggestedProducts};
    }


}
