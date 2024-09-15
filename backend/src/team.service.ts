import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Prisma, Team } from '@prisma/client';

@Injectable()
export class TeamService {
  constructor(private prisma: PrismaService) {}

  async teams(params: { where?: Prisma.TeamWhereInput }): Promise<any[]> {
    const { where } = params;

    return this.prisma.team.findMany({
      where,
      select: {
        id: true,
        image: true,
        name: true,
        Player: {
          select: {
            name: true,
            id: true,
            age: true,
            image: true,
          },
        },
        _count: true,
      },
    });
  }

  async createTeam(data: Prisma.TeamCreateInput): Promise<any> {
    return this.prisma.team.create({
      data,
      select: {
        id: true,
        image: true,
        name: true,
      },
    });
  }

  async updateTeam(params: {
    where: Prisma.TeamWhereUniqueInput;
    data: Prisma.PlayerUpdateInput;
  }): Promise<any> {
    const { where, data } = params;

    return this.prisma.team.update({
      where,
      data,
      select: {
        id: true,
        image: true,
        name: true,
      },
    });
  }

  async deleteTeam(where: Prisma.TeamWhereUniqueInput): Promise<Team> {
    return this.prisma.team.delete({
      where,
    });
  }

  async countTeams(): Promise<number> {
    return this.prisma.team.count();
  }
}
