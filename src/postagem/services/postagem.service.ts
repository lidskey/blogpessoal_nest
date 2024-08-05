import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { DeleteResult, ILike, Repository } from "typeorm";
import { Postagem } from "../entities/postagem.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { TemaService } from "../../tema/services/tema.service";


@Injectable()
export class PostagemService { //cria os metodos do crud

    constructor(
        @InjectRepository(Postagem)                       //injesct: pega os atributos e instancia eles //injecao de depdencia: transferencia de responsabilidade
        private postagemRepository: Repository<Postagem>,
        private temaService: TemaService                                                      //repository tem os metodos para manipular os dados de tb_postagens
        //indica qual objeto sera usado por repository privado pois funcionara apensas em service
    ) { }
     
    //programação assincrona: função funciona por si so
    //ex: async significa assincrona e await significa que vai esperar ate que haja uma resposta
    //sempre q houver async é obrigatorio inserir o await, async e await são parceiros

    async findAll(): Promise<Postagem[]> { //prometo que vou trazer esses dados, mas não cumpre sempre, depende de fatores
        //equivalente a select * from tb_postagens;
        return await this.postagemRepository.find({
            relations: {
                tema: true,
                usuario: true,
            }
        });
    }

    async findByID(id: number): Promise<Postagem> { //voltará apenas um objeto, por isso não usamos array

        let buscaPostagem = await this.postagemRepository.findOne({
            where: {
                id
            },
            relations: {
                tema: true,
                usuario: true,
            }
        })
        if (!buscaPostagem)
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND); //exceção para a execução

        return buscaPostagem;
    }

    async findByTitulo(titulo: string): Promise<Postagem[]> {

        return await this.postagemRepository.find({
            where: {
                titulo: ILike(`%${titulo}%`) //ilike é insensitivo: tanto faz o maiúsculo ou minúsculo
            },
            relations: {
                tema: true,
                usuario: true,
            }
        })
    }

    async create(postagem: Postagem): Promise<Postagem> {
        //se o usuario indicou o tema
        if (postagem.tema) {
                
            let tema = await this.temaService.findByID(postagem.tema.id)
        
            if (!tema)
                throw new HttpException('Tema não encontrado!', HttpStatus.NOT_FOUND)
            //se o usuário não indicou o tema
            return await this.postagemRepository.save(postagem);
        }
        return await this.postagemRepository.save(postagem);
    }


    async update(postagem: Postagem): Promise<Postagem> {  //atualiza o objeto todo 

        let buscaPostagem = await this.findByID(postagem.id);

        if (!buscaPostagem || !postagem.id)
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND)

        if (postagem.tema) {

            await this.temaService.findByID(postagem.tema.id)

                return await this.postagemRepository.save(postagem);
        }
        return await this.postagemRepository.save(postagem);
    }
    

    async delete(id: number): Promise<DeleteResult> { //voltará apenas um objeto, por isso não usamos array

        let buscaPostagem = await this.findByID(id)

        if (!buscaPostagem)
            throw new HttpException('A Postagem não foi encontrada!', HttpStatus.NOT_FOUND); //exceção para a execução
            
        return await this.postagemRepository.delete(id);
    }


}


