// Create a class for the element
class Header extends HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    static get observedAttributes() {
        return ['title'];
      }

    constructor() {
      // Always call super first in constructor
      super();
      this.onEditTitle = this.onEditTitle.bind(this);self
    }

    onEditTitle(){
        var self = this;
        self.edit = true;
        var input = document.createElement('input');
        input.id = "inputTitle";
        input.value = this.getAttribute('title');
        input.onblur = function(){
            let value = input.value ? input.value : self.getAttribute('title');
            self.setAttribute('title',value);
            self.edit = false;
            self.removeChild(self.children[0]);
            self.appendChild(self.getHeader());
        }
        this.removeChild(this.children[0]);
        this.appendChild(input);

    }
    


    getHeader(){
        var div = document.createElement('div');
        div.innerHTML = this.getAttribute('title');
        div.onclick = this.onEditTitle;
        return div;
    }

    connectedCallback() {
        if(this.children.length===0){
        this.appendChild(this.getHeader());
        }
    }
  
    disconnectedCallback() {
     
    }

    attributeChangedCallback(name, oldValue, newValue) {
     
    }
  }
  
  customElements.define('list-header', Header);
  