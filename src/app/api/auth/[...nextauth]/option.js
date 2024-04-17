import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
import Connection from "@/connection/config";
import User from "@/models/user";
import bcrypt from 'bcryptjs'
    

export const option = {
    
    providers: [
      CredentialsProvider({
        // The name to display on the sign in form (e.g. "Sign in with...")
        name: "Credentials",
        // `credentials` is used to generate a form on the sign in page.
        // You can specify which fields should be submitted, by adding keys to the `credentials` object.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute to the <input> tag through the object.
        credentials: {
          username: { label: "Username", type: "text", placeholder: "jsmith" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials, req) {
          Connection()
          const {username,password} = credentials;
          
          if(!username || !password){
            return null;
          }

          const user = await User.findOne({username:username})

          if (user) {
            const isPasswordValid = await bcrypt.compare(password,user.password)
            console.log("done he jiii")
       
             if(!isPasswordValid){
               return null
             }
 
             return user
           }
            else {
             return null
           }
        }
      })
    ],
    
callbacks: {
  async jwt({ token, user }) {
    // Persist the OAuth access_token to the token right after signin
    if (user) {
      token.accessToken = user.access_token
    }
    return token
  },
  async session({ session, token, user }) {
    // Send properties to the client, like an access_token from a provider.
    session.accessToken = token.accessToken
    return session
  }
},
pages: {
  signIn: '/login',
  // signOut: '/auth/signout',
  // error: '/auth/error', // Error code passed in query string as ?error=
  // verifyRequest: '/auth/verify-request', // (used for check email message)
  // newUser: '/auth/new-user' // New users will be directed here on first sign in (leave the property out if not of interest)
}


  
}

export default NextAuth(option)