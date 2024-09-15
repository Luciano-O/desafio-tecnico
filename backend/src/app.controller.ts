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
      image: 'http://localhost:3001/uploads/' + file.filename,
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
      image: 'http://localhost:3001/uploads/' + file.filename,
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
  async updateTeam(
    @Param('id') id: string,
    @Body() teamData: { name?: string },
  ): Promise<Team> {
    return this.teamService.updateTeam({
      where: { id: Number(id) },
      data: teamData,
    });
  }

  @Put('players/:id')
  async updatePlayer(
    @Param('id') id: string,
    @Body() playerData: { name?: string; age?: number; teamId?: number },
  ): Promise<Player> {
    return this.playerService.updatePlayer({
      where: { id: Number(id) },
      data: playerData,
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
