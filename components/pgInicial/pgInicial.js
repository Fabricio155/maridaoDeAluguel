
class Dashboard extends HTMLElement {
    constructor(){
        super();

        
        fetch('components/pgInicial/pgInicial.html')
        .then(response => response.text())
        .then(text => {
            this.innerHTML = text
        })
    }


}

customElements.define('app-pgInicial', pgInicial)