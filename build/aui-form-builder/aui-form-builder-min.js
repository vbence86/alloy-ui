YUI.add("aui-form-builder",function(e,t){var n=e.getClassName("form","builder","edit","layout","button"),r=e.getClassName("form","builder","field","list","add","button"),i=e.getClassName("form","builder","field"),s=e.getClassName("form","builder","header"),o=e.getClassName("form","builder","header","title"),u=e.getClassName("form","builder","layout"),a=e.getClassName("form","builder","pages","header"),f=e.getClassName("form","builder","pages"),l=e.getClassName("form","builder","tabs");e.FormBuilder=e.Base.create("form-builder",e.Widget,[e.FormBuilderFieldTypes,e.FormBuilderLayoutBuilder],{TPL_EDIT_LAYOUT_BUTTON:'<div class="'+n+'">'+"<a>{editLayout}</a></div>",TPL_HEADER:'<div class="'+s+'">'+'<div class="'+o+'">{formTitle}</div>'+"</div>",TPL_LAYOUT:'<div class="'+u+'" ></div>',TPL_PAGE_HEADER:'<div class="'+a+'" ></div>',TPL_PAGES:'<div class="'+f+'" ></div>',TPL_TABVIEW:'<div class="'+l+'"></div>',_fieldsChangeHandles:[],initializer:function(){this._fieldToolbar=new e.FormBuilderFieldToolbar(this.get("fieldToolbarConfig")),this._eventHandles=[this.after("layoutsChange",e.bind(this._afterLayoutsChange,this)),this.after("layout:valueChange",this._afterLayoutChange),this.after("layout:rowsChange",this._afterLayoutRowsChange),this.after("layout-row:colsChange",this._afterLayoutColsChange)],e.Array.invoke(this.get("layouts"),"addTarget",this),this._addFieldsChangeListener(this.get("layouts")),this._checkLayoutsLastRow()},renderUI:function(){this.getActiveLayout().addTarget(this),this._renderContentBox(),this._renderEmptyColumns()},bindUI:function(){var t=this.get("boundingBox"),n=this.get("pages");this._eventHandles.push(this.get("contentBox").on("focus",e.bind(this._onFocus,this)),t.delegate("click",this._onClickAddField,"."+r,this),e.getDoc().on("key",this._onEscKey,"esc",this),n.on("add",e.bind(this._addPage,this)),n.on("remove",e.bind(this._removeLayout,this)),n.after("activePageNumberChange",e.bind(this._afterActivePageNumberChange,this)),n.after("updatePageContent",e.bind(this._afterUpdatePageContentChange,this)))},syncUI:function(){this._updateUniqueFieldType()},destructor:function(){this._fieldSettingsModal&&this._fieldSettingsModal.destroy(),this.get("pages")&&this.get("pages").destroy(),(new e.EventHandle(this._eventHandles)).detach()},addNestedField:function(e){this._newFieldContainer=e,this.showFieldsPanel()},editField:function(e){var t=this.findTypeOfField(e);this.showFieldSettingsPanel(e,t.get("label"))},getActiveLayout:function(){return this.get("layouts")[this._getActiveLayoutIndex()]},getFieldRow:function(e){return e.get("content").ancestor(".layout-row")},removeField:function(t){var n,r,i,s=t.get("content").ancestor(".form-builder-field-nested");this._handleRemoveEvent(t),s?(r=s.ancestor(".form-builder-field").getData("field-instance"),r.removeNestedField(t),this.getActiveLayout().normalizeColsHeight(new e.NodeList(this.getFieldRow(r)))):(n=t.get("content").ancestor(".col").getData("layout-col"),i=this.getFieldRow(t),n.get("value").removeField(t),this.getActiveLayout().normalizeColsHeight(new e.NodeList(i))),this._updateUniqueFieldType()},showFieldSettingsPanel:function(t,n){this._fieldSettingsModal||(this._fieldSettingsModal=new e.FormBuilderSettingsModal,this._fieldSettingsModal.after("hide",e.bind(this._afterFieldSettingsModalHide,this)),this._fieldSettingsModal.after("save",e.bind(this._afterFieldSettingsModalSave,this))),this._fieldSettingsModal.show(t,n)},_addFieldsChangeListener:function(t){var n;for(n=0;n<t.length;n++)this._fieldsChangeHandles.push(t[n].after("form-builder-field-list:fieldsChange",e.bind(this._afterFieldsChange,this)))},_addNestedField:function(e,t,n){e.addNestedField(n,t)},_addPage:function(){var t=this.get("layouts"),n=new e.Layout({rows:[new e.LayoutRow]});t.push(n),this.set("layouts",t)},_afterActivePageNumberChange:function(e){var t=this.get("layouts"),n=t[e.newVal-1];this._updatePageContent(n)},_afterFieldSettingsModalHide:function(){this._newFieldContainer=null},_afterFieldSettingsModalSave:function(t){var n=t.field;this._newFieldContainer?(e.instanceOf(this._newFieldContainer.get("value"),e.FormBuilderFieldList)?(this._newFieldContainer.get("value").addField(n),this._newFieldContainer.set("removable",!1)):this._addNestedField(this._newFieldContainer,n,this._newFieldContainer.get("nestedFields").length),this._newFieldContainer=null):this._handleEditEvent(n),this.getActiveLayout().normalizeColsHeight(new e.NodeList(n.get("content").ancestor(".layout-row"))),this._handleCreateEvent(n),this.disableUniqueFieldType(n)},_afterLayoutsChange:function(t){var n;e.Array.invoke(t.prevVal,"removeTarget",this),e.Array.invoke(t.newVal,"addTarget",this),this._removeFieldsChangeListener(t.prevVal),this._addFieldsChangeListener(t.newVal),this._updatePageContent(this.get("layouts")[0]),this._updateUniqueFieldType(),this.get("rendered")&&(n=this.get("pages"),n.set("activePageNumber",1),n.set("pagesQuantity",this.get("layouts").length)),this._checkLayoutsLastRow()},_afterLayoutColsChange:function(){this._updateUniqueFieldType()},_afterLayoutRowsChange:function(e){var t=e.newVal;for(var n=0;n<t.length;n++)t[n].set("removable",!0);this._renderEmptyColumns(),this._updateUniqueFieldType(),this._checkLastRow(e.target)},_afterUpdatePageContentChange:function(e){var t=this.get("layouts"),n=t[e.newVal-1];this._updatePageContent(n)},_afterFieldsChange:function(e){this._checkLastRow(e.currentTarget)},_checkLayoutsLastRow:function(){this.get("layouts").forEach(this._checkLastRow,this)},_getActiveLayoutIndex:function(){return this.get("rendered")?this.get("pages").get("activePageNumber")-1:0},_getPageManagerInstance:function(t){var n=this.get("contentBox");return this._pageManager||(this._pageManager=new e.FormBuilderPageManager(e.merge({pageHeader:n.one("."+a),pagesQuantity:this.get("layouts").length,paginationContainer:n.one("."+f),tabviewContainer:n.one("."+l)},t))),this._pageManager},_handleCreateEvent:function(e){this.fire("create",{field:e})},_handleEditEvent:function(
e){this.fire("edit",{field:e})},_handleRemoveEvent:function(e){this.fire("remove",{field:e})},_makeEmptyFieldList:function(t){t.set("value",new e.FormBuilderFieldList)},_onClickAddField:function(e){this._openNewFieldPanel(e.currentTarget)},_onEscKey:function(){this._newFieldContainer=null},_onFocus:function(e){var t,n=e.target;n.hasClass(i)?t=n:t=n.ancestor("."+i),t?this._fieldToolbar.addForField(t.getData("field-instance")):this._fieldToolbar.remove()},_openNewFieldPanel:function(e){this._newFieldContainer=e.ancestor(".col").getData("layout-col"),this.showFieldsPanel()},_removeFieldsChangeListener:function(){(new e.EventHandle(this._fieldsChangeHandles)).detach()},_removeLayout:function(e){var t=this.get("layouts");t[e.removedIndex].destroy(),t.splice(e.removedIndex,1)},_renderContentBox:function(){var t=this.get("contentBox"),n=e.Lang.sub(this.TPL_HEADER,{formTitle:this.get("strings").formTitle});t.append(n),t.append(this.TPL_PAGE_HEADER),t.append(this.TPL_TABVIEW),t.append(this.TPL_LAYOUT),t.append(this.TPL_PAGES)},_renderEmptyColumns:function(){var t=this,n=this.get("layouts")[this._getActiveLayoutIndex()].get("rows");e.Array.each(n,function(n){e.Array.each(n.get("cols"),function(e){var n=e.get("value");n||t._makeEmptyFieldList(e),n&&n._updateRemovableLayoutColProperty&&n._updateRemovableLayoutColProperty()})})},_setFieldToolbarConfig:function(t){return e.merge({formBuilder:this},t)},_setLayouts:function(t){var n=[];return e.Array.each(t,function(t){e.instanceOf(t,e.Layout)||(t=new e.Layout(t)),t.get("rows").length===0&&t.set("rows",[new e.LayoutRow]),t.get("rows")[t.get("rows").length-1].set("removable",!1),n.push(t)}),n},_updatePageContent:function(e){e.addTarget(this),this.get("rendered")&&(this._layoutBuilder.set("layout",e),this._renderEmptyColumns())}},{ATTRS:{fieldToolbarConfig:{setter:"_setFieldToolbarConfig",validator:e.Lang.isObject,value:{}},layouts:{setter:"_setLayouts",validator:e.Lang.isArray,valueFn:function(){return[new e.Layout]}},pages:{getter:"_getPageManagerInstance",validator:e.Lang.isObject},strings:{value:{addField:"Add Field",cancelRemoveRow:"Cancel",confirmRemoveRow:"Yes, delete",formTitle:"Build your form",modalHeader:"Remove confirmation",removeRowModal:"You will also delete fields with this row. Are you sure you want delete it?"},writeOnce:!0}},CSS_PREFIX:e.getClassName("form-builder")})},"3.0.2-deprecated.1",{requires:["aui-modal","aui-layout","aui-form-builder-field-list","aui-form-builder-field-toolbar","aui-form-builder-field-type","aui-form-builder-field-types","aui-form-builder-layout-builder","aui-form-builder-page-manager","aui-form-builder-settings-modal","event-focus","event-tap"],skinnable:!0});