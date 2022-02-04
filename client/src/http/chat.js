import $api from ".";

export class chatApi{
    static async create(id){
        const res=await $api.post("/chat/create",{id})
        return res;
    }
    static async get(group_id){
        const res=await $api.get("/chat/"+group_id)
        return res;
    }
    static async sendMessage(text,chat_id){
        const res=await $api.post("/chat/add-message",{text,chat_id})
        return res;
    }
    static async sendPhoto(formData,chat_id){
        const res=await $api.post("/chat/add-photo/"+chat_id,formData)
        return res;
    }
}