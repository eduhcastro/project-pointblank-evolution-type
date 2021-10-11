import {
  Entity,
  PrimaryColumn,
  Column,
} from "typeorm";



@Entity("zevolution_users")

class UserEvo {
  @PrimaryColumn()
  id!: number;

  @Column()
  level!: number;

  @Column()
  userlogin!: string;

  @Column()
  picture!: string;

  @Column()
  exp!: number
}

export { UserEvo };