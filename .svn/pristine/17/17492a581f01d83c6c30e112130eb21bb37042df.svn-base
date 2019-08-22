let widgets = {};
let category = {};
const widgetsContext = require.context('./widgets', true, /Widget[A-Z]\w+\.(vue|js)$/)
widgetsContext.keys().forEach(widget => {
    let widgetConfig = widgetsContext(widget);
    let widgetName = widget.replace(/^\.\/(.*)\.\w+$/, '$1');
    let widgetObject = widgetConfig.default || widgetConfig;
    if (!category[widgetObject.category] || category[widgetObject.category] == undefined) {
        category[widgetObject.category] = [];
    }
    if(widgetObject.visible) {
        widgets[widgetName] = widgetObject;
        category[widgetObject.category].push({
            title: widgetObject.title,
            name: widgetObject.name,
            preview: widgetObject.preview,
            fields: widgetObject.fields ? widgetObject.fields : []
        });
    }
});
export {category, widgets} ;