import { Service } from './service.entity';
import { sharedProps } from './helper/sharedProps.helper';
/* eslint-disable prettier/prettier */
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, OneToMany, JoinTable, ManyToMany } from 'typeorm';

@Entity({
    name: 'officer-access'
})
export class OfficerAccessEntity extends sharedProps {

  @PrimaryGeneratedColumn()
  id: number;


  @Column()
  @IsNotEmpty()
  role: string;


  @Column()
  @IsNotEmpty()
  accessType: string;

  @ManyToMany(() => Service)
    @JoinTable()
    services: Service[]

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;

}
