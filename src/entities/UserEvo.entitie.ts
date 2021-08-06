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
  level!: string;

  @Column()
  userlogin!: string;

  @Column()
  picture!: string;

}

export { UserEvo };