import {  Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Product } from './products.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection,  Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ConfigService } from 'nestjs-config';
import { JwtService } from '@nestjs/jwt';

var moment = require('moment');
const axios = require("axios").default;


@Injectable()
export class ProductService extends TypeOrmQueryService<Product>  {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
    @InjectConnection() private readonly connection: Connection
  ) {
    super(productRepository, { useSoftDelete: true });
  }


  async getProducts(id: number) {
    try {
      // const user = await this.candidateRepository.findOne({ where: { id:id,status:1 } });
      var selectUserQuery = 'SELECT products.* from products where products.id ='+id;
      var user = await this.connection.query(selectUserQuery);
      
      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user[0];
    } catch (ex) {
      throw ex;
    }
  }

  async getAllProducts() {
    try {
      // return await this.candidateRepository.find({ where: { status:1 } });
      var selectAllProducts = 'SELECT * from products';
      var getproductsList = await this.connection.query(selectAllProducts);
      return getproductsList;
    } catch (ex) {
      throw ex;
    }
  }
  


  async deleteProdcuct(id: number) {
    try {
      // return await this.candidateRepository.delete(id);
      var delete_query = "DELETE from products where id = "+id;
      var delete_query_execute = await this.connection.query(delete_query);
      if(delete_query_execute){
        return "deleted";
      }
    } catch (ex) {
      throw ex;
    }
  }

  

  async register(data) {
    try {
      if (data.name) {
        let productsExist = await this.productRepository.findOne({
          where: { name: data.name }, withDeleted: true
        });
        if(productsExist) {
          return "alreadyexist";
        }
      }
      const product: Product = new Product();
      product.name = data.name;
      product.total_weight = data.total_weight;
      product.unit = data.unit;
      product.productCode = data.productCode;
      product.rateCode = data.rateCode;
      product.quantity_pcs = data.quantity_pcs;
      product.quantity_ctn = data.quantity_ctn;
      product.price = data.price;
      product.createdAt = moment().format('YYYY-MM-DD');
      

      var execute_user = await this.productRepository.save(product);
      
      if(execute_user){
    
    
    }
      return "done";
    } catch (err) {
      throw err
    }
  }


  mysql_real_escape_string_func(str) {
    return str.replace(/[\0\x08\x09\x1a\n\r"'\\\%]/g, function (char) {
      switch (char) {
        case "\0":
          return "\\0";
        case "\x08":
          return "\\b";
        case "\x09":
          return "\\t";
        case "\x1a":
          return "\\z";
        case "\n":
          return "\\n";
        case "\r":
          return "\\r";
        case "\"":
        case "'":
        case "\\":
        case "%":
          return "\\" + char; // prepends a backslash to backslash, percent,
        // and double/single quotes
      }
    });
  }


  
  async update(id: number, data) {
    try {

      const product: Product = new Product();
      product.name = data.name;
      product.total_weight = data.total_weight;
      product.unit = data.unit;
      product.productCode = data.productCode;
      product.rateCode = data.rateCode;
      product.quantity_pcs = data.quantity_pcs;
      product.quantity_ctn = data.quantity_ctn;
      product.price = data.price;

      await this.productRepository.update(id, product);
    
      return await this.getProducts(id);
    } catch (ex) {
      throw ex;
    }
  }

}
