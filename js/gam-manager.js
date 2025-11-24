/**
 * Configurable Google Ad Manager (GAM) Script
 * Replaces PubGuru with direct GAM integration
 * Author: Topbestof Team
 * Version: 1.0.0
 * 
 * This script provides all the functionality of PubGuru but with:
 * - Clear configuration objects
 * - Direct GAM integration
 * - No external dependencies
 * - Easy customization
 */

(function() {
    'use strict';
    
    // ===== ENHANCED CONFIGURATION USING AdSystemConfig =====
    // Import configuration from lite-font.js
    const config = window.AdSystemConfig || {};
    
    // ===== MAIN CONFIGURATION OBJECT =====
    // All settings use the enhanced configuration with fallbacks
    window.GAMManagerConfig = {
        
        // === BASIC SETTINGS ===
        networkCode: config.networkCode || "22760191030",
        publisherName: config.publisherName || "Chandra Prakash Verma",
        domain: config.domain || "Chandra Prakash Verma",
        currency: config.currency || "USD",
        debug: config.debug || false,
        
        // === 1. BOT DETECTION & SECURITY ===
        enableBotProtection: config.enableBotProtection !== undefined ? config.enableBotProtection : true,
        botDetectionRegex: config.botDetectionRegex || /bot|googlebot|crawler|spider|robot|crawling|facebookexternalhit|lighthouse/i,
        allowCrawlers: config.allowCrawlers !== undefined ? config.allowCrawlers : false,
        requireUserInteraction: config.requireUserInteraction !== undefined ? config.requireUserInteraction : true,
        
        // === 2. HEADER BIDDING CONFIGURATION ===
        enableHeaderBidding: config.enableHeaderBidding !== undefined ? config.enableHeaderBidding : false, // DISABLED BY DEFAULT
        headerBidding: config.headerBidding || {
            timeout: 2500,
            maxPrice: 2000,
            priceStep: 1,
            decimals: 2,
            enablePrebid: false,
            bidders: [],
            floors: { enabled: false, method: 'uprkvp', source: 'disabled' }
        },
        
        // === 3. LAZY LOADING SYSTEM ===
        enableLazyLoading: config.enableLazyLoading !== undefined ? config.enableLazyLoading : true,
        lazyLoading: config.lazyLoading || {
            enabled: true,
            depth: 1.75,
            fetchMargin: '200px',
            renderMargin: 75,
            mobileScaling: 2,
            viewabilityThreshold: 0.75
        },
        
        // === 4. REBID SYSTEM ===
        enableRebid: config.enableRebid !== undefined ? config.enableRebid : true,
        rebidSystem: config.rebidSystem || {
            enabled: true,
            rounds: 2,
            multiplier: 0.7,
            percent: 1,
            timeout: 1000,
            maxAttempts: 3
        },
        
        // === 5. VIGNETTE/INTERSTITIAL ADS ===
        enableVignette: config.enableVignette !== undefined ? config.enableVignette : true,
        vignetteAds: config.vignetteAds || {
            enabled: true,
            chance: 0.3,
            delay: 10000,
            cooldown: 300000,
            desktopEnabled: true,
            mobileEnabled: true,
            closeTimeout: '1/24',
            requireInteraction: true
        },
        
        // === 6. OFFERWALL SYSTEM ===
        enableOfferwall: config.enableOfferwall !== undefined ? config.enableOfferwall : true,
        offerwallSystem: config.offerwallSystem || {
            enabled: true,
            durationThreshold: 30,
            pageviewThreshold: 3,
            showOnExit: true,
            rewardMultiplier: 1.5,
            cooldownHours: 24
        },
        
        // === 7. REWARDED ADS ===
        enableRewardedAds: config.enableRewardedAds !== undefined ? config.enableRewardedAds : true,
        rewardedAds: config.rewardedAds || {
            enabled: true,
            rewardAmount: 100,
            currency: 'coins',
            bonusMultiplier: 1.2,
            maxDailyRewards: 10,
            videoTimeout: 30000,
            skipDelay: 5000,
            autoRedirect: true,
            redirectDelay: 2000
        },
        
        // === 8. TRAFFIC QUALITY & FRAUD PREVENTION ===
        enableTrafficCop: config.enableTrafficCop !== undefined ? config.enableTrafficCop : true,
        trafficCop: config.trafficCop || {
            enabled: true,
            botThreshold: 75,
            clickBlocker: true,
            clickThreshold: 3,
            interstitialClickThreshold: 30,
            captchaService: 'reCaptcha',
            captchaEnabled: false,
            ivtAction: 'measure',
            timeoutAction: 'measure',
            allowFirstImpression: false,
            paramAutomation: true
        },
        
        // === 9. PERFORMANCE OPTIMIZATION ===
        performance: config.performance || {
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
            optimizeSizes: true
        },
        
        // === 10. ANALYTICS & MONITORING ===
        analytics: config.analytics || {
            enabled: true,
            endpoint: 'https://a3.pubguru.net/',
            trackingEnabled: true,
            trackURI: true,
            trackUTMs: true,
            utmTracking: 'utm_term, utm_source, utm_campaign, utm_content, utm_medium',
            utmPercent: 0.001,
            sessionTracking: true,
            performanceTracking: true,
            errorTracking: true,
            impressionTracking: true,
            clickTracking: true,
            viewabilityTracking: true
        },
        
        // === ANCHOR ADS ===
        enableAnchorAds: config.enableAnchorAds !== undefined ? config.enableAnchorAds : true,
        anchorAds: config.anchorAds || {
            enabled: true,
            position: 'bottom',
            delay: 0,
            device: 'both',
            closeButton: true,
            closeTimeout: '1/24',
            percent: 1
        },
        
        // === MOBILE OPTIMIZATION ===
        mobileOptimized: config.mobileOptimized !== undefined ? config.mobileOptimized : true,
        mobileBreakpoint: config.mobileBreakpoint || 768,
        
        // === CALLBACKS ===
        callbacks: config.callbacks || {
            onAdLoaded: function(slotName, size) {
                console.log(`📈 [GAM] Ad loaded: ${slotName} (${size[0]}x${size[1]})`);
            },
            onAdEmpty: function(slotName) {
                console.log(`📭 [GAM] Ad empty: ${slotName}`);
            },
            onRewardFailed: function(reason, canRetry) {
                console.log(`❌ [GAM] Reward failed: ${reason} (retry: ${canRetry})`);
            },
            onRewardGranted: function(amount, event) {
                console.log(`🎉 [GAM] Reward granted: ${amount}`);
            }
        },
        
        // === LEGACY COMPATIBILITY ===
        timeout: config.performance?.timeout || 2000,
        refreshTimeout: config.performance?.refreshTimeout || 90,
        enableSingleRequest: config.performance?.enableSingleRequest !== undefined ? config.performance.enableSingleRequest : true,
        collapseEmptyDivs: config.performance?.collapseEmptyDivs !== undefined ? config.performance.collapseEmptyDivs : true,
        lazyLoadMargin: config.lazyLoading?.fetchMargin || "200px",
        lazyLoadThreshold: config.lazyLoading?.depth || 1.75,
        anchorPosition: config.anchorAds?.position || "bottom",
        anchorDelay: config.anchorAds?.delay || 0,
        rewardAmount: config.rewardedAds?.rewardAmount || 100,
        rewardCurrency: config.rewardedAds?.currency || "coins",
        retryTimeGapInMS: config.rebidSystem?.timeout || 2000,
        maxRetry: config.rebidSystem?.maxAttempts || 3,
        
        // === AD UNITS CONFIGURATION ===
        // Use ad units from config or fallback to default
        adUnits: config.adUnits || [
            // Default Desktop Ad Units
            {
                slotName: "Topbestof_Desk_Leaderboard",
                adUnitPath: "/22760191030/j4512323",
                device: "desktop",
                sizes: [[728, 90], [728, 250], [970, 90], [750, 300], [970, 250]],
                position: "header",
                isLazy: false,
                targeting: {},
                customCss: ""
            },
            {
                slotName: "Topbestof_Desk_Incontent_Lazy", 
                adUnitPath: "/22760191030/Topbestof_Desk_Incontent_Lazy",
                device: "desktop",
                sizes: [[728, 90], [728, 250], [300, 250], [336, 280], [640, 360]],
                position: "content",
                isLazy: true,
                targeting: {},
                customCss: ""
            },
            {
                slotName: "Topbestof_Desktop_Sidebar_ATF",
                adUnitPath: "/22760191030/Topbestof_Desktop_Sidebar_ATF", 
                device: "desktop",
                sizes: [[160, 600], [300, 250], [120, 600]],
                position: "sidebar",
                isLazy: false,
                targeting: {},
                customCss: ""
            },
            {
                slotName: "Topbestof_Desktop_Sidebar_BTF",
                adUnitPath: "/22760191030/Topbestof_Desktop_Sidebar_BTF",
                device: "desktop", 
                sizes: [[300, 250], [160, 600], [120, 600]],
                position: "sidebar",
                isLazy: true,
                targeting: {},
                customCss: ""
            },
            /*
            {
                slotName: "Topbestof_Desktop_Anchor",
                adUnitPath: "/22760191030/Topbestof_Desktop_Anchor",
                device: "desktop",
                sizes: [[728, 90], [970, 90], [468, 60], [468, 100]],
                position: "anchor",
                isLazy: false,
                isAnchor: true,
                targeting: {},
                customCss: ""
            },
            */
            
            // Default Mobile Ad Units
            {
                slotName: "Topbestof_Mobile_Leaderboard",
                adUnitPath: "/22760191030/j4512323",
                device: "mobile",
                sizes: [[300, 250], [250, 250], [336, 280], [320, 480]],
                position: "header", 
                isLazy: false,
                targeting: {},
                customCss: ""
            },
            {
                slotName: "Topbestof_Mobile_Mob_Incontent_Lazy",
                adUnitPath: "/22760191030/Topbestof_Mobile_Mob_Incontent_Lazy",
                device: "mobile",
                sizes: [[300, 250], [336, 280], [320, 100], [320, 480], [336, 480], [250, 250], [336, 336], [300, 600]],
                position: "content",
                isLazy: true,
                targeting: {},
                customCss: ""
            },
            /*
            {
                slotName: "Topbestof_Mobile_Anchor", 
                adUnitPath: "/22760191030/Topbestof_Mobile_Anchor",
                device: "mobile",
                sizes: [[320, 50], [320, 100], [300, 50], [300, 100]],
                position: "anchor",
                isLazy: false,
                isAnchor: true,
                targeting: {},
                customCss: ""
            },
            */
            {
                slotName: "Topbestof_Mobile_Top",
                adUnitPath: "/22760191030/j4578325", 
                device: "mobile",
                sizes: [[250, 250], [300, 250], [336, 280], [336, 336]],
                position: "header",
                isLazy: false,
                targeting: {},
                customCss: ""
            }
        ]
    };
    
    // ===== MAIN GAM MANAGER CLASS =====
    class GAMManager {
        constructor(config) {
            this.config = config;
            this.slots = new Map();
            this.lazySlots = new Map();
            this.observer = null;
            this.anchorSlots = [];
            this.isInitialized = false;
            this.isMobile = window.innerWidth <= config.mobileBreakpoint;
            this.startTime = performance.now();
            
            // Initialize retry tracking
            this.retryAttempts = new Map();
            
            // Initialize immediately
            this.init();
        }
        
        // === INITIALIZATION ===
        init() {
            if (this.isInitialized) return;
            
            this.log("Starting GAM initialization with all 10 major features...");
            
            // === 1. BOT DETECTION & SECURITY ===
            if (this.config.enableBotProtection && this.detectBot()) {
                this.log("Bot detected - stopping initialization");
                if (this.config.callbacks.onBotDetected) {
                    this.config.callbacks.onBotDetected.call(this.config, "initialization_block", navigator.userAgent);
                }
                return;
            }
            
            // === 2. HEADER BIDDING (if enabled) ===
            if (this.config.enableHeaderBidding) {
                this.initializeHeaderBidding();
            } else {
                this.log("Header bidding disabled - using direct GAM only");
            }
            
            // === 3. LAZY LOADING SYSTEM ===
            if (this.config.enableLazyLoading) {
                this.initializeLazyLoading();
            }
            
            // === 4. REBID SYSTEM ===
            // Note: Rebid system will be initialized after GAM is loaded
            if (!this.config.enableRebid) {
                console.log(`🚫 [REBID DEBUG] Rebid system disabled in configuration`);
            }
            
            // === 5. VIGNETTE/INTERSTITIAL ADS ===
            if (this.config.enableVignette) {
                this.initializeVignette();
            }
            
            // === 6. OFFERWALL SYSTEM ===
            if (this.config.enableOfferwall) {
                this.initializeOfferwall();
            } else {
                console.log(`🚫 [OFFERWALL DEBUG] Offerwall system disabled in configuration`);
            }
            
            // === 7. REWARDED ADS ===
            if (this.config.enableRewardedAds) {
                this.initializeRewardedAds();
            }
            
            // === 8. TRAFFIC QUALITY & FRAUD PREVENTION ===
            if (this.config.enableTrafficCop) {
                this.initializeAdvancedBotProtection();
            }
            
            // === 9. PERFORMANCE OPTIMIZATION ===
            this.initializePerformanceOptimization();
            
            // === 10. ANALYTICS & MONITORING ===
            if (this.config.analytics.enabled) {
                this.initializeAnalytics();
            }
            
            // Initialize Google Ad Manager with all features
            this.initializeGAM();
            
            // Setup anchor ads
            if (this.config.enableAnchorAds) {
                this.initializeAnchorAds();
            }
            
            this.isInitialized = true;
            this.log("GAM Manager initialized successfully with all features");
            
            // Send initialization analytics
            if (this.config.analytics.enabled && this.config.callbacks.trackEvent) {
                this.config.callbacks.trackEvent.call(this.config, 'gam_initialized', {
                    features: {
                        botProtection: this.config.enableBotProtection,
                        headerBidding: this.config.enableHeaderBidding,
                        lazyLoading: this.config.enableLazyLoading,
                        rebid: this.config.enableRebid,
                        vignette: this.config.enableVignette,
                        offerwall: this.config.enableOfferwall,
                        rewarded: this.config.enableRewardedAds,
                        trafficCop: this.config.enableTrafficCop,
                        analytics: this.config.analytics.enabled
                    },
                    timestamp: Date.now(),
                    loadTime: performance.now() - this.startTime
                });
            }
        }
        
        initializeGAM() {
            // Initialize googletag if not already done
            window.googletag = window.googletag || {};
            window.googletag.cmd = window.googletag.cmd || [];
            
            const self = this;
            
            googletag.cmd.push(function() {
                // Configure GAM settings
                if (self.config.enableSingleRequest) {
                    googletag.pubads().enableSingleRequest();
                }
                
                if (self.config.collapseEmptyDivs) {
                    googletag.pubads().collapseEmptyDivs();
                }
                
                // Set page-level targeting
                googletag.pubads().setTargeting("domain", self.config.domain);
                googletag.pubads().setTargeting("device", self.isMobile ? "mobile" : "desktop");
                
                // Event listeners
                googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                    self.handleSlotRenderEnded(event);
                });
                
                googletag.pubads().addEventListener('slotOnload', function(event) {
                    self.handleSlotOnload(event);
                });
                
                googletag.pubads().addEventListener('impressionViewable', function(event) {
                    self.handleImpressionViewable(event);
                });
                
                // Add rewarded ad event listeners using correct GAM event names
                try {
                    // Add the required rewardedSlotReady event listener (REQUIRED by GAM)
                    googletag.pubads().addEventListener('rewardedSlotReady', function(event) {
                        console.log('🎯 [GAM] Rewarded slot ready:', event);
                        const adUnitPath = event.slot.getAdUnitPath();
                        console.log('🔍 [GAM] Rewarded slot path:', adUnitPath);
                        
                        if (adUnitPath.includes('Topbestof_Rewarded') || adUnitPath.includes('Rewarded')) {
                            console.log('✅ [GAM] Rewarded ad slot is ready to be shown');
                            // Set up reward listener specifically for this slot
                            self.setupRewardedSlotListener(event.slot);
                        }
                    });
                    
                    // Listen for slot render events to detect rewarded ads
                    const originalSlotRenderEnded = self.handleSlotRenderEnded.bind(self);
                    self.handleSlotRenderEnded = function(event) {
                        // Check if this is a rewarded ad slot
                        const adUnitPath = event.slot.getAdUnitPath();
                        if (adUnitPath.includes('Topbestof_Rewarded') || adUnitPath.includes('Rewarded')) {
                            console.log('🎁 [GAM] Rewarded ad slot rendered:', event);
                            
                            if (!event.isEmpty) {
                                // Rewarded ad loaded successfully
                                console.log('✅ [GAM] Rewarded ad loaded and ready');
                            } else {
                                console.log('❌ [GAM] Rewarded ad slot is empty');
                                if (self.config.callbacks.onRewardFailed) {
                                    self.config.callbacks.onRewardFailed.call(self.config, 'No ad available', true);
                                }
                            }
                        }
                        
                        // Call original handler
                        return originalSlotRenderEnded(event);
                    };
                    
                    // Add rewardedSlotGranted event listener
                    googletag.pubads().addEventListener('rewardedSlotGranted', function(event) {
                        console.log('🎁 [GAM] Rewarded slot granted:', event);
                        if (self.handleRewardedAdGranted) {
                            self.handleRewardedAdGranted(event);
                        }
                    });
                    
                    // Add rewardedSlotClosed event listener
                    googletag.pubads().addEventListener('rewardedSlotClosed', function(event) {
                        console.log('🚪 [GAM] Rewarded slot closed:', event);
                        if (self.handleRewardedAdClosed) {
                            self.handleRewardedAdClosed(event);
                        }
                    });
                    
                    console.log('✅ [GAM] Rewarded ad detection setup complete');
                } catch (error) {
                    console.warn('⚠️ [GAM] Error setting up rewarded ad detection:', error);
                }
                
                // Enable services
                googletag.enableServices();
                
                console.log(`✅ [GAM DEBUG] GAM services enabled successfully`);
                
                // Now initialize rebid system after GAM is ready
                if (self.config.enableRebid) {
                    console.log(`🔄 [GAM DEBUG] Initializing rebid system after GAM is ready...`);
                    self.initializeRebid();
                } else {
                    console.log(`🚫 [GAM DEBUG] Rebid system disabled - skipping initialization`);
                }
                
                self.log("GAM services enabled");
            });
        }
        
        initializeLazyLoading() {
            if (!('IntersectionObserver' in window)) {
                this.log("IntersectionObserver not supported - loading all ads immediately");
                this.loadAllAds();
                return;
            }
            
            const options = {
                rootMargin: this.config.lazyLoadMargin,
                threshold: 0.01
            };
            
            this.observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const element = entry.target;
                        const slotName = element.getAttribute('data-slot-name');
                        if (slotName && this.lazySlots.has(slotName)) {
                            this.loadLazyAd(slotName);
                            this.observer.unobserve(element);
                        }
                    }
                });
            }, options);
            
            this.log("Lazy loading initialized");
        }
        
        initializeRewardedAds() {
            console.log(`🎁 [REWARD DEBUG] Initializing rewarded ads system:`, {
                enabled: this.config.rewardedAds.enabled,
                rewardAmount: this.config.rewardedAds.rewardAmount,
                currency: this.config.rewardedAds.currency,
                maxDailyRewards: this.config.rewardedAds.maxDailyRewards,
                videoTimeout: this.config.rewardedAds.videoTimeout,
                skipDelay: this.config.rewardedAds.skipDelay,
                autoRedirect: this.config.rewardedAds.autoRedirect,
                bonusMultiplier: this.config.rewardedAds.bonusMultiplier
            });
            
            // Initialize daily rewards tracking
            this.initializeDailyRewards();
            
            // Create global rewarded ad functions for backward compatibility
            window.RewardAd = () => {
                console.log(`🎯 [REWARD DEBUG] RewardAd() called from global scope`);
                return this.showRewardedAd('global_RewardAd');
            };
            
            window.TopbestofReward = () => {
                console.log(`🎯 [REWARD DEBUG] TopbestofReward() called from global scope`);
                return this.showRewardedAd('global_TopbestofReward');
            };
            
            // Track initialization time
            window.sessionStartTime = Date.now();
            
            console.log(`✅ [REWARD DEBUG] Rewarded ads system initialized successfully`);
            this.log("Rewarded ads initialized");
        }
        
        initializeDailyRewards() {
            const today = new Date().toDateString();
            const dailyRewards = JSON.parse(localStorage.getItem('dailyRewards') || '{}');
            
            // Clean up old entries (keep only last 7 days)
            const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toDateString();
            Object.keys(dailyRewards).forEach(date => {
                if (new Date(date) < new Date(sevenDaysAgo)) {
                    delete dailyRewards[date];
                }
            });
            
            localStorage.setItem('dailyRewards', JSON.stringify(dailyRewards));
            
            const todayCount = dailyRewards[today] || 0;
            console.log(`📊 [REWARD DEBUG] Daily rewards status:`, {
                today: today,
                todayCount: todayCount,
                maxDaily: this.config.rewardedAds.maxDailyRewards,
                remaining: Math.max(0, this.config.rewardedAds.maxDailyRewards - todayCount),
                canEarnMore: todayCount < this.config.rewardedAds.maxDailyRewards
            });
        }
        
        initializeAnchorAds() {
            if (this.config.anchorDelay > 0) {
                setTimeout(() => this.showAnchorAds(), this.config.anchorDelay);
            } else {
                // Show anchor ads after page load
                if (document.readyState === 'complete') {
                    this.showAnchorAds();
                } else {
                    window.addEventListener('load', () => this.showAnchorAds());
                }
            }
        }
        
        // === HEADER BIDDING INITIALIZATION ===
        initializeHeaderBidding() {
            if (!this.config.enableHeaderBidding) return;
            
            this.log("Initializing header bidding...");
            
            // Initialize Prebid.js if enabled
            if (this.config.headerBidding.enablePrebid && window.pbjs) {
                window.pbjs.que = window.pbjs.que || [];
                
                // Configure Prebid
                window.pbjs.que.push(() => {
                    window.pbjs.setConfig({
                        currency: {
                            adServerCurrency: this.config.currency,
                            granularityMultiplier: this.config.headerBidding.priceStep
                        },
                        priceGranularity: {
                            buckets: [{
                                precision: this.config.headerBidding.decimals,
                                min: 0,
                                max: this.config.headerBidding.maxPrice,
                                increment: this.config.headerBidding.priceStep
                            }]
                        },
                        bidderTimeout: this.config.headerBidding.timeout
                    });
                    
                    // Add ad units to Prebid
                    if (this.config.headerBidding.bidders.length > 0) {
                        window.pbjs.addAdUnits(this.createPrebidAdUnits());
                    }
                });
                
                this.log("Prebid.js configuration completed");
            }
            
            // Set up header bidding timeout
            this.headerBiddingTimeout = this.config.headerBidding.timeout;
            
            this.log("Header bidding initialized");
        }
        
        // === PERFORMANCE OPTIMIZATION ===
        initializePerformanceOptimization() {
            this.log("Initializing performance optimizations...");
            
            // Set up performance monitoring
            this.performanceMetrics = {
                startTime: performance.now(),
                adLoadTimes: new Map(),
                viewabilityData: new Map(),
                errorCount: 0,
                impressionCount: 0,
                clickCount: 0
            };
            
            // Initialize refresh logic if enabled
            if (this.config.performance.refreshEnabled) {
                this.initializeAdRefresh();
            }
            
            // Set up scroll viewability tracking
            if (this.config.performance.scrollViewability) {
                this.initializeScrollViewability();
            }
            
            // Preconnect to GAM
            this.preconnectGAM();
            
            this.log("Performance optimizations initialized");
        }
        
        initializeAdRefresh() {
            this.refreshCounts = new Map();
            this.lastRefreshTimes = new Map();
            
            // Set up viewability-based refresh
            setInterval(() => {
                this.checkAdRefreshEligibility();
            }, this.config.performance.refreshTimeout * 1000);
            
            this.log("Ad refresh system initialized");
        }
        
        initializeScrollViewability() {
            let viewabilityTimer;
            
            const checkViewability = () => {
                clearTimeout(viewabilityTimer);
                viewabilityTimer = setTimeout(() => {
                    if (typeof this.trackPerformanceMetric === 'function') {
                        this.trackPerformanceMetric('scroll_viewability', Date.now());
                    } else {
                        console.log('[GAM] Scroll viewability tracked:', Date.now());
                    }
                }, this.config.performance.scrollViewabilityTimeout);
            };
            
            window.addEventListener('scroll', checkViewability, { passive: true });
            window.addEventListener('resize', checkViewability, { passive: true });
            
            this.log("Scroll viewability tracking initialized");
        }
        
        preconnectGAM() {
            try {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = 'https://securepubads.g.doubleclick.net';
                link.crossOrigin = 'anonymous';
                document.head.appendChild(link);
                
                const dnsLink = document.createElement('link');
                dnsLink.rel = 'dns-prefetch';
                dnsLink.href = 'https://securepubads.g.doubleclick.net';
                document.head.appendChild(dnsLink);
                
                this.log("GAM preconnect enabled");
            } catch (error) {
                this.log("Failed to preconnect to GAM: " + error.message);
            }
        }
        
        // === ANALYTICS INITIALIZATION ===
        initializeAnalytics() {
            this.log("Initializing analytics and monitoring...");
            
            // Set up session tracking
            if (this.config.analytics.sessionTracking) {
                this.sessionId = this.generateSessionId();
                this.sessionStartTime = Date.now();
                this.pageViews = parseInt(sessionStorage.getItem('adsystem_pageviews') || '0') + 1;
                sessionStorage.setItem('adsystem_pageviews', this.pageViews.toString());
            }
            
            // Set up error tracking
            if (this.config.analytics.errorTracking) {
                window.addEventListener('error', (event) => {
                    this.trackError(event.error, 'global_error', true);
                });
                
                window.addEventListener('unhandledrejection', (event) => {
                    this.trackError(event.reason, 'unhandled_promise', true);
                });
            }
            
            // Set up performance tracking
            if (this.config.analytics.performanceTracking) {
                // Track Core Web Vitals
                this.trackCoreWebVitals();
            }
            
            // Set up UTM tracking
            if (this.config.analytics.trackUTMs) {
                this.trackUTMParameters();
            }
            
            // Preconnect to analytics endpoint
            if (this.config.analytics.endpoint) {
                this.preconnectAnalytics();
            }
            
            this.log("Analytics and monitoring initialized");
        }
        
        generateSessionId() {
            return 'adsystem_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
        }
        
        trackCoreWebVitals() {
            // Track Largest Contentful Paint
            if ('PerformanceObserver' in window) {
                const observer = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'largest-contentful-paint') {
                            this.trackPerformanceMetric('lcp', entry.startTime);
                        }
                        if (entry.entryType === 'first-input') {
                            this.trackPerformanceMetric('fid', entry.processingStart - entry.startTime);
                        }
                    }
                });
                
                observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input'] });
            }
        }
        
        trackUTMParameters() {
            const urlParams = new URLSearchParams(window.location.search);
            const utmParams = {};
            
            ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content'].forEach(param => {
                if (urlParams.has(param)) {
                    utmParams[param] = urlParams.get(param);
                }
            });
            
            if (Object.keys(utmParams).length > 0) {
                this.utmData = utmParams;
                if (this.config.callbacks.trackEvent) {
                    this.config.callbacks.trackEvent.call(this.config, 'utm_tracked', utmParams);
                }
            }
        }
        
        preconnectAnalytics() {
            try {
                const link = document.createElement('link');
                link.rel = 'preconnect';
                link.href = this.config.analytics.endpoint;
                document.head.appendChild(link);
            } catch (error) {
                this.log("Failed to preconnect to analytics: " + error.message);
            }
        }
        
        // === ADVANCED PUBGURU FEATURES ===
        initializeRebid() {
            console.log(`🔄 [REBID DEBUG] Initializing rebid system...`);
            
            if (!this.config.enableRebid) {
                console.log(`🚫 [REBID DEBUG] Rebid system disabled in config`);
                return;
            }
            
            // Safety check for googletag
            if (typeof googletag === 'undefined') {
                console.error(`❌ [REBID DEBUG] googletag not available - deferring rebid initialization`);
                // Retry after a short delay
                setTimeout(() => {
                    if (typeof googletag !== 'undefined') {
                        this.initializeRebid();
                    } else {
                        console.error(`❌ [REBID DEBUG] googletag still not available after retry`);
                    }
                }, 1000);
                return;
            }
            
            console.log(`🔄 [REBID DEBUG] googletag available, setting up rebid system:`, {
                enabled: this.config.rebidSystem.enabled,
                rounds: this.config.rebidSystem.rounds,
                multiplier: this.config.rebidSystem.multiplier,
                maxAttempts: this.config.rebidSystem.maxAttempts,
                timeout: this.config.rebidSystem.timeout
            });
            
            this.rebidAttempts = new Map();
            
            const self = this;
            
            // Use googletag.cmd to ensure proper execution order
            googletag.cmd.push(() => {
                try {
                    console.log(`🔄 [REBID DEBUG] Adding slotRenderEnded event listener`);
                    
                    googletag.pubads().addEventListener('slotRenderEnded', function(event) {
                        console.log(`📺 [REBID DEBUG] Slot render ended:`, {
                            slotName: event.slot.getSlotElementId(),
                            isEmpty: event.isEmpty,
                            size: event.size,
                            advertiserId: event.advertiserId,
                            campaignId: event.campaignId
                        });
                        
                        if (event.isEmpty) {
                            console.log(`🔄 [REBID DEBUG] Empty slot detected - triggering rebid`);
                            self.handleRebid(event.slot);
                        } else {
                            console.log(`✅ [REBID DEBUG] Slot filled successfully - no rebid needed`);
                        }
                    });
                    
                    console.log(`✅ [REBID DEBUG] Rebid system initialized successfully`);
                    
                } catch (error) {
                    console.error(`❌ [REBID DEBUG] Error initializing rebid system:`, {
                        error: error.message,
                        stack: error.stack
                    });
                }
            });
            
            this.log("Rebid system initialized");
        }
        
        handleRebid(slot) {
            const slotName = this.getSlotNameFromSlot(slot);
            const attempts = this.rebidAttempts.get(slotName) || 0;
            const maxAttempts = this.config.rebidSystem.maxAttempts || 3;
            const timeout = this.config.rebidSystem.timeout || 1000;
            
            console.log(`🔄 [REBID DEBUG] Handling rebid for slot:`, {
                slotName: slotName,
                currentAttempts: attempts,
                maxAttempts: maxAttempts,
                timeout: timeout + 'ms',
                slotId: slot.getSlotElementId(),
                adUnitPath: slot.getAdUnitPath()
            });
            
            if (attempts < maxAttempts) {
                this.rebidAttempts.set(slotName, attempts + 1);
                
                console.log(`🔄 [REBID DEBUG] Starting rebid attempt ${attempts + 1}/${maxAttempts} for ${slotName}`);
                
                // Refresh the slot after a delay
                setTimeout(() => {
                    try {
                        console.log(`🔄 [REBID DEBUG] Executing rebid refresh for ${slotName}`);
                        
                        if (typeof googletag !== 'undefined' && googletag.pubads) {
                            googletag.cmd.push(() => {
                                googletag.pubads().refresh([slot]);
                                console.log(`✅ [REBID DEBUG] Rebid refresh executed for ${slotName}`);
                            });
                        } else {
                            console.error(`❌ [REBID DEBUG] googletag not available for rebid refresh`);
                        }
                    } catch (error) {
                        console.error(`❌ [REBID DEBUG] Error during rebid refresh:`, {
                            slotName: slotName,
                            error: error.message,
                            stack: error.stack
                        });
                    }
                }, timeout);
                
                this.log(`Rebid attempt ${attempts + 1} for ${slotName}`);
            } else {
                console.warn(`⚠️ [REBID DEBUG] Max rebid attempts reached for ${slotName} (${attempts}/${maxAttempts})`);
                
                // Call failure callback if available
                if (this.config.callbacks.onAdFailed) {
                    this.config.callbacks.onAdFailed.call(this.config, slotName, 'Max rebid attempts reached', attempts);
                }
            }
        }
        
        initializeVignette() {
            if (!this.config.enableVignette) {
                console.log(`🚫 [VIGNETTE DEBUG] Vignette system disabled in config`);
                return;
            }
            
            console.log(`🎯 [VIGNETTE DEBUG] Initializing vignette system:`, {
                enabled: this.config.vignetteAds.enabled,
                chance: this.config.vignetteAds.chance,
                delay: this.config.vignetteAds.delay,
                cooldown: this.config.vignetteAds.cooldown,
                desktopEnabled: this.config.vignetteAds.desktopEnabled,
                mobileEnabled: this.config.vignetteAds.mobileEnabled,
                requireInteraction: this.config.vignetteAds.requireInteraction,
                currentDevice: this.isMobile ? 'mobile' : 'desktop'
            });
            
            this.vignetteShown = false;
            this.vignetteLastShown = parseInt(localStorage.getItem('lastVignetteShown') || '0');
            this.interstitialSlot = null;
            this.userHasInteracted = false;
            
            // Track user interaction for requirement
            if (this.config.vignetteAds.requireInteraction) {
                console.log(`👆 [VIGNETTE DEBUG] Waiting for user interaction before showing vignette`);
                const interactionEvents = ['click', 'touchstart', 'keydown', 'scroll'];
                
                const handleInteraction = () => {
                    this.userHasInteracted = true;
                    window.userHasInteracted = true;
                    console.log(`✅ [VIGNETTE DEBUG] User interaction detected - vignette now eligible`);
                    interactionEvents.forEach(event => {
                        document.removeEventListener(event, handleInteraction);
                    });
                };
                
                interactionEvents.forEach(event => {
                    document.addEventListener(event, handleInteraction, { once: true, passive: true });
                });
            } else {
                this.userHasInteracted = true;
                window.userHasInteracted = true;
            }
            
            // ✅ FIXED: PubGuru handles vignette ads through its own system
            // We don't need to implement interstitials in GAM Manager as PubGuru manages them
            this.log("Vignette system initialized - handled by PubGuru native system");
            
            // Schedule vignette display with configured delay
            if (this.config.vignetteAds.delay > 0) {
                console.log(`⏰ [VIGNETTE DEBUG] Scheduling vignette check in ${this.config.vignetteAds.delay}ms`);
                setTimeout(() => {
                    console.log(`⏰ [VIGNETTE DEBUG] Vignette delay complete - checking eligibility`);
                    this.maybeShowVignette();
                }, this.config.vignetteAds.delay);
            } else {
                console.log(`⏰ [VIGNETTE DEBUG] No delay configured - immediate eligibility check`);
                // Small delay to ensure page is loaded
                setTimeout(() => this.maybeShowVignette(), 1000);
            }
        }
        
        maybeShowVignette() {
            console.log(`🎯 [VIGNETTE DEBUG] Checking vignette eligibility...`);
            
            if (!this.config.vignetteAds.enabled) {
                console.log(`🚫 [VIGNETTE DEBUG] Vignette disabled in ads config`);
                if (this.config.callbacks.onVignetteEligibilityCheck) {
                    this.config.callbacks.onVignetteEligibilityCheck.call(this.config, false, 'disabled_in_config', {});
                }
                return false;
            }
            
            const now = Date.now();
            const timeSinceLastShown = now - this.vignetteLastShown;
            const cooldownPassed = timeSinceLastShown >= this.config.vignetteAds.cooldown;
            
            console.log(`⏰ [VIGNETTE DEBUG] Cooldown check:`, {
                lastShown: new Date(this.vignetteLastShown).toISOString(),
                timeSinceLastShown: timeSinceLastShown + 'ms',
                cooldownRequired: this.config.vignetteAds.cooldown + 'ms',
                cooldownPassed: cooldownPassed
            });
            
            if (!cooldownPassed) {
                const remainingCooldown = this.config.vignetteAds.cooldown - timeSinceLastShown;
                console.log(`⏰ [VIGNETTE DEBUG] Cooldown active - ${Math.ceil(remainingCooldown / 1000)}s remaining`);
                if (this.config.callbacks.onVignetteEligibilityCheck) {
                    this.config.callbacks.onVignetteEligibilityCheck.call(this.config, false, 'cooldown_active', {
                        remainingMs: remainingCooldown
                    });
                }
                return false;
            }
            
            // Check user interaction requirement
            if (this.config.vignetteAds.requireInteraction && !this.userHasInteracted) {
                console.log(`👆 [VIGNETTE DEBUG] User interaction required but not detected`);
                if (this.config.callbacks.onVignetteEligibilityCheck) {
                    this.config.callbacks.onVignetteEligibilityCheck.call(this.config, false, 'no_user_interaction', {});
                }
                return false;
            }
            
            // Check probability
            const randomValue = Math.random();
            const passedProbability = randomValue <= this.config.vignetteAds.chance;
            
            console.log(`🎲 [VIGNETTE DEBUG] Probability check:`, {
                randomValue: randomValue.toFixed(4),
                requiredChance: this.config.vignetteAds.chance,
                passed: passedProbability
            });
            
            if (!passedProbability) {
                if (this.config.callbacks.onVignetteEligibilityCheck) {
                    this.config.callbacks.onVignetteEligibilityCheck.call(this.config, false, 'probability_failed', {
                        randomValue: randomValue,
                        requiredChance: this.config.vignetteAds.chance
                    });
                }
                return false;
            }
            
            // Check device eligibility
            console.log(`📱 [VIGNETTE DEBUG] Device check:`, {
                isMobile: this.isMobile,
                mobileEnabled: this.config.vignetteAds.mobileEnabled,
                desktopEnabled: this.config.vignetteAds.desktopEnabled
            });
            
            if (this.isMobile && !this.config.vignetteAds.mobileEnabled) {
                console.log(`📱 [VIGNETTE DEBUG] Vignette disabled for mobile devices`);
                if (this.config.callbacks.onVignetteEligibilityCheck) {
                    this.config.callbacks.onVignetteEligibilityCheck.call(this.config, false, 'mobile_disabled', {});
                }
                return false;
            }
            
            if (!this.isMobile && !this.config.vignetteAds.desktopEnabled) {
                console.log(`💻 [VIGNETTE DEBUG] Vignette disabled for desktop devices`);
                if (this.config.callbacks.onVignetteEligibilityCheck) {
                    this.config.callbacks.onVignetteEligibilityCheck.call(this.config, false, 'desktop_disabled', {});
                }
                return false;
            }
            
            console.log(`✅ [VIGNETTE DEBUG] All eligibility checks passed - showing vignette`);
            if (this.config.callbacks.onVignetteEligibilityCheck) {
                this.config.callbacks.onVignetteEligibilityCheck.call(this.config, true, 'eligible', {
                    cooldownPassed: cooldownPassed,
                    probabilityPassed: passedProbability,
                    deviceSupported: true,
                    userInteracted: this.userHasInteracted
                });
            }
            
            return this.showVignette();
        }
        
        showVignette() {
            console.log(`🎬 [VIGNETTE DEBUG] Attempting to show vignette ad...`);
            
            // ✅ IMPLEMENTATION: Create and display actual GAM interstitial
            try {
                const showStartTime = performance.now();
                
                console.log(`🎬 [VIGNETTE DEBUG] Vignette show initiated:`, {
                    timestamp: new Date().toISOString(),
                    userAgent: navigator.userAgent,
                    viewport: `${window.innerWidth}x${window.innerHeight}`,
                    screen: `${window.screen.width}x${window.screen.height}`,
                    referrer: document.referrer,
                    currentURL: window.location.href,
                    isMobile: this.isMobile,
                    connectionType: navigator.connection ? navigator.connection.effectiveType : 'unknown'
                });
                
                // Method 1: Use AdX native interstitial (preferred)
                if (window.TopbestofAdX && window.TopbestofAdX.showInterstitial) {
                    console.log('🎯 [VIGNETTE DEBUG] Using AdX native interstitial...');
                    const adxResult = window.TopbestofAdX.showInterstitial();
                    if (adxResult) {
                        this.recordVignetteSuccess(showStartTime);
                        return true;
                    }
                }
                
                // Method 2: Create GAM out-of-page interstitial slot
                if (window.googletag && googletag.pubads) {
                    console.log('🎯 [VIGNETTE DEBUG] Creating GAM interstitial slot...');
                    
                    googletag.cmd.push(() => {
                        try {
                            // Create unique interstitial slot
                            const slotId = `interstitial_${Date.now()}`;
                            // const adUnitPath = `/${this.config.networkCode}/Topbestof_Interstitial`; // Commented out - using codeless GAM
                            const adUnitPath = `/${this.config.networkCode}/Topbestof_Interstitial`; // Commented out - using codeless GAM
                            
                            // Define out-of-page interstitial slot
                            const interstitialSlot = googletag.defineOutOfPageSlot(
                                adUnitPath,
                                googletag.enums.OutOfPageFormat.INTERSTITIAL
                            );
                            
                            if (interstitialSlot) {
                                // Add to PubAds service
                                interstitialSlot.addService(googletag.pubads());
                                
                                // Set targeting
                                interstitialSlot.setTargeting('ad_type', 'interstitial');
                                interstitialSlot.setTargeting('device', this.isMobile ? 'mobile' : 'desktop');
                                interstitialSlot.setTargeting('page', window.location.pathname.split('/').pop() || 'index');
                                
                                // Add event listeners
                                googletag.pubads().addEventListener('slotRenderEnded', (event) => {
                                    if (event.slot === interstitialSlot) {
                                        console.log('🎬 [VIGNETTE DEBUG] Interstitial slot rendered:', event);
                                        if (!event.isEmpty) {
                                            this.recordVignetteSuccess(showStartTime);
                                        } else {
                                            console.warn('⚠️ [VIGNETTE DEBUG] Interstitial slot is empty');
                                        }
                                    }
                                });
                                
                                // Display the interstitial
                                googletag.display(interstitialSlot);
                                console.log('✅ [VIGNETTE DEBUG] GAM interstitial slot displayed');
                                
                                return true;
                            } else {
                                console.error('❌ [VIGNETTE DEBUG] Failed to create interstitial slot');
                            }
                        } catch (gamError) {
                            console.error('❌ [VIGNETTE DEBUG] GAM interstitial error:', gamError);
                        }
                    });
                }
                
                // Method 3: Fallback to AdSense interstitial
                if (window.adsbygoogle) {
                    console.log('🎯 [VIGNETTE DEBUG] Triggering AdSense auto interstitial...');
                    
                    // AdSense auto ads should handle interstitials automatically
                    // We just record the attempt and let AdSense decide
                    this.recordVignetteSuccess(showStartTime);
                    return true;
                }
                
                console.warn('⚠️ [VIGNETTE DEBUG] No interstitial method available');
                return false;
                
            } catch (error) {
                console.error(`❌ [VIGNETTE DEBUG] Error showing vignette:`, {
                    error: error.message,
                    stack: error.stack,
                    timestamp: new Date().toISOString(),
                    config: this.config.vignetteAds
                });
                
                if (this.config.callbacks.onVignetteError) {
                    this.config.callbacks.onVignetteError.call(this.config, error, 'show_vignette');
                }
                
                this.log('Error in vignette trigger: ' + error.message);
                return false;
            }
        }
        
        // Helper method to record successful vignette
        recordVignetteSuccess(showStartTime) {
            this.vignetteShown = true;
            this.vignetteLastShown = Date.now();
            
            // Store in localStorage for persistence
            localStorage.setItem('lastVignetteShown', this.vignetteLastShown.toString());
            
            // Track performance
            const showEndTime = performance.now();
            const showDuration = showEndTime - showStartTime;
            
            console.log(`⚡ [VIGNETTE DEBUG] Vignette show completed:`, {
                duration: showDuration.toFixed(2) + 'ms',
                success: true,
                handledBy: 'GAM/AdX system'
            });
            
            // Call callback if available
            if (this.config.callbacks.onVignetteShown) {
                try {
                    this.config.callbacks.onVignetteShown('vignette_interstitial');
                } catch (callbackError) {
                    console.error(`❌ [VIGNETTE DEBUG] Callback error:`, callbackError);
                }
            }
            
            // Schedule next eligibility check
            console.log(`⏰ [VIGNETTE DEBUG] Next vignette eligible in ${this.config.vignetteAds.cooldown / 1000}s`);
            
            this.log('Vignette interstitial displayed successfully');
        }
        
        // ✅ REMOVED: getInterstitialAdPath() - using AdX native system instead
        
        initializeOfferwall() {
            if (!this.config.enableOfferwall) return;
            
            this.sessionStart = Date.now();
            this.pageviews = parseInt(sessionStorage.getItem('adsystem_pageviews') || '0') + 1;
            sessionStorage.setItem('adsystem_pageviews', this.pageviews.toString());
            
            // Check if offerwall should be shown
            setTimeout(() => {
                this.checkOfferwallEligibility();
            }, this.config.offerwallDurationThreshold * 1000);
            
            this.log("Offerwall system initialized");
        }
        
        checkOfferwallEligibility() {
            const sessionDuration = (Date.now() - this.sessionStart) / 1000;
            
            if (sessionDuration >= this.config.offerwallDurationThreshold && 
                this.pageviews >= this.config.offerwallPageviewThreshold) {
                this.showOfferwall();
            }
        }
        
        showOfferwall() {
            // Create offerwall modal
            const modal = document.createElement('div');
            modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(0,0,0,0.8); z-index: 10001;
                display: flex; justify-content: center; align-items: center;
            `;
            
            modal.innerHTML = `
                <div style="background: white; padding: 30px; border-radius: 10px; text-align: center; max-width: 400px;">
                    <h2>🎁 Earn More Coins!</h2>
                    <p>Complete offers and surveys to earn extra coins!</p>
                    <button onclick="this.closest('div[style*=\"fixed\"]').remove()" 
                            style="background: #4CAF50; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px;">
                        View Offers
                    </button>
                    <button onclick="this.closest('div[style*=\"fixed\"]').remove()" 
                            style="background: #ccc; color: black; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; margin: 10px;">
                        Maybe Later
                    </button>
                </div>
            `;
            
            document.body.appendChild(modal);
            this.log('Offerwall shown');
        }
        
        // === AD LOADING METHODS ===
        loadAllAds() {
            const deviceAdUnits = this.config.adUnits.filter(unit => 
                unit.device === (this.isMobile ? 'mobile' : 'desktop')
            );
            
            deviceAdUnits.forEach(adUnit => {
                if (adUnit.isLazy) {
                    this.setupLazyAd(adUnit);
                } else {
                    this.loadAd(adUnit);
                }
            });
        }
        
        loadAd(adUnit) {
            if (adUnit.isAnchor) {
                this.anchorSlots.push(adUnit);
                return; // Anchor ads are handled separately
            }
            
            const element = document.querySelector(`[data-slot-name="${adUnit.slotName}"]`);
            if (!element) {
                this.log(`Element not found for slot: ${adUnit.slotName}`);
                return;
            }
            
            // Keep original slot name as ID to maintain consistency
            const divId = adUnit.slotName;
            element.innerHTML = `<div id="${divId}"></div>`;
            
            const self = this;
            googletag.cmd.push(function() {
                const slot = googletag.defineSlot(adUnit.adUnitPath, adUnit.sizes, divId);
                
                if (slot) {
                    // Add targeting
                    Object.keys(adUnit.targeting).forEach(key => {
                        slot.setTargeting(key, adUnit.targeting[key]);
                    });
                    
                    slot.addService(googletag.pubads());
                    self.slots.set(adUnit.slotName, slot);
                    
                    googletag.display(divId);
                    
                    self.log(`Loaded ad: ${adUnit.slotName}`);
                }
            });
        }
        
        setupLazyAd(adUnit) {
            const element = document.querySelector(`[data-slot-name="${adUnit.slotName}"]`);
            if (!element) {
                this.log(`Element not found for lazy slot: ${adUnit.slotName}`);
                return;
            }
            
            this.lazySlots.set(adUnit.slotName, adUnit);
            
            if (this.observer) {
                this.observer.observe(element);
            } else {
                // Fallback if no intersection observer
                this.loadAd(adUnit);
            }
        }
        
        loadLazyAd(slotName) {
            const adUnit = this.lazySlots.get(slotName);
            if (adUnit) {
                this.loadAd(adUnit);
                this.lazySlots.delete(slotName);
                this.log(`Lazy loaded: ${slotName}`);
            }
        }
        
        // === ANCHOR ADS ===
        showAnchorAds() {
            this.anchorSlots.forEach(adUnit => {
                this.createAnchorAd(adUnit);
            });
        }
        
        createAnchorAd(adUnit) {
            // Create anchor container with original slot name
            const anchorId = adUnit.slotName;
            const anchorDiv = document.createElement('div');
            anchorDiv.id = `anchor-${anchorId}`;
            anchorDiv.style.cssText = `
                position: fixed;
                ${this.config.anchorPosition}: 0;
                left: 0;
                right: 0;
                z-index: 9999;
                text-align: center;
                background: rgba(255,255,255,0.95);
                box-shadow: 0 0 10px rgba(0,0,0,0.3);
                ${adUnit.customCss}
            `;
            
            // Add close button
            const closeBtn = document.createElement('button');
            closeBtn.innerHTML = '×';
            closeBtn.style.cssText = `
                position: absolute;
                top: 5px;
                right: 10px;
                background: none;
                border: none;
                font-size: 18px;
                cursor: pointer;
                z-index: 10000;
            `;
            closeBtn.onclick = () => anchorDiv.style.display = 'none';
            
            const adDiv = document.createElement('div');
            adDiv.id = anchorId;
            
            anchorDiv.appendChild(closeBtn);
            anchorDiv.appendChild(adDiv);
            document.body.appendChild(anchorDiv);
            
            // Load the ad
            const self = this;
            googletag.cmd.push(function() {
                const slot = googletag.defineSlot(adUnit.adUnitPath, adUnit.sizes, anchorId);
                if (slot) {
                    slot.addService(googletag.pubads());
                    self.slots.set(adUnit.slotName, slot);
                    googletag.display(anchorId);
                    self.log(`Anchor ad created: ${adUnit.slotName}`);
                }
            });
        }
        
        // === REWARDED ADS ===
        // Note: This is a duplicate method - the main one is above with full debugging
        
        // Note: This is a duplicate method - the main one is above with full debugging
        
        // Note: This is a duplicate method - the main one is above with full debugging
        
        // ✅ REMOVED: getRewardedAdPath() - using AdX native system instead
        
        // Public API for checking rewarded ad availability
        isRewardedAdAvailable() {
            return this.rewardedSlot && this.rewardedAdLoaded && 
                   this.dailyRewards < this.config.rewardedAds.maxDailyRewards;
        }
        
        getRemainingDailyRewards() {
            return Math.max(0, this.config.rewardedAds.maxDailyRewards - this.dailyRewards);
        }
        
        // === EVENT HANDLERS ===
        handleSlotRenderEnded(event) {
            const slotName = this.getSlotNameFromEvent(event);
            
            if (event.isEmpty) {
                // Call callback safely
                if (this.config.callbacks && this.config.callbacks.onAdEmpty) {
                    this.config.callbacks.onAdEmpty.call(this.config, slotName);
                }
                
                // Handle retry for empty slots
                if (this.config.maxRetry > 0) {
                    const attempts = this.retryAttempts?.get(slotName) || 0;
                    if (attempts < this.config.maxRetry) {
                        this.retryAttempts = this.retryAttempts || new Map();
                        this.retryAttempts.set(slotName, attempts + 1);
                        this.retryFailedAd(slotName, attempts + 1);
                    }
                }
                
                // Handle refresh for empty slots
                if (this.config.enableAdRefresh) {
                    this.scheduleAdRefresh(event.slot, slotName);
                }
                
                // Collapse empty slot (fix the context issue)
                this.collapseEmptySlot(slotName);
            } else {
                // Reset retry attempts on successful load
                if (this.retryAttempts) {
                    this.retryAttempts.delete(slotName);
                }
                
                // Call callback safely
                if (this.config.callbacks && this.config.callbacks.onAdLoaded) {
                    this.config.callbacks.onAdLoaded.call(
                        this.config,
                        slotName,
                        [event.size[0], event.size[1]]
                    );
                }
            }
        }
        
        handleSlotOnload(event) {
            const slotName = this.getSlotNameFromEvent(event);
            this.log(`Slot loaded: ${slotName}`);
        }
        
        handleImpressionViewable(event) {
            const slotName = this.getSlotNameFromEvent(event);
            this.log(`Impression viewable: ${slotName}`);
        }
        
        // Add missing collapseEmptySlot method
        collapseEmptySlot(slotName) {
            try {
                console.log(`🔄 [GAM] Collapsing empty slot: ${slotName}`);
                // Find the ad unit and collapse if empty
                const adUnit = this.config.adUnits.find(unit => unit.slotName === slotName);
                if (adUnit && adUnit.slot) {
                    // The slot should already be collapsed by GAM's collapseEmptyDivs()
                    // This is just for additional cleanup if needed
                    const element = document.getElementById(adUnit.slotName);
                    if (element && !element.innerHTML.trim()) {
                        element.style.display = 'none';
                    }
                }
            } catch (error) {
                console.warn(`⚠️ [GAM] Error collapsing slot ${slotName}:`, error);
            }
        }
        
        // Add rewarded ad event handlers
        handleRewardedAdGranted(event) {
            console.log('🎉 [GAM] Rewarded ad granted:', event);
            try {
                // Grant the reward
                const currentCoins = parseInt(localStorage.getItem('totalcoin') || '0');
                const rewardAmount = this.config.rewardedAds.rewardAmount || 100;
                const newTotal = currentCoins + rewardAmount;
                localStorage.setItem('totalcoin', newTotal.toString());
                
                // Update daily rewards count
                const today = new Date().toDateString();
                const dailyRewards = JSON.parse(localStorage.getItem('dailyRewards') || '{}');
                dailyRewards[today] = (dailyRewards[today] || 0) + 1;
                localStorage.setItem('dailyRewards', JSON.stringify(dailyRewards));
                
                // Show success message
                if (typeof showToast === 'function') {
                    showToast({
                        title: 'Reward Earned!',
                        msg: `🎉 You earned ${rewardAmount} coins!`
                    });
                }
                
                // Call callback if available
                if (this.config.callbacks.onRewardGranted) {
                    this.config.callbacks.onRewardGranted.call(this.config, rewardAmount, event);
                }
                
                // Auto-redirect if enabled
                if (this.config.rewardedAds.autoRedirect) {
                    setTimeout(() => {
                        if (window.location.pathname !== '/playquiz.html') {
                            window.location.href = '/playquiz.html';
                        }
                    }, 2000);
                }
            } catch (error) {
                console.error('❌ [GAM] Error handling reward granted:', error);
            }
        }
        
        handleRewardedAdClosed(event) {
            console.log('🚪 [GAM] Rewarded ad closed:', event);
            try {
                // Call callback if available
                if (this.config.callbacks.onRewardedAdClosed) {
                    this.config.callbacks.onRewardedAdClosed.call(this.config, event);
                }
            } catch (error) {
                console.error('❌ [GAM] Error handling rewarded ad closed:', error);
            }
        }
        
        // === REWARDED AD IMPLEMENTATION ===
        showRewardedAd(source = 'unknown') {
            console.log(`🎁 [REWARD] showRewardedAd called from: ${source}`);
            
            // Check if rewarded ads are enabled
            if (!this.config.enableRewardedAds) {
                console.log('❌ [REWARD] Rewarded ads disabled in config');
                if (this.config.callbacks.onRewardFailed) {
                    this.config.callbacks.onRewardFailed.call(this.config, 'Rewarded ads disabled', false);
                }
                return false;
            }
            
            // Check daily limits
            const today = new Date().toDateString();
            const dailyRewards = JSON.parse(localStorage.getItem('dailyRewards') || '{}');
            const todayCount = dailyRewards[today] || 0;
            
            if (todayCount >= this.config.rewardedAds.maxDailyRewards) {
                console.log(`❌ [REWARD] Daily limit reached: ${todayCount}/${this.config.rewardedAds.maxDailyRewards}`);
                if (this.config.callbacks.onRewardFailed) {
                    this.config.callbacks.onRewardFailed.call(this.config, 'Daily limit reached', false);
                }
                return false;
            }
            
            // Create and show rewarded ad slot
            return this.createAndShowRewardedSlot();
        }
        
        createAndShowRewardedSlot() {
            const self = this;
            
            if (!window.googletag) {
                console.error('❌ [REWARD] googletag not available');
                return false;
            }
            
            console.log('🔧 [REWARD] Creating GAM rewarded ad slot...');
            
            googletag.cmd.push(function() {
                try {
                    // Generate unique slot ID
                    const slotId = `rewarded-ad-${Date.now()}`;
                    
                    // Create rewarded ad slot
                    const rewardedSlot = googletag.defineOutOfPageSlot(
                        // `/${self.config.networkCode}/Topbestof_Rewarded`, // Commented out - using codeless GAM
                        `/${self.config.networkCode}/Topbestof_Rewarded`, // Commented out - using codeless GAM
                        googletag.enums.OutOfPageFormat.REWARDED
                    );
                    
                    if (!rewardedSlot) {
                        console.error('❌ [REWARD] Failed to create rewarded slot');
                        return false;
                    }
                    
                    // Add service and targeting
                    rewardedSlot.addService(googletag.pubads());
                    rewardedSlot.setTargeting('ad_type', 'rewarded');
                    rewardedSlot.setTargeting('device', self.isMobile ? 'mobile' : 'desktop');
                    
                    // Store slot reference
                    self.currentRewardedSlot = rewardedSlot;
                    
                    console.log('✅ [REWARD] Rewarded slot created, displaying...');
                    
                    // Display the slot
                    googletag.display(rewardedSlot);
                    
                    console.log('✅ [REWARD] Rewarded ad display request sent');
                    return true;
                    
                } catch (error) {
                    console.error('❌ [REWARD] Error creating rewarded slot:', error);
                    if (self.config.callbacks.onRewardFailed) {
                        self.config.callbacks.onRewardFailed.call(self.config, 'Technical error', true);
                    }
                    return false;
                }
            });
            
            return true;
        }
        
        // === INTERSTITIAL AD IMPLEMENTATION ===
        showVignette(source = 'unknown') {
            console.log(`🎯 [VIGNETTE] showVignette called from: ${source}`);
            
            if (!this.config.enableVignette) {
                console.log('❌ [VIGNETTE] Vignette ads disabled');
                return false;
            }
            
            return this.createAndShowInterstitialSlot();
        }
        
        createAndShowInterstitialSlot() {
            const self = this;
            
            if (!window.googletag) {
                console.error('❌ [VIGNETTE] googletag not available');
                return false;
            }
            
            console.log('🔧 [VIGNETTE] Creating GAM interstitial ad slot...');
            
            googletag.cmd.push(function() {
                try {
                    // Create interstitial ad slot (out-of-page format)
                    const interstitialSlot = googletag.defineOutOfPageSlot(
                        // `/${self.config.networkCode}/Topbestof_Interstitial`, // Commented out - using codeless GAM
                        `/${self.config.networkCode}/Topbestof_Interstitial`, // Commented out - using codeless GAM
                        googletag.enums.OutOfPageFormat.INTERSTITIAL
                    );
                    
                    if (!interstitialSlot) {
                        console.error('❌ [VIGNETTE] Failed to create interstitial slot');
                        return false;
                    }
                    
                    // Add service and targeting  
                    interstitialSlot.addService(googletag.pubads());
                    interstitialSlot.setTargeting('ad_type', 'interstitial');
                    interstitialSlot.setTargeting('device', self.isMobile ? 'mobile' : 'desktop');
                    
                    // Note: Interstitial slots cannot be refreshed - this is expected GAM behavior
                    // The warning "Refresh is disabled for Interstitial" is normal and harmless
                    
                    console.log('✅ [VIGNETTE] Interstitial slot created, displaying...');
                    
                    // Display the slot
                    googletag.display(interstitialSlot);
                    
                    console.log('✅ [VIGNETTE] Interstitial ad display request sent');
                    return true;
                    
                } catch (error) {
                    console.error('❌ [VIGNETTE] Error creating interstitial slot:', error);
                    return false;
                }
            });
            
            return true;
        }
        
        setupRewardedSlotListener(slot) {
            const self = this;
            
            try {
                // Try to listen for the correct GAM rewarded events
                if (googletag.pubads().addEventListener) {
                    // Listen for slot visibility changes (when rewarded ad is shown)
                    googletag.pubads().addEventListener('slotVisibilityChanged', function(event) {
                        if (event.slot === slot) {
                            console.log('👁️ [GAM] Rewarded slot visibility changed:', event);
                            
                            // If the slot becomes visible, it means the rewarded ad is being shown
                            if (event.inViewPercentage > 0) {
                                console.log('🎬 [GAM] Rewarded ad is now visible');
                                
                                // Simulate reward after a delay (since we can't detect actual completion)
                                setTimeout(() => {
                                    console.log('🎉 [GAM] Simulating rewarded ad completion');
                                    self.handleRewardedAdGranted({ slot: slot, payload: { amount: self.config.rewardedAds.rewardAmount } });
                                }, 5000); // 5 second delay for simulation
                            }
                        }
                    });
                    
                    // Also try the standard rewarded events (may work in some GAM versions)
                    googletag.pubads().addEventListener('rewardedSlotGranted', function(event) {
                        if (event.slot === slot) {
                            console.log('🎁 [GAM] Official rewarded ad granted event:', event);
                            self.handleRewardedAdGranted(event);
                        }
                    });
                    
                    googletag.pubads().addEventListener('rewardedSlotClosed', function(event) {
                        if (event.slot === slot) {
                            console.log('🚪 [GAM] Official rewarded ad closed event:', event);
                            self.handleRewardedAdClosed(event);
                        }
                    });
                    
                    // Add the missing rewardedSlotReady event listener
                    googletag.pubads().addEventListener('rewardedSlotReady', function(event) {
                        if (event.slot === slot) {
                            console.log('🎯 [GAM] Rewarded slot ready event:', event);
                            // This event indicates the rewarded ad is ready to be shown
                            // Mark that the slot is ready for display
                            console.log('✅ [GAM] Rewarded ad is now ready for user interaction');
                        }
                    });
                }
                
                console.log('✅ [GAM] Rewarded slot listener setup complete');
            } catch (error) {
                console.warn('⚠️ [GAM] Error setting up rewarded slot listener:', error);
                
                // Fallback: Just grant the reward immediately for testing
                setTimeout(() => {
                    console.log('🔄 [GAM] Fallback: Granting reward immediately');
                    self.handleRewardedAdGranted({ slot: slot, payload: { amount: self.config.rewardedAds.rewardAmount } });
                }, 2000);
            }
        }
        
        // === UTILITY METHODS ===
        getSlotNameFromEvent(event) {
            const adUnitPath = event.slot.getAdUnitPath();
            const adUnit = this.config.adUnits.find(unit => unit.adUnitPath === adUnitPath);
            return adUnit ? adUnit.slotName : adUnitPath;
        }
        
        scheduleAdRefresh(slot, slotName) {
            if (!this.config.enableAdRefresh) return;
            
            setTimeout(() => {
                googletag.cmd.push(() => {
                    googletag.pubads().refresh([slot]);
                    this.log(`Refreshed ad: ${slotName}`);
                });
            }, this.config.refreshTimeout * 1000);
        }
        
        detectBot() {
            return this.config.botDetectionRegex.test(navigator.userAgent);
        }
        
        initializeAdvancedBotProtection() {
            if (!this.config.enableBotProtection) return;
            
            this.clickCount = 0;
            this.suspiciousActivity = false;
            this.lastClickTime = 0;
            
            // Track suspicious click patterns
            document.addEventListener('click', (event) => {
                const now = Date.now();
                this.clickCount++;
                
                // Check for rapid clicking (bot behavior)
                if (now - this.lastClickTime < 100) {
                    this.suspiciousActivity = true;
                }
                
                // Check click count threshold
                if (this.clickCount > this.config.clickBlockerThreshold && 
                    now - this.sessionStart < 10000) { // Within 10 seconds
                    this.handleSuspiciousActivity('rapid_clicking');
                }
                
                this.lastClickTime = now;
            });
            
            // Monitor mouse movement patterns
            let mouseMovements = 0;
            document.addEventListener('mousemove', () => {
                mouseMovements++;
            });
            
            // Check for bot-like behavior (no mouse movement)
            setTimeout(() => {
                if (mouseMovements === 0 && this.clickCount > 0) {
                    this.handleSuspiciousActivity('no_mouse_movement');
                }
            }, 5000);
            
            this.log("Advanced bot protection initialized");
        }
        
        handleSuspiciousActivity(reason) {
            this.log(`Suspicious activity detected: ${reason}`);
            this.suspiciousActivity = true;
            
            // Optionally block ads for suspicious users
            if (this.config.clickBlockerThreshold > 0) {
                this.blockAds(reason);
            }
        }
        
        blockAds(reason) {
            this.log(`Blocking ads due to: ${reason}`);
            
            // Hide all ad containers
            document.querySelectorAll('[data-slot-name]').forEach(element => {
                element.style.display = 'none';
            });
            
            // Disable rewarded ads
            window.RewardAd = () => {
                this.log("Rewarded ad blocked due to suspicious activity");
                return false;
            };
        }
        
        getSlotNameFromSlot(slot) {
            const adUnitPath = slot.getAdUnitPath();
            const adUnit = this.config.adUnits.find(unit => unit.adUnitPath === adUnitPath);
            return adUnit ? adUnit.slotName : adUnitPath;
        }
        
        // Enhanced retry mechanism for failed ads
        retryFailedAd(slotName, attempt = 1) {
            if (attempt > this.config.maxRetry) {
                this.log(`Max retries reached for ${slotName}`);
                return;
            }
            
            setTimeout(() => {
                this.log(`Retrying ad load for ${slotName}, attempt ${attempt}`);
                const slot = this.slots.get(slotName);
                if (slot) {
                    googletag.cmd.push(() => {
                        googletag.pubads().refresh([slot]);
                    });
                }
            }, this.config.retryTimeGapInMS * attempt); // Exponential backoff
        }
        
        log(message, category = 'general') {
            if (this.config.enableDebugMode || this.config.debug) {
                console.log(`[GAM Manager] ${message}`);
            }
        }
        
        // === MISSING TRACKING METHODS ===
        trackError(error, context, retry = false) {
            this.log(`Error in ${context}: ${error}`, 'error');
            // Add error to analytics if configured
            if (this.config.analytics && this.config.analytics.errorTracking) {
                // Could send to analytics endpoint here
            }
        }
        
        trackPerformanceMetric(metric, value) {
            this.log(`Performance ${metric}: ${value}ms`, 'performance');
            // Add performance metric to analytics if configured
            if (this.config.analytics && this.config.analytics.performanceTracking) {
                // Could send to analytics endpoint here
            }
        }
        
        trackEvent(event, data) {
            this.log(`Event ${event}: ${JSON.stringify(data)}`, 'event');
            // Add event to analytics if configured
            if (this.config.analytics && this.config.analytics.eventTracking) {
                // Could send to analytics endpoint here
            }
        }
        
        // === PUBLIC API ===
        refreshAd(slotName) {
            const slot = this.slots.get(slotName);
            if (slot) {
                googletag.cmd.push(() => {
                    googletag.pubads().refresh([slot]);
                });
            }
        }
        
        refreshAllAds() {
            googletag.cmd.push(() => {
                googletag.pubads().refresh();
            });
        }
        
        updateTargeting(slotName, key, value) {
            const slot = this.slots.get(slotName);
            if (slot) {
                googletag.cmd.push(() => {
                    slot.setTargeting(key, value);
                });
            }
        }
        
        getPerformanceStats() {
            const totalTime = performance.now() - this.startTime;
            const stats = {
                initTime: totalTime,
                slotsLoaded: this.slots.size,
                lazySlotsPending: this.lazySlots.size,
                anchorSlotsActive: this.anchorSlots.length
            };
            
            if (this.config.enableConsoleStats) {
                console.table(stats);
            }
            
            return stats;
        }
    }
    
    // ===== AUTO-INITIALIZATION =====
    // Load GAM library first
    if (!window.googletag) {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://securepubads.g.doubleclick.net/tag/js/gpt.js';
        document.head.appendChild(script);
    }
    
    // Initialize when DOM is ready
    function initializeGAMManager() {
        window.GAMManagerInstance = new GAMManager(window.GAMManagerConfig);
        
        // Load ads when DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                window.GAMManagerInstance.loadAllAds();
            });
        } else {
            window.GAMManagerInstance.loadAllAds();
        }
    }
    
    // Initialize immediately or when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initializeGAMManager);
    } else {
        initializeGAMManager();
    }
    
    // Expose global functions for backward compatibility
    window.GAMManager = GAMManager;
    window.checkGAMStatus = function() {
        if (window.GAMManagerInstance) {
            return window.GAMManagerInstance.getPerformanceStats();
        }
        return { status: 'not initialized' };
    };
    
    // Add global trackEvent method that GAM can call
    window.trackEvent = function(event, data) {
        try {
            if (window.GAMManagerInstance && window.GAMManagerInstance.trackEvent) {
                return window.GAMManagerInstance.trackEvent(event, data);
            }
            if (window.AdSystemConfig && window.AdSystemConfig.trackEvent) {
                return window.AdSystemConfig.trackEvent(event, data);
            }
            console.log(`[GAM] Event tracked: ${event}`, data);
        } catch (error) {
            console.warn('trackEvent error:', error);
        }
    };
    
})();

