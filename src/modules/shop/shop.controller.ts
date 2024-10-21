import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, Res, UploadedFiles, UseGuards, Headers, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiParam, ApiProperty, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { addShopDto,updateShopDto ,editFileName } from './dto/shop.dto';
import { ShopService } from './shop.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { IsNotEmpty } from 'class-validator';
import { channel } from 'diagnostics_channel';
const axios = require("axios").default;

@Controller('Shop')
@ApiTags('Shop')
export class ShopController {
    constructor(private readonly shopService: ShopService) { }

    @Post('/register')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name :{
            type: 'string'
          },
          ntn :{
            type: 'string'
          },
          strn :{
            type: 'string'
          },
          contactPerson :{
            type: 'string'
          },
          channel :{
            type: 'string'
          },
          cell :{
              type: 'string'
            },
          credit :{
              type: 'string'
            },
        },
      },
    })
    async register(@Body() data,@Headers() headers: Headers,@Res() res?: Response) {
        try {
            var response = await this.shopService.register(data);
            if(response == "alreadyexist"){
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Shop Already Exist",data:"shop Already Exist"});
          }else{
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Shop has been registered successfully",data:"Shop has been registered successfully"});
          }
        } catch (ex) {
            throw ex;
        }
    }

  

    @Get('/:id')
    // @UseGuards(JwtAuthGuard)
    async getShop(@Param('id') id: number,@Res() res?: Response) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
        var response = await this.shopService.getShop(id);
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Shop detail",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
          ex;  
        }
        
    }

    

    

    @Get('/prod/getAllShops')
    // @UseGuards(JwtAuthGuard)
    async getAllCandidates(@Res() res?: Response) {
        try {
        var response = await this.shopService.getAllShops();
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Shops detail",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
          ex;  
        }
        
    }



    @Put('/shp/:id')
    // @UseGuards(JwtAuthGuard)
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          name :{
            type: 'string'
          },
          ntn :{
            type: 'string'
          },
          strn :{
            type: 'string'
          },
          contactPerson :{
            type: 'string'
          },
          channel :{
            type: 'string'
          },
          cell :{
              type: 'string'
            },
          credit :{
              type: 'string'
            },
        },
      },
    })
   async updateShop(@Param('id') id: number,@Body() mydata:updateShopDto,@Headers() headers: Headers,@Res() res: Response) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
            var response =  await this.shopService.update(id,mydata);
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Shop has been updated successfully",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
            throw ex;
        }
        
    }


  
    @Post('/addExpense')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          expenseType :{
            type: 'string'
          },
          expense :{
            type: 'string'
          },
        },
      },
    })
    async addExpense(@Body() data,@Headers() headers: Headers,@Res() res?: Response) {
        try {
            var response = await this.shopService.addExpense(data);
            if(response == "alreadyexist"){
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Expense Already Exist",data:"Expense Already Exist"});
          }else{
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Expense has been registered successfully",data:"Expense has been registered successfully"});
          }
        } catch (ex) {
            throw ex;
        }
    }


    @Put('/udpateExpense/:id')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          expenseType :{
            type: 'string'
          },
          expense :{
            type: 'string'
          },
        },
      },
    })
    async udpateExpense(@Param('id') id: number,@Body() data,@Headers() headers: Headers,@Res() res?: Response) {
        try {
            var response = await this.shopService.updateExpense(data,id);
            if(response == "alreadyexist"){
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Expense Already Exist",data:"Expense Already Exist"});
          }else{
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Expense has been registered successfully",data:"Expense has been registered successfully"});
          }
        } catch (ex) {
            throw ex;
        }
    }
    
    @Delete('/:id')
    async deleteExpense(@Param('id') id: number) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
            return await this.shopService.deleteExpense(id);
        } catch (ex) {
            throw ex;
        }
    }

/////////////////////////for invoice /////////////////////////////////////////////////

@Post('/product/addInvoiceData')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          invoiceNumber :{
            type: 'string'
          },
          productName :{
            type: 'string'
          },
          productCode :{
            type: 'string'
          },
          rpIncTax :{
            type: 'string'
          },
          rateCode :{
            type: 'string'
          },
          tpExclude :{
            type: 'string'
          },
          quantityCtn :{
              type: 'string'
            },
          quantityPcs :{
              type: 'string'
            },
          totalWeight :{
              type: 'string'
            },
          valueExculdedTax :{
              type: 'string'
            },
          gst18 :{
              type: 'string'
            },
          valueIncludedGst :{
              type: 'string'
            },
          toRate :{
              type: 'string'
            },
          atoRate :{
              type: 'string'
            },
          specialDiscount :{
              type: 'string'
            },
          totalTradeOffer :{
              type: 'string'
            },
          grossInvoiceValue :{
              type: 'string'
            },
        },
      },
    })
    async addInvoiceData(@Body() data,@Headers() headers: Headers,@Res() res?: Response) {
        try {
            var response = await this.shopService.addInvoiceData(data);
            if(response == "alreadyexist"){
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Invoice Already Exist",data:"Invoice Already Exist"});
          }else{
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Invoice has been added successfully",data:"Invoice has been added successfully"});
          }
        } catch (ex) {
            throw ex;
        }
    }

  

    @Get('/product/invoice/:id')
    // @UseGuards(JwtAuthGuard)
    async getInvoice(@Param('id') id: number,@Res() res?: Response) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
        var response = await this.shopService.getInvoice(id);
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Invoice detail",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
          ex;  
        }
        
    }

    

    

    @Get('/all/product/invoice/getAllInvoices')
    async getAllInvoices(@Res() res?: Response) {
        try { 
        var response = await this.shopService.getAllInvoices();
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Invoices detail",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
          ex;  
        }
        
    }

    @Get('/invoice/invoice-number/invoiceNumber')
    async invoiceNumber(@Res() res?: Response) {
        try { 
        var response = "AAT-"+Math.floor(10000000 + Math.random() * 90000000);
        if(response){
          return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Invoice Number",data:response});
          }else{
          return res.status(HttpStatus.BAD_REQUEST).json({statusCode:res.statusCode,statusMessage:"Something went wrong",data:""});
          }
        } catch (ex) {
          ex;  
        }
        
    }

}
