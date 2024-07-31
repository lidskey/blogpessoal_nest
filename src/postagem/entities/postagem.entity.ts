import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../tema/entities/tema.entity";

@Entity({ name: "tb_postagens" }) //entity esta passando propriedade/criação da tabela
export class Postagem {

    @PrimaryGeneratedColumn() //define pk autoincremental 
    id: number;

    @Transform(({ value }: TransformFnParams) => value?.trim()) //função que bloqueia os espaços em branco
    @IsNotEmpty() //titulo sera obrigatorio
    @Column({ length: 100, nullable: false }) //definir o tamanho e não aceitar valor nulo
    titulo: string;

    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //texto sera obrigatorio
    @Column({ length: 1000, nullable: false })
    texto: string;

    @UpdateDateColumn() //a data e a hora serão preenchidas automaticamente
    data: Date;

    // Muitos para um, ou seja, muitas postagens possuem um tema
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
})
    usuario: Usuario;
    
    @ManyToOne(() => Postagem, (postagem) => postagem.tema, {
        onDelete: "CASCADE"
        
    })
    tema: Tema;
    
    
}