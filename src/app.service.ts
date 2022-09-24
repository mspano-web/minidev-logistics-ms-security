import { HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { RsLoginUserDto, RsRegisterUserDto } from './dto';

import { UserSecurity } from './entities';
import {
  ENCRYPT_SERVICE,
  IEncrypt,
  ILoginFactory,
  IRegisterUserFactory,
  LOGIN_FACTORY_SERVICE,
  REGISTER_FACTORY_SERVICE,
} from './interfaces';

/* ------------------------------------------------------------------------ */

// Using the Data Mapper Pattern approach, you define all your query methods in separate classes called "repositories",
//   and you save, remove, and load objects using repositories.

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(UserSecurity)
    private readonly userSecurityRepository: Repository<UserSecurity>,

    // It provides us with an instance of the service from the token
    // The interface decouples our implementation from our service.

    @Inject(LOGIN_FACTORY_SERVICE)
    private readonly loginFactoryService: ILoginFactory,

    @Inject(REGISTER_FACTORY_SERVICE)
    private readonly registerFactoryService: IRegisterUserFactory,

    @Inject(ENCRYPT_SERVICE)
    private readonly encryptSecurity: IEncrypt,
  ) {}

  /* ----------------- */

  async login(login: UserSecurity): Promise<RsLoginUserDto> {
    let loginUserRsp: RsLoginUserDto = null;

    try {
      const loginDB = await this.userSecurityRepository.findOneBy({
        username: login.username,
      });

      if (loginDB !== null) {
        if (
          await this.encryptSecurity.comparePassword(
            loginDB.password, login.password,)
        ) {
          loginUserRsp = this.loginFactoryService.LoginEntitytoDTOResponse(
            HttpStatus.OK, '',loginDB,);
        } else {
          loginUserRsp = this.loginFactoryService.LoginEntitytoDTOResponse(
            HttpStatus.FORBIDDEN, 'Invalid user-password', null,
          );
        }
      } else {
        loginUserRsp = this.loginFactoryService.LoginEntitytoDTOResponse(
          HttpStatus.NOT_FOUND, 'Invalid user', null, );
      }
    } catch (e) {
      loginUserRsp =
      this.loginFactoryService.LoginEntitytoDTOResponse(
        HttpStatus.INTERNAL_SERVER_ERROR, 'Failed to login user', null, );
    }
    console.log('[ms-security-login][service] - loginData(', loginUserRsp, ')');
    return loginUserRsp;
  }

  /* ----------------- */

  async register(userSecurity: UserSecurity): Promise<RsRegisterUserDto> {
    let userRegisterRsp: RsRegisterUserDto = null;

    try {
      userSecurity.password = await this.encryptSecurity.encrypt(
        userSecurity.password,
      );
      const userRegisterDB = await this.userSecurityRepository.save(
        userSecurity,
      );

      if (userRegisterDB !== null) {
        userRegisterRsp =
          this.registerFactoryService.RegisterEntitytoDTOResponse(
            HttpStatus.CREATED,
            '',
            userRegisterDB, // id
          );
      } else {
        userRegisterRsp =
          this.registerFactoryService.RegisterEntitytoDTOResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Failed to register user',
            null,
          );
      }
    } catch (e) {
      if (e.code && e.code === 'ER_DUP_ENTRY') {
        userRegisterRsp =
          this.registerFactoryService.RegisterEntitytoDTOResponse(
            HttpStatus.FOUND,
            'Inconsistency detected. Security information previously registered for the user.',
            null,
          );
      } else {
        userRegisterRsp =
          this.registerFactoryService.RegisterEntitytoDTOResponse(
            HttpStatus.INTERNAL_SERVER_ERROR,
            'Failed to register user',
            null,
          );
      }
    }
    console.log('[ms-security-login][service] - loginData(', userRegisterRsp, ')');
    return userRegisterRsp;
  }
}

/* ------------------------------------------------------------------------ */
