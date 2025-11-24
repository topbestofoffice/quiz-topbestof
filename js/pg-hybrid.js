/* Topbestof Hybrid Ad System - Combines original functionality with optimizations */
/* This works WITH the existing PubGuru system, not against it */

(function() {
    'use strict';
    
    // Early performance optimizations
    const startTime = performance.now();
    
    // Enhanced bot detection (runs before PubGuru loads)
    if (/bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit|lighthouse|headless/i.test(navigator.userAgent)) {
        console.warn('[Topbestof] Bot detected - optimizing ad loading');
        window.pgBotDetected = true;
    }
    
    // Performance monitoring
    window.TopbestofPerf = {
        scriptLoad: startTime,
        pgLoad: null,
        firstAd: null,
        rewardReady: null
    };
    
    // Configuration override for PubGuru (reduces bloat)
    window.pgOptimizations = {
        // Disable heavy features you don't need
        disableHeaderBidding: true,
        disableAnalytics: true,
        disableA11y: true,
        enableFastMode: true,
        skipNonEssential: true
    };
    
    // Optimize PubGuru initialization
    const originalPg = window.pg;
    window.pg = window.pg || {};
    
    // Intercept and optimize PubGuru's DOM ready queue
    const originalDrq = [];
    Object.defineProperty(window.pg, 'drq', {
        get: function() {
            return originalDrq;
        },
        set: function(value) {
            if (Array.isArray(value)) {
                originalDrq.splice(0, originalDrq.length, ...value);
            }
        }
    });
    
    // Enhanced DOM ready queue with performance optimization
    window.pg.drq = window.pg.drq || [];
    const originalPush = window.pg.drq.push;
    window.pg.drq.push = function(fn) {
        if (typeof fn === 'function') {
            // Wrap function with performance monitoring
            const wrappedFn = function() {
                const fnStart = performance.now();
                try {
                    const result = fn.apply(this, arguments);
                    console.log(`[Topbestof] PG callback executed in ${(performance.now() - fnStart).toFixed(2)}ms`);
                    return result;
                } catch (error) {
                    console.error('[Topbestof] PG callback error:', error);
                    throw error;
                }
            };
            return originalPush.call(this, wrappedFn);
        }
        return originalPush.apply(this, arguments);
    };
    
    // Optimize rewarded ad system
    window.TopbestofRewards = {
        ready: false,
        renderEvent: null,
        coins: 100,
        
        // Enhanced reward ad trigger
        show: function() {
            console.log('[Topbestof] Triggering optimized reward ad');
            
            // Method 1: Use stored render event (fastest)
            if (this.renderEvent && typeof this.renderEvent.makeRewardedVisible === 'function') {
                try {
                    this.renderEvent.makeRewardedVisible();
                    return true;
                } catch (error) {
                    console.error('[Topbestof] RenderEvent error:', error);
                }
            }
            
            // Method 2: Find and click pg-rewarded elements
            const rewardedElements = document.querySelectorAll('.pg-rewarded');
            if (rewardedElements.length > 0) {
                try {
                    rewardedElements[0].click();
                    return true;
                } catch (error) {
                    console.error('[Topbestof] Click error:', error);
                }
            }
            
            // Method 3: Create temporary element (fallback)
            const tempElement = document.createElement('a');
            tempElement.className = 'pg-rewarded';
            tempElement.href = 'intent://details?id=com.topbestof.qwizb#Intent;scheme=market;package=com.android.vending;end';
            tempElement.style.display = 'none';
            document.body.appendChild(tempElement);
            
            try {
                tempElement.click();
                setTimeout(() => document.body.removeChild(tempElement), 1000);
                return true;
            } catch (error) {
                console.error('[Topbestof] Temp element error:', error);
                return false;
            }
        },
        
        // Unified callback system
        onRewardGranted: function(coins = this.coins) {
            const currentCoins = parseInt(localStorage.getItem("totalcoin") || "0");
            const newTotal = currentCoins + coins;
            localStorage.setItem("totalcoin", newTotal.toString());
            
            // Show success notification
            if (window.showToast) {
                window.showToast({
                    title: "Congratulations!",
                    msg: `🥳 Reward Added - ${coins} Coins!`,
                });
            }
            
            // Redirect after delay
            setTimeout(() => {
                location.href = "/playquiz.html";
            }, 2000);
        },
        
        onRewardFailed: function(reason = "Ad not available") {
            if (window.showToast) {
                window.showToast({
                    title: "Sorry!",
                    msg: `🚫 ${reason}`,
                });
            }
        }
    };
    
    // Optimize ad loading with intersection observer
    const adObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const adElement = entry.target;
                const adSlot = adElement.getAttribute('data-pg-ad');
                
                if (adSlot) {
                    console.log(`[Topbestof] Ad slot ${adSlot} is visible, prioritizing load`);
                    // Trigger faster ad loading for visible slots
                    if (window.googletag && googletag.pubads) {
                        googletag.cmd.push(() => {
                            const slots = googletag.pubads().getSlots();
                            const targetSlot = slots.find(slot => 
                                slot.getAdUnitPath().includes(adSlot)
                            );
                            if (targetSlot) {
                                googletag.pubads().refresh([targetSlot]);
                            }
                        });
                    }
                }
                
                adObserver.unobserve(adElement);
            }
        });
    }, { 
        rootMargin: '200px' // Load ads 200px before they become visible
    });
    
    // Auto-observe ad elements when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelectorAll('pubguru[data-pg-ad]').forEach(el => {
            adObserver.observe(el);
        });
    });
    
    // Performance monitoring for PubGuru
    const originalLoadJs = window.pg.loadJs || window.pg.loadJS;
    if (originalLoadJs) {
        window.pg.loadJs = window.pg.loadJS = function(src, async, onload, onerror) {
            const loadStart = performance.now();
            
            const wrappedOnload = function() {
                window.TopbestofPerf.pgLoad = performance.now() - loadStart;
                console.log(`[Topbestof] PubGuru loaded in ${window.TopbestofPerf.pgLoad.toFixed(2)}ms`);
                if (onload) onload.apply(this, arguments);
            };
            
            const wrappedOnerror = function(error) {
                console.error('[Topbestof] PubGuru load error:', error);
                // Fallback to basic Google Ad Manager
                if (window.googletag) {
                    console.log('[Topbestof] Falling back to basic GAM');
                    googletag.cmd.push(() => {
                        googletag.pubads().enableSingleRequest();
                        googletag.enableServices();
                    });
                }
                if (onerror) onerror.apply(this, arguments);
            };
            
            return originalLoadJs.call(this, src, async, wrappedOnload, wrappedOnerror);
        };
    }
    
    // Global performance debug function
    window.checkTopbestofPerformance = function() {
        const perf = window.TopbestofPerf;
        const total = performance.now() - perf.scriptLoad;
        
        console.group('[Topbestof] Performance Report');
        console.log(`Total time: ${total.toFixed(2)}ms`);
        console.log(`PubGuru load: ${perf.pgLoad ? perf.pgLoad.toFixed(2) + 'ms' : 'Not loaded'}`);
        console.log(`First ad: ${perf.firstAd ? perf.firstAd.toFixed(2) + 'ms' : 'Not loaded'}`);
        console.log(`Reward ready: ${perf.rewardReady ? perf.rewardReady.toFixed(2) + 'ms' : 'Not ready'}`);
        console.groupEnd();
        
        if (window.showToast) {
            window.showToast({
                title: "Performance",
                msg: `📊 Total: ${total.toFixed(0)}ms, PG: ${perf.pgLoad ? perf.pgLoad.toFixed(0) + 'ms' : 'Loading'}`
            });
        }
    };
    
    // Enhanced RewardAd function (replaces the problematic one)
    window.RewardAd = function() {
        return window.TopbestofRewards.show();
    };
    
    console.log(`[Topbestof] Hybrid optimization loaded in ${(performance.now() - startTime).toFixed(2)}ms`);
    
})();

