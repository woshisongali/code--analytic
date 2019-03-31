/**
 * 入口函数function enter (vnode, toggleDisplay) 
 * 
 * 其核心流程如下
 */

 // start enter transition 进入流程
 beforeEnterHook && beforeEnterHook(el);
 if (expectsCSS) {
   addTransitionClass(el, startClass);
   addTransitionClass(el, activeClass);
   nextFrame(function () {
     removeTransitionClass(el, startClass);
     if (!cb.cancelled) {
       addTransitionClass(el, toClass);
       if (!userWantsControl) {
         if (isValidDuration(explicitEnterDuration)) {
           setTimeout(cb, explicitEnterDuration);
         } else {
           whenTransitionEnds(el, type, cb);
         }
       }
     }
   });
 }

 // 进入后的回调函数
 var cb = el._enterCb = once(function () {
  if (expectsCSS) {
    removeTransitionClass(el, toClass);
    removeTransitionClass(el, activeClass);
  }
  if (cb.cancelled) {
    if (expectsCSS) {
      removeTransitionClass(el, startClass);
    }
    enterCancelledHook && enterCancelledHook(el);
  } else {
    afterEnterHook && afterEnterHook(el);
  }
  el._enterCb = null;
});

/**
 * 离开时的函数 function leave (vnode, rm)
 */

 // 核心流程
 if (expectsCSS) {
  addTransitionClass(el, leaveClass);
  addTransitionClass(el, leaveActiveClass);
  nextFrame(function () {
    removeTransitionClass(el, leaveClass);
    if (!cb.cancelled) {
      addTransitionClass(el, leaveToClass);
      if (!userWantsControl) {
        if (isValidDuration(explicitLeaveDuration)) {
          setTimeout(cb, explicitLeaveDuration);
        } else {
          whenTransitionEnds(el, type, cb);
        }
      }
    }
  });
}

// 回调函数
var cb = el._leaveCb = once(function () {
  if (el.parentNode && el.parentNode._pending) {
    el.parentNode._pending[vnode.key] = null;
  }
  if (expectsCSS) {
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
  }
  if (cb.cancelled) {
    if (expectsCSS) {
      removeTransitionClass(el, leaveClass);
    }
    leaveCancelled && leaveCancelled(el);
  } else {
    rm();
    afterLeave && afterLeave(el);
  }
  el._leaveCb = null;
});
