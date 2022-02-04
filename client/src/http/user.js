import $api from "./index.js";


export class UserApi{
  static async getUser(){
    const res=await $api.get("user")
    return res;
  }
  static async getUserInfo(id){
    const res=await $api.get("user/info/"+id)
    return res;
  }
  static async changeName(name){
    const res=await $api.put("user/name",{name})
    return res;
  }
  static async changeStatus(status){
    const res=await $api.put("user/status",{status})
    return res;
  }
  static async fileUpload(formData){
    const res=await $api.put("user/upload",formData)
    return res;
  }
}