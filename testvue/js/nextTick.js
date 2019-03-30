  /* 
  nextTick 的实现原理
  1.通过callbacks创建一个事件队列
  2.通过 timerFunc创建一个异步函数， 该方法的实现采用兼容方案
  以此为是否支持Promise 、MutationObserver、setImmediate、setTimeout
  3.调用nextTick方法时， 将cb函数放入callbacks队列中，
  此时如timerFunc方法处在执行中，则放入队列等待执行即可
  若timerFunc为执行，则触发此方法
  */
  
  function noop() {}

  function handleError (e) {
    console.error('the nextTick has err' + e)
  }

  function isNative (Ctor) {
    return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
  }

  const inBrowser = typeof window !== 'undefined'
  const inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform
  const weexPlatform = inWeex && WXEnvironment.platform.toLowerCase()
  const UA = inBrowser && window.navigator.userAgent.toLowerCase()
  const isIE = UA && /msie|trident/.test(UA)
  const isIE9 = UA && UA.indexOf('msie 9.0') > 0
  const isEdge = UA && UA.indexOf('edge/') > 0
  const isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android')
  const isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios')
  const isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge
  const isPhantomJS = UA && /phantomjs/.test(UA)
  var isUsingMicroTask = false;

  var callbacks = [];
  var pending = false;

  function flushCallbacks() {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  var timerFunc;

  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    timerFunc = function () {
      p.then(flushCallbacks);
      if (isIOS) {
        setTimeout(noop);
      }
    };
    isUsingMicroTask = true;
  } else if (!isIE && typeof MutationObserver !== 'undefined' && (
      isNative(MutationObserver) ||
      // PhantomJS and iOS 7.x
      MutationObserver.toString() === '[object MutationObserverConstructor]'
    )) {
    // Use MutationObserver where native Promise is not available,
    // e.g. PhantomJS, iOS7, Android 4.4
    // (#6466 MutationObserver is unreliable in IE11)
    var counter = 1;
    var observer = new MutationObserver(flushCallbacks);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
    isUsingMicroTask = true;
  } else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
    // Fallback to setImmediate.
    // Techinically it leverages the (macro) task queue,
    // but it is still a better choice than setTimeout.
    timerFunc = function () {
      setImmediate(flushCallbacks);
    };
  } else {
    // Fallback to setTimeout.
    timerFunc = function () {
      setTimeout(flushCallbacks, 0);
    };
  }

  function nextTick(cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) {
        try {
          cb.call(ctx);
        } catch (e) {
          handleError(e, ctx, 'nextTick');
        }
      } else if (_resolve) {
        _resolve(ctx);
      }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }

  nextTick(function () {
    console.log('the test func1 is start')
  })