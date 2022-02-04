import $api from "./index.js";


export class channelApi{
    static async getChannel(id){
        const res=await $api.get(`channel/${id}`)
        return res;
    }
    static async add(text,channel_id,img){
        const res=await $api.post("channel/add",{text,channel_id,img})
    }
    static async create(name,status,img){
        const res= await $api.post("channel/create",{name,status,img})
        return res;
    }
    static async photoUpload(formData){
        debugger
        const res=await $api.post("channel/photoUpload",formData)
        return res;
    }
    static async photo(formData,id){
        const res=await $api.post("channel/sendPhoto/"+id,formData)
        return res;
    }
}
