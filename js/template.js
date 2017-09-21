export class Template{
    constructor(templateId) {
        const template = document.querySelector(templateId);

        if (template!=null){
            this._templateId = templateId;
            this._parent = "";
            this._template = template.content;
        }
        else
            console.log("Template with id " + templateId + " doesn't exist");
        
        this._clon = "";
    }

    prepare() {
        this._clon = this._template.cloneNode(true);
    }

    setValues(obj) {
        for (var i = 0, len = this._clon.childNodes.length; i < len; i++) {
            for (var [key, value] of Object.entries(obj)) {
                if (this._clon.childNodes[i].innerHTML != undefined){
                    this._clon.childNodes[i].innerHTML = this._clon.childNodes[i].innerHTML.replace("${" + key.trim() + "}", value);
                }
            }
        }
    }

    attachToDOM(slot){
        document.querySelector(slot).appendChild(this._clon);
        this._parent = slot;
    }

    static detachFromDOM(slot){
        //TODO: Check a better way to clear a node.
        let node = document.querySelector(slot);
        if (node.hasChildNodes()){
            node.innerHTML = "";
        }
    }

    detachFromDOM(){
        if (this._parent != ""){
            Template.detachFromDOM(this._parent);
        }
    }

    getClone(){
        this._template;
    }
}