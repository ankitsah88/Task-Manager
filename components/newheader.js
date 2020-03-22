// Create a class for the element
class ListHeader extends HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
    
    constructor() {
      // Always call super first in constructor
      super();
      this.onAddNewItem = this.onAddNewItem.bind(this);
      this.onCancel = this.onCancel.bind(this);
      this.onSaveName = this.onSaveName.bind(this);
      //var shadow = this.attachShadow({mode: 'open'});
      //shadow.appendChild(this.getNewHeader());
      
    }

    getInput(){
      var div = document.createElement('div');
      var input = document.createElement('input');
      input.id = "newItemInput";

      var buttonDiv = document.createElement('div');

      var savebttn = document.createElement('button');
      savebttn.innerHTML = "Add List";
      savebttn.onclick = this.onSaveName;
      
      var cancelbttn = document.createElement('button');
      cancelbttn.innerHTML = "Cancel";
      cancelbttn.onclick = this.onCancel;

      buttonDiv.appendChild(savebttn);
      buttonDiv.appendChild(cancelbttn);

      div.appendChild(input);
      div.appendChild(buttonDiv);
      return div;
    }

    onSaveName(){
        this.dispatchEvent(new CustomEvent('NewItem', { detail:{title: document.getElementById('newItemInput').value}}));
        this.removeChild(this.children[0]);
        this.appendChild(this.getNewHeader());
      }

    onCancel(){
      this.removeChild(this.children[0]);
      this.appendChild(this.getNewHeader());
    }

    getNewHeader(){
        var div = document.createElement('div');
        div.innerHTML = "+ Add another list";
        div.onclick = this.onAddNewItem;
        return div;
    }

    onAddNewItem(){
        this.removeChild(this.children[0]);
        this.appendChild(this.getInput());
    }
  
    connectedCallback() {
        this.appendChild(this.getNewHeader());
    }
  
    disconnectedCallback() {
     
    }

    attributeChangedCallback(name, oldValue, newValue) {
     
    }
  }
  
  customElements.define('new-list-header', ListHeader);
  