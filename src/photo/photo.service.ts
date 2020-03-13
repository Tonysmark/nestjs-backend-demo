import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Photo } from './photo.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PhotoService {
    constructor(
        @InjectRepository(Photo)
        private readonly photoRepository: Repository<Photo>,
    ) {}

    async findAll(): Promise<Photo[]> {
        return this.photoRepository.find();
    }
}
