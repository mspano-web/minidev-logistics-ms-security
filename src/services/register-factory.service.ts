import { Injectable } from '@nestjs/common';
import { UserSecurity } from '../entities/user-security.entity';
import { RqRegisterUserDto, RsRegisterUserDto } from 'src/dto';
import { IRegisterUserFactory } from 'src/interfaces/register-user.interface';

/* ------------------------------- */

@Injectable()
export class RegisterFactoryService implements IRegisterUserFactory {

  DTORequesttoRegisterEntity(rqRegisterUserDto: RqRegisterUserDto): UserSecurity {
    const us = new UserSecurity();
    us.username = rqRegisterUserDto.username;
    us.password = rqRegisterUserDto.password;
    us.user_id = rqRegisterUserDto.user_id;
    us.role_id = rqRegisterUserDto.role_id;
    return us;
  }

  /* ------------- */
  
  RegisterEntitytoDTOResponse(
    statusCode: number,
    message: string,
    userSecurity: UserSecurity,
  ): RsRegisterUserDto {
    
    return new RsRegisterUserDto(
      { statusCode, message },   // header
       userSecurity // Check if user information is available            
        ? {                      // add data 
            id: userSecurity.id
          }
        : null,                  // without data
    );
  }
}

/* ------------------------------- */
