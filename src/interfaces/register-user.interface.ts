// To use dependency injection with interfaces we need to create a token to associate with an

import { RqRegisterUserDto, RsRegisterUserDto } from "src/dto";
import { UserSecurity } from "src/entities";

//   interface and provide that token when injecting to an interface type.
export const REGISTER_FACTORY_SERVICE = 'REGISTER_FACTORY_SERVICE';

/* ------------------------------- */

export interface IRegisterUserFactory {
    DTORequesttoRegisterEntity(  rqRegisterUserDto: RqRegisterUserDto): UserSecurity;
    RegisterEntitytoDTOResponse( statusCode: number, message: string, userSecurity: UserSecurity): RsRegisterUserDto;
}

/* ------------------------------- */
