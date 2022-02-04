import $api from "./index.js";


export class groupApi{
    static async getGroup(id){
        const res=await $api.get(`group/${id}`)
        return res;
    }
    static async create(name,status,img){
        const res= await $api.post("group/create",{name,status,img})
        return res;
    }
    static async add(text,group_id){
        const res= await $api.post("group/add",{text,group_id})
        return res;
    }
    static async photoUpload(formData){
        debugger
        const res= await $api.post("group/photoUpload",formData)
        return res;
    }
    static async sendPhoto(id,formData){
        const res= await $api.post("group/send-photo/"+id,formData)
        return res;
    }
}
