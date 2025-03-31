import {
  Injectable,
  Logger,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class ProductsService extends PrismaClient implements OnModuleInit {
  private readonly logger = new Logger('ProductsService');

  async onModuleInit() {
    await this.$connect();
    this.logger.log('Database connected');
  }
  async create(createProductDto: CreateProductDto) {
    const productDb = await this.product.create({
      data: createProductDto,
    });
    return productDb;
  }

  findAll() {
    return this.product.findMany();
  }

  async findOne(id: number) {
    const productDb = await this.product.findUnique({
      where: {
        id,
      },
    });

    if (!productDb) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return productDb;
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const { id: ___, ...resData } = updateProductDto;

    await this.findOne(id);

    return this.product.update({
      where: {
        id,
      },
      data: resData,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    const product = await this.product.delete({
      where: {
        id,
      },
    });
    this.logger.log(`Product with id ${id} deleted`);

    return product;
  }
}
