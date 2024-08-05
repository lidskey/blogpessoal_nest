import { Transform, TransformFnParams } from "class-transformer";
import { IsNotEmpty } from "class-validator";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Usuario } from "../../usuario/entities/usuario.entity";
import { Tema } from "../../tema/entities/tema.entity";
import { ApiProperty } from "@nestjs/swagger";

@Entity({ name: "tb_postagens" }) //entity esta passando propriedade/criação da tabela
export class Postagem {

    @ApiProperty()  
    @PrimaryGeneratedColumn() //define pk autoincremental 
    id: number;

    @ApiProperty()  
    @Transform(({ value }: TransformFnParams) => value?.trim()) //função que bloqueia os espaços em branco
    @IsNotEmpty() //titulo sera obrigatorio
    @Column({ length: 100, nullable: false }) //definir o tamanho e não aceitar valor nulo
    titulo: string;

    @ApiProperty()  
    @Transform(({ value }: TransformFnParams) => value?.trim())
    @IsNotEmpty() //texto sera obrigatorio
    @Column({ length: 1000, nullable: false })
    texto: string;

    @ApiProperty()  
    @UpdateDateColumn() //a data e a hora serão preenchidas automaticamente
    data: Date;

    // Muitos para um, ou seja, muitas postagens possuem um tema
    @ApiProperty()  
    @ManyToOne(() => Usuario, (usuario) => usuario.postagem, {
        onDelete: "CASCADE"
})
    usuario: Usuario;
    
    @ApiProperty()  
    @ManyToOne(() => Postagem, (postagem) => postagem.tema, {
        onDelete: "CASCADE"
        
    })
    tema: Tema;
    
    
}