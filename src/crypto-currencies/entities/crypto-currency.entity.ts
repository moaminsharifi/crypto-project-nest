import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'curencies' })
export class CryptoCurrency {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  name: string;

  @ApiProperty()
  @Column()
  email: string;

  @ApiProperty({ nullable: true })
  @Column({ nullable: true })
  description: string | null;

  @ApiProperty({ default: new Date() })
  @Column()
  created_at: Date;
}
