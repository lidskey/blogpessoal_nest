import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Postagem } from "../entities/postagem.entity";
import { PostagemService } from "../services/postagem.service";

@Controller("/postagens")
export class PostagemController{
    
    constructor(private readonly postagemService: PostagemService) { } //readonly só chama
    
    @Get()
        @HttpCode(HttpStatus.OK)
    findAll(): Promise<Postagem[]>{
        return this.postagemService.findAll();
    }

}