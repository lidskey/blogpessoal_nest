import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, ParseIntPipe, Post, Put, UseGuards } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";


@UseGuards(JwtAuthGuard)
@Controller("/postagens")
@ApiTags('Postagem')
@ApiBearerAuth()
export class PostagemController{
    
    constructor(private readonly postagemService: PostagemService) { } //readonly só chama
    
    @Get()
    @HttpCode(HttpStatus.OK) //http status 200
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }


    @Get('/:id')
    @HttpCode(HttpStatus.OK) //http status 200
    findById(@Param('id',ParseIntPipe)id:number): Promise<Postagem> {
        return this.postagemService.findByID(id);
    }

    @Get('/titulo/:titulo')
    @HttpCode(HttpStatus.OK) //http status 200
    findByTitulo(@Param('titulo') titulo: string): Promise<Postagem[]> {
        return this.postagemService.findByTitulo(titulo);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED) //http status 201 que é usado para criar alguma coisa
    update(@Body() postagem: Postagem): Promise<Postagem>{
        return this.postagemService.create(postagem);

    }

    @Put()
    @HttpCode(HttpStatus.OK)
    create(@Body() postagem: Postagem): Promise<Postagem> {
        return this.postagemService.update(postagem);
    }


    @Delete('/:id')
    @HttpCode(HttpStatus.NO_CONTENT) //http status 204
    delete(@Param('id', ParseIntPipe) id: number){
        return this.postagemService.delete(id);
    }

}