import { Repository } from "typeorm";
import { ITokenRepository } from "../../../domain/interfaces/i.token.repository";
import { Token } from "../../../domain/entities/token.entity";
import { AppDataSource } from "../data-source";
import { injectable } from "inversify";

@injectable()
export class TokenRepository implements ITokenRepository {
    private readonly _databaseRepository: Repository<Token>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Token);
    }
    public async getByUuid(uuid: string): Promise<Token> {
        return await this._databaseRepository.findOneBy({ uuid: uuid });
    }
    public async getAll(): Promise<Token[]> {
        return await this._databaseRepository.find();
    }

    public async getAllByUser(userUuid: string): Promise<Token[]> {
        return await this._databaseRepository.findBy({ owner: { uuid: userUuid } });
    }
    public async create(token: Token): Promise<Token> {
        return await this._databaseRepository.save(token);
    }
}