import { Body, Controller, Get, Post } from '@nestjs/common';
import { TeamService } from './team.service';
import { PlayerService } from './player.service';
import { Player, Team } from '@prisma/client';

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
  async createTeam(@Body() teamData: { name: string }): Promise<Team> {
    return this.teamService.createTeam(teamData);
  }

  @Post('players')
  async createPlayer(
    @Body() playerData: { name: string; age: number; teamId: number },
  ): Promise<Player> {
    const { age, name, teamId } = playerData;

    return this.playerService.createPlayer({
      age,
      name,
      team: {
        connect: { id: teamId },
      },
    });
  }
}
