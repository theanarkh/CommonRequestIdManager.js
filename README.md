#### 通用的组件请求管理器，解决异步请求中的后发先到的问题
#### 测试方法：可以使用fiddler进行测试，选择fiddler rules菜单中的automatic breakpoints中的afterResponse，这样可以阻止后端过快地返回，从而可以自己选择哪个请求的结果先返回，实现模拟后发先到的情况。
