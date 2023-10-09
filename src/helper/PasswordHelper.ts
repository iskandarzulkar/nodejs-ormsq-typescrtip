import bcrypt  from "bcrypt";

const PasswordHashing = async(password: string): Promise<string> =>{
    const result = await bcrypt.hash(password, 10);
    return result;
}

const PasswordCompare = async(password: string, passwordHas:string): Promise<boolean> =>{
    const result = await bcrypt.compare(password, passwordHas);
    return result;
}

export default {PasswordHashing, PasswordCompare}