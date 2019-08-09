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
  console.log(params)
  return fly.get('/sign/7', params);
}


//更新面试信息接口
export let update = params=>{
  console.log(params)
  return fly.get('/sign/1', params);
}


//解密数据
export let decrypt = params=>{
  console.log(params)
  return fly.post('/user/decrypt', params);
}