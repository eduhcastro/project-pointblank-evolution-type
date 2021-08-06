import {
  Entity,
  PrimaryColumn,
  Column,
} from "typeorm";



@Entity("accounts")

class User {
  @PrimaryColumn()
  player_id!: number;

  @Column()
  login!: string;

  @Column()
  password!: string;

  @Column()
  player_name!: string;

}

export { User };