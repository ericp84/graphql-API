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
exports.TimetrackingResolver = void 0;
const type_graphql_1 = require("type-graphql");
const timetracking_1 = require("../entities/timetracking");
const data_source_1 = __importDefault(require("../../data-source"));
let TimetrackingResolver = class TimetrackingResolver {
    ///////// MUTATION CREATE /////////
    async createTimetracking(data) {
        return await data_source_1.default.getRepository(timetracking_1.Timetracking).save(data);
    }
    async creatett(data) {
        return await data_source_1.default.getRepository(timetracking_1.Timetracking).save(data);
    }
    ///////// QUERY FIND ALL TimetrackingS /////////////
    async Timetrackings() {
        return await data_source_1.default
            .getRepository(timetracking_1.Timetracking)
            .find({ relations: ["user"] });
    }
};
__decorate([
    (0, type_graphql_1.Mutation)(() => timetracking_1.Timetracking),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timetracking_1.TimetrackingInput]),
    __metadata("design:returntype", Promise)
], TimetrackingResolver.prototype, "createTimetracking", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => timetracking_1.Timetracking),
    __param(0, (0, type_graphql_1.Arg)("data")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [timetracking_1.TimetrackingInput]),
    __metadata("design:returntype", Promise)
], TimetrackingResolver.prototype, "creatett", null);
__decorate([
    (0, type_graphql_1.Query)(() => [timetracking_1.Timetracking], { nullable: true }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimetrackingResolver.prototype, "Timetrackings", null);
TimetrackingResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], TimetrackingResolver);
exports.TimetrackingResolver = TimetrackingResolver;
