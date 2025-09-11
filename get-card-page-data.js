// new get card page data
console.log("lappy");

(function () {
const log = (...a) => console.log("Agent : GET_CARD_PAGE_DATA :", ...a);

log("Starting page card data extraction");

// ----- find the card container
const container =
  document.querySelector('ul.photo-cards') ||
  document.querySelector('[data-test="search-page-list-container"]');

if (container) {
  log(`Found container: ${container.tagName}.${container.className || '(no class)'}`);
} else {
  log("WARNING: No container found - using empty node list");
}

const nodes = container ? container.querySelectorAll('li.ListItem, li.exoArO') : [];
log(`Found ${nodes.length} potential card nodes in container`);

const positions = [];

// Heuristic to detect ad tiles
const isAdCard = (el) => {
  if (el.querySelector('iframe')) {
    log("  Detected ad card: contains iframe");
    return true;
  }
  if (el.querySelector('[aria-label*="advertis" i], [alt*="advertis" i]')) {
    log("  Detected ad card: contains advertising aria-label or alt text");
    return true;
  }
  if (el.querySelector('[data-testid*="brand" i]')) {
    log("  Detected ad card: contains brand data-testid");
    return true;
  }
  const txt = (el.textContent || '').toLowerCase();
  if (/\b(ad|sponsored)\b/.test(txt)) {
    log("  Detected ad card: contains 'ad' or 'sponsored' text");
    return true;
  }
  const a = el.querySelector('a[href]');
  if (a && !/\/homedetails?\//.test(a.getAttribute('href') || '')) {
    log(`  Detected ad card: link doesn't match homedetails pattern: ${a.getAttribute('href')}`);
    return true;
  }
  return false;
};

let outIndex = 0;
let skippedAds = 0;
let skippedHidden = 0;

log("Processing nodes...");
nodes.forEach((el, nodeIndex) => {
  if (isAdCard(el)) {
    log(`  Node ${nodeIndex}: Skipped - detected as ad card`);
    skippedAds++;
    return;                     // skip ads
  }
  
  const r = el.getBoundingClientRect();
  if (!r.width || !r.height) {
    log(`  Node ${nodeIndex}: Skipped - no dimensions (${r.width}x${r.height})`);
    skippedHidden++;
    return;            // skip hidden/zero
  }

  // STABLE TAG so we can find this exact tile later
  el.setAttribute('data-km-ix', String(outIndex));

  const centerX = r.left + r.width / 2 + window.scrollX;
  const centerY = r.top + r.height / 2 + window.scrollY;

  positions.push({
    index: outIndex++,
    x: centerX,
    y: centerY,
    width: r.width,
    height: r.height
  });
  
  log(`  Node ${nodeIndex}: Added as card index ${outIndex - 1} (${Math.round(r.width)}x${Math.round(r.height)} at center ${Math.round(centerX)},${Math.round(centerY)})`);
});

log(`Processing complete:`);
log(`  Total nodes found: ${nodes.length}`);
log(`  Valid property cards: ${positions.length}`);
log(`  Skipped (ad cards): ${skippedAds}`);
log(`  Skipped (hidden/zero dimensions): ${skippedHidden}`);

// hand back to KM
const payload = JSON.stringify({ totalCardsOnPage: positions.length, positions });
kmvar.TotalCardsOnPage = positions.length;
kmvar.PageCardData = payload;

log(`Set kmvar.TotalCardsOnPage = ${positions.length}`);
log(`Generated payload with ${positions.length} cards`);
log("Page card data extraction completed");

return payload;

})();