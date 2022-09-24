import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSource } from 'typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserSecurity } from './entities';
import {
  ENCRYPT_SERVICE,
  LOGIN_FACTORY_SERVICE,
  REGISTER_FACTORY_SERVICE,
} from './interfaces';
import { Encrypt } from './services/encrypt. service';
import { LoginFactoryService } from './services/login-factory.service';
import { RegisterFactoryService } from './services/register-factory.service';

/* --------------------------------------------------------------------- */

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DB_HOST'),
        port: parseInt(configService.get('DB_PORT')),
        username: configService.get('DB_USER'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_DATABASE'),
        entities: [UserSecurity],
        synchronize: configService.get('DB_SYNC').toLowerCase() === 'true',
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([UserSecurity]),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      useClass: Encrypt, // You can switch useClass to different implementation
      provide: ENCRYPT_SERVICE,
    },
    {
      useClass: LoginFactoryService, // You can switch useClass to different implementation
      provide: LOGIN_FACTORY_SERVICE,
    },
    {
      useClass: RegisterFactoryService, // You can switch useClass to different implementation
      provide: REGISTER_FACTORY_SERVICE,
    },
  ],
})

/* --------------------------------------------------------------------- */

export class AppModule {
  constructor(private dataSource: DataSource) {}
}

/* --------------------------------------------------------------------- */
