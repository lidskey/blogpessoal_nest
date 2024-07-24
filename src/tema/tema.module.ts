import { Module } from "@nestjs/common";
import { Tema } from "./entities/tema.entity";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TemaService } from "./services/tema.service";
import { TemaController } from "./controllers/tema.controller";


@Module({
    imports: [TypeOrmModule.forFeature([Tema])],
    providers: [TemaService], //servicos
    controllers: [TemaController], //controller
    exports: [TypeOrmModule]
})

export class TemaModule { }