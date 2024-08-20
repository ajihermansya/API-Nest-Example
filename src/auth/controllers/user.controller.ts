import {
  Body,
  Controller,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { JwtGuard } from '../guards/jwt.guard';
import { FeedPost } from 'src/feed/models/post.interface';
import { Observable } from 'rxjs';
import { FileInterceptor } from '@nestjs/platform-express';
import { saveImageToStorage } from '../helpers/image-storage';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  
  uploadImage(
    @UploadedFile() file: Express.Multer.File, 
    @Request() req) : any {
    return ;
  }
}
