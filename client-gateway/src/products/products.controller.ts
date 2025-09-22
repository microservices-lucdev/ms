import { Controller, Get, Param, Post, Delete, Patch, Body, Inject, Query, BadRequestException, HttpStatus } from '@nestjs/common';
import { ClientProxy, Payload, RpcException } from '@nestjs/microservices';
import { error } from 'console';
import { firstValueFrom } from 'rxjs';
import { PaginationDto } from 'src/common';
import { PRODUCT_SERVICE } from 'src/config';

@Controller('products')
export class ProductsController {
  constructor(
    @Inject(PRODUCT_SERVICE) private readonly productsClient: ClientProxy
  ) { }

  @Post()
  createProduct() {
    return 'Crea un producto';
  }

  @Get()
  findAllProducts(
    @Query() paginationDto: PaginationDto
  ) {
    return this.productsClient.send({ cmd: 'find_all' }, paginationDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return await firstValueFrom(
        this.productsClient.send({ cmd: 'find_one_product' }, { id })
      );
    } catch (err) {
      console.log(err)
      throw new RpcException({
        message: `Product with #id ${id} not found`,
        status: HttpStatus.BAD_REQUEST
      })
    }

  }

  @Delete(':id')
  deleteOne(@Param('id') id: string) {
    return this.productsClient.send({ cmd: 'delete_product' }, { id });
  }

  @Patch(':id')
  patchProduct(
    @Body() body: any,
    @Param('id') id: string) {
    return 'Actualiza el producto relacionado al id ' + id;
  }

}
