YUI.add("aui-scheduler-touch",function(e,t){function u(){}var n=e.getClassName("scheduler-event"),r=e.getClassName("scheduler-event","all","day"),i=e.getClassName("scheduler","mobile"),s=e.getClassName("scheduler-view","day","resizer"),o=e.getClassName("scheduler-view","day","table","colday");u.prototype={initializer:function(){this._schedulerTouchEventHandles=[e.after(this._afterBindUI,this,"bindUI"),e.after(this._afterSyncUI,this,"syncUI")]},destructor:function(){(new e.EventHandle(this._schedulerTouchEventHandles)).detach()},_afterBindUI:function(){this._schedulerTouchEventHandles.push(e.on(this._onPrepareEventCreation,this,"_prepareEventCreation")),e.UA.mobile&&this._schedulerTouchEventHandles.push(e.after(this._afterPlotEvents,this,"plotEvents"))},_afterSyncUI:function(){var t=this.get("scheduler");e.UA.mobile&&t.get("boundingBox").addClass(i)},_afterPlotEvents:function(){var e=this;this.get("boundingBox").all("."+n).each(function(){!this.hasClass(r)&&!this.one("."+s)&&e.get("resizerNode").cloneNode(!0).appendTo(this)})},_findActiveColumn:function(e){var t=this.get("boundingBox").all("."+o),n;for(var r=0;r<t.size();r++){n=t.item(r);if(n.get("region").left<=e.pageX&&e.pageX<=n.get("region").right)return n}},_onPrepareEventCreation:function(t){if(t._event.type==="touchstart")return new e.Do.Prevent}},u.ATTRS={eventWidth:{value:e.UA.mobile?100:95,validator:e.Lang.isNumber}},e.Base.mix(e.SchedulerDayView,[u])},"3.0.3-deprecated.37",{requires:["base-build","aui-scheduler"],skinnable:!0});
