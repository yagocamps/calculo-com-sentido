# Fase 3 — Recursos visuais e interativos

## Objetivo

Transformar oito conceitos dinâmicos centrais em experiências manipuláveis, mantendo a prioridade desta build na versão para computador.

## Laboratórios

| Conceito | Aula | Manipulação principal |
|---|---|---|
| Limite | Limite por gráfico | aproximar `x` pelos dois lados de um ponto ausente |
| Secante e tangente | Reta secante e tangente | reduzir `h` e observar a inclinação convergir |
| Soma de Riemann | Somas de Riemann | aumentar a quantidade de retângulos |
| Círculo trigonométrico | Ciclo trigonométrico | girar o ângulo e ler seno e cosseno |
| Transformações | Reflexões e escalas | alterar escala, reflexão e translações |
| Parábola | Função quadrática | alterar `a`, `b` e `c`, vértice e discriminante |
| Regra do produto | Produto e quociente | reduzir o incremento de uma área retangular |
| TFC | Teorema Fundamental do Cálculo | mover o limite superior e comparar área e inclinação |

## Padrão de qualidade

Cada laboratório contém:

- pelo menos um controle de intervalo operável por teclado;
- atualização numérica em tempo real;
- gráfico SVG com descrição dinâmica para tecnologia assistiva;
- explicação textual que não depende de cor;
- exercício associado com resposta recolhível;
- link para prática adicional no banco de exercícios.

`npm run validate` também confirma que os oito laboratórios estão ligados a aulas publicadas.
