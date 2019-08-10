import fly from '@/utils/request';

// 登陆接口
export let login = code=>{
  return fly.post('/user/code2session', {code});
}

//获取面试列表
export let sign = params=>{
  console.log(params)
  return fly.get('/sign', params);
}


//获取面试详情
export let detailInfo = params=>{
  return fly.get(`/sign/${params}`);
}



//解密数据
export let decrypt = params=>{

  return fly.post('/user/decrypt', params);
}

//更新面试信息
export let updateDetail = params=>{
  console.log(params,"15484655484848")
  return fly.put(`/sign/${params.id}`,params.context)
}

export let updatePhoneNumber = params=>{
  return fly.post("/user/updatePhone",params)
}