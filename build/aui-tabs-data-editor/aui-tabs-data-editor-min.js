YUI.add("aui-tabs-data-editor",function(e,t){var n=e.getClassName("tabs","data","editor"),r=e.getClassName("tabs","data","editor","tabs");e.TabsDataEditor=e.Base.create("tabs-data-editor",e.DataEditor,[],{TPL_EDITOR_CONTENT:'<div class="'+n+'">'+'<div class="'+r+'"></div></div>',initializer:function(){this.after("editedValueChange",this._afterEditedValueChange),this._uiSetEditedValue(this.get("editedValue"))},destructor:function(){this._getTabView().destroy()},_afterEditedValueChange:function(){this._uiSetEditedValue(this.get("editedValue"))},_afterTabViewSelectionChange:function(e){var t=this._getTabView().indexOf(e.newVal);this.set("editedValue",this.get("tabs")[t].value)},_createTabView:function(){var t=this.get("node").one("."+r),n;return n=new e.TabView({children:this.get("tabs")}),n.render(t),n.after("selectionChange",e.bind(this._afterTabViewSelectionChange,this)),n},_findTabIndexForValue:function(e){var t,n=this.get("tabs");for(t=0;t<n.length;t++)if(n[t].value===e)return t},_getTabView:function(){return this._tabView||(this._tabView=this._createTabView()),this._tabView},_uiSetEditedValue:function(e){var t=this._findTabIndexForValue(e);t!==undefined&&this._getTabView().selectChild(t)}},{ATTRS:{editedValue:{value:""},originalValue:{value:""},tabs:{value:[]}}})},"3.1.0-deprecated.6",{requires:["aui-data-editor","aui-tabview"]});
