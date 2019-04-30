
export default {
  setCache,
  getCache,
  removeCache,
}


/**
 * @method  setCache  缓存一个数据
 *
 * @param   {String}  key           缓存的key名称
 * @param             data          缓存的数据
 * @param   {Number}  cache_time    过期时间(单位ms)，默认0（永不过期）
 *
 * @return  {Promise|Null}   resolve:缓存结果
 */
export function setCache(key, data, cache_time = 0) {
  return new Promise((resolve, reject) => {
    if (data === undefined)
      reject({msg: `setCache '${key}' err! data is undefined`});
    let now = new Date();
    wx.setStorage({
      key,
      data: {
        time: cache_time === 0 ? 0 : +now + cache_time,
        data
      },
      success: resolve,
      fail: reject,
    });
  })
}

/**
 * @method  getCache  获取缓存的数据
 *
 * @param   {String}  key   缓存的key名称
 *
 * @return  {Promise}       resolve:缓存的数据或者null
 */
export function getCache(key) {
  return new Promise((resolve, reject) =>
      wx.getStorage({
        key,
        success({data: res}) {
          let now = new Date();
          if (res.time === 0)
            resolve(res.data);
          else if (res && res.time - now > 0)
            resolve(res.data);
          else {
            wx.removeStorage({key});
            resolve(null);
          }
        },
        fail(err) {
          resolve(null)
        }
      }))
}


/**
 * @method  removeCache  移除缓存
 *
 * @param   {String}  key           缓存的key名称
 *
 * @return  {Promise|Null}   resolve:移除结果
 */
export function removeCache(key) {
  return new Promise((resolve, reject) => {
    wx.removeStorage({
      key,
      success: resolve
    })
  })
}
