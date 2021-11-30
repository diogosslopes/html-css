const modal = {
    open(){
        document.querySelector('.modal-overlay')
        .classList.add('active')
    },
    close(){
        document.querySelector('.modal-overlay')
        .classList.remove('active')
    }
}

const transactions = [
    {
        id: 1,
        description: 'Luz',
        amount: -15000,
        date: '10/11/2021'
    },
    {
        id: 2,
        description: 'Seguro',
        amount: -15000,
        date: '10/11/2021'
    },
    {
        id: 3,
        description: 'Pagamento',
        amount: 200057,
        date: '05/11/2021'
    }
]

const Transaction = {
    all:transactions,
    add(transaction){
        Transaction.all.push(transaction)
        app.reload()
    },
    incomes(){
        let income = 0
        Transaction.all.forEach(function(transaction){
            if(transaction.amount > 0){
                income = income + transaction.amount
            }
        })
        return income
    },
    expenses(){
        let expense = 0
        Transaction.all.forEach(function(transaction){
            if(transaction.amount < 0){
                expense = expense + transaction.amount
            }
        })
        return expense
    },
    total(){
        return Transaction.incomes() + Transaction.expenses()
    }
}
    
const DOM = {
    transactionsContainer: document.querySelector('#data-table tbody'),

    addTransaction(transaction, index){
        const tr = document.createElement('tr')
        tr.innerHTML = DOM.innerHTMLTransaction(transaction)

        DOM.transactionsContainer.appendChild(tr)
        
    },
    innerHTMLTransaction(transaction){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img src="imagens/minus.svg" alt="Remover Transação"></td>
        `

        return html
    },
    updateBalance(){
        document.getElementById('incomeCard').innerHTML = utils.formatCurrency(Transaction.incomes())
        document.getElementById('expenseCard').innerHTML = utils.formatCurrency(Transaction.expenses())
        document.getElementById('totalCard').innerHTML = utils.formatCurrency(Transaction.total())
    },
    clearDOM(){
        DOM.transactionsContainer.innerHTML = ''
    }

}

const utils = {
    formatCurrency(value){
        const signal = Number(value) < 0 ? "-": ""
        value = String(value).replace(/\D/g,"")
        value = Number(value)/100
        value = value.toLocaleString("pt-BR",{
            style: "currency",
            currency: "BRL"
        })
        return signal + " " + value
    }
}


const app = {
    init(){
        Transaction.all.forEach(transaction => {
            DOM.addTransaction(transaction)
        })
        
        DOM.updateBalance()

    },
    reload(){
        DOM.clearDOM()
        app.init()
    }
}

app.init()

Transaction.add({
    id: 39,
    description: 'Alo',
    amount: 200,
    date: '30/11/2021'

})