/* eslint-disable prettier/prettier */
import { ICommandAccess } from '@/interfaces/commandAccess';
import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { OfficerEntity } from '@entities/officers.entity';


@Entity()
export class CommandAccessEntity extends BaseEntity implements ICommandAccess {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  // @IsNotEmpty()
  officerFormation: string;

  @Column()
  // @IsNotEmpty()
  officerDepartment: string;

  @Column()
  // @IsNotEmpty()
  officerSection: string;

  @Column({nullable: true})
  @IsNotEmpty()
  officerSubSection: string;


  @ManyToOne(() => OfficerEntity, (officer) => officer.commandAccessIds)
  @JoinColumn()
  officerId: OfficerEntity;


}
