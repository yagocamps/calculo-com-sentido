# Piloto: secante e tangente

Única integração: `/calculo-1/derivadas/reta-secante-tangente#animacao-secante`.
Cena de 32 segundos, 1920 × 1080, 30 fps. O vídeo final tem 1920 × 1240,
com 160 pixels reservados abaixo da cena para os controles de reprodução.
Sem áudio, com legendas e descrição escrita.
O site serve o MP4 pronto; não instala nem executa Python no servidor.

## Reprodução

Em um ambiente Python 3.12 isolado:

```sh
python -m pip install -r animations/requirements.txt
python -m manim -qh --fps 30 --media_dir animations/media animations/secante_tangente.py SecanteTangente
ffmpeg -y -i animations/media/videos/secante_tangente/1080p30/SecanteTangente.mp4 -vf "pad=iw:ih+160:0:0:color=0x10151c" -c:v libx264 -crf 23 -preset medium -pix_fmt yuv420p -movflags +faststart -an public/animations/secante-tangente-v1.mp4
ffmpeg -y -ss 0 -i public/animations/secante-tangente-v1.mp4 -frames:v 1 -update 1 public/animations/secante-tangente-v1.jpg
```

Usa `Text` com Segoe UI/Pango para evitar instalar LaTeX. Para uma aparência idêntica,
a fonte precisa estar disponível no computador de renderização.
Os arquivos temporários em `media/` não são versionados.
Os tempos das legendas VTT devem acompanhar qualquer mudança no roteiro.

## Matemática

Para `f(x)=x²`, `P=(2,4)` e `Q=(2+h,(2+h)²)`, a secante tem
inclinação `m=4+h` para `h≠0`. Os estados exibidos são:
`h=2 → m=6`, `h=1 → m=5`, `h=0,5 → m=4,5`, `h=0,05 → m=4,05`.
O quadro final representa o limite, `f′(2)=4`, e a tangente `y=4x−4`.
A animação mostra a aproximação pela direita. A descrição registra que,
para esta parábola, a aproximação pela esquerda produz o mesmo limite.

O exemplo animado usa `x=2`; a resolução escrita da aula usa `x=1`.
Ambos permanecem identificados, sem substituir o exemplo original.
