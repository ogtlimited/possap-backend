import { IIncident } from './../interfaces/incident.interface';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, ManyToOne, OneToMany, CreateDateColumn } from 'typeorm';

@Entity({
  name: 'incident-table',
})
export class IncidentEntity extends BaseEntity implements IIncident {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  location: string;

  @Column({ nullable: true })
  photo: string;

  @CreateDateColumn()
  date: Date;

  @Column({
    type: 'jsonb',
    nullable: true,
  })
  otherfields: [];
}
