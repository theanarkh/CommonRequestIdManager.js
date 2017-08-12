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
                  // 这一步不是必须的，加这一句是为保证每次请求的id是唯一的，如果不加这一句，会导致请求id有重复的情况，但这不会导致出错。
                  self.clearRequestId();
                  cb && cb.call(context || null, data);
              }
          }
        }
    }
  
