import { prismaDB } from "../db"

export const getUserByUsername = async (username:string) => {
    const  user = await  prismaDB.user.findUnique({
        where:  {
            username
        }
    })

    return user;
}