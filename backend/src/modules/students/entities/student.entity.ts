import { Expose } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Student')
export class StudentEntity {
  @Expose()
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Expose()
  @Column({ type: 'varchar', nullable: false })
  nome: string;

  @Expose()
  @Column({ type: 'varchar', nullable: false })
  cpf: string;

  @Expose()
  @Column({ type: 'varchar', nullable: false })
  email: string;
}
