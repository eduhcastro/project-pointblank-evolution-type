import { EntityRepository, Repository } from "typeorm";
import { UserEvo } from "../entities/UserEvo.entitie";

@EntityRepository(UserEvo)
class UserEvoRepositories extends Repository<UserEvo> {}

export { UserEvoRepositories };