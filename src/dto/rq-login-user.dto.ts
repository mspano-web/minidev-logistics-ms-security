import { IsNotEmpty, IsString } from "class-validator";

/* ------------------------------- */

export class RqLoginUserDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @IsString()
    @IsNotEmpty()
    readonly password: string;
}

/* ------------------------------- */
