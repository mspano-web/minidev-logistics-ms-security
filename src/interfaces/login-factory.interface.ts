// To use dependency injection with interfaces we need to create a token to associate with an

import { RqLoginUserDto, RsLoginUserDto } from "src/dto";
import { UserSecurity } from "src/entities";

//   interface and provide that token when injecting to an interface type.
export const LOGIN_FACTORY_SERVICE = 'LOGIN_FACTORY_SERVICE';

/* ------------------------------- */

export interface ILoginFactory {
    DTORequesttoLoginEntity(  rqLoginUserDto: RqLoginUserDto): UserSecurity;
    LoginEntitytoDTOResponse( statusCode: number, message: string, userSecurity: UserSecurity): RsLoginUserDto;
}

/* ------------------------------- */
