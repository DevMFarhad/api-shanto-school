import dbClient from "../../dbClient"
import { bcryptHelpers } from "../../utils/bcryptHelpers"
import { generateToken } from "../../utils/jwtHelpers"
import { ILoginPayload } from "./auth.type"

/* ---------------<< Login User Service >>------------- */
const loginUser = async (payload: ILoginPayload) => {
    const isUserExist = await dbClient.user.findUniqueOrThrow({
        where: {
            id: payload.id
        }
    })
    const isMatched = await bcryptHelpers.checkPassword(payload.password, isUserExist.password)

    if (!isMatched) {
        throw new Error('Password wrong.')
    }

    // generate token: 
    const tokenPayload = {
        id: isUserExist.id,
        role: isUserExist.role
    }
    const token = generateToken(tokenPayload);

    return { token }
}








export const AuthServices = { loginUser }