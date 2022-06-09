# Trabalho de Compiladores - 2022
<br/>
Vítor Zaions
<br/>
GitHub: https://github.com/VitorZaions/analisadorsintatico
<br/>
<br/>
Gramática:
<br/>
S ::= aBb | bCc
<br/>
A ::= dCc | ε
<br/>
B ::= cAb | aAb
<br/>
C ::= aBa
<br/>
<br/>
First:
<br/>
S ::= { a, b }
<br/>
A ::= { d, ε }
<br/>
B ::= { c, a }
<br/>
C ::= { a }
<br/>
<br/>
Follow:
<br/>
S ::= { $ }
<br/>
A ::= { c }
<br/>
B ::= { a, c }
<br/>
C ::= { a }
<br/>
<br/>

Tabela:

| -        | A           | B  | C | D | $ 
| ------------- | :-------------: | :-------------: |  :-------------: |   :-------------: |   :-------------: |
| S      | S➔aBb | S➔bCc | - | - | - |
| A      | -      |   A➜ε | - | A➜dCc | - |
| B | -      |    - | B➜cAb | B➜aAb | - |
| C | C➜aBb      |    - | - | - |
<br/>
- Sentenças Corretas:
<br/>
acbb - Aceito em 8 Iterações.
<br/>
bacbbc - Aceito em 11 Iterações.
<br/>
acdacbbcbb - Aceito em 17 Iterações.
<br/>
bacdacbbcbbc - Aceito com 20 Iterações.
<br/>
<br/>
- Sentenças Incorretas:
<br/>
baadacbbcbbc - Erro em 5 iterações.
<br/>
acdaadacbbcbbcbb - Erro em 9 iterações.
<br/>
<br/>
