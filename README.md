#### 通用的组件请求管理器，解决异步请求中的后发先到的问题
#### 测试方法：可以使用fiddler进行测试，选择fiddler rules菜单中的automatic breakpoints中的afterResponse，这样可以阻止后端过快地返回，从而可以自己选择哪个请求的结果先返回，实现模拟后发先到的情况。
#### tips:
1.每当需要取消之前发出的请求时，需要调用clearRequestId方法。<br>
2.在优化版本中，显式定义了两种取消请求的方法，clearFormerRequest和clearFormerRequestBeforeRequest，后者用于在发送新的请求前使用，前者是没有发送新的请求，而是通过其他操作取消了请求，比如点击取消按钮。
