import { Injectable } from '@nestjs/common';
import { from, map, Observable } from 'rxjs';
import { User } from '../models/user.class';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../models/user.entity';
import { JwtService } from '@nestjs/jwt';
import { Repository, UpdateResult} from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(UserEntity) 
        private readonly userRepository : Repository<UserEntity>,
        private jwtService : JwtService,
    ) { }


    findUserById(id : number) : Observable<User> {
        return from(
            this.userRepository.findOne({
                where: { id },
                relations: ['feedPosts'],
            })
        ).pipe(
            map((user : User) => {
                delete user.password;
                return user;
            }),
        );
    }

    // add image to databases
    updateUserImageById(id : number, imagePath : string) : Observable<UpdateResult> {
        const user : User = new UserEntity();
        user.id = id;
        user.imagePath = imagePath;
        return from(
            this.userRepository.update(id, user)
        );
    }

    findImageNameByUserId(id:number) : Observable<string> {
        return from(this.userRepository.findOne({ where: { id }})).pipe(
            map((user : User) => {
                delete user.password;
                return user.imagePath;
            })
        )
    }
}
