
module.exports=function dto(model) {
    return {
        id:model._id,
        name:model.name,
        email:model.email
    }
}