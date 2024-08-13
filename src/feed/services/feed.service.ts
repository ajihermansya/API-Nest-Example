import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { from, Observable } from 'rxjs';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { FeedPostEntity } from '../models/post.entity';
import { FeedPost } from '../models/post.interface';

@Injectable()
export class FeedService {
    constructor(
        @InjectRepository(FeedPostEntity)
        private readonly feedPostRepository : Repository<FeedPostEntity>
    ) {}

    // post
    createPost(feedPost : FeedPost) : Observable<FeedPost> {
        return from(this.feedPostRepository.save(feedPost));
    }

    // get
    findAllPosts(): Observable<FeedPost[]> {
        return from(this.feedPostRepository.find())
    }

    // update
    updatePost(id : number, feedPost : FeedPost) : Observable<UpdateResult> {
        return from(this.feedPostRepository.update(id, feedPost));
    }

    // delete
    deletePost(id : number) : Observable<DeleteResult> {
        return from(this.feedPostRepository.delete(id))
    }
}
