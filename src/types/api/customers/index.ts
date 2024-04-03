/* eslint-disable @typescript-eslint/naming-convention */

export interface GetCoordinatesResponse {
    postal_code?: string;
    latitude?: number;
    longitude?: number;
}

export interface GetLoyaltyAccountRequest {
    phone: string;
}

export interface LoyaltyAccount {
    id: string;
    program_id: string;
    balance: number;
    lifetime_points: number;
}

export interface GetLoyaltyAccountResponse {
    data: LoyaltyAccount;
}

export interface NoLoyaltyAccountResponse {
}
