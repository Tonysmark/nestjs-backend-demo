/* eslint-disable @typescript-eslint/camelcase */
import { Entity, Column, PrimaryGeneratedColumn, Unique, CreateDateColumn, UpdateDateColumn } from 'typeorm';

import { Exclude } from 'class-transformer';
@Entity()
@Unique(['username', 'email'])
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'varchar', length: 64 })
    username: string;

    @Column({ type: 'varchar', length: 500, default: 'default icon url' })
    icon: string;

    @Exclude()
    @Column({ type: 'varchar', length: 64 })
    password: string;

    @Column({ type: 'varchar', length: 100 })
    email: string;

    @CreateDateColumn()
    create_time: Date;

    @UpdateDateColumn()
    update_time: Date;

    // 假删除
    @Exclude()
    @Column({ type: 'tinyint', default: false })
    is_deleted: boolean;

    constructor() {
        this.create_time = new Date();
        this.update_time = new Date();
    }
}
