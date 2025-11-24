# TboBuzz Optimized Ad System

## Overview

This is a streamlined, local version of the PubGuru ad management system specifically optimized for TboBuzz. It removes unnecessary features like header bidding while keeping essential functionality for faster loading and better performance.

## Files Structure

```
js/
├── pg-optimized.js          # Main optimized ad system
├── tbobuzz-lite-font.js     # Configuration file for customization
└── jquery-3.6.4.min.js     # jQuery library
```

## Key Features Kept

### ✅ Essential Features
- **Google AdX Integration** - Your primary ad network
- **Rewarded Video Ads** - For coin rewards 
- **Bot Detection** - Security and fraud prevention
- **Lazy Loading** - Better performance
- **Rebid Functionality** - Improved fill rates
- **Vignette/Interstitial Ads** - Additional revenue
- **Anchor/Sticky Ads** - Persistent ad placement
- **Click Fraud Protection** - Security

### ❌ Removed Features (That Were Slowing You Down)
- Header bidding infrastructure
- Multiple bidder integrations
- Complex prebid.js
- Extensive analytics tracking
- Multi-domain configurations
- SPA routing support
- A/B testing framework
- Complex audience management

## Performance Improvements

### 1. **Reduced File Size**
- Original: ~250KB+ (minified, with dependencies)
- Optimized: ~15KB (readable, focused)
- **Reduction: ~94% smaller**

### 2. **Faster Load Times**
- No external CDN dependency
- No complex initialization chains
- Immediate script execution
- Reduced DNS lookups

### 3. **Better Caching**
- Local hosting = browser caching
- No version-dependent URLs
- You control updates

### 4. **Simplified Architecture**
- Direct Google Ad Manager integration
- Streamlined event handling
- Reduced memory footprint

## Configuration

### Basic Setup
Edit `js/tbobuzz-lite-font.js` to customize behavior:

```javascript
window.TboBuzzAdConfig = {
  debug: false,              // Set true for development
  rewarded: true,           // Enable reward ads
  vignette: true,           // Enable interstitials
  vignetteChance: 0.3,      // 30% chance to show
  rewardCoins: 100,         // Coins per reward ad
  lazy: true,               // Enable lazy loading
  // ... more options
};
```

### Ad Units
Your current ad units are pre-configured:
- `Tbobuzz_Mobile_Leaderboard`
- `Tbobuzz_Mobile_Top` 
- `Tbobuzz_Mobile_Anchor`

## Advanced Features

### 1. **Rebid System**
Automatically retries failed ads with lower floor prices to improve fill rates:
```javascript
rebid: true,
rebidRounds: 2,           // Try 2 more times
rebidMultiplier: 0.7      // 30% price reduction
```

### 2. **Lazy Loading**
Ads load only when user scrolls near them:
```javascript
lazy: true,
lazyDepth: 1.75          // Load 1.75 screen heights ahead
```

### 3. **Bot Protection**
Detects and prevents bot traffic:
- User interaction monitoring
- Click pattern analysis
- Suspicious behavior flagging

### 4. **Smart Vignettes**
Controlled interstitial ad timing:
```javascript
vignetteChance: 0.3,     // 30% probability
vignetteDelay: 10000,    // Wait 10 seconds
```

## API Usage

### Rewarded Ads
```javascript
// Trigger rewarded ad
RewardAd(); // Global function (unchanged)

// Or use the new API
window.pg.rewarded.show();
```

### Debug Information
```javascript
// Check system status
window.checkPubGuruStatus();
```

### Custom Callbacks
```javascript
window.TboBuzzAdConfig.callbacks = {
  onRewardGranted: function(coins) {
    console.log(`User earned ${coins} coins`);
  },
  onVignetteShown: function() {
    console.log('Interstitial ad displayed');
  }
};
```

## Migration Benefits

### Before (External PubGuru Script)
- 🐌 **Slow loading** - External CDN dependency
- 📊 **Complex tracking** - Excessive analytics
- 🔄 **Header bidding** - Unnecessary complexity
- 📦 **Large bundle** - Many unused features
- ⚠️ **External dependency** - Risk of downtime

### After (Optimized Local Script)
- ⚡ **Fast loading** - Local hosting
- 🎯 **Focused functionality** - Only what you need
- 🔒 **Full control** - No external dependencies
- 📈 **Better performance** - Reduced overhead
- 🛠️ **Easy maintenance** - Clean, readable code

## Testing & Monitoring

### Enable Debug Mode
Add `?pg_debug=1` to your URL or set in config:
```javascript
debug: true
```

### Monitor Performance
Check browser console for:
- Ad loading times
- Fill rates
- Error messages
- Bot detection alerts

## Troubleshooting

### Ads Not Loading
1. Check console for errors
2. Verify ad unit codes
3. Enable debug mode
4. Check Google Ad Manager setup

### Rewarded Ads Not Working
1. Ensure `.pg-rewarded` elements exist
2. Check `pgRenderEvent` is set
3. Verify callback registration
4. Test with debug mode

### Performance Issues
1. Enable lazy loading
2. Reduce rebid rounds
3. Optimize ad sizes for mobile
4. Monitor click fraud detection

## Best Practices

1. **Test Thoroughly** - Always test in staging first
2. **Monitor Performance** - Watch Core Web Vitals
3. **Use Configuration** - Don't hardcode values
4. **Enable Debug** - For development only
5. **Update Gradually** - One feature at a time

## Support

For issues specific to this optimized version:
1. Check browser console for errors
2. Enable debug mode for detailed logging  
3. Verify configuration settings
4. Test with minimal setup first

---

**Note**: This optimized version maintains full compatibility with your existing `RewardAd()` function calls and HTML structure while providing significantly better performance.
