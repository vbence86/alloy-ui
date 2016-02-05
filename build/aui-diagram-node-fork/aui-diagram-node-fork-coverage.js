if (typeof __coverage__ === 'undefined') { __coverage__ = {}; }
if (!__coverage__['build/aui-diagram-node-fork/aui-diagram-node-fork.js']) {
   __coverage__['build/aui-diagram-node-fork/aui-diagram-node-fork.js'] = {"path":"build/aui-diagram-node-fork/aui-diagram-node-fork.js","s":{"1":0,"2":0,"3":0},"b":{},"f":{"1":0},"fnMap":{"1":{"name":"(anonymous_1)","line":1,"loc":{"start":{"line":1,"column":33},"end":{"line":1,"column":52}}}},"statementMap":{"1":{"start":{"line":1,"column":0},"end":{"line":88,"column":68}},"2":{"start":{"line":12,"column":0},"end":{"line":83,"column":3}},"3":{"start":{"line":85,"column":0},"end":{"line":85,"column":36}}},"branchMap":{},"code":["(function () { YUI.add('aui-diagram-node-fork', function (A, NAME) {","","/**"," * A base class for DiagramNodeFork."," *"," * @class A.DiagramNodeFork"," * @extends A.DiagramNodeState"," * @param {Object} config Object literal specifying widget configuration"," *     properties."," * @constructor"," */","var DiagramNodeFork = A.Component.create({","","    /**","     * Static property provides a string to identify the class.","     *","     * @property NAME","     * @type String","     * @static","     */","    NAME: 'diagram-node',","","    /**","     * Static property used to define the default attribute","     * configuration for the `A.DiagramNodeFork`.","     *","     * @property ATTRS","     * @type Object","     * @static","     */","    ATTRS: {","","        /**","         * The height of the node.","         *","         * @attribute height","         * @default 60","         * @type Number","         */","        height: {","            value: 60","        },","","        /**","         * The type of the node.","         *","         * @attribute type","         * @default 'fork'","         * @type String","         */","        type: {","            value: 'fork'","        },","","        /**","         * The width of the node.","         *","         * @attribute width","         * @default 60","         * @type Number","         */","        width: {","            value: 60","        }","    },","","    /**","     * Static property used to define which component it extends.","     *","     * @property EXTENDS","     * @type String","     * @static","     */","    EXTENDS: A.DiagramNodeState,","","    prototype: {","        hotPoints: A.DiagramNode.DIAMOND_POINTS,","","        renderShapeBoundary: A.DiagramNodeCondition.prototype.renderShapeBoundary,","","        _valueShapeBoundary: A.DiagramNode.prototype._valueShapeBoundary","    }","});","","A.DiagramNodeFork = DiagramNodeFork;","","","}, '3.0.3-deprecated.12', {\"requires\": [\"aui-diagram-node-state\"]});","","}());"]};
}
var __cov_f2FjQ3sr49oL2NTFaTMcOA = __coverage__['build/aui-diagram-node-fork/aui-diagram-node-fork.js'];
__cov_f2FjQ3sr49oL2NTFaTMcOA.s['1']++;YUI.add('aui-diagram-node-fork',function(A,NAME){__cov_f2FjQ3sr49oL2NTFaTMcOA.f['1']++;__cov_f2FjQ3sr49oL2NTFaTMcOA.s['2']++;var DiagramNodeFork=A.Component.create({NAME:'diagram-node',ATTRS:{height:{value:60},type:{value:'fork'},width:{value:60}},EXTENDS:A.DiagramNodeState,prototype:{hotPoints:A.DiagramNode.DIAMOND_POINTS,renderShapeBoundary:A.DiagramNodeCondition.prototype.renderShapeBoundary,_valueShapeBoundary:A.DiagramNode.prototype._valueShapeBoundary}});__cov_f2FjQ3sr49oL2NTFaTMcOA.s['3']++;A.DiagramNodeFork=DiagramNodeFork;},'3.0.3-deprecated.12',{'requires':['aui-diagram-node-state']});