import { Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt"
import { IEncrypt } from "src/interfaces/encrypt.interface";

/* ------------------------------- */

@Injectable()
export class Encrypt implements IEncrypt {
    async encrypt(password: string): Promise<string> {
        const salt = bcrypt.genSaltSync();
        return await bcrypt.hash(password, salt)
    }

    async comparePassword(storedPassword: string, receivedPassword: string): Promise<boolean> {
        return  await bcrypt.compare(receivedPassword, storedPassword);
    }
}

/* ------------------------------- */
