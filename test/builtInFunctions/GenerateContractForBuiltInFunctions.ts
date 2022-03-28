
export class GenerateContractForBuiltInFunctions {

    private readonly defaultFunction;
    private readonly ownDataFunction;
    private dataType;

    constructor(defaultFunc: string, ownDataFunc?: string, data?: string) {
        this.defaultFunction = defaultFunc;
        this.ownDataFunction = ownDataFunc;
        this.dataType = data;
    }

    public generateContractFromMatchingAndCase
    (libVersion, caseForVersions, testData, getFunction = this.defaultFunction):string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        @Callable(i)
        func expression() = {
            let callerTestData = ${testData}
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
        func expression() = {
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
        func expression() = {
            let callerTestData = ${testData}
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
        func expression() = {
            let val = ${this.ownDataFunction}
            ${caseForVersions}
        }`;
    };

    public generateOnlyMatcherContract(libVersion, testData, getFunction = this.defaultFunction): string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        let callerTestData = ${testData}
        let x = match ${getFunction} {
            case h:${this.dataType} => h
            case _ => throw("not ${this.dataType}")
        }`
    }


    public setData(data): void {
        this.dataType = data;
    }
}
