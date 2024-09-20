import { Body, Controller, Delete, Get,UploadedFiles,HttpException, HttpStatus, Param, Post, Put, Query, Res, StreamableFile, UseGuards, UseInterceptors,Headers } from '@nestjs/common';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../guards/auth/jwt-auth.guard';
import { SignupDto, UserUpdateDto,editFileName,CreateStaffDepartmentDto,UpdateStaffDepartmentDto,CreateStaffDesignationDto,UpdateStaffDesignationDto,CreateAreaDto,UpdateAreaDto,CreateCityDto,UpdateCityDto,CreateCountryDto,UpdateCountryDto } from './dto/users.dto';
import { Response } from 'express';
import { UsersService } from './users.service';
import { join } from 'path';
import { createReadStream } from 'fs';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
let ejs = require("ejs");
let pdf = require("html-pdf");
var fs = require('fs');
let path = require("path");
@Controller('users')
@ApiTags('User')
export class UsersController {
    constructor(private readonly userService: UsersService) { }


    @Post('/register')
    async register(@Body() data: SignupDto) {
        try {
           
            return await this.userService.register(data);
        } catch (ex) {
            throw ex;
        }
    }

    @Post('/login')
    @ApiBody({
      schema: {
        type: 'object',
        properties: {
          email :{
            type: 'string'
          },
          password :{
            type: 'string'
          },
        },
      },
    })
    login(@Body() data: any) {  
        try {
            return this.userService.login(data.email, data.password);
        } catch (ex) {
            throw ex;
        }
    }

    @Post('/logout')
    logOutUser(@Body() data: any){
        try {
            return this.userService.logOutUser();
        } catch (ex) {
            throw ex;
        }
    }

    @Get('/:id')
    // @UseGuards(JwtAuthGuard)
    getUser(@Param('id') id: number) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
        return this.userService.getUser(id);
        } catch (ex) {
          ex;  
        }
        
    }

    @Get('/')
    // @UseGuards(JwtAuthGuard)
    getUsers() {
        try {
        return this.userService.getUsers();
        } catch (ex) {
          ex;  
        }
        
    }

   

    

    @Put('/:id')
      @ApiBody({
        schema: {
          type: 'object',
          properties: {
            firstName :{
              type: 'string'
            },
            lastName :{
              type: 'string'
            },
          },
        },
      })
    async updateUser(@Param('id') id: number,@Body() data :UserUpdateDto,@Headers() headers: Headers) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
        return await this.userService.update(id,data);
        } catch (ex) {
            throw ex;
        }
        
    }

//     @Get('/getEmployeesWithAgencies')
//     getEmployeesWithAgencies(@Param('agencyOffice') agencyOffice: number,@Res() res?: Response) {
//     return this.userService.getEmployeesWithAgencies(agencyOffice);
//   }



    // @ApiBearerAuth('jwt')
    // @UseGuards(JwtAuthGuard)
    @Delete('/:id')
    async deleteUser(@Param('id') id: number) {
        try {
            if (!id) throw new HttpException('Please enter a valid id', HttpStatus.BAD_REQUEST)
            return await this.userService.deleteUser(id);
        } catch (ex) {
            throw ex;
        }
    }

     //////////////////////// code for Area end /////////////////////////
}


