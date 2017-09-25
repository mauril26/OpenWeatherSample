/* export class Template{
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
        let regEx="";
        for (var i = 0, len = this._clon.childNodes.length; i < len; i++) {
            for (var [key, value] of Object.entries(obj)) {
                if (this._clon.childNodes[i].innerHTML != undefined){
                    regEx = new RegExp("\\$\\{" + key.trim() + "\\}", 'g');
                    this._clon.childNodes[i].innerHTML = this._clon.childNodes[i].innerHTML.replace(regEx, value);
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
} */

function Template(templateId){
    var template = document.querySelector(templateId);

    if (template != null) {
        var templateId = templateId;
        var parent     = "";
        var template   = template.content;
    }
    else
        console.log("Template with id " + templateId + " doesn't exist");

    this._clon = "";

    this.prepare = function() {
        this._clon = this._template.cloneNode(true);
    }

    this.setValues = function(obj) {
        let regEx = "";
        for (var i = 0, len = this._clon.childNodes.length; i < len; i++) {
            for (var [key, value] of Object.entries(obj)) {
                if (this._clon.childNodes[i].innerHTML != undefined) {
                    regEx = new RegExp("\\$\\{" + key.trim() + "\\}", 'g');
                    this._clon.childNodes[i].innerHTML = this._clon.childNodes[i].innerHTML.replace(regEx, value);
                }
            }
        }
    }

    this.attachToDOM = function(slot){
        document.querySelector(slot).appendChild(this._clon);
        this._parent = slot;
    }

    this.detachFromDOM = function(){
        if (this._parent != "") {
            Template.detachFromDOM(this._parent);
        }
    }
}

Template.detachFromDOM = function (slot) {
    //TODO: Check a better way to clear a node.
    var node = document.querySelector(slot);
    if (node.hasChildNodes()) {
        node.innerHTML = "";
    }
}