const TYPES = {
    IAuthService: Symbol.for("IAuthService"),
    ICreatorService: Symbol.for("ICreatorService"),
    ICharacterService: Symbol.for("ICharacterService"),
    IComicService: Symbol.for("IComicService"),
    IUserService: Symbol.for("IUserService"),
    IBalanceService: Symbol.for("IBalanceService"),

    ICreatorRepository: Symbol.for("ICreatorRepository"),
    ICharacterRepository: Symbol.for("ICharacterRepository"),
    IComicRepository: Symbol.for("IComicRepository"),
    IUserRepository: Symbol.for("IUserRepository"),
    
    IAuthController: Symbol.for("IAuthController"),
    ICreatorController: Symbol.for("ICreatorController"),
    ICharacterController: Symbol.for("ICharacterController"),
    IComicController: Symbol.for("IComicController"),
    IBalanceController: Symbol.for("IBalanceController"),
}

export { TYPES };