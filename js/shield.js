/**
 * shield.js — the Integrity system that replaced the run timer.
 *
 * WHY IT EXISTS
 * -------------
 * v1 ended every run at a fixed 5,000 m. That has no relationship to how the
 * player flew, so the ending always read as arbitrary — the game simply got
 * bored. But a straight death would throw away the calm, no-punishment feel
 * that made v1 work at all.
 *
 * The Shield threads between the two. Every collision costs a pip; a stretch of
 * clean flying earns one back. The run continues as long as you have integrity
 * to spend, and ends on the collision you take with none left. That ending is
 * *earned* and, crucially, always avoidable: it names a thing the player did.
 * A careful pilot can fly forever, which is what makes "endless" true rather
 * than a marketing word.
 *
 * The forgiveness is deliberate and load-bearing:
 *   - You fly with `max` pips and only die on a hit taken at ZERO, so the
 *     default 3 pips is really four contacts.
 *   - Zero pips is a loud, sustained visual state, never a surprise.
 *   - Regen means a bad patch early doesn't sour the next ten minutes.
 * This is a stakes system, not a punishment system. Anything that makes it
 * feel punishing is a bug in the tuning, not a missing feature.
 */

/** Seconds of clean flying that restores one pip (before upgrades). */
export const BASE_REGEN_SECONDS = 18;
export const BASE_MAX_PIPS = 3;

export function createShield() {
  const state = {
    pips: BASE_MAX_PIPS,
    max: BASE_MAX_PIPS,
    /** Seconds since the last contact — the regen clock. */
    clean: 0,
    regenSeconds: BASE_REGEN_SECONDS,
    /** Counts up while at zero, so the HUD can escalate its warning. */
    exposed: 0,
    hits: 0,
  };

  /**
   * Start a run.
   * @param {{shieldMax:number, shieldRegen:number}} mods from upgrades.js
   */
  function reset(mods = {}) {
    state.max = Math.max(1, Math.round(mods.shieldMax ?? BASE_MAX_PIPS));
    state.regenSeconds = Math.max(4, mods.shieldRegen ?? BASE_REGEN_SECONDS);
    state.pips = state.max;
    state.clean = 0;
    state.exposed = 0;
    state.hits = 0;
  }

  /**
   * Register an obstacle contact.
   *
   * @returns {{fatal:boolean, pips:number, wasExposed:boolean}}
   *   `fatal` is the ONLY way a run can end in AERODRIFT. Nothing else in the
   *   codebase is allowed to end one — no timer, no distance, no score.
   */
  function hit() {
    state.hits++;
    state.clean = 0;

    if (state.pips <= 0) {
      // Contact with nothing left to absorb it. This is the run's ending.
      return { fatal: true, pips: 0, wasExposed: true };
    }

    state.pips--;
    if (state.pips === 0) state.exposed = 0;
    return { fatal: false, pips: state.pips, wasExposed: false };
  }

  /**
   * @returns {boolean} true on the frame a pip is restored, so the caller can
   *   play the regen sting exactly once instead of every frame at full pips.
   */
  function update(dt) {
    if (state.pips === 0) state.exposed += dt;

    if (state.pips >= state.max) {
      // Hold the clock at zero when full: otherwise the first hit after a long
      // clean stretch would instantly refund itself.
      state.clean = 0;
      return false;
    }

    state.clean += dt;
    if (state.clean >= state.regenSeconds) {
      state.clean = 0;
      state.pips++;
      if (state.pips > 0) state.exposed = 0;
      return true;
    }
    return false;
  }

  return {
    state,
    reset,
    hit,
    update,
    /** 0..1 progress toward the next pip, for the HUD's regen sliver. */
    get regenFraction() {
      if (state.pips >= state.max) return 0;
      return Math.min(1, state.clean / state.regenSeconds);
    },
    /** True when the next contact ends the run. Drives the danger styling. */
    get exposed() { return state.pips === 0; },
  };
}
