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

// const transactions = [
//     {
//         description: 'Luz',
//         amount: -15000,
//         date: '10/11/2021'
//     },
//     {
//         description: 'Seguro',
//         amount: -15000,
//         date: '10/11/2021'
//     },
//     {
//         description: 'Pagamento',
//         amount: 200057,
//         date: '05/11/2021'
//     }
// ]

const Storage = {
    get() {
        return JSON.parse(localStorage.getItem("dev.finances:transactions")) || []
    },
    set(transactions) {
        localStorage.setItem("dev.finances:transactions", JSON.stringify (transactions))

    }
}

const Transaction = {
    all: Storage.get(),
    add(transaction){
        Transaction.all.push(transaction)
        app.reload()
    },
    remove(index){
        Transaction.all.splice(index,1)
        app.reload()
    },
    incomes(){
        let income = 0
        Transaction.all.forEach(transaction => {
            if(transaction.amount > 0){
                income = income + transaction.amount
            }
        })
        return income
    },
    expenses(){
        let expense = 0
        Transaction.all.forEach(transaction => {
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
        tr.innerHTML = DOM.innerHTMLTransaction(transaction, index)
        tr.dataset.index = index
        DOM.transactionsContainer.appendChild(tr)

        
    },
    innerHTMLTransaction(transaction, index){
        const CSSclass = transaction.amount > 0 ? "income" : "expense"
        const amount = utils.formatCurrency(transaction.amount)

        const html = `
            <td class="description">${transaction.description}</td>
            <td class="${CSSclass}">${amount}</td>
            <td class="date">${transaction.date}</td>
            <td><img onclick="Transaction.remove(${index})" src="imagens/minus.svg" alt="Remover Transação"></td>
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
    formatAmount(value) {
        value = Number(value) * 100
        return value
    },
    fotmatDate(date){
        const  splittedDate = date.split('-')
        return `${splittedDate[2]}/${splittedDate[1]}/${splittedDate[0]}`
    },
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

const Form = {
    description: document.querySelector('input#description'),
    amount: document.querySelector('input#amount'),
    date: document.querySelector('input#date'),

    getValues() {
        return {
        description: Form.description.value,
        amount: Form.amount.value,
        date: Form.date.value
        }
    },


    validateFields(){
        const {description, amount, date } = Form.getValues()
        if(description.trim() === "" || amount.trim() === "" || date.trim() === ""){
            throw new Error("Por favor preencha todos os campos")
        }
    },

    formatValues(){
        let {description, amount, date } = Form.getValues()
        amount = utils.formatAmount(amount)
        date = utils.fotmatDate(date)

        return { description, amount, date}
    },

    clearFields(){
        Form.description.value = ""
        Form.amount.value = ""
        Form.date.value = ""
    },

    submit(event){
        event.preventDefault()
        try{
            Form.validateFields()
            //formatar os dados para salvar
            const transaction = Form.formatValues()
            //salvar
            Transaction.add(transaction)
            //apagar os dados do formulario
            Form.clearFields()
            //modal feche
            modal.close()
            //atualizar aplicação

        }catch(error){
            alert(error.message)
        }

    }
}


const app = {
    init(){
            Transaction.all.forEach((transaction, index) => {
            DOM.addTransaction(transaction, index)
       
        }),

        
        
        DOM.updateBalance()

        Storage.set(Transaction.all)

    },
    reload(){
        DOM.clearDOM()
        app.init()
    },
}


app.init()