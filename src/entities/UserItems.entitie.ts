import {
  Entity,
  PrimaryColumn,
  Column,
} from "typeorm";

@Entity("player_items")

class UserItems{
  @PrimaryColumn()
  object_id?: number;

  @Column()
  owner_id?: number;

  @Column()
  item_id?: number;

  @Column()
  count?: number;

  @Column()
  category?: number;

  @Column()
  equip?: number;

  @Column()
  item_name?: string;


}

export {UserItems}