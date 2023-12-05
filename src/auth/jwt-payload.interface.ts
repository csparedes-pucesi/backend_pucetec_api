export interface JwtPayloadInterface {
    email: string
    id: string
    iat?: number
    exp?: number
}
