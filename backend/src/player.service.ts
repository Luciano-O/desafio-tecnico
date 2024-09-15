import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Player, Prisma } from '@prisma/client';

@Injectable()
export class PlayerService {
  constructor(private prisma: PrismaService) {}

  async players(params: { where?: Prisma.PlayerWhereInput }): Promise<any[]> {
    const { where } = params;

    return this.prisma.player.findMany({
      where,
      select: {
        age: true,
        image: true,
        name: true,
        id: true,
      },
    });
  }

  async createPlayer(data: Prisma.PlayerCreateInput): Promise<any> {
    return this.prisma.player.create({
      data,
      select: {
        age: true,
        image: true,
        name: true,
        id: true,
      },
    });
  }

  async updatePlayer(params: {
    where: Prisma.PlayerWhereUniqueInput;
    data: Prisma.PlayerUpdateInput;
  }): Promise<any> {
    const { where, data } = params;

    return this.prisma.player.update({
      where,
      data,
      select: {
        age: true,
        image: true,
        name: true,
        id: true,
      },
    });
  }

  async deletePlayer(where: Prisma.PlayerWhereUniqueInput): Promise<Player> {
    return this.prisma.player.delete({
      where,
    });
  }

  async countPlayers(): Promise<number> {
    return this.prisma.player.count();
  }

  async playerAggregate() {
    return this.prisma.player.aggregate({
      _avg: {
        age: true,
      },
    });
  }
}
