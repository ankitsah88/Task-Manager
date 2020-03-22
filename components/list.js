class List extends HTMLElement {
    static get observedAttributes() {
      return ['title', 'index'];
    }
  
    constructor() {
      super();
      this.onAddNewListItem = this.onAddNewListItem.bind(this);
      this.dropList = this.dropList.bind(this);
      this.dropItem = this.dropItem.bind(this);
      this.index = 0;
    }
  
    connectedCallback() {
      var self=this;
      if(self.children.length===0){
      var header = document.createElement('list-header');
      header.setAttribute('title',this.getAttribute('title'));

      this.maincontent = document.createElement('div');
      this.maincontent.className = "list-content";
      

      this.maincontent.appendChild(header);
      this.appendChild(this.maincontent);
      this.addListItemSection();

      
      this.setAttribute("draggable","true");
      this.ondragstart = function(ev){
          ev.dataTransfer.setData("list", self.id); 
      };

      this.ondrop= function(ev){
        ev.preventDefault(); 
        
        if(ev.dataTransfer.getData("list-item")){
          this.dropItem(ev)
        }else if(ev.dataTransfer.getData("list")){
          this.dropList(ev);
        }
      }

      this.ondragover=function(ev){
        ev.preventDefault(); 
      };
    }
    }
  
    dropList(ev){
      var dropedItemIndex = ev.dataTransfer.getData("list");
      var dropedItem = document.getElementById(dropedItemIndex);
      var dropedAt = ev.target.closest("ankit-list");

      var lists = document.getElementById('lists');
      var dropedIndex = this.getChildIndex(dropedItem,lists);
      var dropingIndex = this.getChildIndex(dropedAt,lists);

      // decide wether to drop after or before
      if(dropedIndex<dropingIndex){
      lists.insertBefore(dropedItem,lists.children[dropingIndex+1]);
      }else{
      lists.insertBefore(dropedItem,lists.children[dropingIndex]);
      }

    }

    dropItem(ev){
      var dropedItemIndex = ev.dataTransfer.getData("list-item");
      var dropedItem = document.getElementById(dropedItemIndex);
      var dropedAt = ev.target.closest("list-item");

      var dropedIndex = this.getChildIndex(dropedItem,this.maincontent);
      var dropingIndex = this.getChildIndex(dropedAt,this.maincontent);

      if(dropedIndex === -1){
        //check if its drop on another list
        this.maincontent.insertBefore(dropedItem,this.maincontent.children[dropingIndex]);
      }else{
        // check if its not droped on same loc
      if(dropedItem!==dropedAt.id){
        // decide wether to drop after or before
      if(dropedIndex<dropingIndex){
      this.maincontent.insertBefore(dropedItem,this.maincontent.children[dropingIndex+1]);
      }else{
        this.maincontent.insertBefore(dropedItem,this.maincontent.children[dropingIndex]);
      
      }
    }
  }
    }

    getChildIndex(child,parent){
      var children = parent.children;
      var i = children.length - 1;
      for (; i >= 0; i--){
          if (child == children[i]){
              break;
          }
      }
      return i;
  };

    onAddNewListItem(){
      var item = document.createElement('list-item');
      item.id = this.id + "_list-item_"+this.index;
      this.index++;
      this.maincontent.appendChild(item);
    }

    addListItemSection(){
        var addContent = document.createElement('div');
        addContent.className = "addListItem cursorPointer";
        addContent.innerHTML = "+ Add another item";
        addContent.onclick = this.onAddNewListItem;
        this.appendChild(addContent);

    }
  }
  
  customElements.define('ankit-list', List);
  