
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CacheModule, CacheModuleAsyncOptions } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-store';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.PG_HOST,
      port: parseInt(process.env.PG_PORT as string),
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      useFactory: async () => {
        const store = await redisStore({
          socket: {
            host: 'redis',
            port: 6379,
          },
        });
        return {
          store: () => store,
        };
      },
    } as CacheModuleAsyncOptions),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
