import { IsNotEmpty } from 'class-validator';
import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { SubServiceCategory } from '@interfaces/EscortAndGuardServiceApplication/SubServiceCategory.interface';


@Entity()
export class SubServiceCategoryEntity extends BaseEntity implements SubServiceCategory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  subCategoryName: string;

  @Column()
  @IsNotEmpty()
  categoryId: number;

  @Column()
  @CreateDateColumn()
  createdAt: Date;

  @Column()
  @UpdateDateColumn()
  updatedAt: Date;
}