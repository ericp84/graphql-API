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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const type_graphql_1 = require("type-graphql");
const user_1 = require("../entities/user");
const data_source_1 = __importDefault(require("../../data-source"));
const argon2_1 = require("argon2");
let UserResolver = class UserResolver {
    ///////// MUTATION CREATE /////////
    async createUser(data) {
        data.password = await (0, argon2_1.hash)(data.password);
        return await data_source_1.default.getRepository(user_1.User).save(data);
    }
    async login(password, email) {
        try {
            const user = await data_source_1.default
                .getRepository(user_1.User)
                .findOne({ where: { email } });
            if (!user) {
                return null;
            }
            if (await (0, argon2_1.verify)(user.password, password)) {
                return user;
            }
            else {
                return null;
            }
        }
        catch (err) {
            return err.message;
        }
    }
    ///////// MUTATION DELETE USERS ////////
    async deleteUser() {
        return await data_source_1.default
            .getRepository(user_1.User)
            .createQueryBuilder()
            .delete()
            .from(user_1.User)
            .execute();
    }
    ///////// MUTATION DELETE ONE USER ///////////
    async deleteOneUser(id) {
        return await data_source_1.default
            .getRepository(user_1.User)
            .createQueryBuilder()
            .delete()
            .where("id = :id", { id })
            .execute();
    }
    /////// MUTATION UPDATE USER //////////
    async updateUser(id, email, password) {
        const UserToUpdate = await data_source_1.default
            .getRepository(user_1.User)
            .findOne({ where: { id } });
        if (UserToUpdate === null) {
            return null;
        }
        if (email !== null) {
            UserToUpdate.email = email;
        }
        if (password !== null) {
            UserToUpdate.password = password;
        }
        return await data_source_1.default.getRepository(user_1.User).save(UserToUpdate);
    }
    ///////// QUERY FIND ALL USERS /////////////
    async Users() {
        return await data_source_1.default
            .getRepository(user_1.User)
            .find({ relations: ["timetrackings"] });
    }
    ///////// QUERY FIND ONE USER ///////////
    async User(id) {
        return await data_source_1.default.getRepository(user_1.User).findOne({ where: { id } });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.UserInput]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "createUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("password")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteOneUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => user_1.User),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __param(2, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Query)(() => [user_1.User], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "Users", null);
__decorate([
    (0, type_graphql_1.Query)(() => user_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id", () => type_graphql_1.ID)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "User", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
