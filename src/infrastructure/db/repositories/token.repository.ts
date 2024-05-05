import { Repository } from "typeorm";
import { ITokenRepository } from "../../../domain/interfaces/i.token.repository";
import { Token } from "../../../domain/entities/token.entity";
import { AppDataSource } from "../data-source";
import { injectable } from "inversify";
import { ContentType } from "../../../domain/enums/content-type";
import { TokenStatus } from "../../../domain/enums/token-status";

@injectable()
export class TokenRepository implements ITokenRepository {
    private readonly _databaseRepository: Repository<Token>;

    public constructor() {
        this._databaseRepository = AppDataSource.getRepository(Token);
    }
    
    public async getByContent(contentId: string, contentType: ContentType): Promise<Token> {
        return await this._databaseRepository.findOneBy({ contentId: contentId, contentType: contentType })
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

    public async getAllForSale(): Promise<Token[]> {
        return await this._databaseRepository.findBy({ status: TokenStatus.FOR_SALE });
    }

    public async getAllForExchange(): Promise<Token[]> {
        return await this._databaseRepository.findBy({ status: TokenStatus.FOR_EXCHANGE });
    }

    public async update(token: Token): Promise<void> {
        await this._databaseRepository.update(token.uuid, token);
    }
}