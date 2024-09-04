import { Injectable } from "@nestjs/common";
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from "@nestjs/typeorm";

@Injectable()
export class ProdService implements TypeOrmOptionsFactory {

    createTypeOrmOptions(): TypeOrmModuleOptions {
        return {
            type: 'postgres',
            port: 5432,
            url: process.env.DATABASE_URL,
            logging: false,
            dropSchema: false,
            ssl: {
                rejectUnauthorized: false,
            },
            synchronize: false,
            autoLoadEntities: true,
        };
    }
}