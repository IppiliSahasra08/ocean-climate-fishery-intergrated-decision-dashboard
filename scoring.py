"""
scoring.py

Contains sustainability scoring logic, risk classification, and recommendation generation.
"""

def sustainability_score(fish_stock: float, sst: float, oxygen: float) -> float:
    """
    Compute a sustainability score based on fish stock, sea surface temperature (sst),
    and oxygen levels using a simple rule-based formula.

    Higher fish_stock and oxygen increase score; higher sst (stressful temperature) decreases score.

    Returns a score between 0 and 100.
    """
    # Normalize inputs (example ranges)
    max_fish_stock = 2000  # hypothetical max sustainable fish stock
    max_oxygen = 10        # max oxygen mg/L
    optimal_sst = 20       # optimal SST in Celsius
    sst_tolerance = 10    # range around optimal SST considered acceptable

    # Fish stock contribution (0 to 50)
    fish_score = min(fish_stock / max_fish_stock, 1.0) * 50

    # Oxygen contribution (0 to 30)
    oxygen_score = min(oxygen / max_oxygen, 1.0) * 30

    # SST contribution (0 to 20), penalize deviation from optimal SST
    sst_diff = abs(sst - optimal_sst)
    if sst_diff > sst_tolerance:
        sst_score = 0
    else:
        sst_score = (1 - sst_diff / sst_tolerance) * 20

    total_score = fish_score + oxygen_score + sst_score
    return round(total_score, 2)


def risk_level(score: float) -> str:
    """
    Classify risk level based on sustainability score.
    """
    if score >= 70:
        return "Low"
    elif score >= 40:
        return "Moderate"
    else:
        return "High"


def recommendation(score: float, catch: float, fish_stock: float = None, sst: float = None) -> str:

    if score >= 75:
        return "Maintain current fishing levels; ecosystem indicators show healthy resilience."

    if 60 <= score < 75:
        return "Introduce minor catch reductions (5–10%) and continue ecosystem monitoring."

    if 45 <= score < 60:
        return "Implement moderate catch reductions (10–25%) and increase stock recovery monitoring."

    if 30 <= score < 45:
        return "High ecosystem stress detected. Reduce catch by 25–40% and strengthen conservation controls."

    return "Critical sustainability risk. Immediate large-scale catch reduction (>40%) and restoration measures recommended."

