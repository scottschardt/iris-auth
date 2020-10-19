import { UnprocessableEntityException } from '@nestjs/common';
import { Table, Column, Model } from 'sequelize-typescript';

@Table({tableName: 'user'})
export class User extends Model<User> {

  @Column({
    primaryKey: true, 
    autoIncrement: true
  })
  id: number;
 
  @Column
  firstName: string;

  @Column
  lastName: number;

  @Column
  email: string;
}