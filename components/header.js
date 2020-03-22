class Header extends HTMLElement {
    static get observedAttributes() {
        return ['title'];
      }

    constructor() {
      super();
      this.onEditTitle = this.onEditTitle.bind(this);
    }

    onEditTitle(){
      // change read only to edit mode when user clicks
        var self = this;
        self.edit = true;
        var input = document.createElement('input');
        input.id = "inputTitle";
        input.value = this.getAttribute('title');
        
        input.onblur = function(){
            // on focus out change back to readonly div
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
  }
  
  customElements.define('list-header', Header);
  