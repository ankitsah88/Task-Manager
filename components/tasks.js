// Create a class for the element
class Task extends HTMLElement {
    // Specify observed attributes so that
    // attributeChangedCallback will work
  
    constructor() {
      // Always call super first in constructor
      super();
      this.addNewList = this.addNewList.bind(this);
      this.index =0;
    }
  
    connectedCallback() {
      var section = document.createElement('section');
      section.id = "lists"

      var listHeader = document.createElement('new-list-header');
      listHeader.setAttribute('isNew','true');
      this.appendChild(section);

      section.appendChild(listHeader);
      this.addAllListner(listHeader);

    }
  
    addAllListner(listHeader){
      listHeader.addEventListener('NewItem',this.addNewList)
    }

    addNewList(oData){
      var newList = document.createElement('ankit-list');
      newList.id = 'ankit-list'+this.index;
      this.index++;
      oData.detail && oData.detail.title ? newList.setAttribute('title',oData.detail.title):"";
      var lists = document.getElementById('lists');
      lists.insertBefore(newList,lists.children[lists.children.length-1]);
    }

    disconnectedCallback() {
     
    }

    attributeChangedCallback(name, oldValue, newValue) {
     
    }
  }
  
  customElements.define('ankit-tasks', Task);
  