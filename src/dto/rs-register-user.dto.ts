import { RsGenericHeaderDto } from "./rs-generic-header.dto";

/* ------------------------------- */

export class RsRegisterUserDataDto {
    id: number;
}

/* ------------------------------- */

export class RsRegisterUserDto {
    rsGenericHeaderDto: RsGenericHeaderDto;
    rsRegisterUserDataDto: RsRegisterUserDataDto;

    constructor(
        rsGenericHeaderDto: RsGenericHeaderDto,
        rsRegisterUserDataDto: RsRegisterUserDataDto,
      ) {
        this.rsGenericHeaderDto = rsGenericHeaderDto;
        this.rsRegisterUserDataDto = rsRegisterUserDataDto;
      }
}

/* ------------------------------- */
