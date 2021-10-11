import { EntityRepository, Repository } from "typeorm";
import { UserRanks } from "../entities/UserRanks.entitie";

@EntityRepository(UserRanks)
class UserRanksRepositories extends Repository<UserRanks> {}

export { UserRanksRepositories };