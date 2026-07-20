"""
Generate distinct figures for the luxury hotel economics paper.

Data are illustrative but calibrated to publicly cited industry ranges
(HVS development cost surveys; STR/CoStar luxury ADR ~$394 YTD Sep 2025;
US all-scale occupancy ~62 to 63%; typical brand fee stacks 10 to 15% of revenue).
"""

from pathlib import Path

import matplotlib.pyplot as plt
import matplotlib.patches as mpatches
import numpy as np
from matplotlib.colors import LinearSegmentedColormap

# Paper & Burgundy palette (matches site globals.css)
CANVAS = "#faf9f5"
INK = "#161514"
BODY = "#3a3936"
MUTED = "#6f6d68"
HAIRLINE = "#e2e0db"
PRIMARY = "#7a2e2e"
PRIMARY_SOFT = "#a85a5a"
SUCCESS = "#4f8a5b"
ERROR = "#a83b3b"
SURFACE = "#f2f1ee"

OUT_DIR = (
    Path(__file__).resolve().parents[1]
    / "public"
    / "papers"
    / "economics-of-luxury-hotels"
)

# --- Calibrated illustrative inputs -----------------------------------------

# HVS-style median development cost per key (USD), rounded for readability.
# Luxury uses a mid-point of recent survey medians (~$1.06M to $1.6M+) and notes
# that many gateway projects exceed $2M/key.
COST_PER_KEY = {
    "Budget hotel\n(rooms mainly)": 170_000,
    "Mid-range hotel\n(a few extras)": 223_000,
    "Upscale hotel\n(restaurant, meetings)": 440_000,
    "Luxury hotel\n(typical)": 1_300_000,
    "Luxury hotel\n(prime city)": 2_000_000,
}

# 1:1000 rule: required ADR ≈ cost_per_key / 1000 at ~65% occupancy.
LUXURY_MARKET_ADR = 394  # US luxury ADR (STR/CoStar, YTD Sep 2025 ballpark)
REQUIRED_ADR_1M = 1000
REQUIRED_ADR_2M = 2000

# Illustrative 200-key P&L at 65% occupancy (USD millions)
GROSS_REVENUE = 27.5
BRAND_FEES = 3.3  # ~12% of gross
PAYROLL = 9.6  # ~35% of gross
OTHER_OPEX = 8.4  # energy, maintenance, etc. (high fixed share)
DEBT_SERVICE = 9.8

# Staffing intensity (employees per room); article ranges
STAFFING = {
    "Budget /\neconomy": 0.5,
    "Upscale\nfull-service": 1.1,
    "Luxury\n(typical)": 2.0,
    "Ultra-luxury\nresort": 2.8,
}

# Owner cash sensitivity grid
OCC_GRID = np.linspace(0.45, 0.85, 17)
ADR_GRID = np.linspace(280, 520, 17)

# Monthly revenue mix (USD millions); rooms volatile, group/events steadier
MONTHS = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
ROOMS = np.array([1.55, 1.48, 1.72, 1.85, 2.05, 2.25, 2.35, 2.28, 2.10, 1.95, 1.70, 1.60])
GROUP = np.array([0.72, 0.80, 0.95, 1.05, 1.10, 0.85, 0.70, 0.75, 1.15, 1.20, 1.05, 0.90])
ANCILLARY = np.array([0.38, 0.36, 0.42, 0.48, 0.55, 0.62, 0.68, 0.65, 0.52, 0.48, 0.42, 0.40])


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
    elif grid == "both":
        ax.grid(color=HAIRLINE, linewidth=0.7)
    ax.set_axisbelow(True)


def save(fig, name: str):
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    path = OUT_DIR / name
    fig.savefig(path, dpi=180, bbox_inches="tight", facecolor=CANVAS, pad_inches=0.25)
    plt.close(fig)
    print(f"Wrote {path}")


def figure_1_cost_per_key():
    """Horizontal bars: development cost per key by chain scale."""
    labels = list(COST_PER_KEY.keys())
    values = np.array(list(COST_PER_KEY.values())) / 1_000_000
    colors = [MUTED, MUTED, MUTED, PRIMARY, ERROR]

    fig, ax = plt.subplots(figsize=(9, 5.2))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="x")

    y = np.arange(len(labels))
    bars = ax.barh(y, values, color=colors, height=0.62, edgecolor="none")
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=10, color=BODY)
    ax.set_xlabel("All-in development cost (USD millions per key)")
    ax.set_title("What it costs to build one room, by hotel type", fontsize=13, pad=12)
    ax.set_xlim(0, 2.35)

    for bar, val in zip(bars, values):
        ax.text(
            val + 0.04,
            bar.get_y() + bar.get_height() / 2,
            f"${val:.2f}M",
            va="center",
            ha="left",
            fontsize=9,
            color=INK,
            fontweight="bold",
        )

    ax.annotate(
        "Many prime-city luxury projects now clear $2M/key\n"
        "(HVS surveys; illustrative medians)",
        xy=(2.0, 4),
        xytext=(1.15, 3.15),
        fontsize=8.5,
        color=MUTED,
        arrowprops=dict(arrowstyle="->", color=MUTED, lw=1),
    )

    save(fig, "figure-1-cost-per-key.png")


def figure_2_adr_gap():
    """Dumbbell: what ADR is (market) vs what it should be (1:1000 rule)."""
    categories = [
        "Built for\n$1.0M / key",
        "Built for\n$1.3M / key",
        "Built for\n$2.0M / key",
    ]
    required = np.array([1000, 1300, 2000])
    market = np.full(3, LUXURY_MARKET_ADR)

    fig, ax = plt.subplots(figsize=(9.2, 5.2))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="x")

    y = np.arange(len(categories))
    for yi, req, mkt in zip(y, required, market):
        ax.plot([mkt, req], [yi, yi], color=HAIRLINE, linewidth=3.5, zorder=1)
        ax.scatter([mkt], [yi], s=110, color=SUCCESS, zorder=3, edgecolors=CANVAS, linewidths=1.5)
        ax.scatter([req], [yi], s=110, color=ERROR, zorder=3, edgecolors=CANVAS, linewidths=1.5)

        # Explicit dollar labels on each point
        ax.text(
            mkt,
            yi - 0.22,
            f"${mkt}",
            ha="center",
            va="top",
            fontsize=8.5,
            color=SUCCESS,
            fontweight="bold",
        )
        ax.text(
            req,
            yi - 0.22,
            f"${req:,}",
            ha="center",
            va="top",
            fontsize=8.5,
            color=ERROR,
            fontweight="bold",
        )

        shortfall = req - mkt
        ax.text(
            (mkt + req) / 2,
            yi + 0.2,
            f"shortfall ${shortfall:,.0f}/night",
            ha="center",
            va="bottom",
            fontsize=8.5,
            color=MUTED,
        )

    ax.scatter(
        [],
        [],
        s=110,
        color=SUCCESS,
        label="What it is: US luxury market ADR",
    )
    ax.scatter(
        [],
        [],
        s=110,
        color=ERROR,
        label="What it should be: 1:1000 rule (to cover build cost)",
    )

    ax.set_yticks(y)
    ax.set_yticklabels(categories, fontsize=10, color=BODY)
    ax.set_xlabel("Average daily rate (USD)")
    ax.set_xlim(0, 2400)
    ax.set_ylim(-0.55, len(categories) - 0.35)
    ax.set_title(
        "What ADR is vs. what it should be under the build-cost rule",
        fontsize=13,
        pad=12,
    )
    ax.legend(frameon=False, loc="lower right", fontsize=9)

    save(fig, "figure-2-adr-gap.png")


def figure_3_fee_waterfall():
    """Waterfall: brand fees and rigid costs before owner cash."""
    steps = [
        ("Gross\nrevenue", GROSS_REVENUE, "total"),
        ("Brand fees\n(~12%)", -BRAND_FEES, "neg"),
        ("Payroll\n(~35%)", -PAYROLL, "neg"),
        ("Other opex\n(energy, etc.)", -OTHER_OPEX, "neg"),
        ("NOI\n(net operating\nincome)", None, "subtotal"),
        ("Debt service", -DEBT_SERVICE, "neg"),
        ("Cash to\nowner", None, "total"),
    ]

    # Build running totals
    values = []
    bases = []
    colors = []
    labels = []
    running = 0.0
    noi = GROSS_REVENUE - BRAND_FEES - PAYROLL - OTHER_OPEX
    cash = noi - DEBT_SERVICE

    for label, delta, kind in steps:
        labels.append(label)
        if kind == "total" and delta is not None:
            bases.append(0)
            values.append(delta)
            colors.append(PRIMARY)
            running = delta
        elif kind == "neg":
            bases.append(running + delta)
            values.append(-delta)
            colors.append(ERROR if "Brand" in label or "Debt" in label else MUTED)
            running += delta
        elif kind == "subtotal":
            bases.append(0)
            values.append(noi)
            colors.append(PRIMARY_SOFT)
            running = noi
        elif kind == "total" and delta is None:
            bases.append(min(0, cash))
            values.append(abs(cash))
            colors.append(ERROR if cash < 0 else SUCCESS)

    fig, ax = plt.subplots(figsize=(10, 5.4))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    x = np.arange(len(labels))
    ax.bar(x, values, bottom=bases, color=colors, width=0.62, edgecolor="none")

    # Connector lines between steps
    for i in range(len(values) - 1):
        top = bases[i] + values[i]
        ax.plot([i + 0.31, i + 0.69], [top, top], color=HAIRLINE, linewidth=1)

    for i, (b, v) in enumerate(zip(bases, values)):
        if "Cash" in labels[i]:
            signed = cash
        elif labels[i].startswith("NOI"):
            signed = noi
        elif labels[i].startswith("Gross"):
            signed = GROSS_REVENUE
        else:
            signed = -v

        y_text = b + v + 0.35
        if "Cash" in labels[i] and cash < 0:
            y_text = cash - 0.55
        ax.text(
            i,
            y_text,
            f"${signed:+.1f}M" if not labels[i].startswith("Gross") else f"${signed:.1f}M",
            ha="center",
            va="bottom" if not ("Cash" in labels[i] and cash < 0) else "top",
            fontsize=8.5,
            color=INK,
        )

    ax.axhline(0, color=HAIRLINE, linewidth=1.1)
    ax.set_xticks(x)
    ax.set_xticklabels(labels, fontsize=9, color=BODY)
    ax.set_ylabel("USD millions")
    ax.set_title(
        "Who gets paid first: illustrative P&L bridge at 65% occupancy",
        fontsize=13,
        pad=12,
    )
    ax.set_ylim(-6, 30)

    note = ax.text(
        0.99,
        0.02,
        "200-room 5★ model · brand fees skimmed before NOI · owner carries debt",
        transform=ax.transAxes,
        ha="right",
        va="bottom",
        fontsize=8,
        color=MUTED,
    )

    save(fig, "figure-3-fee-waterfall.png")


def figure_4_staffing():
    """Horizontal bars: employees per room; labor rigidity."""
    labels = list(STAFFING.keys())
    values = np.array(list(STAFFING.values()))
    colors = [MUTED, MUTED, PRIMARY, ERROR]

    fig, ax = plt.subplots(figsize=(9, 4.8))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="x")

    y = np.arange(len(labels))
    bars = ax.barh(y, values, color=colors, height=0.58, edgecolor="none")
    ax.set_yticks(y)
    ax.set_yticklabels(labels, fontsize=10, color=BODY)
    ax.set_xlabel("Employees per guest room")
    ax.set_xlim(0, 3.4)
    ax.set_title("Labor intensity: luxury hotels cannot flex payroll with demand", fontsize=13, pad=12)

    for bar, val in zip(bars, values):
        ax.text(
            val + 0.08,
            bar.get_y() + bar.get_height() / 2,
            f"{val:.1f}",
            va="center",
            fontsize=10,
            color=INK,
            fontweight="bold",
        )

    # Callout band for luxury range cited in article (1.5 to 3)
    ax.axvspan(1.5, 3.0, color=PRIMARY, alpha=0.06, zorder=0)
    ax.text(
        2.25,
        -0.75,
        "Article range for luxury: 1.5 to 3.0 employees / room",
        ha="center",
        fontsize=8.5,
        color=MUTED,
    )

    save(fig, "figure-4-staffing.png")


def owner_cash(occ: np.ndarray, adr: np.ndarray) -> np.ndarray:
    """
    Illustrative annual cash to owner (USD millions) for a 200-key hotel.
    Rooms revenue scales with occ × ADR; non-room revenue partially fixed;
    costs are mostly fixed with a small variable component; debt is fixed.
    """
    keys = 200
    days = 365
    room_rev = keys * days * occ * adr / 1_000_000
    # Events/spa ~28% of room revenue at mid occupancy, floored
    other_rev = np.maximum(4.5, room_rev * 0.28)
    gross = room_rev + other_rev
    brand_fees = gross * 0.12
    # High fixed opex + mild variable load
    opex = 14.5 + gross * 0.22
    noi = gross - brand_fees - opex
    return noi - DEBT_SERVICE


def figure_5_cash_heatmap():
    """Heatmap: cash to owner across occupancy × ADR; operating leverage."""
    occ = OCC_GRID
    adr = ADR_GRID
    OO, AA = np.meshgrid(occ, adr)
    cash = owner_cash(OO, AA)

    fig, ax = plt.subplots(figsize=(9.2, 5.6))
    fig.patch.set_facecolor(CANVAS)

    cmap = LinearSegmentedColormap.from_list(
        "jt",
        ["#5c2020", "#a83b3b", "#e8d5d5", CANVAS, "#c5d9c8", "#4f8a5b"],
    )
    # Diverging around zero
    vmax = max(abs(cash.min()), abs(cash.max()), 8)
    im = ax.imshow(
        cash,
        origin="lower",
        aspect="auto",
        cmap=cmap,
        vmin=-vmax,
        vmax=vmax,
        extent=[occ.min() * 100, occ.max() * 100, adr.min(), adr.max()],
        interpolation="bilinear",
    )

    # Zero contour = owner break-even frontier
    cs = ax.contour(
        occ * 100,
        adr,
        cash,
        levels=[0],
        colors=[INK],
        linewidths=1.6,
    )
    ax.clabel(cs, fmt={0: "owner break-even"}, inline=True, fontsize=8)

    # Market ADR reference
    ax.axhline(LUXURY_MARKET_ADR, color=MUTED, linestyle="--", linewidth=1.2, alpha=0.9)
    ax.text(
        84.5,
        LUXURY_MARKET_ADR + 8,
        f"US luxury ADR ~${LUXURY_MARKET_ADR}",
        fontsize=8,
        color=MUTED,
        ha="right",
    )

    ax.set_xlabel("Occupancy (%)")
    ax.set_ylabel("ADR (USD)")
    ax.set_title("Cash to owner: sensitivity to occupancy and rate", fontsize=13, pad=12)
    ax.tick_params(colors=MUTED, labelsize=9)
    for spine in ax.spines.values():
        spine.set_color(HAIRLINE)

    cbar = fig.colorbar(im, ax=ax, fraction=0.046, pad=0.04)
    cbar.set_label("Cash to owner (USD millions)", color=BODY)
    cbar.ax.yaxis.set_tick_params(color=MUTED)
    plt.setp(cbar.ax.yaxis.get_ticklabels(), color=MUTED)

    save(fig, "figure-5-cash-heatmap.png")


def figure_6_revenue_mix():
    """Stacked area: monthly rooms vs group/events vs ancillary."""
    fig, ax = plt.subplots(figsize=(9.5, 5.2))
    fig.patch.set_facecolor(CANVAS)
    style_axes(ax, grid="y")

    x = np.arange(len(MONTHS))
    ax.stackplot(
        x,
        ROOMS,
        GROUP,
        ANCILLARY,
        labels=["Transient rooms", "Group / events / weddings", "Spa & other"],
        colors=[PRIMARY, PRIMARY_SOFT, "#c4b8a8"],
        alpha=0.92,
        linewidth=0,
    )

    # Total line
    total = ROOMS + GROUP + ANCILLARY
    ax.plot(x, total, color=INK, linewidth=1.4, linestyle="--", label="Total revenue")

    # Highlight shoulder months where group props up rooms soft patch
    ax.axvspan(0.5, 2.5, color=SUCCESS, alpha=0.07, zorder=0)
    ax.axvspan(8.5, 10.5, color=SUCCESS, alpha=0.07, zorder=0)
    ax.text(
        1.5,
        4.55,
        "Group demand\nprops soft room months",
        ha="center",
        va="top",
        fontsize=8,
        color=SUCCESS,
    )

    ax.set_xticks(x)
    ax.set_xticklabels(MONTHS, color=BODY)
    ax.set_ylabel("USD millions / month")
    ax.set_ylim(0, 5.0)
    ax.set_title("Revenue mix over a year: events as a volatility buffer", fontsize=13, pad=12)
    ax.legend(frameon=False, loc="upper left", fontsize=9, ncol=2)

    save(fig, "figure-6-revenue-mix.png")


if __name__ == "__main__":
    figure_1_cost_per_key()
    figure_2_adr_gap()
    figure_3_fee_waterfall()
    figure_4_staffing()
    figure_5_cash_heatmap()
    figure_6_revenue_mix()
