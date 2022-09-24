import { RsGenericHeaderDto } from './rs-generic-header.dto';

/* ------------------------------- */

export class RsLoginUserDataDto {
  session_token: string;
  user_id: number;
  role_id: number;
}

/* ------------------------------- */

export class RsLoginUserDto {
  rsGenericHeaderDto: RsGenericHeaderDto;
  rsLoginUserData?: RsLoginUserDataDto;

  constructor(
    rsGenericHeaderDto: RsGenericHeaderDto,
    rsLoginUserData: RsLoginUserDataDto,
  ) {
    this.rsGenericHeaderDto = rsGenericHeaderDto;
    this.rsLoginUserData = rsLoginUserData;
  }
}

/* ------------------------------- */
