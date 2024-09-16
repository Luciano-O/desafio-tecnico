import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { PlayerService } from './player.service';
import { Player, Team } from '@prisma/client';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller()
export class AppController {
  constructor(
    private readonly teamService: TeamService,
    private readonly playerService: PlayerService,
  ) {}

  @Get('team/:id')
  getTeam(@Param('id') id: string): Promise<Team> {
    return this.teamService.team({ id: Number(id) });
  }

  @Get('player/:id')
  getPlayer(@Param('id') id: string): Promise<Team> {
    return this.playerService.player({ id: Number(id) });
  }

  @Get('teams')
  getTeams(): Promise<Team[]> {
    return this.teamService.teams({});
  }

  @Get('players')
  getPLayers(): Promise<Team[]> {
    return this.playerService.players({});
  }

  @Post('teams')
  @UseInterceptors(FileInterceptor('file'))
  async createTeam(
    @Body() teamData: { name: string },
    @UploadedFile() file,
  ): Promise<Team> {
    return this.teamService.createTeam({
      ...teamData,
      image: 'https://desafio-tecnico-yzpm.onrender.com/uploads/' + file.filename,
    });
  }

  @Post('players')
  @UseInterceptors(FileInterceptor('file'))
  async createPlayer(
    @Body() playerData: { name: string; age: string; teamId: string },
    @UploadedFile() file,
  ): Promise<Player> {
    const { age, name, teamId } = playerData;

    return this.playerService.createPlayer({
      age: Number(age),
      name,
      image: 'https://desafio-tecnico-yzpm.onrender.com/uploads/' + file.filename,
      team: {
        connect: { id: Number(teamId) },
      },
    });
  }

  @Delete('teams/:id')
  async deleteTeam(@Param('id') id: string): Promise<Team> {
    return this.teamService.deleteTeam({ id: Number(id) });
  }

  @Delete('players/:id')
  async deletePlayer(@Param('id') id: string): Promise<Team> {
    return this.playerService.deletePlayer({ id: Number(id) });
  }

  @Put('teams/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateTeam(
    @Param('id') id: string,
    @Body() teamData: { name?: string },
    @UploadedFile() file,
  ): Promise<Team> {
    return this.teamService.updateTeam({
      where: { id: Number(id) },
      data: {
        ...teamData,
        image:
          file?.filename && 'https://desafio-tecnico-yzpm.onrender.com/uploads/' + file.filename,
      },
    });
  }

  @Put('players/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updatePlayer(
    @Param('id') id: string,
    @Body() playerData: { name?: string; age?: string; teamId?: string },
    @UploadedFile() file,
  ): Promise<Player> {
    const { age, name, teamId } = playerData;

    return this.playerService.updatePlayer({
      where: { id: Number(id) },
      data: {
        age: Number(age),
        name,
        image:
          file?.filename && 'https://desafio-tecnico-yzpm.onrender.com/uploads/' + file.filename,
        team: {
          connect: { id: Number(teamId) },
        },
      },
    });
  }

  @Get('kpi')
  async getKpi() {
    const finalData = {
      averageAge: (await this.playerService.playerAggregate())._avg.age,
      teamTotal: await this.teamService.countTeams(),
      playerTotal: await this.playerService.countPlayers(),
    };

    return finalData;
  }
}
