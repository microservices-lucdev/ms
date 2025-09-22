import { HttpException, HttpStatus, Injectable, Logger, NotFoundException, OnModuleInit } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';
import { PaginationDto } from 'src/common/pagination.dto';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {

  public readonly logger = new Logger('DB_ProductsMS');

  onModuleInit() {
    this.$connect();
    this.logger.log('Products database already connected')
  }
  create(createProductDto: CreateProductDto) {
    return this.product.create({ data: createProductDto })
  }

  async findAll(paginationDto: PaginationDto) {

    const { page = 1, limit = 10 } = paginationDto;
    const allProducts = await this.product.count({ where: { available:  true }});
    const lastPage = Math.ceil(allProducts / limit);

    if (page > lastPage) {
      return {
        message: 'Has llegado al limite de paginas'
      }
    };

    return {
      data: await this.product.findMany({
        skip: (page - 1) * limit,
        take: limit,
        omit: {
          updateAt: true
        },
        where: {
          available: true
        }
      }),
      info: {
        "Current page": page,
        "Lastpage": lastPage,
        "Total products": allProducts,
      }
    };
  }

  async findOne(id: number) {

    const product = await this.product.findUnique({
      where: { id, available: true }
    });

    if (!product) {
      throw new RpcException(`Product with id: #${id} was not found`);
    }

    return product;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {

    const { id: __, ...data } = updateProductDto
    await this.findOne(id)

    if (!updateProductDto || Object.keys(updateProductDto).length === 0) {
      throw new HttpException('Nothing to do', 304);
    }

    return this.product.update({
      where: { id },
      data: data
    })
  }

  async remove(id: number) {

    await this.findOne(id)
    
    //! hard delete
    // return await this.product.delete({
    //   where: { id }
    // });

    //* Soft delete
    return await this.product.update({
      where: { id },
      data: {
        available: false
      }
    });
  }

}






