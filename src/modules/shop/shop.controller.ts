import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
  UploadedFiles,
  UseGuards,
  Headers,
  UseInterceptors,
} from "@nestjs/common";
import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiParam,
  ApiProperty,
  ApiTags,
} from "@nestjs/swagger";
import { Response } from "express";
import { JwtAuthGuard } from "../../guards/auth/jwt-auth.guard";
import { addShopDto, updateShopDto, editFileName } from "./dto/shop.dto";
import { ShopService } from "./shop.service";
import { FilesInterceptor } from "@nestjs/platform-express";
import { diskStorage } from "multer";
import { IsNotEmpty } from "class-validator";
import { channel } from "diagnostics_channel";
const axios = require("axios").default;

@Controller("Shop")
@ApiTags("Shop")
export class ShopController {
  constructor(private readonly shopService: ShopService) {}

  @Post("/register")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        ntn: {
          type: "string",
        },
        strn: {
          type: "string",
        },
        contactPerson: {
          type: "string",
        },
        address: {
          type: "string",
        },
        cnic: {
          type: "string",
        },
        cell: {
          type: "string",
        },
        credit: {
          type: "string",
        },
      },
    },
  })
  async register(
    @Body() data,
    @Headers() headers: Headers,
    @Res() res?: Response
  ) {
    try {
      var response = await this.shopService.register(data);
      if (response == "alreadyexist") {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Shop Already Exist",
            data: "shop Already Exist",
          });
      } else {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Shop has been registered successfully",
            data: "Shop has been registered successfully",
          });
      }
    } catch (ex) {
      throw ex;
    }
  }

  @Get("/:id")
  // @UseGuards(JwtAuthGuard)
  async getShop(@Param("id") id: number, @Res() res?: Response) {
    try {
      if (!id)
        throw new HttpException(
          "Please enter a valid id",
          HttpStatus.BAD_REQUEST
        );
      var response = await this.shopService.getShop(id);
      if (response) {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Shop detail",
            data: response,
          });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Something went wrong",
            data: "",
          });
      }
    } catch (ex) {
      ex;
    }
  }

  @Get("/prod/getAllShops")
  // @UseGuards(JwtAuthGuard)
  async getAllCandidates(@Res() res?: Response) {
    try {
      var response = await this.shopService.getAllShops();
      if (response) {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Shops detail",
            data: response,
          });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Something went wrong",
            data: "",
          });
      }
    } catch (ex) {
      ex;
    }
  }

  @Put("/shp/:id")
  // @UseGuards(JwtAuthGuard)
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        name: {
          type: "string",
        },
        ntn: {
          type: "string",
        },
        strn: {
          type: "string",
        },
        contactPerson: {
          type: "string",
        },
        address: {
          type: "string",
        },
        cnic: {
          type: "string",
        },
        cell: {
          type: "string",
        },
        credit: {
          type: "string",
        },
      },
    },
  })
  async updateShop(
    @Param("id") id: number,
    @Body() mydata: updateShopDto,
    @Headers() headers: Headers,
    @Res() res: Response
  ) {
    try {
      if (!id)
        throw new HttpException(
          "Please enter a valid id",
          HttpStatus.BAD_REQUEST
        );
      var response = await this.shopService.update(id, mydata);
      if (response) {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Shop has been updated successfully",
            data: response,
          });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Something went wrong",
            data: "",
          });
      }
    } catch (ex) {
      throw ex;
    }
  }

  @Delete("/:id")
  async deleteShop(@Param("id") id: number) {
    try {
      if (!id)
        throw new HttpException(
          "Please enter a valid id",
          HttpStatus.BAD_REQUEST
        );
      return await this.shopService.deleteShop(id);
    } catch (ex) {
      throw ex;
    }
  }

  @Post("/addExpense")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        expenseType: {
          type: "string",
        },
        expense: {
          type: "string",
        },
        created_at: {
          type: "string",
        },
      },
    },
  })
  async addExpense(
    @Body() data,
    @Headers() headers: Headers,
    @Res() res?: Response
  ) {
    try {
      var response = await this.shopService.addExpense(data);
      if (response == "alreadyexist") {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Expense Already Exist",
            data: "Expense Already Exist",
          });
      } else {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Expense has been registered successfully",
            data: "Expense has been registered successfully",
          });
      }
    } catch (ex) {
      throw ex;
    }
  }

  @Get("/expense/getAllExpense")
  // @UseGuards(JwtAuthGuard)
  async getAllExpense(@Res() res?: Response) {
    try {
      var response = await this.shopService.getAllExpense();
      if (response) {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Expense detail",
            data: response,
          });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Something went wrong",
            data: "",
          });
      }
    } catch (ex) {
      ex;
    }
  }

  @Put("/udpateExpense/:id")
  @ApiBody({
    schema: {
      type: "object",
      properties: {
        expenseType: {
          type: "string",
        },
        expense: {
          type: "string",
        },
        created_at: {
          type: "string",
        },
      },
    },
  })
  async udpateExpense(
    @Param("id") id: number,
    @Body() data,
    @Headers() headers: Headers,
    @Res() res?: Response
  ) {
    try {
      var response = await this.shopService.updateExpense(data, id);
      if (response == "alreadyexist") {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Expense Already Exist",
            data: "Expense Already Exist",
          });
      } else {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "Expense has been registered successfully",
            data: "Expense has been registered successfully",
          });
      }
    } catch (ex) {
      throw ex;
    }
  }

  @Delete("/expense/:id")
  async deleteExpense(@Param("id") id: number) {
    try {
      if (!id)
        throw new HttpException(
          "Please enter a valid id",
          HttpStatus.BAD_REQUEST
        );
      return await this.shopService.deleteExpense(id);
    } catch (ex) {
      throw ex;
    }
  }
 
  @Delete("/expenses/deleteAll")
  async deleteAllExpenses(@Res() res?: Response) {
    try {
      const response = await this.shopService.deleteAllExpenses();
      if (response.affectedRows > 0) {
        return res
          .status(HttpStatus.OK)
          .json({
            statusCode: res.statusCode,
            statusMessage: "All expenses have been deleted successfully",
            data: response,
          });
      } else {
        return res
          .status(HttpStatus.BAD_REQUEST)
          .json({
            statusCode: res.statusCode,
            statusMessage: "No expenses found to delete",
            data: "",
          });
      }
    } catch (ex) {
      throw new HttpException(
        "Error occurred while deleting all expenses",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

/////////////////////////for invoice /////////////////////////////////////////////////

@Post('/product/addInvoiceData')
@ApiBody({
      schema: {
        type: 'array',
        properties: {
        },
      },
    })

    
    // @ApiBody({
    //   schema: {
    //     type: 'object',
    //     properties: {
    //       invoiceNumber :{
    //         type: 'string'
    //       },
    //       productName :{
    //         type: 'string'
    //       },
    //       productCode :{
    //         type: 'string'
    //       },
    //       rpIncTax :{
    //         type: 'string'
    //       },
    //       rateCode :{
    //         type: 'string'
    //       },
    //       tpExclude :{
    //         type: 'string'
    //       },
    //       quantityCtn :{
    //           type: 'string'
    //         },
    //       quantityPcs :{
    //           type: 'string'
    //         },
    //       totalWeight :{
    //           type: 'string'
    //         },
    //       valueExculdedTax :{
    //           type: 'string'
    //         },
    //       gst18 :{
    //           type: 'string'
    //         },
    //       valueIncludedGst :{
    //           type: 'string'
    //         },
    //       toRate :{
    //           type: 'string'
    //         },
    //       atoRate :{
    //           type: 'string'
    //         },
    //       specialDiscount :{
    //           type: 'string'
    //         },
    //       totalTradeOffer :{
    //           type: 'string'
    //         },
    //       grossInvoiceValue :{
    //           type: 'string'
    //         },
    //       shopId :{
    //           type: 'number'
    //         },  
    //     },
    //   },
    // })
    async addInvoiceData(@Body() data,@Headers() headers: Headers,@Res() res?: Response) {
        try {
            var response = await this.shopService.addInvoiceData(data);
            if(response == "norecord"){
              return res.status(HttpStatus.OK).json({statusCode:res.statusCode,statusMessage:"Invoice Record is Missing",data:"Invoice Record is Missing"});
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


    @Get('/all/product/invoice/getAllInvoices/:shopId')
    async getAllInvoices(@Param('shopId') shopId: number,@Res() res?: Response) {
        try { 
        var response = await this.shopService.getAllInvoices(shopId);
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
