
export class GenerateContractAccountDataStorage {

    private readonly defaultFunction;
    private readonly ownDataFunction;
    private readonly dataType;

    constructor(defaultFunc: string, ownDataFunc?: string, data?: string) {
        this.defaultFunction = defaultFunc;
        this.ownDataFunction = ownDataFunc;
        this.dataType = data;
    }

    public generateContract(libVersion, caseForVersions, testData, getFunction = this.defaultFunction):string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func int() = {
            let callerAddressOrAlias = ${testData}
            let valueOrUnit = ${getFunction}
            let val = match(valueOrUnit) {
              case b:${this.dataType} => b
              case _ => throw("not ${this.dataType}")
            }
            ${caseForVersions}
        }`;
    };

    public generateContractOwnData(libVersion, caseForVersions):string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
 
        @Callable(i)
        func int() = {
            let valueOrUnit = ${this.ownDataFunction}
            let val = match(valueOrUnit) {
              case b:${this.dataType} => b
              case _ => throw("not ${this.dataType}")
            }
            ${caseForVersions}
        }`;
    };

    public generateContractWithoutMatcher
    (libVersion, caseForVersions, testData, getFunction = this.defaultFunction):string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func bool() = {
            let callerAddressOrAlias = ${testData}
            let val = ${getFunction}
            ${caseForVersions}
        }`;
    };

    public generateContractOwnDataWithoutMatcher(libVersion, caseForVersions):string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
 
        @Callable(i)
        func val() = {
            let val = ${this.ownDataFunction}
            ${caseForVersions}
        }`;
    };
}
