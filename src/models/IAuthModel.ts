export interface IAuthModel {
    token: string;
    user: {
        id: number;
        name: string;
        email: string;
        role: string[];
        avatar_url: string | null;
    };
}