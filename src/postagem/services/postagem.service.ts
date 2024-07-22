import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { find } from "rxjs";

@Injectable()
export class PostagemService{ //cria os metodos do crud

    constructor(
        @InjectRepository(Postagem)                       //injesct: pega os atributos e instancia eles //injecao de depdencia: transferencia de responsabilidade
        private postagemRepository: Repository<Postagem> //repository tem os metodos para manipular os dados de tb_postagens
                                                          //indica qual objeto sera usado por repository privado pois funcionara apensas em service
    ){}
     
    //programação assincrona: função funciona por si so
    //ex: async significa assincrona e await significa que vai esperar ate que haja uma resposta
    //sempre q houver async é obrigatorio inserir o await, async e await são parceiros

    async findAll(): Promise<Postagem[]>{ //prometo que vou trazer esses dados, mas não cumpre sempre, depende de fatores
        //equivalente a select * from tb_postagens;
        return await this.postagemRepository.find();
    }
}