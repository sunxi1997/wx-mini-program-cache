# Cache
封装微信的storage，并且加入过期计时

## 方法

### setCache

````
 @param   {String}  key           缓存的key名称
 @param   {*}       data          缓存的数据
 @param   {Number}  cache_time    过期时间(单位ms)，默认0（永不过期）
````

### getCache

````
 @param   {String}  key           缓存的key名称
 
 @return  {Promise}               缓存的数据
````

### removeCache

````
 @param   {String}  key           缓存的key名称
 
````
