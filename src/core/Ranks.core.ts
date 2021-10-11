import { getCustomRepository } from "typeorm";
import { UserRanksRepositories } from "../repositories/UserRanks.repositorie";
import { UserEvoRepositories } from "../repositories/UserEvo.repositorie"

class RanksCore {

  private async getRank(level: number): Promise<any> {
    const userRanksRepositories = await getCustomRepository(UserRanksRepositories).findOne({
      level
    });
    if (!userRanksRepositories) return false
    return userRanksRepositories
  }

  private async getUserDetails(userDetails: any): Promise<any> {
    const user = await getCustomRepository(UserEvoRepositories).findOne({
      userlogin: userDetails.userlogin
    })
    if (!user) return false
    return user
  }

  private async updateUserExp(exp: number, updateUser: any): Promise<any> {
    updateUser.exp = Number(updateUser.exp) + Number(exp)
    await getCustomRepository(UserEvoRepositories).save(updateUser)
    return true
  }

  private async executeUpdate(updateUser: any): Promise<any> {
    updateUser.level = updateUser.level + 1
    await getCustomRepository(UserEvoRepositories).save(updateUser)
    return true
  }


  public async updateUserRank(userDetails: any, exp: number): Promise<any> {
    const userSearch = await this.getUserDetails(userDetails)
    if (!userSearch) return false
    const userRank = await this.getRank(userSearch.level)
    await this.updateUserExp(exp, userSearch)
    const rankDetails = await this.getRank(userDetails.level + 1)
    if (!rankDetails) return userRank
    if (Number(exp) + Number(userDetails.exp) >= Number(rankDetails.exp)) return this.executeUpdate(userSearch)
  }

}

export default RanksCore