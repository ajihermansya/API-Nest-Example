import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne} from 'typeorm'

import { UserEntity } from 'src/auth/models/user.entity';

@Entity('feed_post')
export class FeedPostEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default : ''})
    body: string;

    @CreateDateColumn()
    createdAt: Date;

    @ManyToOne(() => UserEntity, (userEntity) => userEntity.feedPosts)
    author : UserEntity;
}