import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Postagem } from "../../postagem/entities/postagem.entity";

@Entity({name: "tb_temas"})
export class Tema{


    @PrimaryGeneratedColumn()
    id: number;

    
    @IsNotEmpty()
    @Column({ length: 500, nullable: false })
    descricao: string;

    @OneToMany(() => Postagem, (postagem)=> postagem.tema) //a estrutura da arrow function faz a associação para a relação bidirecional
    postagem: Postagem[]  //varias postagens serão classificadas pelo mesmo tema, por isso o array

}