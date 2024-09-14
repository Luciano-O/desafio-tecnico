import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async teams(params: { where?: Prisma.TeamWhereInput }): Promise<Team[]> {
    const { where } = params;

    return this.prisma.team.findMany({
      where,
      include: {
        Player: true,
      },
    });
  }

  async createTeam(data: Prisma.TeamCreateInput): Promise<Team> {
    return this.prisma.team.create({
      data,
    });
  }

  async updateTeam(params: {
    where: Prisma.TeamWhereUniqueInput;
    data: Prisma.PlayerUpdateInput;
  }): Promise<Team> {
    const { where, data } = params;

    return this.prisma.team.update({
      where,
      data,
    });
  }

  async deleteTeam(where: Prisma.TeamWhereUniqueInput): Promise<Team> {
    return this.prisma.team.delete({
      where,
    });
  }
}
