export interface BSGetLoyaltyAccountRequest {
    phone: string;
}
export interface BSGetLoyaltyAccountResponse {
    data: BSLoyaltyAccountResponse;
}

export interface BSLoyaltyAccountResponse {
    // eslint-disable-next-line @typescript-eslint/naming-convention
    loyalty_account: BSLoyaltyAccount;
}

export interface BSLoyaltyAccount {
    id: string;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    program_id: string;
    balance: number;
    // eslint-disable-next-line @typescript-eslint/naming-convention
    lifetime_points: number;
}
