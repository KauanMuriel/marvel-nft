import {Md5} from 'ts-md5';

export class ApiAuhorization {
    private static _timeStamp = 1;
    private static _apiKeys: [string, string][] = [
        ['6c035cbe9c02b9e91de862d2f60aae2e', '9df917803e8fcefff7b1d2877879927387c93a9b'],
        ['e5eb25620c285cfeb859f9680df6dbb8', '54ed52e0bd479a86b4bdf97ade62052049123f09'],
        ['dd9c8274341a79335ad0305e79c244fa', '1137befe2d1043bec972c1fb04231264fd87a59c'],
        ['860ce587ab2a4c7881f4126b9e762972', '9b80ccd078a67a43d7b0ed043fcbf7c4adbea9f4']
    ];

    public static generateApiAuthorization(): string {
        const randomIndex = Math.floor(Math.random() * this._apiKeys.length);
        const [publicKey, privateKey] = this._apiKeys[randomIndex];
        const hash = Md5.hashAsciiStr(this._timeStamp+privateKey+publicKey);

        return `ts=${this._timeStamp}&apikey=${publicKey}&hash=${hash}`
    }
}