import { DataSource } from "typeorm";
import { User } from "../../domain/entities/user.entity";

class InitialDataSeeder {
    public async run(appDataSource: DataSource): Promise<void> {
        await appDataSource.createQueryBuilder()
            .insert()
            .into(User)
            .values([{
                username: "marvel.nft",
                password: "$2a$10$aj28d44nght912301zxdjuWiZqIec9oLmVpzdNEiqaGEOqVm65VSW",
                email: "marvel.nft@email.com",
                admin: true,
                balance: 999999
            }])
            .orIgnore()
            .execute();
    }
}

export default new InitialDataSeeder();