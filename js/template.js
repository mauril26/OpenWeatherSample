function Template(templateId) {
    this.template = document.querySelector(templateId);
    this.clon     = "";

    if (this.template  != null) {
        this.templateId      = templateId;
        this.parent          = "";
        this.templateContent = this.template.content;
    }
    else
        console.log("Template with id " + this.templateId  + " doesn't exist");

    this.prepare = function() {
        this.clon = this.template.content.cloneNode(true);
    }

    this.setValues = function(obj) {
        var regEx = "";
        
        for (var i = 0, len = this.clon.childNodes.length; i < len; i++) {
            for (var key of Object.keys(obj)) {
                if (this.clon.childNodes[i].innerHTML != undefined) {
                    regEx = new RegExp("\\$\\{" + key.trim() + "\\}", 'g');
                    this.clon.childNodes[i].innerHTML = this.clon.childNodes[i].innerHTML.replace(regEx, obj[key]);
                }
            }
        }
    }

    this.attachToDOM = function(slot){
        document.querySelector(slot).appendChild(this.clon);
        this.parent = slot;
    }

    this.detachFromDOM = function(){
        if (this.parent != "") {
            Template.detachFromDOM(this.parent);
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