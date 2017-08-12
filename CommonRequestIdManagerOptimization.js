/*
  通过id来跟踪请求和判断返回是否有效
*/
function CommonRequestIdManager() {
        if (!(this instanceof CommonRequestIdManager)) {
            return new CommonRequestIdManager();
        }
        // 是否已經取消了請求，如果是，則新建請求之前不需要再自增requestId
        this.hasCanceled = false;
        this.initRequestId();
    }
    CommonRequestIdManager.prototype = {
        // id初始化
        initRequestId: function() {
          this.requestId = 0;
        },
        // 获取该次请求对应的id
        getRequestId: function() {
          return this.requestId;
        },
        // 清除请求的id，把id加一，导致前面发出的请求不可用
        clearFormerRequestBeforeRequest: function() {
          this.hasCanceled = true;
          this.addRequestId();  
        },
        clearFormerRequest: function() {
          if (!!hasCanceled) {
            return;
          }
          return this.addRequestId();  
        },
        addRequestId: function() {
          return this.requestId++;
        },
        // 获取当前的请求id
        getCurrentRequestId: function() {
          return this.getRequestId();
        },
        // 获取该次请求对应的回调
        getCb: function(cb,context) {
          var self = this;
          var requestId = this.getRequestId();
          this.hasCanceled = false;
           console.log(requestId)
          return function(data) {
              // 对于返回的结果，判断回调函数绑定的id是否等于当前的请求id
              if (requestId === self.getCurrentRequestId()) {

                  cb && cb.call(context || null, data);
              }
          }
        }
    }
