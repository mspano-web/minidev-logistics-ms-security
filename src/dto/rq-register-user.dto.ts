import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator";

/* ------------------------------- */

export class RqRegisterUserDto {
    @IsNotEmpty()
    @IsNumber()
    readonly role_id: number;
    @IsNotEmpty()
    @IsNumber()
    readonly user_id: number;
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    @IsNotEmpty()
    @IsString()
    @Length(6, 20)
    readonly password: string;
}

/* ------------------------------- */
