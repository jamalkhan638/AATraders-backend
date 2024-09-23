import { HttpException, HttpStatus, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { TypeOrmQueryService } from '@nestjs-query/query-typeorm';
import { Users } from './user.entity';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { Connection, Not, Repository } from 'typeorm';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { TokenPayload } from 'src/types/token-payload.type';
import { ConfigService } from 'nestjs-config';
import { JwtService } from '@nestjs/jwt';
import { SignupDto, UserUpdateDto,CreateStaffDepartmentDto,UpdateStaffDepartmentDto,CreateStaffDesignationDto,UpdateStaffDesignationDto,CreateAreaDto,UpdateAreaDto,CreateCityDto,UpdateCityDto,CreateCountryDto,UpdateCountryDto } from './dto/users.dto';
import { IPaginationOptions, paginate } from 'nestjs-typeorm-paginate';

const PDFDocument = require('pdfkit');
var fs = require('fs');
const doc = new PDFDocument;
let ejs = require("ejs");
let pdf = require("html-pdf");



@Injectable()
export class UsersService extends TypeOrmQueryService<Users>  {
  constructor(
    @InjectRepository(Users)
    private readonly usersRepository: Repository<Users>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
    @InjectConnection() private readonly connection: Connection
  ) {
    super(usersRepository, { useSoftDelete: true });
    this.connection.query("set session sql_mode=''");
  }


  async getUser(id: number) {
    try {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user;
    } catch (ex) {
      throw ex;
    }
  }


 

  
  async getUsers() {
    try {
      // console.log("isCompletedisCompleted",options.limit);
    //   var limit:number = options.limit;
    //   var page = options.page;
      // var numPerPage = limit;
      // var skip:any = (page-1) * numPerPage;


    // var limitPage = "limit " + skip + "," + numPerPage;
    //   var offset = (page - 1) * limit
    
      var select_query = 'SELECT * FROM users';
      var res_query = this.connection.query(select_query);
      if (!res_query) {
        throw new NotFoundException(`Agency not found`);
      }
      return res_query;
    } catch (ex) {
      throw ex;
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

  

 

  async deleteUser(id: number) {
    try {
      return await this.usersRepository.delete(id);
    } catch (ex) {
      throw ex;
    }
  }

  async logOutUser() {
    try {
      return "logout";
    } catch (ex) {
      throw ex;
    }
  }


  async login(email: string, password: string) {
    try {
      const user = await this.usersRepository.findOne({
        where: { email: email }
      });

      if (!user)
        throw new HttpException(
          'invalid username/password',
          HttpStatus.BAD_REQUEST
        );
      if (!user.password)
        throw new HttpException(
          'Password not set, please use forgot password to reset password',
          HttpStatus.BAD_REQUEST
        );
      if (!(await user.comparePassword(password)))
        throw new HttpException(
          'invalid username/password',
          HttpStatus.BAD_REQUEST
        );

      const token = this.getJwtToken({
        ...user.toResponseObject()
      });

      return {
        user: user.toResponseObject(),
        token
      };
    } catch (ex) {
      throw ex;
    }
  }


  

  private getJwtToken(payload: TokenPayload) {
    try {
      const token = this.jwtService.sign(payload, {
        secret: this.config.get('app.jwtSecret')
      });
      return token;
    } catch (ex) {
      throw ex;
    }
  }

  async register(data: SignupDto) {
    try {
      if (data.email) {
        data.email = data.email;

        let userExist = await this.usersRepository.findOne({
          where: { email: data.email }, withDeleted: true
        });
        if (userExist) {
          throw new HttpException(
            'Email already exists',
            HttpStatus.BAD_REQUEST
          );
        }
      }

      const user: Users = new Users();
      user.firstName=data.firstName;
      user.lastName=data.lastName;
      user.email = data.email;
      user.password = data.password;
      await this.usersRepository.save(user);
      return {
        user: user,
        token: this.jwtService.sign(
          {
            ...user.toResponseObject()
          },
          {
            secret: this.config.get('app.jwtSecret')
          }
        )
      };
    } catch (err) {
      throw err
    }
  }

 
  async update(id: number, data: UserUpdateDto) {
    try {

      var update_user_query = "UPDATE users set firstName = '"+data.firstName+"',lastName = '"+data.lastName+"' where id="+id;
      var requisition_execute_query = await this.connection.query(update_user_query);
      // await this.usersRepository.update(id, user);
      if(requisition_execute_query){
   
    }
      return await this.getUser(id);
    } catch (ex) {
      throw ex;
    }
  }

  
}
