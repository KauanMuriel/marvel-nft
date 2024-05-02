const TYPES = {
    IAuthService: Symbol.for("IAuthService"),
    ICreatorService: Symbol.for("ICreatorService"),
    ICharacterService: Symbol.for("ICharacterService"),
    IComicService: Symbol.for("IComicService"),
    IUserService: Symbol.for("IUserService"),
    ITokenService: Symbol.for("ITokenService"),

    ICreatorRepository: Symbol.for("ICreatorRepository"),
    ICharacterRepository: Symbol.for("ICharacterRepository"),
    IComicRepository: Symbol.for("IComicRepository"),
    IUserRepository: Symbol.for("IUserRepository"),
    ITokenRepository: Symbol.for("ITokenRepository"),
    
    IAuthController: Symbol.for("IAuthController"),
    ICreatorController: Symbol.for("ICreatorController"),
    ICharacterController: Symbol.for("ICharacterController"),
    IComicController: Symbol.for("IComicController"),
    ITokenController: Symbol.for("ITokenController")
}

export { TYPES };