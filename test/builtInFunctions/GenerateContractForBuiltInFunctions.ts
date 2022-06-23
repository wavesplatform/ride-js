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
    (libVersion, caseForVersions, testData, getFunction = this.defaultFunction): string {
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

    public generateContractOwnData(libVersion, caseForVersions, ownDataFunction = this.ownDataFunction): string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
 
        @Callable(i)
        func expression() = {
            let valueOrUnit = ${ownDataFunction}
            let val = match(valueOrUnit) {
              case b:${this.dataType} => b
              case _ => throw("not ${this.dataType}")
            }
            ${caseForVersions}
        }`;
    };

    public generateContractWithoutMatcher
    (libVersion, caseForVersions, testData, getFunction = this.defaultFunction): string {
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

    public generateContractOwnDataWithoutMatcher
    (libVersion, caseForVersions, ownDataFunction = this.ownDataFunction): string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
 
        @Callable(i)
        func expression() = {
            let val = ${ownDataFunction}
            ${caseForVersions}
        }`;
    };

    public generateOnlyMatcherContract(libVersion, testData, getFunction = this.defaultFunction): string {
        const result = (`
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        let callerTestData = ${testData}
        let x = match ${getFunction} {
            case h:${this.dataType} => h
            case _ => throw("not ${this.dataType}")
        }`);

        return result;
    }

    public generateContract(version, foo, bar, testFunction): string {
        return `
        {-# STDLIB_VERSION ${version} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}
        
        let foo = ${foo}
        let bar = ${bar}
        let callerTestData = ${testFunction}`
    }

    public generateContractForDAppInvocation
    (libVersion, byteVector, payment, func = this.defaultFunction): string {
        return `
        {-# STDLIB_VERSION ${libVersion} #-}
        {-# CONTENT_TYPE DAPP #-}
        {-# SCRIPT_TYPE ACCOUNT #-}

        func foo(dapp2: String, a: Int, key1: String, key2: String) = {
        let byteVector = ${byteVector}
        let payment = ${payment}
        strict res = ${func}
        match res {
            case r : Int => 
            (
                [
                    IntegerEntry(key1, r),
                    IntegerEntry(key2, wavesBalance(addressFromStringValue(dapp2)).regular)
                ],
                unit
            )
                case _ => throw("Incorrect invoke result") 
            }
        }

        @Callable(i)
        func bar(a: Int) = {
        (
            [
                ScriptTransfer(i.caller, 100000000, unit)
            ],
                a * 2
            )
        }`
    }

    public setData(data): void {
        this.dataType = data;
    }
}
