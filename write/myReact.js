

function shouldUseNative () {
  try {
    if (!Object.assign) {
      return false
    }

    var test1 = new String('abc')
    test1[5] = 'de'
    if (Object.getOwnPropertyNames(test1)[0] === '5') {
      return false
    }

    var test2 = {}
    for (var i = 0; i < 10; i++) {
      test2['_' + String.fromCharCode(i)] = i
    }
    var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
      return test2[n]
    })

    if (order2.join('') !== '0123456789') {
      return false
    }

    var test3 = {}
    'asdfghjkl'.split('').forEach(function (letter) {
      test3[letter] = letter
    })

    if (Object.keys(Object.assign({}, test3)).join('') !== 
    'asdfghjkl') {
      return false
    }
    return true
  } catch(err) {
    return false
  }
}

var objectAssign = shouldUseNative() ? Object.assign: function (target, source) {
  var from 
  var to = toObject(target)
  var symbols 
  for (var s = 1; s = arguments.length; s++) {
    from = Object(arguments[s])
    for (var key in from) {
      if (hasOwnProperty.call(from, key)) {
        to[key] = from[key]
      }
    }

    if (getOwnPropertySymbols) {
      symbols = getOwnPropertyNames(from)
      for (var i = 0; i < symbols.length; i++) {
        if (propIsEnumberable.call(from, symbols[i])) {
          to[symbols[i]] = from[symbols[i]]
        }
      }
    }
  }

  return to
}

var ReactNoopUpdateQueue = {
  isMounted: function (publicInstance) {
    return false
  },

  enqueueForceUpdate: function (publicInstance, callback, callerName) {
    warnNoop(publicInstance, 'forceUpdate')
  },

  enqueueReplaceState: function (publickInstance, completeState, callback, callerName) {
    warnNoop(publicInstance, 'replaceState')
  },

  enqueueSetState: function (publicInstance, partialState, callback, callerName) {
    warnNoop(publicInstance, 'setState')
  }
}

var emptyObject = {}
{
  Object.freeze(emptyObject)
}

function Component(props, context, updater) {
  this.props = props 
  this.context = context 
  this.refs = emptyObject 
  this.updater = updater || ReactNoopUpdateQueue
}

Component.prototype.isReactComponent = {}

Component.prototype.setState = function (partialState, callback) {
  !(typeof partialState === 'object' || typeof partialState === 'function' || partialState == null) ?
  inveriatn(): this.updater.enqueueSetState(this, partialState, callback, 'setState')
}

Component.prototype.forceUpdata = function (callback) {
  this.updater.enqueueForceUpdate(this, callback, 'forceUpdata')
}

{
  var deprecatedAPIs = {
    isMounted: ['isMounted', 'instead, make sure to '],
    replaceState: ['replaceState', 'Refactor your code']
  }

  var defineDeprecationWarning = function (methodName, info) {
    Object.defineProperty(Component.prototype, methodName, {
      get: function () {
        lowProrityWarning$1(false, '')
      }
    })
    for (var fnName in deprecatedAPIs) {
      if (deprecatedAPIs.hasOwnProperty(fnName)) {
        defineDeprecationWarning(fnName, deprecatedAPIs[fnName])
      }
    }
  }
}

function ComponentDummy () {}
ComponentDummy.prototype = Component.prototype 

function PureComponent (props, context, updater) {
  this.props = props 
  this.context = context 
  this.refs = emptyObject 
  this.updater = updater || ReactNoopUpdateQueue
}

var pureComponentPrototype = PureComponent.prototype = new ComponentDummy()
pureComponentPrototype.constructor = PureComponent 

objectAssign(pureComponentPrototype, Component.prototype)

pureComponentPrototype.isPureReactComponent = true

function createRef () {
  var refObject = {
    current: null
  }
  {
    Object.seal(refObject)
  }

  return refObject
}

var enableSchedulerDebugging = false 

var immediatePriority = 1 
var UserBlockingPriority = 2 

function ensureHostCallbackIsScheduled () {
  if (isExecutingCallback) {
    return
  }

  var expirationTime = firstCallbackNode.expirationTime 
  if (!isHostCallbackScheduled) {
    isHostCallbackScheduled = true
  } else {
    cancelHostCallback()
  }

  requestHostCallback(flushWork, expirationTime)
}

function flushFirstCallback () {
  var flushedNode = firstCallbackNode 
  var next = firstCallbackNode.next 
  if (firstCallbackNode === next) {
    firstCallbackNode = null
  } else {
    var lastCallbackNode = firstCallbackNode.previous 
    firstCallbackNode = lastCallbackNode.next = next 
    next.previous = lastCallbackNode
  }

  flushedNode.next = flushedNode.previous = null
  var callback = flushedNode.callback 
  var expirationTime = flushedNode.priorityLevel 
  var previousPriorityLevel = currentProiorityLevel 
  var previousExpirationTime = currentExpirationTime 
  currentProiorityLevel = priorityLevel 
  currentExpirationTime = expirationTime 
  var continuationCallback 
  try {
    continuationCallback = callback()
  } finally {
    currentProiorityLevel = previousPriorityLevel
    currentExpirationTime = previousExpirationTime
  } 

  if (typeof continuationCallback === 'function') {
    var continuationNode = {
      callback: continuationCallback,
      priorityLevel: priorityLevel,
      expirationTime: expirationTime,
      next: null,
      previous: null
    }
  }
}