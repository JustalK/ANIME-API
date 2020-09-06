'use strict';

var _isGetSetProp = _interopRequireDefault(require("is-get-set-prop"));

var _isJsType = _interopRequireDefault(require("is-js-type"));

var _isObjProp = _interopRequireDefault(require("is-obj-prop"));

var _isProtoProp = _interopRequireDefault(require("is-proto-prop"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Return type of value of left or right
 * @param {Object} o - left or right of node.object
 * @return {String} - type of o
 */
var getType = function getType(o) {
  var type = _typeof(o.value);

  if (o.regex) {
    return 'RegExp';
  }

  return type.charAt(0).toUpperCase() + type.slice(1);
};
/**
 * Returns type of binary expression result
 * @param {Object} o - node's object with a BinaryExpression type
 * @return {String} - type of value produced
 */


var binaryExpressionProduces = function binaryExpressionProduces(o) {
  var leftType = o.left.type === 'BinaryExpression' ? binaryExpressionProduces(o.left) : getType(o.left);
  var rightType = o.right.type === 'BinaryExpression' ? binaryExpressionProduces(o.right) : getType(o.right);
  var isRegExp = leftType === rightType && leftType === 'RegExp';

  if (leftType === 'String' || rightType === 'String' || isRegExp) {
    return 'String';
  }

  if (leftType === rightType) {
    return leftType;
  }

  return 'Unknown';
};
/**
 * Returns the JS type and property name
 * @param {Object} node - node to examine
 * @return {Object} - jsType and propertyName
 */


var getJsTypeAndPropertyName = function getJsTypeAndPropertyName(node) {
  var propertyName, jsType;

  switch (node.object.type) {
    case 'NewExpression':
      jsType = node.object.callee.name;
      break;

    case 'Literal':
      jsType = getType(node.object);
      break;

    case 'BinaryExpression':
      jsType = binaryExpressionProduces(node.object);
      break;

    case 'Identifier':
      if (node.property.name === 'prototype' && node.parent.property) {
        jsType = node.object.name;
        propertyName = node.parent.property.name;
      } else {
        jsType = node.object.name;
      }

      break;

    default:
      jsType = node.object.type.replace('Expression', '');
  }

  propertyName = propertyName || node.property.name || node.property.value;
  return {
    propertyName: propertyName,
    jsType: jsType
  };
};

var isUnkownGettSetterOrJsTypeExpressed = function isUnkownGettSetterOrJsTypeExpressed(jsType, propertyName, usageType) {
  var isExpression = usageType === 'ExpressionStatement' || usageType === 'MemberExpression';
  return isExpression && !(0, _isGetSetProp["default"])(jsType, propertyName) && !(0, _isProtoProp["default"])(jsType, propertyName) && !(0, _isObjProp["default"])(jsType, propertyName);
};
/**
 * Determine if a jsType's usage of propertyName is valid
 * @param {String} jsType - the JS type to validate
 * @param {String} propertyName - the property name to validate usage of on jsType
 * @param {String} usageType - how propertyName is being used
 * @return {Boolean} - is the usage invalid?
 */


var isInvalid = function isInvalid(jsType, propertyName, usageType) {
  if (typeof propertyName !== 'string' || typeof jsType !== 'string' || !(0, _isJsType["default"])(jsType)) {
    return false;
  }

  var unknownGetterSetterOrjsTypeExpressed = isUnkownGettSetterOrJsTypeExpressed(jsType, propertyName, usageType);
  var isFunctionCall = usageType === 'CallExpression';
  var getterSetterCalledAsFunction = isFunctionCall && (0, _isGetSetProp["default"])(jsType, propertyName);
  var unknownjsTypeCalledAsFunction = isFunctionCall && !(0, _isProtoProp["default"])(jsType, propertyName) && !(0, _isObjProp["default"])(jsType, propertyName);
  return unknownGetterSetterOrjsTypeExpressed || getterSetterCalledAsFunction || unknownjsTypeCalledAsFunction;
};

module.exports = {
  meta: {
    type: 'problem'
  },
  create: function create(context) {
    return {
      MemberExpression: function MemberExpression(node) {
        /* eslint complexity: [2, 9] */
        if (node.computed && node.property.type === 'Identifier') {
          /**
           * handles cases like {}[i][j]
           * not enough information to identify type of variable in computed properties
           * so ignore false positives by not performing any checks
           */
          return;
        }

        var isArgToParent = node.parent.arguments && node.parent.arguments.indexOf(node) > -1;
        var usageType = isArgToParent ? node.type : node.parent.type;

        var _getJsTypeAndProperty = getJsTypeAndPropertyName(node),
            propertyName = _getJsTypeAndProperty.propertyName,
            jsType = _getJsTypeAndProperty.jsType;

        if (isInvalid(jsType, propertyName, usageType) && isInvalid('Function', propertyName, usageType)) {
          context.report(node, 'Avoid using extended native objects');
        }
      }
    };
  }
};