import { Injectable } from '@nestjs/common';

import { RqLoginUserDto, RsLoginUserDto } from 'src/dto';
import { UserSecurity } from 'src/entities';
import { ILoginFactory } from 'src/interfaces';

/* ------------------------------------------------------- */

@Injectable()
export class LoginFactoryService implements ILoginFactory {

  /* ------------------- */

  DTORequesttoLoginEntity(rqLoginUserDto: RqLoginUserDto): UserSecurity {

    const us = new UserSecurity();
    us.username = rqLoginUserDto.username;
    us.password = rqLoginUserDto.password;
    return us;
  }

  /* ------------------- */

  LoginEntitytoDTOResponse(
    statusCode: number,
    message: string,
    userSecurity: UserSecurity,
  ): RsLoginUserDto {
 
    return new RsLoginUserDto(
      { statusCode, message },   // header
       userSecurity // Check if user information is available            
        ? {                      // add data 
            session_token: '',
            user_id: userSecurity.user_id,
            role_id: userSecurity.role_id,
          }
        : null,                  // without data
    );
  }
}

/* ------------------------------------------------------- */
