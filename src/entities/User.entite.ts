import { Entity, PrimaryColumn, Column } from "typeorm";

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

  @Column()
  rank!: number;

  @Column()
  gp!: number;

  @Column()
  money!: number;

  @Column()
  online!: boolean;
}

export { User };