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
  @IsNotEmpty()
  formation: string;

  @Column()
  @IsNotEmpty()
  department: string;

  @Column()
  @IsNotEmpty()
  section: string;

  @Column()
  @IsNotEmpty()
  subsection: string;


  @ManyToOne(() => OfficerEntity, (officer) => officer.commandAccess)
  @JoinColumn({ name: "officer_id", referencedColumnName: "id"})
  officer: OfficerEntity;


}
