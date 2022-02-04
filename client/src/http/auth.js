import axios from "axios";
const API_URL="http://localhost:7000/api/auth/"
const $auth=axios.create({
    baseURL:API_URL
})

class AuthApi{
    static async registration(name,email,password){
        const res=await $auth.post("registration",{name,email,password})
        return res;
    }
    static async login(email,password){
        const res=await $auth.post("login",{email,password})
        console.log("res http login",res)
        return res;
    }
}

export default AuthApi;