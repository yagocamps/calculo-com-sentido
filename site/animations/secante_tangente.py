"""Piloto Manim: secante -> tangente de f(x)=x² em x=2.

Render: python -m manim -qh --fps 30 animations/secante_tangente.py SecanteTangente
Usa Text (Pango), sem dependência de uma instalação de LaTeX.
"""
from manim import *

BG = "#10151C"
INK = "#ECF0F5"
MUTED = "#A5B2C2"
CURVE = "#78B7EA"
SECANT = "#F2AC7C"
TANGENT = "#8ED6B0"


class SecanteTangente(Scene):
    def construct(self):
        self.camera.background_color = BG

        def label(text, size=24, color=INK):
            return Text(text, font="Segoe UI", font_size=size, color=color)

        title = label("Da secante à tangente", 36).to_edge(UP, buff=0.35)
        subtitle = label("Uma curva. Dois pontos. Uma inclinação que muda.", 21, MUTED)
        subtitle.next_to(title, DOWN, buff=0.16)
        axes = Axes(
            x_range=[0, 4.3, 1], y_range=[0, 18, 4],
            x_length=6.5, y_length=4.5, tips=False,
            axis_config={"color": MUTED, "stroke_width": 2, "include_ticks": False},
        ).move_to(LEFT * 3.05 + DOWN * 0.18)
        ticks = VGroup()
        for x in [0, 1, 2, 3, 4]:
            ticks.add(label(str(x), 18, MUTED).next_to(axes.c2p(x, 0), DOWN, buff=0.14))
        for y in [4, 8, 12, 16]:
            ticks.add(label(str(y), 18, MUTED).next_to(axes.c2p(0, y), LEFT, buff=0.14))
        names = VGroup(
            label("x", 20, MUTED).next_to(axes.x_axis, RIGHT, buff=0.1),
            label("y", 20, MUTED).next_to(axes.y_axis, UP, buff=0.1),
        )
        grid = VGroup(*[
            Line(axes.c2p(0, y), axes.c2p(4.3, y), color="#26313E", stroke_width=1)
            for y in [4, 8, 12, 16]
        ])
        curve = axes.plot(lambda x: x*x, x_range=[0, 4.2], color=CURVE, stroke_width=4)
        curve_name = label("f(x) = x²", 25, CURVE).move_to([-3.7, 2.5, 0])
        p = Dot(axes.c2p(2, 4), color=INK, radius=0.07).set_z_index(4)
        p_name = label("P (2, 4)", 21).next_to(p, LEFT + UP, buff=0.19)
        h = ValueTracker(2)
        q = always_redraw(lambda: Dot(
            axes.c2p(2+h.get_value(), (2+h.get_value())**2),
            color=SECANT, radius=0.075,
        ).set_z_index(5))
        q_name = always_redraw(lambda: label("Q", 21, SECANT).next_to(q, RIGHT + DOWN, buff=0.18))
        # For h != 0, [(2+h)²-4]/h = 4+h. Clip the line to the graph domain.
        secant = always_redraw(lambda: Line(
            axes.c2p(max(0, 2-4/(4+h.get_value())), 0),
            axes.c2p(min(4.3, 2+14/(4+h.get_value())),
                     4+(4+h.get_value())*(min(4.3, 2+14/(4+h.get_value()))-2)),
            color=SECANT, stroke_width=3,
        ))
        tangent = DashedLine(axes.c2p(1, 0), axes.c2p(4.3, 13.2),
                             color=TANGENT, stroke_width=3, dash_length=0.13)
        panel = RoundedRectangle(width=4.65, height=4.5, corner_radius=0.18,
                                 fill_color="#19222D", fill_opacity=1,
                                 stroke_color="#344150", stroke_width=1).move_to([4.15, -0.18, 0])
        panel_title = label("Observe a inclinação", 25).move_to([4.15, 1.6, 0])
        point_info = label("P fica em x = 2. Q se aproxima.", 19, MUTED).move_to([4.15, 1.04, 0])
        h_value = always_redraw(lambda: label(
            f"Distância h = {h.get_value():.2f}".replace(".", ","), 26,
        ).move_to([4.15, 0.35, 0]))
        slope_value = always_redraw(lambda: label(
            f"Inclinação = {4+h.get_value():.2f}".replace(".", ","), 29, SECANT,
        ).move_to([4.15, -0.32, 0]))
        equation = label("m = [(2 + h)² − 4] / h", 23).move_to([4.15, -1.04, 0])
        simplified = label("m = 4 + h   (h ≠ 0)", 23, MUTED).move_to([4.15, -1.57, 0])
        legend = VGroup(label("● Curva", 19, CURVE), label("● Secante", 19, SECANT),
                        label("┄ Tangente", 19, TANGENT)).arrange(RIGHT, buff=0.42)
        legend.move_to([-2.8, -3.03, 0])
        caption = label("1. A secante passa por P e Q: sua inclinação é 6.", 23)
        caption.move_to([0, -3.61, 0])
        self.add(title, subtitle, grid, axes, ticks, names, curve, curve_name,
                 panel, panel_title, point_info, h_value, slope_value, equation,
                 simplified, tangent, secant, p, p_name, q, q_name, legend, caption)
        self.wait(4)
        next_caption = label("2. Q chega mais perto. A secante muda de direção.", 23).move_to(caption)
        self.play(Transform(caption, next_caption), run_time=0.5)
        self.play(h.animate.set_value(1), run_time=4, rate_func=smooth)
        self.wait(2)
        self.play(h.animate.set_value(0.5), run_time=4, rate_func=smooth)
        self.wait(2)
        next_caption = label("3. Quanto menor h, mais a inclinação se aproxima de 4.", 23).move_to(caption)
        self.play(Transform(caption, next_caption), run_time=0.5)
        self.play(h.animate.set_value(0.05), run_time=6, rate_func=smooth)
        self.wait(3)
        # Finite h still has slope 4.05. The final scene explicitly represents
        # the limit; never evaluate a 0/0 secant or equate it to a tangent.
        for obj in [h_value, slope_value, secant, q, q_name]:
            obj.clear_updaters()
        limit_h = label("No limite: h → 0", 26).move_to(h_value)
        limit_m = label("Inclinação da tangente: 4", 25, TANGENT).move_to(slope_value)
        result = label("y = 4x − 4", 27, TANGENT).move_to(equation)
        result_note = label("f′(2) = 4", 25).move_to(simplified)
        solid_tangent = Line(axes.c2p(1, 0), axes.c2p(4.3, 13.2),
                             color=TANGENT, stroke_width=4)
        next_caption = label("4. No limite, a tangente descreve a inclinação em P.", 23).move_to(caption)
        self.play(FadeOut(secant), FadeOut(q), FadeOut(q_name), Transform(tangent, solid_tangent),
                  Transform(h_value, limit_h), Transform(slope_value, limit_m),
                  Transform(equation, result), Transform(simplified, result_note),
                  Transform(caption, next_caption), run_time=1)
        self.wait(5)
