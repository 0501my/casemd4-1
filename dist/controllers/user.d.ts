export declare class User {
    static getSignUp(req: any, res: any, next: any): Promise<void>;
    static postSignUp(req: any, res: any, next: any): Promise<void>;
    static getLogin(req: any, res: any, next: any): Promise<void>;
    static postLogin(req: any, res: any, next: any): Promise<void>;
    static postLogout(req: any, res: any, next: any): Promise<void>;
    static getAccount(req: any, res: any, next: any): Promise<void>;
    static postEditUser(req: any, res: any, next: any): Promise<void>;
    static getCartPage(req: any, res: any, next: any): Promise<void>;
    static getCart(req: any, res: any, next: any): Promise<void>;
    static postCart(req: any, res: any, next: any): Promise<void>;
    static postRemoveProductCart(req: any, res: any, next: any): Promise<void>;
    static postUpdateCart(req: any, res: any, next: any): Promise<void>;
}
