
class Dashboard extends HTMLElement {
    constructor(){
        super();

        
        fetch('components/pgInicial/pagInicial.html')
        .then(response => response.text())
        .then(text => {
            this.innerHTML = text
        })
    }


}

customElements.define('app-pagInicial', pagInicial)