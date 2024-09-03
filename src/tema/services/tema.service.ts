import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Tema } from "../entities/tema.entity";
import { Repository } from "typeorm/repository/Repository";
import { DeleteResult, ILike } from "typeorm";


@Injectable()
export class TemaService { //cria os metodos do crud

    constructor(
        @InjectRepository(Tema)
        private temaRepository: Repository<Tema>

    ) { }

    async findAll(): Promise<Tema[]> { 
        //equivalente a select * from tb_postagens;
        return await this.temaRepository.find({
            relations: {
                postagem: true
            }
        });
    }

    async findByID(id: number): Promise<Tema> { //voltará apenas um objeto, por isso não usamos array

        let tema = await this.temaRepository.findOne({

            where: {
                id
            },
            relations: {
                postagem: true
            }
        })
        if (!tema)
            throw new HttpException('O tema não foi encontrado!', HttpStatus.NOT_FOUND); //exceção para a execução

        return tema;
    }

    async findByDescricao(descricao:string): Promise<Tema[]> {

        return await this.temaRepository.find({
            where: {
                descricao: ILike(`%${descricao}%`) //ilike é insesitivo: tanto faz o maiúsculo ou minúsculo
            },
            relations: {
                postagem: true
            }
        })

    }


    async create(Tema: Tema): Promise<Tema> {
        return await this.temaRepository.save(Tema);
    }


    async update(tema: Tema): Promise<Tema> {  //atualiza o objeto todo 

        let buscaTema = await this.findByID(tema.id);

        if (!buscaTema || !tema.id)
            throw new HttpException('O tema não foi encontrado!', HttpStatus.NOT_FOUND)

        return await this.temaRepository.save(tema);
    }

    async delete(id: number): Promise<DeleteResult> { //voltará apenas um objeto, por isso não usamos array

        let buscaTema = await this.findByID(id)

        if (!buscaTema)
            throw new HttpException('O tema não foi encontrado!', HttpStatus.NOT_FOUND); //exceção para a execução

        return await this.temaRepository.delete(id);
    }

}