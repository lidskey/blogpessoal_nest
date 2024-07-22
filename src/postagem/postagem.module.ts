import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Postagem } from "./entities/postagem.entity";
import { PostagemService } from "./services/postagem.service";
import { PostagemController } from "./controllers/postagem.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Postagem])], 
    providers: [PostagemService], //servicos
    controllers: [PostagemController],
    exports: [TypeOrmModule] //disponivvel para outros modulos
})

export class PostagemModule{ 

}