import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

/* ------------------------------- */

@Entity()
export class UserSecurity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  
  @Column({unique: true})
  username: string;

  @Column()
  password: string;

  @Column()
  user_id?: number;

  @Column()
  role_id?: number;

}

/* ------------------------------- */

