import NextAuth from "next-auth"
import {option} from "./option.js"


const handler = NextAuth(option)

export {handler as GET , handler as POST    }