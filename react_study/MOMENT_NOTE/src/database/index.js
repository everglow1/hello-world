import Loki from 'lokijs'
export const db = new Loki('notes',{
    autoload:true,
    autosave:true,
    autosaveInterval:3000,
    persistenceMethod:'localStorage',
    autoloadCallback:databaseInitialize
})
function databaseInitialize(){
    // 判断db数据库中有没有表notes collection表
    const notes = db.getCollection('notes');
    if(notes === null){
        db.addCollection('notes');
    }

}
export function loadCollection(collection){
    return new Promise(resolve => {
        const _collection = db.getCollection(collection) || db.addCollection(collection)
        resolve(_collection)
    })
}
