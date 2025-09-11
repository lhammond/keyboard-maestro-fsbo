
// console.log("CLICK_CARD")
// (function () {
//                         const log = (...a) => console.log("Agent : CLICK_CARD :", ...a);
                        
//                         const idx0 = (parseInt(kmvar.CurrentCardIndex, 10) || 1) - 1;
//                         log(`Starting tile click for index ${idx0} (from kmvar.CurrentCardIndex: ${kmvar.CurrentCardIndex})`);
                        
//                         const modalButton = document.querySelector('[data-testid="close-lightbox-button"]');
//                         if (modalButton) {
//                           log("Modal already open - close button found");
//                           return "MODAL_ALREADY_OPEN";
//                         }
//                         log("No modal detected - proceeding with tile search");
                        
//                         let tile =
//                           document.querySelector(`ul.photo-cards li[data-km-ix="${idx0}"]`) ||
//                           document.querySelector(`[data-km-ix="${idx0}"]`);
                        
//                         if (tile) {
//                           log(`Found tile using primary search with data-km-ix="${idx0}"`);
//                         } else {
//                           log(`Primary tile search failed for data-km-ix="${idx0}", trying fallback method`);
//                           const container = document.querySelector('ul.photo-cards');
//                           if (container) {
//                             const nodes = Array.from(container.querySelectorAll('li.ListItem, li.exoArO'));
//                             log(`Container found with ${nodes.length} potential tiles`);
//                             tile = nodes.find(el => el.getAttribute('data-km-ix') === String(idx0)) || null;
//                             if (tile) {
//                               log(`Found tile using fallback search in container`);
//                             } else {
//                               log(`Fallback search failed - no tile found with data-km-ix="${idx0}"`);
//                               const availableIndexes = nodes.map(n => n.getAttribute('data-km-ix')).filter(Boolean);
//                               log(`Available data-km-ix values:`, availableIndexes);
//                             }
//                           } else {
//                             log("No ul.photo-cards container found for fallback search");
//                           }
//                         }
                        
//                         if (!tile) {
//                           log("ERROR: No tile found with any method");
//                           return "NO_TILE";
//                         }
                        
//                         log("Scrolling tile into view");
//                         tile.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
                        
//                         const r = tile.getBoundingClientRect();
//                         log(`Tile position: x=${Math.round(r.left)}, y=${Math.round(r.top)}, width=${Math.round(r.width)}, height=${Math.round(r.height)}`);
                        
//                         const linkSelectors = [
//                           'a[href*="/homedetails/"]',
//                           '[data-testid="property-card-link"]',
//                           '[data-test="property-card-link"]',
//                           'a.StyledPropertyCardPhoto',
//                           'a.StyledPropertyCardDataArea',
//                           'a[href]'
//                         ];
//                         let link = null;
//                         log("Searching for clickable link in tile...");
                        
//                         for (const sel of linkSelectors) {
//                           const cand = tile.querySelector(sel);
//                           if (!cand) {
//                             log(`  No match for selector: ${sel}`);
//                             continue;
//                           }
//                           log(`  Found candidate with selector: ${sel}`);
//                           if (sel === 'a[href]' && !/\/homedetails?\//.test(cand.getAttribute('href') || '')) {
//                             log(`  Rejected generic link - href doesn't match homedetails pattern: ${cand.getAttribute('href')}`);
//                             continue;
//                           }
//                           link = cand;
//                           log(`  Selected link: ${sel}, href: ${cand.getAttribute('href')}`);
//                           break;
//                         }
                        
//                         if (link) {
//                           log("Clicking found link");
//                           link.click();
//                           return "OK_LINK";
//                         }
                        
//                         log("No suitable link found, falling back to coordinate-based click");
//                         const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
//                         log(`Calculated click coordinates: x=${Math.round(cx)}, y=${Math.round(cy)}`);
                        
//                         const target = document.elementFromPoint(cx, cy) || tile;
//                         log(`Target element at coordinates:`, target.tagName, target.className || '(no class)');
                        
//                         const opts = { bubbles: true, cancelable: true, view: window };
//                         log("Dispatching mouse events on target");
//                         target.dispatchEvent(new MouseEvent('mousedown', opts));
//                         target.dispatchEvent(new MouseEvent('mouseup',   opts));
//                         target.dispatchEvent(new MouseEvent('click',     opts));
                        
//                         log("Fallback click completed");
//                         return "OK_FALLBACK";
//                       })();
                 

// console.log("i'm in th eclick 3 action above the function");
// (function () {
//   const log = (...a) => console.log("Agent : CLICK3 :", ...a);

//   // 0-based index from KM
//   const idx0 = (parseInt(kmvar.CurrentCardIndex, 10) || 1) - 1;
//   log("KM CurrentCardIndex (0-based):", idx0);

//   // Only treat "modal open" if the Zillow lightbox close button is present
//   if (document.querySelector('[data-testid="close-lightbox-button"]')) {
//     log("Zillow lightbox already open; skipping click");
//     return "MODAL_ALREADY_OPEN";
//   }

//   // Find the tagged tile in the grid
//   let tile =
//     document.querySelector(`ul.photo-cards li[data-km-ix="${idx0}"]`) ||
//     document.querySelector(`[data-km-ix="${idx0}"]`);

//   // If tag got lost after a re-render, re-derive the tile at this index (ad-skipping omitted here;
//   // discovery already created the right idx mapping).
//   if (!tile) {
//     const container = document.querySelector('ul.photo-cards');
//     const nodes = container ? Array.from(container.querySelectorAll('li.ListItem, li.exoArO')) : [];
//     tile = nodes.find(el => el.getAttribute('data-km-ix') === String(idx0)) || null;
//   }

//   if (!tile) {
//     log("No tile found for index", idx0);
//     return "NO_TILE";
//   }

//   // Make sure it's on screen
//   tile.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
//   const r = tile.getBoundingClientRect();
//   log("tile rect (w×h):", r.width, r.height);

//   // Candidate link selectors inside a Zillow card
//   const linkSelectors = [
//     'a[href*="/homedetails/"]',
//     '[data-testid="property-card-link"]',
//     '[data-test="property-card-link"]',
//     // occasionally the anchor wraps the photo area or data area:
//     'a.StyledPropertyCardPhoto',
//     'a.StyledPropertyCardDataArea',
//     // last-resort generic anchor inside the tile
//     'a[href]'
//   ];

//   let link = null;
//   for (const sel of linkSelectors) {
//     const cand = tile.querySelector(sel);
//     if (!cand) continue;
//     // If it's a generic anchor, prefer ones that look like a listing
//     if (sel === 'a[href]' && !/\/homedetails?\//.test(cand.getAttribute('href') || '')) {
//       continue;
//     }
//     link = cand;
//     break;
//   }

//   if (link) {
//     log("clicking link selector:", link.tagName, link.getAttribute('href') || '(no href)');
//     // native click is best for React navigation
//     link.click();
//     return "OK_LINK";
//   }

//   // Fallback: dispatch a full click sequence at tile center (helps React handlers)
//   const cx = r.left + r.width / 2;
//   const cy = r.top + r.height / 2;
//   const target = document.elementFromPoint(cx, cy) || tile;
//   log("fallback click on:", target.tagName);

//   const opts = { bubbles: true, cancelable: true, view: window };
//   target.dispatchEvent(new MouseEvent('mousedown', opts));
//   target.dispatchEvent(new MouseEvent('mouseup',   opts));
//   target.dispatchEvent(new MouseEvent('click',     opts));

//   return "OK_FALLBACK";
// })();


// KM-SAFE VERBOSE CLICK: starts with a semicolon + void to guard against KM "parameter" appends
;void (function () {
    'use strict';
    const log = (...a) => console.log.apply(console, ["Agent : CLICK_CARD :", ...a]);
  
    // --- index ---
    const rawIdx = kmvar && kmvar.CurrentCardIndex;
    const idx0 = (parseInt(rawIdx, 10) || 1) - 1;
    log("Starting tile click for index", idx0, "(from kmvar.CurrentCardIndex:", rawIdx, ")");
  
    // --- modal present? ---
    const modalButton = document.querySelector('[data-testid="close-lightbox-button"]');
    if (modalButton) {
      log("Modal already open - close button found");
      return "MODAL_ALREADY_OPEN";
    }
    log("No modal detected - proceeding with tile search");
  
    // --- find tile by our stable tag ---
    let tile =
      document.querySelector('ul.photo-cards li[data-km-ix="' + idx0 + '"]') ||
      document.querySelector('[data-km-ix="' + idx0 + '"]');
  
    if (tile) {
      log('Found tile using primary search with data-km-ix="' + idx0 + '"');
    } else {
      log('Primary tile search failed for data-km-ix="' + idx0 + '", trying fallback method');
      const container = document.querySelector('ul.photo-cards');
      if (container) {
        const nodes = Array.from(container.querySelectorAll('li.ListItem, li.exoArO'));
        log("Container found with", nodes.length, "potential tiles");
        tile = nodes.find(function (el) { return el.getAttribute('data-km-ix') === String(idx0); }) || null;
        if (tile) {
          log("Found tile using fallback search in container");
        } else {
          const availableIndexes = nodes.map(function (n) { return n.getAttribute('data-km-ix'); }).filter(Boolean);
          log("Fallback search failed - no tile found with data-km-ix=", String(idx0));
          log("Available data-km-ix values:", availableIndexes);
        }
      } else {
        log("No ul.photo-cards container found for fallback search");
      }
    }
  
    if (!tile) {
      log("ERROR: No tile found with any method");
      return "NO_TILE";
    }
  
    // --- scroll into view ---
    log("Scrolling tile into view");
    tile.scrollIntoView({ block: "center", inline: "center", behavior: "instant" });
  
    const r = tile.getBoundingClientRect();
    log("Tile position:", "x=" + Math.round(r.left), "y=" + Math.round(r.top),
        "w=" + Math.round(r.width), "h=" + Math.round(r.height));
  
    // --- prefer real listing link ---
    const linkSelectors = [
      'a[href*="/homedetails/"]',
      '[data-testid="property-card-link"]',
      '[data-test="property-card-link"]',
      'a.StyledPropertyCardPhoto',
      'a.StyledPropertyCardDataArea',
      'a[href]'
    ];
    let link = null;
  
    log("Searching for clickable link in tile...");
    for (let i = 0; i < linkSelectors.length; i++) {
      const sel = linkSelectors[i];
      const cand = tile.querySelector(sel);
      if (!cand) {
        log("  No match for selector:", sel);
        continue;
      }
      // If it's a generic anchor, prefer ones that look like a listing
      if (sel === 'a[href]') {
        const href = cand.getAttribute('href') || '';
        if (!/\/homedetails?\//.test(href)) {
          log("  Rejected generic link (not a homedetails link):", href);
          continue;
        }
      }
      link = cand;
      log("  Selected link by selector:", sel, "href:", cand.getAttribute('href') || '(no href)');
      break;
    }
  
    if (link) {
      log("Clicking found link (native click for React navigation)");
      link.click();
      return "OK_LINK";
    }
  
    // --- fallback: synthesize click at center of tile ---
    log("No suitable link found, falling back to coordinate-based click");
    const cx = r.left + (r.width / 2);
    const cy = r.top  + (r.height / 2);
    log("Calculated click coordinates:", "x=" + Math.round(cx), "y=" + Math.round(cy));
  
    const target = document.elementFromPoint(cx, cy) || tile;
    log("Target element at coordinates:", target && target.tagName, (target && target.className) || "(no class)");
  
    const opts = { bubbles: true, cancelable: true, view: window };
    log("Dispatching mouse events on target");
    target.dispatchEvent(new MouseEvent('mousedown', opts));
    target.dispatchEvent(new MouseEvent('mouseup',   opts));
    target.dispatchEvent(new MouseEvent('click',     opts));
  
    log("Fallback click completed");
    return "OK_FALLBACK";
  })();