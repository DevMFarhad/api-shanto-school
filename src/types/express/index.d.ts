import { ITokenPayload } from '../utils/jwtHelpers';

declare global {
    namespace Express {
        interface Request {
            user: ITokenPayload;
        }
    }
}
