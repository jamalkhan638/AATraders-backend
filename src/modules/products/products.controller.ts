import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, UploadedFiles, UseGuards, Headers, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { addProductDto,UpdateProductDto ,editFileName } from './dto/products.dto';
import { ProductService } from './products.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IsNotEmpty } from 'class-validator';
const axios = require("axios").default;

@Controller('product')
@ApiTags('Product')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Post('/register')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name :{
            type: 'string'
          },
          weight :{
            type: 'string'
          },
          unit :{
            type: 'string'
          },
          productCode :{
            type: 'string'
          },
          rateCode :{
            type: 'string'
          },
          price :{
              type: 'string'
            },
        },
      },
    })
    async register(@Body() data,@Headers() headers: Headers,@Res() res?: Response) {
        try {
            var response = await this.productService.register(data);
            if(response == "alreadyexist"){
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Product Already Exist",data:"Product Already Exist"});
          }else{
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Product has been registered successfully",data:"Product has been registered successfully"});
          }
        } catch (ex) {
            throw ex;
        }
    }

  

    @Get('/:id')
    // @UseGuards(JwtAuthGuard)
    async getProduct(@Param('id') id: number,@Res() res?: Response) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
        var response = await this.productService.getProducts(id);
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Product detail",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
          ex;  
        }
        
    }

    

    

    @Get('/prod/getAllProducts')
    // @UseGuards(JwtAuthGuard)
    async getAllCandidates(@Res() res?: Response) {
        try {
        var response = await this.productService.getAllProducts();
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Products detail",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
          ex;  
        }
        
    }



    @Put('/prod/:id')
    // @UseGuards(JwtAuthGuard)
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name :{
            type: 'string'
          },
          weight :{
            type: 'string'
          },
          unit :{
            type: 'string'
          },
          productCode :{
            type: 'string'
          },
          rateCode :{
            type: 'string'
          },
          price :{
              type: 'string'
            },
        },
      },
    })
   async updateProduct(@Param('id') id: number,@Body() mydata:UpdateProductDto,@Headers() headers: Headers,@Res() res: Response) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
            var response =  await this.productService.update(id,mydata);
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Product has been updated successfully",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
            throw ex;
        }
        
    }

    @Delete('/:id')
    async deleteProduct(@Param('id') id: number) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
            return await this.productService.deleteProdcuct(id);
        } catch (ex) {
            throw ex;
        }
    }


}
