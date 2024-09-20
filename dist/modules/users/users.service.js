"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const query_typeorm_1 = require("@nestjs-query/query-typeorm");
const user_entity_1 = require("./user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const core_1 = require("@nestjs/core");
const nestjs_config_1 = require("nestjs-config");
const jwt_1 = require("@nestjs/jwt");
const PDFDocument = require('pdfkit');
var fs = require('fs');
const doc = new PDFDocument;
let ejs = require("ejs");
let pdf = require("html-pdf");
let UsersService = class UsersService extends query_typeorm_1.TypeOrmQueryService {
    constructor(usersRepository, jwtService, config, request, connection) {
        super(usersRepository, { useSoftDelete: true });
        this.usersRepository = usersRepository;
        this.jwtService = jwtService;
        this.config = config;
        this.request = request;
        this.connection = connection;
        this.connection.query("set session sql_mode=''");
    }
    async getUser(id) {
        try {
            const user = await this.usersRepository.findOne({ where: { id } });
            if (!user) {
                throw new common_1.NotFoundException(`User #${id} not found`);
            }
            return user;
        }
        catch (ex) {
            throw ex;
        }
    }
    async getUsers(page, limit) {
        try {
            var numPerPage = limit;
            var skip = (page - 1) * numPerPage;
            var limitPage = "limit " + skip + "," + numPerPage;
            var select_query = 'SELECT * FROM users';
            console.log("select_query", select_query);
            var res_query = this.connection.query(select_query);
            if (!res_query) {
                throw new common_1.NotFoundException(`Agency not found`);
            }
            return res_query;
        }
        catch (ex) {
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
                    return "\\" + char;
            }
        });
    }
    async deleteUser(id) {
        try {
            return await this.usersRepository.delete(id);
        }
        catch (ex) {
            throw ex;
        }
    }
    async logOutUser() {
        try {
            return "logout";
        }
        catch (ex) {
            throw ex;
        }
    }
    async login(email, password) {
        try {
            const user = await this.usersRepository.findOne({
                where: { email: email }
            });
            if (!user)
                throw new common_1.HttpException('invalid username/password', common_1.HttpStatus.BAD_REQUEST);
            if (!user.password)
                throw new common_1.HttpException('Password not set, please use forgot password to reset password', common_1.HttpStatus.BAD_REQUEST);
            if (!(await user.comparePassword(password)))
                throw new common_1.HttpException('invalid username/password', common_1.HttpStatus.BAD_REQUEST);
            const token = this.getJwtToken(Object.assign({}, user.toResponseObject()));
            return {
                user: user.toResponseObject(),
                token
            };
        }
        catch (ex) {
            throw ex;
        }
    }
    getJwtToken(payload) {
        try {
            const token = this.jwtService.sign(payload, {
                secret: this.config.get('app.jwtSecret')
            });
            return token;
        }
        catch (ex) {
            throw ex;
        }
    }
    async register(data) {
        try {
            if (data.email) {
                data.email = data.email;
                let userExist = await this.usersRepository.findOne({
                    where: { email: data.email }, withDeleted: true
                });
                if (userExist) {
                    throw new common_1.HttpException('Email already exists', common_1.HttpStatus.BAD_REQUEST);
                }
            }
            const user = new user_entity_1.Users();
            user.firstName = data.firstName;
            user.lastName = data.lastName;
            user.email = data.email;
            user.password = data.password;
            await this.usersRepository.save(user);
            return {
                user: user,
                token: this.jwtService.sign(Object.assign({}, user.toResponseObject()), {
                    secret: this.config.get('app.jwtSecret')
                })
            };
        }
        catch (err) {
            throw err;
        }
    }
    async update(id, data) {
        try {
            var update_user_query = "UPDATE users set firstName = '" + data.firstName + "',lastName = '" + data.lastName + "' where id=" + id;
            var requisition_execute_query = await this.connection.query(update_user_query);
            if (requisition_execute_query) {
            }
            return await this.getUser(id);
        }
        catch (ex) {
            throw ex;
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.Users)),
    __param(3, (0, common_1.Inject)(core_1.REQUEST)),
    __param(4, (0, typeorm_1.InjectConnection)()),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        jwt_1.JwtService,
        nestjs_config_1.ConfigService, Object, typeorm_2.Connection])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map