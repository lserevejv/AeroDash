/**
 * ui/shopUI.js — the Shop, Upgrades and Rebirth screens.
 *
 * All three are card grids over the same glass/gel language as the rest of the
 * game: no dark dashboard, no dense table. A card states what the thing is,
 * what it does, and what it costs, and its state (owned / equipped / locked /
 * unaffordable) is legible without reading the text.
 *
 * Locked items are always rendered. A catalog that hides what you cannot afford
 * removes the reason to earn, which is the whole point of an economy.
 */

import { formatScore, formatDistance } from './../utils.js';
import * as economy from './../economy.js';
import * as shop from './../shop.js';
import { UPGRADES, upgradeLevel, upgradeCost, upgradeUnlocked, buyUpgrade, UPGRADE_BY_ID } from './../upgrades.js';
import { rebirthPreview } from './../rebirth.js';
import { TRAILS, SKINS } from './../shop.js';

export function createShopUI({ el, save, audio, onChange, onEquip }) {
  let tab = 'trail';

  /* ======================================================================
     Cosmetics
     ====================================================================== */

  /**
   * A swatch that actually previews the item. Trails show their own gradient;
   * skins borrow the equipped trail's colours so the preview reflects what the
   * player will really see; auras show their aura colour.
   */
  function swatchStyle(item) {
    if (item.type === 'trail') {
      return `radial-gradient(circle at 34% 28%, #FFFFFF 0%, ${item.core} 26%, ${item.glow} 62%, ${item.trail} 100%)`;
    }
    if (item.type === 'skin') {
      const t = shop.equipped(save, 'trail');
      // Faceted skins get a hard-edged conic preview, smooth ones a soft radial.
      return item.core === 'facet'
        ? `conic-gradient(from 20deg, ${t.glow}, #FFFFFF 25%, ${t.trail} 50%, ${t.glow} 75%, #FFFFFF 100%)`
        : `radial-gradient(circle at 36% 26%, #FFFFFF 0%, ${t.core} ${Math.round(item.coreScale * 24)}%, ${t.glow} 66%, ${t.shell} 100%)`;
    }
    if (item.mode === 'none') return 'radial-gradient(circle at 40% 30%, #FFFFFF, #CFE0E8)';
    if (item.mode === 'prism') return 'conic-gradient(#FFD9E8, #FFE9B8, #DCF6C8, #BFF0F5, #CFD8FA, #E8CFF6, #FFD9E8)';
    return `radial-gradient(circle at 50% 50%, transparent 38%, ${item.color} 52%, transparent 74%), radial-gradient(circle at 40% 30%, #FFFFFF, #CFE0E8)`;
  }

  function priceNode(cost, affordable) {
    const wrap = document.createElement('span');
    wrap.className = `price${affordable ? '' : ' is-poor'}`;
    if (!cost) { wrap.textContent = 'Free'; return wrap; }
    const icon = document.createElement('i');
    icon.className = `coin-icon ${cost.prisms ? 'icon-prism' : 'icon-droplet'}`;
    wrap.appendChild(icon);
    const n = document.createElement('span');
    n.textContent = formatScore(cost.prisms || cost.droplets);
    wrap.appendChild(n);
    return wrap;
  }

  function renderCosmetics() {
    const grid = el.shopGrid;
    grid.innerHTML = '';

    for (const item of shop.listType(save, tab)) {
      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'card';
      if (item.equipped) card.classList.add('is-equipped');
      if (item.locked) card.classList.add('is-locked');

      const head = document.createElement('div');
      head.className = 'card-head';
      const sw = document.createElement('span');
      sw.className = 'card-swatch';
      sw.style.background = swatchStyle(item);
      const name = document.createElement('span');
      name.className = 'card-name';
      name.textContent = item.name;
      head.append(sw, name);

      const foot = document.createElement('div');
      foot.className = 'card-foot';

      if (item.locked) {
        foot.appendChild(tag('tag-locked', item.locked));
      } else if (item.equipped) {
        foot.appendChild(tag('tag-equipped', 'Equipped'));
      } else if (item.owned) {
        foot.appendChild(tag('tag-owned', 'Tap to equip'));
      } else {
        foot.appendChild(priceNode(item.cost, economy.canAfford(save, item.cost)));
      }

      card.append(head, foot);

      card.addEventListener('click', () => {
        if (item.locked) { audio?.bump(); return; }
        if (item.owned) {
          if (item.equipped) return;
          shop.equip(save, item.id);
          audio?.ring();
          onEquip?.(item.type);
        } else {
          if (!economy.canAfford(save, item.cost)) { audio?.bump(); return; }
          if (!shop.buyCosmetic(save, item.id, economy)) { audio?.bump(); return; }
          shop.equip(save, item.id);
          audio?.chime();
          onEquip?.(item.type);
        }
        onChange?.();
        renderCosmetics();
      });

      grid.appendChild(card);
    }
  }

  function setTab(next) {
    tab = next;
    for (const b of el.shopTabs.querySelectorAll('.seg-btn')) {
      b.classList.toggle('is-on', b.dataset.tab === tab);
    }
    renderCosmetics();
  }

  el.shopTabs?.addEventListener('click', (e) => {
    const btn = e.target.closest('.seg-btn');
    if (!btn) return;
    audio?.click();
    setTab(btn.dataset.tab);
  });

  /* ======================================================================
     Upgrades
     ====================================================================== */

  function renderUpgrades() {
    const grid = el.upgradeGrid;
    grid.innerHTML = '';

    for (const def of UPGRADES) {
      const lv = upgradeLevel(save, def.id);
      const cost = upgradeCost(save, def.id);
      const unlocked = upgradeUnlocked(save, def.id);
      const maxed = lv >= def.maxLevel;

      const card = document.createElement('button');
      card.type = 'button';
      card.className = 'card';
      if (!unlocked) card.classList.add('is-locked');
      if (maxed) card.classList.add('is-maxed');

      const head = document.createElement('div');
      head.className = 'card-head';
      const name = document.createElement('span');
      name.className = 'card-name';
      name.textContent = def.name;
      head.appendChild(name);

      const blurb = document.createElement('div');
      blurb.className = 'card-blurb';
      blurb.textContent = def.blurb;

      // Show what this level *does*, and what the next one would do. A bare
      // level count tells the player nothing about whether to buy.
      const detail = document.createElement('div');
      detail.className = 'card-detail';
      detail.textContent = maxed
        ? `Maxed — ${def.detail(lv)}`
        : `${def.detail(lv)} → ${def.detail(lv + 1)}`;

      const pips = document.createElement('div');
      pips.className = 'lv-row';
      for (let i = 0; i < def.maxLevel; i++) {
        const pip = document.createElement('span');
        pip.className = `lv-pip${i < lv ? ' is-on' : ''}`;
        pips.appendChild(pip);
      }

      const foot = document.createElement('div');
      foot.className = 'card-foot';
      foot.appendChild(pips);
      if (!unlocked) foot.appendChild(tag('tag-locked', `Level ${def.reqLevel}`));
      else if (maxed) foot.appendChild(tag('tag-owned', 'Max'));
      else foot.appendChild(priceNode(cost, economy.canAfford(save, cost)));

      card.append(head, blurb, detail, foot);

      card.addEventListener('click', () => {
        if (!unlocked || maxed) { audio?.bump(); return; }
        if (!buyUpgrade(save, def.id, economy)) { audio?.bump(); return; }
        audio?.chime();
        onChange?.();
        renderUpgrades();
      });

      grid.appendChild(card);
    }
  }

  /* ======================================================================
     Rebirth
     ====================================================================== */

  function renderRebirth() {
    const p = rebirthPreview(save);

    el.rebProgress.style.width = `${Math.round(p.progress * 100)}%`;
    el.rebProgressLabel.textContent =
      `${formatDistance(save.cycleDistance)} / ${formatDistance(p.requirement)} this cycle`;

    fillList(el.rebKeeps, p.keeps);
    fillList(el.rebResets, p.resets);

    el.rebPrisms.textContent = p.eligible ? `+${p.prisms}` : '—';
    el.rebMult.textContent = `×${p.multiplierNow.toFixed(2)} → ×${p.multiplierNext.toFixed(2)} score`;

    el.rebConfirm.disabled = !p.eligible;
    el.rebConfirm.classList.toggle('is-disabled', !p.eligible);
    el.rebConfirm.textContent = p.eligible
      ? 'Ascend'
      : `${formatDistance(p.requirement - save.cycleDistance)} to go`;
  }

  return {
    renderCosmetics,
    renderUpgrades,
    renderRebirth,
    setTab,
    get tab() { return tab; },
  };
}

/* ==========================================================================
   Helpers
   ========================================================================== */

function tag(cls, text) {
  const t = document.createElement('span');
  t.className = `card-tag ${cls}`;
  t.textContent = text;
  return t;
}

function fillList(ul, items) {
  if (!ul) return;
  ul.innerHTML = '';
  for (const text of items) {
    const li = document.createElement('li');
    li.textContent = text;
    ul.appendChild(li);
  }
}

/** Re-exported so main.js can resolve equipped cosmetics without importing shop twice. */
export { TRAILS, SKINS };
