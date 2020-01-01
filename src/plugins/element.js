/* element-UI需要先引入需要的库在进行注册使用 */
import Vue from 'vue'
import { Button, Form, FormItem, Input, Message } from 'element-ui' // 引入组件
// Vue.use() 每次只传一个值,注册使用UI组件
Vue.use(Button)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.prototype.$message = Message // Message提示信息组件需要尽心全局挂载配置
