
class Dashboard extends HTMLElement {
    constructor(){
        super();

        
        fetch('components_PG/dashboard/Dashboard.html')
        .then(response => response.text())
        .then(text => {
            this.innerHTML = text
        })
    }


}

customElements.define('app-dashboard', Dashboard)