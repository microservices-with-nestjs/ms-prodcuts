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

  update(id: number, updateProductDto: UpdateProductDto) {
    return updateProductDto;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
