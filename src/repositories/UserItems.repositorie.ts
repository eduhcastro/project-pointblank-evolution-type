import { EntityRepository, Repository } from "typeorm";
import { UserItems } from "../entities/UserItems.entitie";

@EntityRepository(UserItems)
class UserItemsRepositories extends Repository<UserItems> {}

export { UserItemsRepositories };