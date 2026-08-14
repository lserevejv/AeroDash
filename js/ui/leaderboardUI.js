/**
 * ui/leaderboardUI.js — the leaderboard and the milestone log.
 *
 * The leaderboard is the only screen in the game that can fail, because it is
 * the only one that needs a server. It therefore has an explicit, calm offline
 * state rather than an empty list or a spinner: with no backend running,
 * everything else in AERODRIFT works identically, and the screen says so.
 */

import { formatScore, formatDistance } from './../utils.js';
import { list as achievementList, progress as achievementProgress } from './../achievements.js';
import { dailyKey } from './../prng.js';

export function createLeaderboardUI({ el, save, api }) {
  let board = 'global';

  /* ======================================================================
     Leaderboard
     ====================================================================== */

  function setState(text, cls = '') {
    el.netState.textContent = text;
    el.netState.className = `net-state${cls ? ` ${cls}` : ''}`;
  }

  async function refresh() {
    if (!api.base) {
      setState('No server configured — playing entirely offline.', 'is-offline');
      el.boardList.innerHTML = '';
      renderEmpty('Leaderboards need the optional backend. See server/README.md.');
      return;
    }

    setState('Contacting the server…');
    const entries = await api.leaderboard(board, board === 'daily' ? dailyKey() : '', 25);

    if (!entries) {
      setState(`Offline — no server at ${api.base}. All progress is saved locally.`, 'is-offline');
      el.boardList.innerHTML = '';
      renderEmpty('Start it with: node server/server.js');
      return;
    }

    setState(
      board === 'daily' ? `Daily challenge — ${dailyKey()}` : 'Global — all seeds',
      'is-online',
    );
    render(entries);
  }

  function render(entries) {
    el.boardList.innerHTML = '';
    if (!entries.length) {
      renderEmpty(board === 'daily' ? 'Nobody has flown today yet. Be first.' : 'No runs submitted yet.');
      return;
    }
    entries.forEach((entry, i) => {
      const li = document.createElement('li');
      li.className = `board-row${entry.playerId === save.playerId ? ' is-me' : ''}`;

      li.append(
        span('board-rank', `${i + 1}`),
        span('board-name', entry.name || 'Anonymous Drifter'),
        span('board-score', formatScore(entry.score)),
        span('board-dist', formatDistance(entry.distance)),
      );
      el.boardList.appendChild(li);
    });
  }

  function renderEmpty(text) {
    const li = document.createElement('li');
    li.className = 'board-row';
    li.style.gridTemplateColumns = '1fr';
    li.textContent = text;
    el.boardList.appendChild(li);
  }

  el.boardTabs?.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    board = btn.dataset.board;
    for (const b of el.boardTabs.querySelectorAll('.seg-btn')) {
      b.classList.toggle('is-on', b.dataset.board === board);
    }
    refresh();
  });

  /* ======================================================================
     Milestone log
     ====================================================================== */

  function renderAchievements() {
    const p = achievementProgress(save);
    el.achProgress.textContent = `${p.earned} / ${p.total} earned`;

    el.achList.innerHTML = '';
    // Earned first: the log should open on what you have done, not a wall of
    // things you have not.
    const items = achievementList(save).sort((a, b) => (b.earned ? 1 : 0) - (a.earned ? 1 : 0));

    for (const a of items) {
      const row = document.createElement('div');
      row.className = `ach-item${a.earned ? ' is-earned' : ''}`;

      const mark = document.createElement('span');
      mark.className = 'ach-mark';
      mark.textContent = a.earned ? '✓' : '';

      const body = document.createElement('div');
      body.appendChild(span('ach-name', a.name));
      body.appendChild(span('ach-desc', a.desc));

      const reward = document.createElement('span');
      reward.className = 'ach-reward';
      const icon = document.createElement('i');
      icon.className = 'coin-icon icon-droplet';
      reward.append(icon, document.createTextNode(formatScore(a.reward)));

      row.append(mark, body, reward);
      el.achList.appendChild(row);
    }
  }

  return {
    refresh,
    renderAchievements,
    get board() { return board; },
  };
}

function span(cls, text) {
  const s = document.createElement('span');
  s.className = cls;
  s.textContent = text;
  return s;
}
