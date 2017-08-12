/*
  通过id来跟踪请求和判断返回是否有效
*/
function CommonRequestIdManager() {
        if (!(this instanceof CommonRequestIdManager)) {
            return new CommonRequestIdManager();
        }
        this.initRequestId();
    }
    CommonRequestIdManager.prototype = {
        // id初始化
        initRequestId: function() {
          this.requestId = 1;
        },
        // 获取该次请求对应的id
        getRequestId: function() {
          return this.requestId;
        },
        // 清除请求的id，把id加一，导致前面发出的请求不可用
        clearRequestId: function() {
          // requestId等于1說明還沒有發出過請求，所以不需要清除請求id
          if (this.requestId === 1) {
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
          var requestId = this.getRequestId()
          return function(data) {
              // 对于返回的结果，判断回调函数绑定的id是否等于当前的请求id
              if (requestId === self.getCurrentRequestId()) {
                  cb && cb.call(context || null, data);
              }
          }
        }
    }
