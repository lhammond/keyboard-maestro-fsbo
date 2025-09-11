
                      (function () {
                        const log = (...a) => console.log("Agent : GET_CARD_DETAILS :", ...a);
                        
                        log("Starting property details extraction");
                        kmvar.PhoneNumber   = "";
                        kmvar.PropertyPrice = "";
                        kmvar.Address       = "";
                        
                        const modal =
                          document.querySelector('[data-testid="close-lightbox-button"]')?.closest('section,[role=dialog],.layout-container-desktop') ||
                          document.querySelector('[data-testid="lightbox"]') ||
                          document.querySelector('.layout-container-desktop') || document;
                        
                        if (modal === document) {
                          log("Using document as modal scope (no specific modal container found)");
                        } else {
                          log("Found modal container:", modal.tagName, modal.className || '(no class)');
                        }
                        
                        const norm=s=>(s||"").replace(/\s+/g," ").trim();
                        const first=(re,s)=>{const m=(s||"").match(re); return m?(m[1]??m[0]):"";};
                        const pickText=(scope,sels)=>{for(const sel of sels){const el=scope.querySelector(sel);if(el&&el.innerText)return el.innerText.trim();}return "";};
                        
                        log("Extracting address...");
                        let address=pickText(modal,['[data-testid="home-details-summary-headline"]','.ds-address-container','header h1','h1']);
                        if (address) {
                          log(`Found address using selector: ${address}`);
                        } else {
                          log("No address found with selectors, trying regex fallback");
                        }
                        
                        if(!address||!/,\s*[A-Z]{2}\s*\d{5}/.test(address)){
                          log("Address validation failed or not found, trying regex extraction");
                          address=first(/([^\n]+,\s*[A-Z]{2}\s*\d{5}(?:-\d{4})?)/,modal.innerText||"");
                          if (address) {
                            log(`Found address using regex: ${address}`);
                          } else {
                            log("No address found with regex either");
                          }
                        }
                        address=norm(address);
                        log(`Final normalized address: ${address || '(empty)'}`);
                        
                        log("Extracting price...");
                        let price=pickText(modal,['[data-testid="price"]','[data-test="property-price"]','.ds-price','.StyledPrice']);
                        if (price) {
                          log(`Found price using selector: ${price}`);
                        } else {
                          log("No price found with selectors, trying regex fallback");
                          price=first(/\$\d{1,3}(?:,\d{3})+(?!\s*(?:\/|per)?\s*mo)/i,modal.innerText||"");
                          if (price) {
                            log(`Found price using regex: ${price}`);
                          } else {
                            log("No price found with regex either");
                          }
                        }
                        price=price?price.replace(/\s+/g,""):"";
                        log(`Final cleaned price: ${price || '(empty)'}`);
                        
                        log("Extracting phone number...");
                        let phone=first(/Listed by[: ]*Property Owner.*?(\(?\d{3}\)?[ .\-]*\d{3}[ .\-]*\d{4})/si,modal.innerText||"");
                        if (phone) {
                          log(`Found phone using "Listed by Property Owner" pattern: ${phone}`);
                        } else {
                          log("No phone found with Property Owner pattern, trying general phone regex");
                          phone=first(/\b(\(?\d{3}\)?[ .\-]*\d{3}[ .\-]*\d{4})\b/,modal.innerText||"");
                          if (phone) {
                            log(`Found phone using general pattern: ${phone}`);
                          } else {
                            log("No phone number found with any pattern");
                          }
                        }
                        
                        const digits=(phone||"").replace(/\D+/g,"");
                        log(`Extracted digits from phone: ${digits} (length: ${digits.length})`);
                        
                        if(digits.length===10){
                          phone=`(${digits.slice(0,3)}) ${digits.slice(3,6)}-${digits.slice(6)}`;
                          log(`Formatted phone number: ${phone}`);
                        } else if (digits.length > 0) {
                          log(`Phone digits length ${digits.length} is not 10, keeping original format: ${phone}`);
                        }
                        
                        kmvar.PhoneNumber=phone||""; 
                        kmvar.PropertyPrice=price||""; 
                        kmvar.Address=address||"";
                        
                        log("Setting kmvar values:");
                        log(`  PhoneNumber: ${kmvar.PhoneNumber || '(empty)'}`);
                        log(`  PropertyPrice: ${kmvar.PropertyPrice || '(empty)'}`);
                        log(`  Address: ${kmvar.Address || '(empty)'}`);
                        
                        const csvEscape=(s)=>`"${String(s??"").replace(/"/g,'""')}"`;
                        const row=[kmvar.PhoneNumber,kmvar.PropertyPrice,kmvar.Address].map(csvEscape).join(',')+"\n";
                        kmvar.CSVRow=row; 
                        
                        log(`Generated CSV row: ${row.trim()}`);
                        log("Property details extraction completed");
                        
                        return row;
                      })();
                    