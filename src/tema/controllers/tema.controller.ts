import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put } from "@nestjs/common";
import { TemaService } from "../services/tema.service";
import { Tema } from "../entities/tema.entity";


@Controller("/temas")
export class TemaController {

    constructor(private readonly temaService: TemaService) { } 

    @Get()
    @HttpCode(HttpStatus.OK) //http status 200
    findAll(): Promise<Tema[]> {
        return this.temaService.findAll();
    }

    @Get('/:id')
    @HttpCode(HttpStatus.OK) //http status 200
    findByID(@Param('id',ParseIntPipe)id:number): Promise<Tema> {
        return this.temaService.findByID(id);
    }

    @Get('/descricao/:descricao')
    @HttpCode(HttpStatus.OK) //http status 200
    findByDescricao(@Param('descricao') descricao: string): Promise<Tema[]> {
        return this.temaService.findByDescricao(descricao);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) //http status 201 que é usado para criar alguma coisa
    update(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.create(tema);

    }

    @Put()
    @HttpCode(HttpStatus.OK)
    create(@Body() tema: Tema): Promise<Tema> {
        return this.temaService.update(tema);
    }

    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //http status 204
    delete(@Param('id', ParseIntPipe)id:number) {
        return this.temaService.delete(id);
    }
}