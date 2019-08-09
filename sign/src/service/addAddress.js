import fly from '@/utils/request';
export const addAddress = (params)=>{
    return fly.post("/sign",params)
}