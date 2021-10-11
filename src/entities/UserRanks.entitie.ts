import {
  Entity,
  PrimaryColumn,
  Column,
} from "typeorm";

@Entity("zevolution_ranks")

class UserRanks{
  @PrimaryColumn()
  id?: number;

  @Column()
  name?: string;

  @Column()
  exp?: number;

  @Column()
  level?: number;

  @Column()
  data?: string;

}

export {UserRanks}