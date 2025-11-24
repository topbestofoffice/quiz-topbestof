window.AdSystemConfig = {
  enableBotProtection: true,
  botDetectionRegex: /bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit|lighthouse|headless|phantom|selenium|webdriver|automation|scrapy|python-requests|curl|wget|postman/i,
  allowCrawlers: false,
  requireUserInteraction: true,

  enableLazyLoading: true,
  lazyLoading: {
    enabled: true,
    depth: 1.75,
    fetchMargin: '200px',
    renderMargin: 75,
    mobileScaling: 2,
    viewabilityThreshold: 0.75
  },

  enableRebid: false,
  rebidSystem: {
    enabled: false,
    rounds: 2,
    multiplier: 0.7,
    percent: 1,
    timeout: 1000,
    maxAttempts: 3
  },

  enableVignette: true,
  vignetteAds: {
    enabled: true,
    chance: 0.3,
    delay: 10000,
    cooldown: 300000,
    desktopEnabled: true,
    mobileEnabled: true,
    closeTimeout: '1/24',
    requireInteraction: true
  },

  enableOfferwall: false,
  offerwallSystem: {
    enabled: false,
    durationThreshold: 30,
    pageviewThreshold: 3,
    showOnExit: true,
    rewardMultiplier: 1.5,
    cooldownHours: 24
  },

  enableRewardedAds: true,
  rewardedAds: {
    enabled: true,
    rewardAmount: 100,
    currency: 'coins',
    bonusMultiplier: 1.2,
    maxDailyRewards: 10,
    videoTimeout: 30000,
    skipDelay: 5000,
    autoRedirect: true,
    redirectDelay: 500,
    initializationDelay: 2500,
  },

  performance: {
    enableSingleRequest: true,
    collapseEmptyDivs: true,
    timeout: 2000,
    refreshEnabled: false,
    refreshMax: 0,
    refreshTimeout: 90,
    refreshViewports: 0.75,
    scrollViewability: true,
    scrollViewabilityTimeout: 1000,
    unitMinHeight: true,
    unitAutoMargin: true,
    unitCenter: true,
    optimizeSizes: true,
    pendingSlotDelay: 1500
  },

  debug: false,
  networkCode: '22760191030',
  publisherName: 'Chandra Prakash Verma',
  domain: 'topbestof.com',
  currency: 'USD',

  mobileOptimized: true,
  mobileBreakpoint: 768,

  enableAnchorAds: false,
  anchorAds: {
    enabled: false,
    position: 'bottom',
    delay: 0,
    device: 'both',
    closeButton: true,
    closeTimeout: '1/24',
    percent: 1
  },

  adUnits: [
    {
      slotName: "Topbestof_Desk_Leaderboard",
      adUnitPath: "/22760191030/soner",
      device: "desktop",
      sizes: [[728, 90], [970, 90], [970, 250], [728, 250], [750, 300]],  // ADDED BACK: 970x250, 728x250, 750x300
      priority: "medium",
      position: "content",
      isLazy: false,
      isAnchor: false,
      targeting: {},
      customCss: ""
    },
    {
      slotName: "Topbestof_Desk_Incontent_Lazy",
      adUnitPath: "/22760191030/Topbestof_Desk_Incontent_Lazy",
      device: "desktop",
      // sizes: [[970, 250], [728, 250], [970, 90], [750, 300], [728, 90]],
      sizes: [[300, 250], [336, 280], [728, 90]],  // REMOVED: 728x250, 640x360 (low demand)
      priority: "medium",
      position: "content",
      isLazy: true,
      isAnchor: false,
      targeting: {},
      customCss: ""
    },
    {
      slotName: "Topbestof_Mobile_Leaderboard",
      adUnitPath: "/22760191030/soner",
      device: "mobile",
      sizes: [[300, 250], [336, 280], [320, 100], [250, 250], [300, 600], "fluid"],  // RESTORED: Extended mobile range
      priority: "medium",
      position: "content",
      isLazy: false,
      isAnchor: false,
      targeting: {},
      customCss: ""
    },
    {
      slotName: "Topbestof_Mobile_Top",
      adUnitPath: "/22760191030/rtop",
      device: "mobile",
      sizes: [[300, 250], [336, 280], [320, 100], [250, 250], [300, 600], "fluid"],  // RESTORED: Extended mobile range
      priority: "high",
      position: "header",
      isLazy: false,
      isAnchor: false,
      targeting: {},
      customCss: ""
    }
  ],

  callbacks: {
    onAdLoaded: function(slotName, size, isEmpty) {
      try {
        const config = window.AdSystemConfig;
        if (!config || typeof config !== 'object') {
          console.warn('[AdSystem] AdSystemConfig not available in onAdLoaded');
          return;
        }
        if (config.debug) {
          console.log(`[AdSystem] Ad loaded: ${slotName} (${size ? size[0] + 'x' + size[1] : 'unknown'}) - Empty: ${isEmpty}`);
        }
      } catch (error) {
        console.warn('[AdSystem] Error in onAdLoaded:', error);
      }
    },

    onAdFailed: function(slotName, error, attempt) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.warn(`[AdSystem] Ad failed: ${slotName} (Attempt ${attempt})`, error);
      }
    },

    onAdEmpty: function(slotName) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log(`[AdSystem] Ad empty: ${slotName}`);
      }
    },

    onAdViewable: function(slotName, viewabilityData) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log(`[AdSystem] Ad viewable: ${slotName}`, viewabilityData);
      }
    },

    onRewardGranted: function(amount, currency, bonusApplied) {
      const config = window.AdSystemConfig;
      const currentCoins = parseInt(localStorage.getItem('totalcoin') || '0');
      const finalAmount = bonusApplied ? Math.floor(amount * config.rewardedAds.bonusMultiplier) : amount;
      const newTotal = currentCoins + finalAmount;

      localStorage.setItem('totalcoin', newTotal.toString());

      const today = new Date().toDateString();
      const dailyRewards = JSON.parse(localStorage.getItem('dailyRewards') || '{}');
      dailyRewards[today] = (dailyRewards[today] || 0) + 1;
      localStorage.setItem('dailyRewards', JSON.stringify(dailyRewards));

      if (window.showToast) {
        window.showToast({
          title: 'Reward Earned!',
          msg: `🎉 You earned ${finalAmount} ${currency}! ${bonusApplied ? '(Bonus Applied!)' : ''}`
        });
      }

      if (config.rewardedAds.autoRedirect) {
        setTimeout(() => {
          if (window.location.pathname !== '/playquiz.html') {
            window.location.href = '/playquiz.html';
          }
        }, config.rewardedAds.redirectDelay);
      }
    },

    onRewardFailed: function(reason, canRetry, errorDetails) {
      console.error('[AdSystem] Reward failed:', reason, errorDetails);
      
      if (window.showToast) {
        window.showToast({
          title: 'Ad Not Available',
          msg: `❌ ${reason || 'Please try again later'}`
        });
      }
    },

    onRewardRequested: function(context, userInitiated) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log('[AdSystem] Reward requested:', context, userInitiated);
      }
    },

    onRewardAdLoaded: function(adUnitPath, loadTime) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log('[AdSystem] Reward ad loaded:', adUnitPath, loadTime + 'ms');
      }
    },

    onRewardAdStarted: function(adUnitPath, duration) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log('[AdSystem] Reward ad started:', adUnitPath, duration + 'ms');
      }
    },

    onRewardAdCompleted: function(adUnitPath, watchTime, skipped) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log('[AdSystem] Reward ad completed:', adUnitPath, watchTime + 'ms', 'Skipped:', skipped);
      }
    },

    onVignetteShown: function(adUnitPath) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log('[AdSystem] Vignette shown:', adUnitPath);
      }
    },

    onVignetteClosed: function(duration, reason) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log('[AdSystem] Vignette closed:', duration + 'ms', reason);
      }
    },

    onVignetteError: function(error, context) {
      console.error('[AdSystem] Vignette error:', error.message || error, context);
    },

    onVignetteEligibilityCheck: function(eligible, reason, data) {
      try {
        const config = window.AdSystemConfig || this;
        if (!config) {
          console.warn('[AdSystem] Config not available in vignette eligibility check');
          return;
        }

        if (config.debug) {
          const vignetteConfig = (config.vignetteAds && typeof config.vignetteAds === 'object') ? config.vignetteAds : {
            chance: 0.3,
            delay: 10000,
            cooldown: 300000,
            requireInteraction: true
          };

          console.log('[AdSystem] Vignette eligibility:', eligible, reason, data, vignetteConfig);
        }
      } catch (error) {
        console.error('[AdSystem] Vignette eligibility callback error:', error);
      }
    },

    onBotDetected: function(reason, userAgent) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.warn('[AdSystem] Bot detected:', reason, userAgent);
      }
    },

    onSuspiciousActivity: function(activity, data) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.warn('[AdSystem] Suspicious activity:', activity, data);
      }
    },

    onPerformanceData: function(metrics) {
      const config = window.AdSystemConfig;
      if (config.debug) {
        console.log('[AdSystem] Performance metrics:', metrics);
      }
    },

    onError: function(error, context, critical) {
      const config = window.AdSystemConfig;
      if (config.debug || critical) {
        console.error(`[AdSystem] Error in ${context}:`, error);
      }
    }
  },

  detectBot: function() {
    const config = window.AdSystemConfig;
    
    if (!config.enableBotProtection) return false;

    const userAgent = navigator.userAgent || '';
    const reasons = [];
    
    if (config.botDetectionRegex && config.botDetectionRegex.test(userAgent)) {
      reasons.push(`UserAgent matched bot pattern: "${userAgent}"`);
    }
    
    if (navigator.webdriver === true) {
      reasons.push('Detected: WebDriver');
    }

    if (window.callPhantom || window._phantom) {
      reasons.push('Detected: PhantomJS');
    }
    
    const isBot = reasons.length > 0;
    
    if (isBot && config.callbacks && config.callbacks.onBotDetected) {
      try {
        config.callbacks.onBotDetected(reasons.join(' | '), userAgent);
      } catch (error) {
        console.error('[BotDetection] Error in callback:', error);
      }
    }
    
    return isBot;
  },

  getDailyRewardsStatus: function() {
    const config = window.AdSystemConfig;
    const today = new Date().toDateString();
    const dailyRewards = JSON.parse(localStorage.getItem('dailyRewards') || '{}');
    const todayCount = dailyRewards[today] || 0;

    return {
      today: today,
      todayCount: todayCount,
      maxDaily: config.rewardedAds.maxDailyRewards,
      remaining: Math.max(0, config.rewardedAds.maxDailyRewards - todayCount),
      canEarnMore: todayCount < config.rewardedAds.maxDailyRewards
    };
  },

  checkRewardEligibility: function() {
    const config = window.AdSystemConfig;
    const dailyStatus = config.getDailyRewardsStatus();
    const hasInteracted = window.userHasInteracted || false;
    const isOnline = navigator.onLine;

    return {
      eligible: dailyStatus.canEarnMore && hasInteracted && isOnline,
      reasons: {
        dailyLimit: !dailyStatus.canEarnMore,
        userInteraction: !hasInteracted,
        offline: !isOnline
      },
      dailyStatus: dailyStatus
    };
  },

  getVignetteStatus: function() {
    const config = window.AdSystemConfig;
    const now = Date.now();
    const lastShown = parseInt(localStorage.getItem('lastVignetteShown') || '0');
    const timeSinceLastShown = now - lastShown;

    const vignetteConfig = config.vignetteAds || {};
    const cooldown = vignetteConfig.cooldown || 30000;
    const chance = vignetteConfig.chance || 0.3;
    const cooldownPassed = timeSinceLastShown >= cooldown;

    return {
      lastShown: new Date(lastShown).toISOString(),
      timeSinceLastShown: timeSinceLastShown,
      cooldownRequired: cooldown,
      cooldownPassed: cooldownPassed,
      canShow: cooldownPassed && Math.random() <= chance
    };
  },
};

window.AdManager = (function() {
    'use strict';
    
    let isInitialized = false;
    let gptLoaded = false;
    let definedSlots = {};
    let pendingSlots = [];
    let config = null;
    
    function loadGPTLibrary() {
        if (gptLoaded) return Promise.resolve();
        
        return new Promise((resolve, reject) => {
            if (window.googletag && window.googletag.pubads) {
                gptLoaded = true;
                resolve();
                return;
            }
            
            const gptScript = document.createElement('script');
            gptScript.async = true;
            gptScript.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
            gptScript.crossOrigin = 'anonymous';
            
            gptScript.onload = () => {
                gptLoaded = true;
                resolve();
            };
            
            gptScript.onerror = (error) => {
                console.error('[AdManager] Failed to load GPT:', error);
                reject(error);
            };
            
            document.head.appendChild(gptScript);
        });
    }
    
    function waitForGPT() {
        return new Promise((resolve) => {
            function checkGPT() {
                if (window.googletag && window.googletag.pubads) {
                    resolve();
                } else {
                    setTimeout(checkGPT, 100);
                }
            }
            checkGPT();
        });
    }
    
    function initializeGPT() {
        if (isInitialized) return Promise.resolve();
        
        if (window.gptServicesEnabled) {
            isInitialized = true;
            return Promise.resolve();
        }
        
        window.googletag = window.googletag || { cmd: [] };
        config = window.AdSystemConfig;
        
        if (!config) {
            console.error('[AdManager] AdSystemConfig not found');
            return Promise.reject(new Error('AdSystemConfig not found'));
        }
        
        if (config.enableBotProtection && config.detectBot()) {
            console.error('[AdManager] Bot detected - Ads blocked');
            window.isBotTraffic = true;
            return Promise.reject(new Error('Bot traffic detected'));
        }
        
        window.isBotTraffic = false;
        
        return loadGPTLibrary()
            .then(() => waitForGPT())
            .then(() => {
                return new Promise((resolve) => {
                    googletag.cmd.push(() => {
                        try {
                            if (!window.gptServicesEnabled) {
                                const isMobile = window.innerWidth <= config.mobileBreakpoint;
                                
                                googletag.setConfig({
                                  targeting: {
                                    device: isMobile ? "mobile" : "desktop",
                                  },
                                  singleRequest: config.performance.enableSingleRequest,
                                  collapseDiv: config.performance.collapseEmptyDivs ? "BEFORE_FETCH" : null,
                                });
                                
                                googletag.enableServices();
                                window.gptServicesEnabled = true;
                            }
                            
                            isInitialized = true;
                            resolve();
                        } catch (error) {
                            console.error('[AdManager] GPT initialization failed:', error);
                            reject(error);
                        }
                    });
                });
            });
    }
    
    function defineSlot(adUnitPath, sizes, divId, options = {}) {
        if (definedSlots[divId]) return Promise.resolve(definedSlots[divId]);
        
        const element = document.getElementById(divId) || document.querySelector(`[data-slot-name="${divId}"]`);
        if (!element) {
            if (config && config.debug) {
                console.error('[AdManager] Element not found:', divId);
            }
            return Promise.reject(new Error(`Element not found: ${divId}`));
        }
        
        if (!element.id) element.id = divId;
        
        return new Promise((resolve, reject) => {
            if (!isInitialized) {
                pendingSlots.push({ adUnitPath, sizes, divId, options, resolve, reject });
                return;
            }

            // FIXED RESPONSIVE SIZE MAPPING - Matches all sizes defined in adUnits across correct breakpoints
            const responsiveSizeMapping = googletag
              .sizeMapping()
              // Desktop ≥992px - Full desktop leaderboard + rectangle sizes
              .addSize(
                [992, 0],
                [
                  [728, 90],
                  [970, 90],
                  [970, 250],
                  [728, 250],
                  [750, 300],
                  [300, 250],
                  [336, 280],
                ]
              )
              // Tablet ≥768px - Bridge sizes
              .addSize(
                [768, 0],
                [
                  [728, 90],
                  [300, 250],
                  [336, 280],
                  [300, 600],
                  [320, 100],
                ]
              )
              // Large phones ≥414px
              .addSize(
                [414, 0],
                [
                  [300, 250],
                  [336, 280],
                  [320, 100],
                  [300, 600],
                  [250, 250],
                ]
              )
              // Standard phones ≥320px
              .addSize(
                [320, 0],
                [
                  [300, 250],
                  [336, 280],
                  [320, 100],
                  [250, 250],
                  [300, 600],
                  [320, 50],
                ]
              )
              // Safe fallback (prevents empty arrays that block all ads)
              .addSize(
                [0, 0],
                [
                  [320, 50],
                  [300, 250],
                ]
              )
              .build();

            googletag.cmd.push(() => {
              try {
                    const slot = googletag.defineSlot(adUnitPath, sizes, divId);
                    if (slot) {
                        slot.addService(googletag.pubads());
                        slot.defineSizeMapping(responsiveSizeMapping);
                        if (options.targeting) {
                            Object.entries(options.targeting).forEach(([key, value]) => {
                                slot.setTargeting(key, value);
                            });
                        }
                        
                        definedSlots[divId] = slot;
                        resolve(slot);
                    } else {
                        const error = `Failed to define slot: ${divId}`;
                        console.error('[AdManager]', error);
                        reject(new Error(error));
                    }
                } catch (error) {
                    console.error('[AdManager] Error defining slot:', divId, error);
                    reject(error);
                }
            });
        });
    }
    
    function processPendingSlots() {
        const slots = [...pendingSlots];
        pendingSlots = [];
        
        slots.forEach(({ adUnitPath, sizes, divId, options, resolve, reject }) => {
            defineSlot(adUnitPath, sizes, divId, options)
                .then(slot => {
                    return displayAd(divId);
                })
                .then(() => {
                    resolve && resolve();
                })
                .catch(error => {
                    console.error('[AdManager] Error processing pending slot:', divId, error);
                    reject && reject(error);
                });
        });
    }
    
    function displayAd(divId, options = {}) {
        const element = document.getElementById(divId) || document.querySelector(`[data-slot-name="${divId}"]`);
        if (!element) {
            if (config && config.debug) {
                console.error('[AdManager] Element not found for display:', divId);
            }
            return Promise.reject(new Error(`Element not found: ${divId}`));
        }
        
        return new Promise((resolve, reject) => {
            if (!isInitialized) {
                console.error('[AdManager] Cannot display ad - not initialized:', divId);
                reject(new Error('AdManager not initialized'));
                return;
            }
            
            googletag.cmd.push(() => {
                try {
                    googletag.display(divId);
                    resolve();
                } catch (error) {
                    console.error('[AdManager] Error displaying ad:', divId, error);
                    reject(error);
                }
            });
        });
    }
    
    function initializeAds() {
        if (!config) config = window.AdSystemConfig;
        
        if (!config) {
            console.error('[AdManager] AdSystemConfig not available');
            return;
        }
        
        if (config.enableBotProtection && config.detectBot()) {
            console.error('[AdManager] Bot traffic - Aborting initialization');
            window.isBotTraffic = true;
            return;
        }
        
        window.isBotTraffic = false;
        const isMobile = window.innerWidth <= config.mobileBreakpoint;
        const targetDevice = isMobile ? 'mobile' : 'desktop';

        const allAdUnits = config.adUnits.filter(unit => unit.device === targetDevice || unit.device === 'both');
        const leaderboardUnits = allAdUnits.filter(unit => unit.slotName.includes('Leaderboard'));
        const otherAdUnits = allAdUnits.filter(unit => !unit.slotName.includes('Leaderboard'));

        leaderboardUnits.forEach(adUnit => {
            pendingSlots.push({
                adUnitPath: adUnit.adUnitPath,
                sizes: adUnit.sizes,
                divId: adUnit.slotName,
                options: { targeting: adUnit.targeting || {} },
                resolve: () => {
                    if (config.debug) {
                        console.log('[AdManager] Leaderboard slot queued:', adUnit.slotName);
                    }
                },
                reject: (err) => console.error('[AdManager] Pending slot rejected:', adUnit.slotName, err)
            });
        });

        initializeGPT()
            .then(() => {
                const slotPromises = otherAdUnits.map(adUnit => {
                    return defineSlot(adUnit.adUnitPath, adUnit.sizes, adUnit.slotName, {
                        targeting: adUnit.targeting || {}
                    }).then(slot => {
                        return displayAd(adUnit.slotName);
                    }).catch(error => {
                        if (config.debug) {
                            console.error('[AdManager] Failed to initialize:', adUnit.slotName, error);
                        }
                    });
                });
                
                return Promise.allSettled(slotPromises);
            })
            .catch(error => {
                console.error('[AdManager] Critical initialization error:', error);
            });
    }

    function refreshAd(divId) {
        const slot = definedSlots[divId];
        if (!slot) {
            console.error('[AdManager] Cannot refresh undefined slot:', divId);
            return Promise.reject(new Error(`Slot not defined: ${divId}`));
        }
        
        return new Promise((resolve, reject) => {
            googletag.cmd.push(() => {
                try {
                    googletag.pubads().refresh([slot]);
                    resolve();
                } catch (error) {
                    console.error('[AdManager] Error refreshing ad:', divId, error);
                    reject(error);
                }
            });
        });
    }
    
    function destroySlot(divId) {
        const slot = definedSlots[divId];
        if (!slot) {
            console.warn('[AdManager] Cannot destroy undefined slot:', divId);
            return;
        }
        
        googletag.cmd.push(() => {
            try {
                googletag.destroySlots([slot]);
                delete definedSlots[divId];
            } catch (error) {
                console.error('[AdManager] Error destroying slot:', divId, error);
            }
        });
    }
    
    function getSlotInfo(divId) {
        const slot = definedSlots[divId];
        if (!slot) return null;
        
        return {
            slotId: slot.getSlotElementId(),
            adUnitPath: slot.getAdUnitPath(),
            sizes: slot.getSizes(),
            targeting: slot.getTargeting()
        };
    }
    
    function getInitializationStatus() {
        return {
            isInitialized,
            gptLoaded,
            definedSlotsCount: Object.keys(definedSlots).length,
            pendingSlotsCount: pendingSlots.length,
            definedSlots: Object.keys(definedSlots)
        };
    }
    
    return {
        init: initializeGPT,
        initializeAds: initializeAds,
        defineSlot: defineSlot,
        displayAd: displayAd,
        refreshAd: refreshAd,
        destroySlot: destroySlot,
        getSlotInfo: getSlotInfo,
        getStatus: getInitializationStatus,
        processPendingSlots: processPendingSlots
    };
})();

(function() {
    function startInitialization() {
        if (window.AdSystemConfig) {
            window.AdManager.initializeAds();
        } else {
            setTimeout(startInitialization, 100);
        }
    }
    
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', startInitialization);
    } else {
        startInitialization();
    }
})();

