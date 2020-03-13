import * as bcrypt from 'bcrypt';
// 要不要写成注入服务,为什么需要注入式服务
export class HashCode {
    static async encrypt(password: string) {
        return await bcrypt.hash(password, 10);
    }

    static async compare(plain_text: string, encrypted: string) {
        return await bcrypt.compare(plain_text, encrypted);
    }
}
