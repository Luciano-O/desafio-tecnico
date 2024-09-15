import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { TeamService } from './team.service';
import { PlayerService } from './player.service';
import { AppService } from './app.service';
import { diskStorage } from 'multer';
import { PrismaService } from './prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { extname, join } from 'path';

const uploadDir = join(process.cwd(), 'uploads');

@Module({
  imports: [
    MulterModule.register({
      storage: diskStorage({
        destination: (req, file, cb) => {
          cb(null, uploadDir);
        },
        filename: (req, file, cb) => {
          const ext = extname(file.originalname);
          const filename = `${Date.now()}${ext}`;
          cb(null, filename);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
          cb(null, true);
        } else {
          cb(new Error('Only images are allowed...'), false);
        }
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TeamService, PlayerService, PrismaService],
})
export class AppModule {}
