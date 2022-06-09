$('.hide-dados').click(function() {    
    if ($(this).find('span').text() == 'Ocultar dados') 
    {
      $(this).find('span').text('Mostrar dados');
      $('.gramatica-dados').hide();
    }
    else
    {
      $(this).find('span').text('Ocultar dados');
      $('.gramatica-dados').show();
    }
  })

  function copyToClipboard() {
    var $temp = $("<input>");
    $("body").append($temp);
    $temp.val($('#GeradorSentencaAtual').val()).select();
    document.execCommand("copy");
    $temp.remove();
  }


  $('#text-copy').click(function() {
    var SentencaMontada = "";
    SentencaMontada = $('#GeradorSentencaAtual').val(); 
    
    // Se o texto não for vazio, copia
    if($('#GeradorSentencaAtual').val() != "")
    {
     copyToClipboard();
     showSuccessToast(SentencaMontada);
    }else{
     showErrorToast();
    } 
});

Step = 'S', Result = '', Temp = '';

$(document).ready(function() {
  $('.fade').click(function(e) { 
      $('#modal').reveal({ 
          animation: 'fade',
          animationspeed: 150,
          closeonbackgroundclick: true, 
          dismissmodalclass: 'close'
      });
      return false;
  });
});

function LimparSentencaGerador () {
  LimparTempGerador();
  PaintBG(`th, tr`,'background-color', 'white');
  PaintBG(`.${Step}`,'background-color', '#bfbfbf');
}

function LimparTempGerador(){
  $("#GeradorSentencaAtual").val("");
  Step = 'S';
  Result = '';
  Temp = ''
}

function PaintBG(object, element, color){
  $(object).css(element,color);
}

$("#TabelaGerador td").click(function() {
  
  var movimento = $(this).text();
  var rulenow = movimento.substring(0, 1);
  var destinity = movimento.substring(2, movimento.length); 
  var GeradorSentAtual =  $("#GeradorSentencaAtual").val();

  //Ep. então acaba
  if (destinity == 'ε') 
  {
    Result = GeradorSentAtual.replace(rulenow, "");
    Step = "";
  } 
  else 
  {
    if (Result == "" || Result == null) 
    {
      Result = destinity;
    } else 
    {
      // Substitui rule de agora e coloca a de destino próximo
      Result = GeradorSentAtual.replace(rulenow, destinity);
    }
  }
  
  for (var i=0; i<Result.length;i++) 
  {
    if (Result[i] == Result[i].toUpperCase()) 
    {
      // Maiusculo, então é o próximo.
      Step = Result[i];

      break;
    } 
    else 
    {
      Step = "";
    }
  }

  // Mudança na cor próximo Step
  PaintBG(`th, tr`,'background-color', 'white');

  if (Step)
  {
    PaintBG(`.${Step}`,'background-color', '#bfbfbf');
  }

  // Coloca no TextBox o resultado final
  $("#GeradorSentencaAtual").val(Result);
});

TabelaFixa = {S:{a:'aBb', b:'bCc'},A:{b:'E', d:'dCc'},B:{c:'cAb', d:'aAb'},C:{a:'aBb'}};
TipoResolucao = "PassoaPasso";
TabelaResolucao = [];

$('#limpar2').click(function()
{
  TabelaResolucao = []
  $('#SentencaTB').val('');  
  AtualizarTabelaResolucao();
});

$('.rb-tipo input[type="radio"]').change(function()
{
  TabelaResolucao = []
  AtualizarTabelaResolucao();
  $('#SentencaTB').val('');
  var selectedOption = $("input:radio[name=tipo]:checked").val()    
  if(selectedOption == 0)
  {
    TipoResolucao = "PassoaPasso";
    $("#calcular-parsing").show();
  }
  else
  {
    TipoResolucao = "At";
    $("#calcular-parsing").hide();
  }
});

$("#calcular-parsing").click(function() 
{
  if (TipoResolucao=='PassoaPasso') 
  { 
    var sentenca = "";
    // Pega o valor do TextBox para calcular
    sentenca = $("#SentencaTB").val();

    // Faz o calculo e joga na table
    ResolverParsing(sentenca);
  }
  else
  {
   // Nada pois está no modo automático.
  } 
});

function MontarTabelaParse(entrada) 
{
  if (!TabelaResolucao.length)
   {
    pilha = '$S'
    entrada = entrada + '$'
    if(TabelaFixa['S'][entrada[0]] != null) 
    {
      NextStepAction = TabelaFixa['S'][entrada[0]]
    } 
    else 
    {
      // Rejeitado pois não há nada
      var length = TabelaResolucao.length;
      NextStepAction = "Rejeitado com " + length + "iterações"
    }
    var starting = 
    {
      pilha: pilha, 
      entrada: entrada, 
      NextStepAction: NextStepAction
    }

    // Push na primeira linha
    TabelaResolucao.push(starting);
  }
}

$("#SentencaTB").keyup(function() 
{
  // Modo Automático, resolve na hora.
  if (TipoResolucao=='At' && TipoResolucao != null) 
  { 
    // Pega a sentença
    var sentenca = "";
    sentenca = $("#SentencaTB").val();

    // Resolve o Parsing e joga na table
    ResolverParsing(sentenca);

    // Joga o scroll pra baixo no modo Automático
    ScrollDownPage();
  } 
});

function ResolverParsing(entrada) 
{
  // Reset na tabela de resolução;
  TabelaResolucao = []

  // Inicializa a tabela
  MontarTabelaParse(entrada);
  var LastPosTable = TabelaResolucao[TabelaResolucao.length-1];  
  
  // Flag para continuar
  Continue = true;

  while(LastPosTable.pilha.length && Continue) 
  {
    LastLetterStack = LastPosTable.pilha[LastPosTable.pilha.length-1]
    FirstLetterIn = LastPosTable.entrada[0];
    if (LastPosTable.pilha.length >= 1 || LastPosTable.entrada >= 1) 
    {
      //Faz a verificação se o ultimo da pilha e primeiro da entrada são diferentes
      if (LastLetterStack != FirstLetterIn) 
      {
        if (!(LastLetterStack == LastLetterStack.toUpperCase())) break;

        //Verifica se existe algo na tabela
        if (TabelaFixa[LastLetterStack][FirstLetterIn] != null) 
        {
          NextStepAction = TabelaFixa[LastLetterStack][FirstLetterIn]
          LastPosTable.NextStepAction = NextStepAction;
          reverseNextStepAction = NextStepAction.split('').reverse().join('');
          entrada = LastPosTable.entrada

          // Grava o que foi feito, se acabou dá um reverse
          if (NextStepAction != "E")
            novaPilha = LastPosTable.pilha.slice(0, -1) + reverseNextStepAction
          else 
            novaPilha = LastPosTable.pilha.slice(0, -1)

          // Coloca na tabela o que foi feito
          var AllAction = 
          {
            pilha: novaPilha, 
            entrada: entrada, 
            NextStepAction: ''
          }

          TabelaResolucao.push(AllAction);
        } 
        else 
        {
          // Dá erro, não existe nada na tabela
          var length = TabelaResolucao.length;
          NextStepAction = "Erro com " + length + ' iterações';
          Continue = false;
        }
        
      } 
      else // ultima da pilha igual do primeiro da entrada
      {
        // Para se não tiver mais nada, acabou.
        if (FirstLetterIn=="$" && LastLetterStack=="$") break;

        //faz a leitura removendo o ultimo da entrada e o primeiro da fila
        NextStepAction = "Faz a leitura de  '" + FirstLetterIn + "'";
        LastPosTable.NextStepAction = NextStepAction
        
        // Remove o ultimo
        novaPilha = LastPosTable.pilha.slice(0, -1);

        // Remove o primeiro
        entrada = LastPosTable.entrada.substr(1);

        var AllActionA = 
        {
          pilha: novaPilha, 
          entrada: entrada, 
          NextStepAction: ''
        }

        // Grava na tabela a ação
        TabelaResolucao.push(AllActionA);
      }

      LastPosTable = TabelaResolucao[TabelaResolucao.length-1];
    }
  }

  // Pega ultima letra da pilha da pilha
  var PosLastLetter = LastPosTable.pilha.length-1;
  LastLetterStack = LastPosTable.pilha[PosLastLetter]

  // Pega primeira  lera da entrada
  FirstLetterIn = LastPosTable.entrada[0];

  if (LastLetterStack == "$" && FirstLetterIn == "$") 
  {
    // Aceito em x it.
    var length = TabelaResolucao.length;
    LastPosTable.NextStepAction = "Aceito com " + length + ' iterações';
  } 
  else 
  {
    // ero em x it.
    var length = TabelaResolucao.length;
    LastPosTable.NextStepAction = "Erro com " + length + ' iterações';    
  }
  
  //var last = 0;

  // Atualiza tabela final
  AtualizarTabelaResolucao();
}

// Função scrollar todo site para baixo
function ScrollDownPage()
{
  window.scrollTo(0,document.body.scrollHeight);
}

// Limpa tudo ao iniciar
$("document").ready(function() {
  LimparSentencaGerador();
  $("#limpar").click(function() {
    LimparSentencaGerador();
  });
});

function AtualizarTabelaResolucao() 
{

  // Define uma classe para identificar as linhas da tabela
  var NomeClasse = 'LineAnswer';

  // Remove a tabela antiga
  $('.' + NomeClasse).remove();

  // Pega tamanho da tabela
  var lenght = TabelaResolucao.length

  for(var i=0; i < lenght; i++) 
  {
    var Content = '';
    LastLetterStack = TabelaResolucao[i].pilha[TabelaResolucao[i].pilha.length-1]
        
    var lenghtTR = TabelaResolucao.length-1;

    if (i < lenghtTR && LastLetterStack == LastLetterStack.toUpperCase()) 
    {
      // Pega Informações
      var p = TabelaResolucao[i].pilha;
      var e = TabelaResolucao[i].entrada;
      var ns = TabelaResolucao[i].NextStepAction;

      // Monta a linha
      Content = `<tr class=${NomeClasse}><td>${p}</td><td>${e}</td><td>${LastLetterStack} ➜ ${ns}</td></tr>`
    } 
    else 
    {

     // Pega Informações
      var p = TabelaResolucao[i].pilha;
      var e = TabelaResolucao[i].entrada;
      var ns = TabelaResolucao[i].NextStepAction;

      // Monta a linha
      Content = `<tr class=${NomeClasse}><td>${p}</td><td>${e}</td><td>${ns}</td></tr>`    
    }

    // Coloca a linha atual na tabela
    $('#TabelaParsing').append(Content);
  }
}

  function showSuccessToast(texto) {
    toast({
      title: "Feito!",
      message: "A sentença " + texto + " foi copiada com sucesso! ",
      type: "success",
      duration: 5000
    });
  }

  function showErrorToast() {
    toast({
      title: "Oops!",
      message: "A sentença está vazia, nada foi copiado.",
      type: "error",
      duration: 5000
    });
  }
  
function toast({ title = "", message = "", type = "info", duration = 3000 }) {
  const main = document.getElementById("toast");
  if (main) {
    const toast = document.createElement("div");

    // Auto remove toast
    const autoRemoveId = setTimeout(function () {
      main.removeChild(toast);
    }, duration + 1000);

    // Remove toast when clicked
    toast.onclick = function (e) {
      if (e.target.closest(".toast__close")) {
        main.removeChild(toast);
        clearTimeout(autoRemoveId);
      }
    };

    const icons = {
      success: "fas fa-check-circle",
      info: "fas fa-info-circle",
      warning: "fas fa-exclamation-circle",
      error: "fas fa-exclamation-circle"
    };
    const icon = icons[type];
    const delay = (duration / 1000).toFixed(2);

    toast.classList.add("toast", `toast--${type}`);
    toast.style.animation = `slideInLeft ease .3s, fadeOut linear 1s ${delay}s forwards`;

    toast.innerHTML = `
                    <div class="toast__icon">
                        <i class="${icon}"></i>
                    </div>
                    <div class="toast__body">
                        <h3 class="toast__title">${title}</h3>
                        <p class="toast__msg">${message}</p>
                    </div>
                    <div class="toast__close">
                        <i class="fas fa-times"></i>
                    </div>
                `;
    main.appendChild(toast);
  }
}

