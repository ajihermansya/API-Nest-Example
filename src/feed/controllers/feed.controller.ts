import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/models/role.enum';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IsCreatorGuard } from '../guards/is-creator.guard';
import { FeedPost } from '../models/post.interface';
import { FeedService } from '../services/feed.service';

@Controller('feed')
export class FeedController {
    constructor(private feedService : FeedService){}
    
    // @Roles(Role.ADMIN, Role.PREMIUM)
    // @UseGuards(JwtGuard, RolesGuard)
    @UseGuards(JwtGuard)
    @Post()
    create(@Body() feedPost: FeedPost, @Request() req) : Observable<FeedPost> {
        return this.feedService.createPost(req.user, feedPost)
    }

    // @Get()
    // findAll() :  Observable<FeedPost[]> {
    //     return this.feedService.findAllPosts()
    // }

    //pagination
    @UseGuards(JwtGuard)
    @Get()
    findSelected(
    @Query('take') take : number = 1, 
    @Query('skip') skip : number = 1,
    ) :  Observable<FeedPost[]> {
        take = take > 2 ? 2 : take;
        return this.feedService.findPosts(take, skip)
    }



    @UseGuards(JwtGuard, IsCreatorGuard)
    @Put(':id')
    update(
        @Param('id') id : number,
        @Body() feedPost: FeedPost
    ) : Observable<UpdateResult> {
        return this.feedService.updatePost(id, feedPost)
    }

    @UseGuards(JwtGuard, IsCreatorGuard)
    @Delete(':id')
    delete(
        @Param('id') id : number
    ) : Observable<DeleteResult> {
        return this.feedService.deletePost(id)
    }
}
