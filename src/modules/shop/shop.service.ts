import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { TypeOrmQueryService } from "@nestjs-query/query-typeorm";
import { Shop } from "./shop.entity";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Connection, Not, Repository } from "typeorm";
import { REQUEST } from "@nestjs/core";
import { Request } from "express";
import { TokenPayload } from "src/types/token-payload.type";
import { ConfigService } from "nestjs-config";
import { JwtService } from "@nestjs/jwt";
import { addShopDto, updateShopDto } from "./dto/shop.dto";
import { IPaginationOptions, paginate } from "nestjs-typeorm-paginate";
import { Console } from "console";
var moment = require("moment");
const axios = require("axios").default;

@Injectable()
export class ShopService extends TypeOrmQueryService<Shop> {
  constructor(
    @InjectRepository(Shop)
    private readonly shopRepository: Repository<Shop>,
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
    @Inject(REQUEST) private readonly request: Request,
    @InjectConnection() private readonly connection: Connection
  ) {
    super(shopRepository, { useSoftDelete: true });
  }

  async getShop(id: number) {
    try {
      // const user = await this.candidateRepository.findOne({ where: { id:id,status:1 } });
      var selectUserQuery = "SELECT shops.* from shops where shops.id =" + id;
      var user = await this.connection.query(selectUserQuery);

      if (!user) {
        throw new NotFoundException(`User #${id} not found`);
      }
      return user[0];
    } catch (ex) {
      throw ex;
    }
  }

  async getAllShops() {
    try {
      // return await this.candidateRepository.find({ where: { status:1 } });
      var selectAllShops = "SELECT * from shops";
      var getShopsList = await this.connection.query(selectAllShops);
      return getShopsList;
    } catch (ex) {
      throw ex;
    }
  }

  async deleteShop(id: number) {
    try {
      // return await this.candidateRepository.delete(id);
      var delete_query = "DELETE from shops where id = " + id;
      var delete_query_execute = await this.connection.query(delete_query);
      if (delete_query_execute) {
        return "deleted";
      }
    } catch (ex) {
      throw ex;
    }
  }

  async register(data) {
    try {
      if (data.name) {
        let shopExist = await this.shopRepository.findOne({
          where: { name: data.name },
          withDeleted: true,
        });
        if (shopExist) {
          return "alreadyexist";
        }
      }
      const shop: Shop = new Shop();
      shop.name = data.name;
      shop.ntn = data.ntn;
      shop.strn = data.strn;
      shop.contactPerson = data.contactPerson;
      shop.address = data.address;
      shop.cnic = data.cnic;
      shop.cell = data.cell;
      shop.credit = data.credit;
      shop.createdAt = moment().format("YYYY-MM-DD");

      var execute_user = await this.shopRepository.save(shop);

      if (execute_user) {
      }
      return "done";
    } catch (err) {
      throw err;
    }
  }

  async addExpense(data) {
    try {
      if (data.expenseType) {
        var selectUserQuery =
          'SELECT id from expenses where type ="' + data.expenseType + '"';
        var expenseExist = await this.connection.query(selectUserQuery);
        // if(expenseExist.length > 0) {
        //   return "alreadyexist";
        // }
      }
      var delete_query =
        "INSERT into expenses(type,expense,created_at)VALUES('" +
        data.expenseType +
        "','" +
        data.expense +
        "','" +
        data.created_at +
        "')";
      var delete_query_execute = await this.connection.query(delete_query);
      if (delete_query_execute) {
        return "done";
      }
    } catch (err) {
      throw err;
    }
  }
  async getAllExpense() {
    try {
      // return await this.candidateRepository.find({ where: { status:1 } });
      var selectExpense = "SELECT * from expenses";
      var getExepnseList = await this.connection.query(selectExpense);
      return getExepnseList;
    } catch (ex) {
      throw ex;
    }
  }

  async updateExpense(data, id) {
    try {
      var delete_query =
        "UPDATE expenses set type='" +
        data.expenseType +
        "',expense='" +
        data.expense +
        "',created_at='" +
        data.created_at +
        "' where  id =" +
        id;
      var delete_query_execute = await this.connection.query(delete_query);
      if (delete_query_execute) {
        return "done";
      }
    } catch (err) {
      throw err;
    }
  }

  async deleteExpense(id: number) {
    try {
      // return await this.candidateRepository.delete(id);
      var delete_query = "DELETE from expenses where id = " + id;
      var delete_query_execute = await this.connection.query(delete_query);
      if (delete_query_execute) {
        return "deleted";
      }
    } catch (ex) {
      throw ex;
    }
  }

  async deleteAllExpenses() {
    try {
      const query = `DELETE FROM expenses`; // Ensure 'expenses' is your actual table name
      console.log('Executing query:', query); // Add this for debugging purposes
      const result = await this.connection.query(query); // Assuming you are using a proper database connection
      return result;
    } catch (error) {
      throw new Error("Failed to delete all expenses: " + error.message);
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
        case '"':
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
      const shop: Shop = new Shop();
      shop.name = data.name;
      shop.ntn = data.ntn;
      shop.strn = data.strn;
      shop.contactPerson = data.contactPerson;
      shop.address = data.address;
      shop.cnic = data.cnic;
      shop.cell = data.cell;
      shop.credit = data.credit;

      await this.shopRepository.update(id, shop);

      return await this.getShop(id);
    } catch (ex) {
      throw ex;
    }
  }
}
