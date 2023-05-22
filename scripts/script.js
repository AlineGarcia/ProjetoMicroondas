var micro = document.querySelector('#micro')
var display = document.querySelector('.display')

var selectDesc = document.querySelector('#select-desc')
var selectPote = document.querySelector('#select-pote')

var select1 = document.querySelector('#select-1')
var select2 = document.querySelector('#select-2')
var select3 = document.querySelector('#select-3')
var select4 = document.querySelector('#select-4')
var select5 = document.querySelector('#select-5')
var select6 = document.querySelector('#select-6')
var select7 = document.querySelector('#select-7')
var select8 = document.querySelector('#select-8')
var select9 = document.querySelector('#select-9')
var select0 = document.querySelector('#select-0')

var ligar = document.querySelector('#ligar')
var desligar = document.querySelector('#desligar')

const horaAtual = (new Date().getHours())+':'+((new Date().getMinutes()) < 10 ? '0'+(new Date().getMinutes()) : (new Date().getMinutes()))

var tempo = ''
var countDownTimer = null
var displayCount = null
var potencia = 10

display.innerHTML = horaAtual

selectDesc.addEventListener('click', el => {
    display.innerHTML = "Descon..."  
    displayCount = '30:00'
    setTimeout(() => {     
        iniciar()
        micro.className = 'micro-ligado'
    }, 1000)
})

selectPote.addEventListener('click', el => {
    potencia >= 100 ? potencia = 10 : potencia += 10
    display.innerHTML = potencia+"%"
    setTimeout(() => {     
        display.innerHTML = horaAtual
    }, 3000)
})

select1.addEventListener('click', el => {
    selecionar("1")
})

select2.addEventListener('click', el => {
    selecionar("2")
})

select3.addEventListener('click', el => {
    selecionar("3")
})

select4.addEventListener('click', el => {
    selecionar("4")
})

select5.addEventListener('click', el => {
    selecionar("5")
})

select6.addEventListener('click', el => {
    selecionar("6")
})

select7.addEventListener('click', el => {
    selecionar("7")
})

select8.addEventListener('click', el => {
    selecionar("8")
})

select9.addEventListener('click', el => {
    selecionar("9")
})

select0.addEventListener('click', el => {
    selecionar("0")
})

desligar.addEventListener('click', el => {
    cancelar('Cancelado')
})

ligar.addEventListener('click', el => {
    displayCount = display.innerHTML
    display.innerHTML = "Iniciar"
    setTimeout(() => {     
        iniciar()
        micro.className = 'micro-ligado'
    }, 1000)    
})

function selecionar(num) {
    if (num > 0 || tempo != "") {
        tempo += num

        let timer = tempo.replace(/\B(?=(\d{2})+(?!\d))/g, ':')

        if (Number(timer.split(':')[1]) > 60) {
            display.innerHTML = `${(Number(timer.split(':')[0]) + 1).toString()}:${(Number(timer.split(':')[1]) - 60) < 10 ? '0' : ''}${(Number(timer.split(':')[1]) - 60).toString()}`
        } else if (Number(timer.split(':')[0]) > 60) {
            display.innerHTML = `1:${(Number(timer.split(':')[0]) - 60) < 10 ? '0' : ''}${(Number(timer.split(':')[0]) - 60).toString()}`
        } else {
            if (!timer.split(':')[1])
                display.innerHTML =  Number(timer) < 10 ? '00:0' + timer : '00:' + timer
            else
                display.innerHTML = timer
        }
    }
}

function iniciar() {
    let duracao = Number(displayCount.replace(':','.'))
    if (duracao >= 1) {
     duracao = duracao * 60
    } else {
     duracao = duracao * 100
    }
    startTimer(duracao.toFixed(1))
}

function startTimer(duration) {
    let timer = duration, minutes, seconds
    countDownTimer = setInterval(() => {
        minutes = parseInt((timer / 60).toString(), 10)
        seconds = (timer % 60).toString(), 10
        // minutes = minutes < 10 ? '00:0' + minutes : '00:' + minutes
        minutes = minutes < 10 ? '0' + minutes : minutes
        seconds = seconds < 10 ? '0' + seconds : seconds
        display.innerHTML = minutes + ':' + seconds

        if (--timer < 0) {
            timer = duration
            cancelar('Finalizado')
        }
    }, 1000)
}

function cancelar(msg) {
    display.innerHTML = msg
    micro.className = 'micro-desligado'
    clearInterval(countDownTimer)
    tempo = ""
    setTimeout(() => {
        display.innerHTML = horaAtual
    }, 1000)  
}
