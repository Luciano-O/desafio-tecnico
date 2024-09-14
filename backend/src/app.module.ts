import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TeamService } from './team.service';
import { PlayerService } from './player.service';
import { AppService } from './app.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, TeamService, PlayerService, PrismaService],
})
export class AppModule {}
