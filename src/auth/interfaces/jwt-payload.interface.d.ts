export interface JwtPayload {
  audience?: string;
  expiresIn?: number;
  jti?: string | number;
  sub?: string | number;
}
