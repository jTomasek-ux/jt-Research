"""
Generate figures for the AI in Europe paper.

Charts are illustrative syntheses for argumentation (lag compression, stack
allocation, relative positioning). Captions in the MDX must state this.
"""

from pathlib import Path

import matplotlib.pyplot as plt
import numpy as np

CANVAS = "#faf9f5"
INK = "#161514"
BODY = "#3a3936"
MUTED = "#6f6d68"
HAIRLINE = "#e2e0db"
PRIMARY = "#7a2e2e"
PRIMARY_SOFT = "#a85a5a"
SUCCESS = "#4f8a5b"
ERROR = "#a83b3b"
MUTED_BAR = "#8f8c86"

OUT_DIR = (
    Path(__file__).resolve().parents[1]
    / "public"
    / "papers"
    / "ai-in-europe"
)


def style_axes(ax, grid="y"):
    ax.set_facecolor(CANVAS)
    for spine in ("top", "right"):
        ax.spines[spine].set_visible(False)
    ax.spines["left"].set_color(HAIRLINE)
    ax.spines["bottom"].set_color(HAIRLINE)
    ax.tick_params(colors=MUTED, labelsize=9)
    ax.yaxis.label.set_color(BODY)
    ax.xaxis.label.set_color(BODY)
    ax.title.set_color(INK)
    if grid == "y":
        ax.grid(axis="y", color=HAIRLINE, linewidth=0.8)
    elif grid == "x":
        ax.grid(axis="x", color=HAIRLINE, linewidth=0.8)
    ax.set_axisbelow(True)


def save(fig, name: str):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / name
    fig.savefig(path, dpi=180, bbox_inches="tight", facecolor=CANVAS, pad_inches=0.25)
    plt.close(fig)
    print(f"Wrote {path}")


def figure_1_lag_compression():
    """Months behind US closed frontier for open China vs EU mid-frontier."""
    years = np.array([2022.5, 2023.5, 2024.5, 2025.0, 2025.5, 2026.5])
    labels = ["2022 H2", "2023 H2", "2024 H2", "2025 H1", "2025 H2", "2026 H1"]
    # Illustrative months of lag behind US closed frontier
    china_open = np.array([18, 14, 10, 5, 3, 1.5])
    eu_mid = np.array([20, 18, 16, 14, 12, 11])

    fig, ax = plt.subplots(figsize=(9.2, 5.0))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    ax.plot(years, china_open, color=PRIMARY, linewidth=2.4, marker="o", label="China open / open-weight lag")
    ax.plot(years, eu_mid, color=MUTED_BAR, linewidth=2.4, marker="s", label="EU mid-frontier lag")
    ax.axhline(0, color=HAIRLINE, linewidth=1)

    ax.set_xticks(years)
    ax.set_xticklabels(labels, fontsize=8.5)
    ax.set_ylabel("Months behind US closed frontier")
    ax.set_ylim(0, 24)
    ax.set_title("Illustrative lag compression: who closes on the US frontier?", fontsize=13, pad=12)
    ax.legend(frameon=False, loc="upper right", fontsize=9)
    ax.text(
        0.01,
        0.02,
        "Illustrative synthesis for argument · not a single benchmark vendor series",
        transform=ax.transAxes,
        fontsize=7.5,
        color=MUTED,
    )

    save(fig, "figure-2-lag-compression.png")


def figure_2_capability_snapshot():
    """Grouped bars: relative capability index by region/stack."""
    categories = ["Reasoning", "Coding", "Agents", "Cost\nefficiency", "Infra\nscale"]
    # Indexed ~100 = US closed frontier mid-2026 illustrative
    us_closed = np.array([100, 100, 100, 55, 100])
    china_open = np.array([92, 90, 85, 95, 45])
    eu = np.array([78, 80, 72, 70, 40])

    x = np.arange(len(categories))
    w = 0.25

    fig, ax = plt.subplots(figsize=(9.4, 5.0))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    ax.bar(x - w, us_closed, w, color=PRIMARY, label="US closed frontier", edgecolor="none")
    ax.bar(x, china_open, w, color=PRIMARY_SOFT, label="China open-weight", edgecolor="none")
    ax.bar(x + w, eu, w, color=MUTED_BAR, label="EU mid-frontier", edgecolor="none")

    ax.set_xticks(x)
    ax.set_xticklabels(categories, fontsize=9)
    ax.set_ylabel("Relative index (US closed frontier ≈ 100)")
    ax.set_ylim(0, 115)
    ax.set_title("Illustrative capability snapshot by stack (mid-2026 framing)", fontsize=13, pad=12)
    ax.legend(frameon=False, loc="upper right", fontsize=9)
    ax.text(
        0.01,
        0.02,
        "Illustrative index for narrative · replace with live leaderboard cut later",
        transform=ax.transAxes,
        fontsize=7.5,
        color=MUTED,
    )

    save(fig, "figure-3-capability-snapshot.png")


def figure_3_vc_allocation():
    """Stacked bars: share of AI VC by layer across regions."""
    regions = ["USA", "China", "EU"]
    # Shares sum to 100 within region (illustrative allocation thesis).
    # Point: EU can have healthy total AI VC while underfunding frontier models.
    models = np.array([38, 32, 10])
    infra = np.array([34, 28, 16])
    apps = np.array([28, 40, 74])

    fig, ax = plt.subplots(figsize=(8.6, 5.0))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    x = np.arange(len(regions))
    b0 = ax.bar(x, models, color=PRIMARY, label="Frontier / foundation models", edgecolor="none", width=0.55)
    b1 = ax.bar(x, infra, bottom=models, color=PRIMARY_SOFT, label="Infra / compute / energy", edgecolor="none", width=0.55)
    b2 = ax.bar(
        x,
        apps,
        bottom=models + infra,
        color=MUTED_BAR,
        label="Vertical AI / VLMs / apps",
        edgecolor="none",
        width=0.55,
    )

    for i, (m, inf, a) in enumerate(zip(models, infra, apps)):
        ax.text(i, m / 2, f"{m}%", ha="center", va="center", fontsize=8.5, color=CANVAS, fontweight="bold")
        ax.text(i, m + inf / 2, f"{inf}%", ha="center", va="center", fontsize=8.5, color=CANVAS, fontweight="bold")
        ax.text(i, m + inf + a / 2, f"{a}%", ha="center", va="center", fontsize=8.5, color=INK, fontweight="bold")

    ax.set_xticks(x)
    ax.set_xticklabels(regions)
    ax.set_ylabel("Share of AI venture allocation (%)")
    ax.set_ylim(0, 110)
    ax.set_title("Illustrative VC mix: total funding ≠ frontier funding", fontsize=13, pad=12)
    ax.legend(frameon=False, loc="upper center", ncol=3, fontsize=8.5, bbox_to_anchor=(0.5, -0.08))
    ax.text(
        0.01,
        0.02,
        "Illustrative mix of AI VC by layer · EU can look fine on totals and still miss frontier",
        transform=ax.transAxes,
        fontsize=7.5,
        color=MUTED,
    )

    save(fig, "figure-4-vc-allocation.png")


def figure_4_breakthroughs_by_region():
    """Major AI breakthroughs 2017–2026: count and weighted impact by region."""
    # Hand-curated illustrative set for the paper thesis (not an exhaustive census).
    # weight 1–5 = estimated "majorness" for the frontier race narrative.
    breakthroughs = [
        # USA
        ("Transformers (Google)", "USA", 5),
        ("GPT-3 scale (OpenAI)", "USA", 4),
        ("ChatGPT distribution (OpenAI)", "USA", 5),
        ("GPT-4 / multimodal wave (OpenAI)", "USA", 4),
        ("Reasoning models o1-class (OpenAI)", "USA", 4),
        ("Claude frontier + Fable-class (Anthropic)", "USA", 4),
        ("Gemini stack push (Google)", "USA", 3),
        ("Grok frontier entries (SpaceXAI)", "USA", 3),
        # China
        ("DeepSeek moment / R1-class", "China", 5),
        ("Qwen open-weight wave", "China", 3),
        ("Kimi frontier catch-up (K3-class)", "China", 4),
        ("Aggressive open release cadence", "China", 3),
        # Europe (incl. UK DeepMind as European research origin)
        ("AlphaGo (DeepMind / UK)", "Europe", 4),
        ("AlphaFold (DeepMind / UK)", "Europe", 4),
        ("Mistral open-weight European lab", "Europe", 2),
    ]

    regions = ["USA", "China", "Europe"]
    counts = []
    weights = []
    for region in regions:
        items = [b for b in breakthroughs if b[1] == region]
        counts.append(len(items))
        weights.append(sum(b[2] for b in items))

    x = np.arange(len(regions))
    w = 0.36

    fig, ax = plt.subplots(figsize=(9.4, 5.8))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    bars_c = ax.bar(
        x - w / 2,
        counts,
        w,
        color=PRIMARY,
        label="Number of major breakthroughs",
        edgecolor="none",
    )
    bars_w = ax.bar(
        x + w / 2,
        weights,
        w,
        color=PRIMARY_SOFT,
        label="Weighted impact points (1–5 each)",
        edgecolor="none",
    )

    for bar in bars_c:
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 0.15,
            f"{int(bar.get_height())}",
            ha="center",
            va="bottom",
            fontsize=9,
            color=INK,
            fontweight="bold",
        )
    for bar in bars_w:
        ax.text(
            bar.get_x() + bar.get_width() / 2,
            bar.get_height() + 0.15,
            f"{int(bar.get_height())}",
            ha="center",
            va="bottom",
            fontsize=9,
            color=INK,
            fontweight="bold",
        )

    # Example labels under each region
    examples = {
        "USA": "e.g. Transformers, ChatGPT,\nGPT-4, o1, Claude/Fable",
        "China": "e.g. DeepSeek R1-class,\nQwen, Kimi K3-class",
        "Europe": "e.g. AlphaGo, AlphaFold,\nMistral (DeepMind/UK + EU)",
    }
    for i, region in enumerate(regions):
        ax.text(
            i,
            -0.18,
            examples[region],
            transform=ax.get_xaxis_transform(),
            ha="center",
            va="top",
            fontsize=7.5,
            color=MUTED,
            linespacing=1.25,
        )

    ax.set_xticks(x)
    ax.set_xticklabels(regions)
    ax.set_ylabel("Count / weighted points")
    ax.set_ylim(0, max(weights) + 6)
    ax.set_title(
        "Who drove the major AI breakthroughs (2017–2026 framing)",
        fontsize=13,
        pad=12,
    )
    ax.legend(frameon=False, loc="upper right", fontsize=9)
    ax.text(
        0.01,
        0.02,
        "Curated list for argument · quantity + estimated majorness · Europe includes DeepMind/UK origins",
        transform=ax.transAxes,
        fontsize=7.5,
        color=MUTED,
    )
    fig.subplots_adjust(bottom=0.22)

    save(fig, "figure-5-breakthroughs-by-region.png")


def figure_4_gov_ai_integration():
    """Estimated government AI depth by sector: CN / SG / US / EU."""
    sectors = [
        "Taxes",
        "Digital ID",
        "Justice",
        "Healthcare",
        "Urban admin",
        "Internal\nsecurity",
    ]
    # Estimated 0–100 scores (synthesized comparative estimates, not a single official index)
    cn = np.array([98, 99, 95, 90, 92, 100])
    sg = np.array([92, 99, 88, 94, 98, 90])
    us = np.array([82, 45, 75, 72, 70, 85])
    eu = np.array([85, 78, 60, 65, 75, 65])

    x = np.arange(len(sectors))
    w = 0.2

    fig, ax = plt.subplots(figsize=(10.2, 5.2))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    ax.bar(x - 1.5 * w, cn, w, color=PRIMARY, label="China", edgecolor="none")
    ax.bar(x - 0.5 * w, sg, w, color=PRIMARY_SOFT, label="Singapore", edgecolor="none")
    ax.bar(x + 0.5 * w, us, w, color=MUTED_BAR, label="USA", edgecolor="none")
    ax.bar(x + 1.5 * w, eu, w, color=HAIRLINE, label="EU avg.", edgecolor="none")

    ax.set_xticks(x)
    ax.set_xticklabels(sectors, fontsize=9)
    ax.set_ylabel("Estimated government AI depth (0–100)")
    ax.set_ylim(0, 115)
    ax.set_title(
        "Who runs AI inside the state: estimated depth by sector",
        fontsize=13,
        pad=12,
    )
    ax.legend(frameon=False, loc="upper right", ncol=2, fontsize=8.5)

    ax.text(
        0.01,
        0.02,
        "Estimated totals: CN 96 · SG 94 · US 72 · EU 71  |  comparative estimates, not an official index",
        transform=ax.transAxes,
        fontsize=7.5,
        color=MUTED,
    )

    save(fig, "figure-7-gov-ai-integration.png")


def figure_5_sovereignty_radar():
    """Simple grouped scorecard instead of radar (clearer in print)."""
    dims = ["Frontier\nmodels", "Compute\n& energy", "VC\ndensity", "Talent\npull", "Regulation\nclarity"]
    us = np.array([95, 95, 95, 92, 70])
    cn = np.array([88, 55, 75, 85, 55])
    eu = np.array([55, 45, 50, 65, 90])

    x = np.arange(len(dims))
    w = 0.25
    fig, ax = plt.subplots(figsize=(9.4, 5.0))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    ax.bar(x - w, us, w, color=PRIMARY, label="USA", edgecolor="none")
    ax.bar(x, cn, w, color=PRIMARY_SOFT, label="China", edgecolor="none")
    ax.bar(x + w, eu, w, color=MUTED_BAR, label="EU", edgecolor="none")

    ax.set_xticks(x)
    ax.set_xticklabels(dims, fontsize=9)
    ax.set_ylabel("Illustrative score (0–100)")
    ax.set_ylim(0, 110)
    ax.set_title("Where power sits: illustrative sovereignty scorecard", fontsize=13, pad=12)
    ax.legend(frameon=False, loc="upper right", fontsize=9)
    ax.text(
        0.01,
        0.02,
        "Illustrative scorecard for thesis · not a composite index with weights disclosed by a vendor",
        transform=ax.transAxes,
        fontsize=7.5,
        color=MUTED,
    )

    save(fig, "figure-6-sovereignty-scorecard.png")


def figure_6_model_benchmarks():
    """Named models by region on Artificial Analysis Intelligence Index."""
    # Snapshot values from Artificial Analysis Intelligence Index (July 2026 public leaderboard).
    rows = [
        ("Claude Fable 5", "USA", 60),
        ("GPT-5.6 Sol (max)", "USA", 59),
        ("Kimi K3", "China", 57),
        ("Grok 4.5 (high)", "USA", 54),
        ("DeepSeek V4 Pro (max)", "China", 44),
        ("Mistral Medium 3.5", "EU", 30),
        ("Mistral Large 3", "EU", 16),
    ]
    rows = sorted(rows, key=lambda r: r[2])
    labels = [r[0] for r in rows]
    regions = [r[1] for r in rows]
    scores = [r[2] for r in rows]
    color_map = {"USA": PRIMARY, "China": PRIMARY_SOFT, "EU": MUTED_BAR}
    colors = [color_map[r] for r in regions]

    fig, ax = plt.subplots(figsize=(9.4, 5.4))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="x")

    y = np.arange(len(labels))
    ax.barh(y, scores, color=colors, height=0.62, edgecolor="none")
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=9, color=BODY)
    ax.set_xlabel("Artificial Analysis Intelligence Index")
    ax.set_xlim(0, 70)
    ax.set_title("Frontier models by region: Intelligence Index snapshot", fontsize=13, pad=12)

    for yi, score in zip(y, scores):
        ax.text(score + 0.8, yi, str(score), va="center", fontsize=9, color=INK, fontweight="bold")

    # Legend proxies
    for region, color in color_map.items():
        ax.scatter([], [], color=color, s=80, label=region)
    ax.legend(frameon=False, loc="lower right", fontsize=9)

    ax.text(
        0.01,
        0.02,
        "Source: Artificial Analysis Intelligence Index · public leaderboard snapshot July 2026",
        transform=ax.transAxes,
        fontsize=7.5,
        color=MUTED,
    )

    save(fig, "figure-1-model-benchmarks.png")


if __name__ == "__main__":
    figure_6_model_benchmarks()
    figure_1_lag_compression()
    figure_2_capability_snapshot()
    figure_3_vc_allocation()
    figure_4_breakthroughs_by_region()
    figure_5_sovereignty_radar()
    figure_4_gov_ai_integration()
