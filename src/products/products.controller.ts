import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { ProductQueryDto } from './dto/product-query.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    async findAll(@Query() productQuerytDto: ProductQueryDto) {
      return this.productsService.findAll(productQuerytDto);
    }

    // @Post()
    // async create(@Body() createProductDto: CreateProductDto) {
    //     this.productsService.create(createProductDto);
    //   }
  
}
