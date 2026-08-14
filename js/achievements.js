/**
 * achievements.js — the milestone log.
 *
 * An endless game with no fail state needs somewhere to put the sentence "you
 * did a thing". Checkpoints do that inside a run; this does it across a career.
 * Each entry is a predicate over the save file plus the run that just ended, so
 * evaluation is a single pass with no bookkeeping to keep in sync — and adding
 * one is adding a line of data.
 *
 * Every unlock pays Droplets, so the log doubles as a soft catch-up mechanic
 * for a player who has been flying casually and never quite affords the next
 * upgrade tier.
 */

import { levelFromXp } from './economy.js';

/**
 * `check(save, run)` runs after the save has been settled, so `save` already
 * includes this run's records and `run` is the just-finished summary.
 */
export const ACHIEVEMENTS = [
  { id: 'first_flight', name: 'First Light', desc: 'Finish your first run.', reward: 120, check: (s) => s.runs >= 1 },

  { id: 'combo_10', name: 'Chain of Ten', desc: 'Reach a ×10 combo.', reward: 200, check: (s) => s.bestCombo >= 10 },
  { id: 'combo_25', name: 'Perfect Chain', desc: 'Reach the ×25 combo cap.', reward: 900, check: (s) => s.bestCombo >= 25 },

  { id: 'dist_2k', name: 'Out of Sight', desc: 'Fly 2,000 m in one run.', reward: 180, check: (s) => s.bestDistance >= 2000 },
  { id: 'dist_5k', name: 'Long Haul', desc: 'Fly 5,000 m in one run.', reward: 420, check: (s) => s.bestDistance >= 5000 },
  { id: 'dist_12k', name: 'Horizon Chaser', desc: 'Fly 12,000 m in one run.', reward: 1400, check: (s) => s.bestDistance >= 12000 },
  { id: 'dist_25k', name: 'No Fixed Address', desc: 'Fly 25,000 m in one run.', reward: 4000, check: (s) => s.bestDistance >= 25000 },

  { id: 'score_5k', name: 'Getting Somewhere', desc: 'Score 5,000 in a run.', reward: 200, check: (s) => s.bestScore >= 5000 },
  { id: 'score_25k', name: 'Bright Streak', desc: 'Score 25,000 in a run.', reward: 800, check: (s) => s.bestScore >= 25000 },
  { id: 'score_100k', name: 'Six Figures of Light', desc: 'Score 100,000 in a run.', reward: 3200, check: (s) => s.bestScore >= 100000 },

  {
    id: 'clean_1500',
    name: 'Not a Scratch',
    desc: 'Fly 1,500 m in one run without a single contact.',
    reward: 700,
    check: (s) => s.stats.bestNoHitDistance >= 1500,
  },
  {
    id: 'clean_4000',
    name: 'Frictionless',
    desc: 'Fly 4,000 m in one run without a single contact.',
    reward: 2400,
    check: (s) => s.stats.bestNoHitDistance >= 4000,
  },

  /* --- Worlds ---------------------------------------------------------- */
  { id: 'world_verdant', name: 'Into the Green', desc: 'Reach Verdant Circuit.', reward: 320, check: (s) => s.worldsUnlocked.includes('verdant') },
  { id: 'world_aurora', name: 'Under the Curtain', desc: 'Reach Aurora Reach.', reward: 640, check: (s) => s.worldsUnlocked.includes('aurora') },
  { id: 'world_crystal', name: 'Through the Glass', desc: 'Reach Crystal Atrium.', reward: 1100, check: (s) => s.worldsUnlocked.includes('crystal') },
  { id: 'world_realm', name: 'Golden Hour', desc: 'Reach the Solar Bloom realm.', reward: 2600, check: (s) => s.worldsUnlocked.includes('solarbloom') },

  /* --- Volume ---------------------------------------------------------- */
  { id: 'portals_10', name: 'Threshold Habit', desc: 'Pass 10 Portals.', reward: 380, check: (s) => s.stats.portals >= 10 },
  { id: 'checkpoints_150', name: 'Milestone Collector', desc: 'Pass 150 checkpoint gates.', reward: 520, check: (s) => s.stats.checkpoints >= 150 },
  { id: 'rings_500', name: 'Ringmaster', desc: 'Thread 500 ring gates.', reward: 900, check: (s) => s.stats.rings >= 500 },
  { id: 'orbs_5000', name: 'Light Hoarder', desc: 'Collect 5,000 light orbs.', reward: 1500, check: (s) => s.stats.orbs >= 5000 },

  /* --- Meta ------------------------------------------------------------- */
  { id: 'level_10', name: 'Seasoned', desc: 'Reach account Level 10.', reward: 600, check: (s) => levelFromXp(s.xp) >= 10 },
  { id: 'level_25', name: 'Veteran Drifter', desc: 'Reach account Level 25.', reward: 2800, check: (s) => levelFromXp(s.xp) >= 25 },
  { id: 'rebirth_1', name: 'Ascendant', desc: 'Rebirth for the first time.', reward: 800, check: (s) => (s.rebirthCount || 0) >= 1 },
  { id: 'rebirth_5', name: 'Cycle Runner', desc: 'Rebirth five times.', reward: 5000, check: (s) => (s.rebirthCount || 0) >= 5 },

  { id: 'daily_1', name: 'Same Sky', desc: 'Finish a Daily Challenge run.', reward: 300, check: (s) => !!s.daily.played },
  { id: 'photo_1', name: 'Postcard', desc: 'Save a photo from Photo Mode.', reward: 240, check: (s) => s.stats.photos >= 1 },
];

export const ACHIEVEMENT_BY_ID = Object.fromEntries(ACHIEVEMENTS.map((a) => [a.id, a]));

/**
 * Evaluate every achievement and bank the rewards for any that just completed.
 *
 * @returns {Array} the newly earned entries, for the results screen to toast.
 */
export function evaluate(save, run, economy) {
  const earned = [];
  for (const a of ACHIEVEMENTS) {
    if (save.achievements.includes(a.id)) continue;
    let ok = false;
    try {
      ok = !!a.check(save, run);
    } catch (err) {
      // A malformed save must never stop a run from settling.
      ok = false;
    }
    if (!ok) continue;
    save.achievements.push(a.id);
    economy.earnDroplets(save, a.reward);
    earned.push(a);
  }
  return earned;
}

/** Everything, annotated with whether it is earned — for the log screen. */
export function list(save) {
  return ACHIEVEMENTS.map((a) => ({ ...a, earned: save.achievements.includes(a.id) }));
}

export function progress(save) {
  return { earned: save.achievements.length, total: ACHIEVEMENTS.length };
}
